import React from 'react';

import UploadArea from '../steps/upload-area';
import PreviewImage from '../steps/preview-image';
import StepController from '../steps/step-controller';
import CornerBoard from '../steps/corner-board';
import DetectionBoard from '../steps/detection-board';
import { async } from 'q';
import { APP_STEP, CORNERS } from '../../constants/index';
import AIService from '../../services/aiservices';
import DownpptxBoard from '../steps/downpptx-board';
export default class DrawPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            isSelectedImage: false,
            loading: false,
            topLeft: null,
            topRight: null,
            bottomLeft: null,
            bottomRight: null,
            detectedObjets: null,
            cornerWidth: 800,
            cornerHeight: 600,
            imageSrc: '',
            linkDownloadPPTX: '',
        };
    }

    handleChange = (files) => {
        let reader = new FileReader();

        let _self = this;
        reader.onload = function(e) {
            _self.setState({
                imageSrc: e.target.result,
                isSelectedImage: true
            });
        }
          
        reader.readAsDataURL(files[0]);
    }

    renderStep = (step) => {
        switch(step) {
            case APP_STEP.UPLOAD_IMAGE: return this.renderUploadPanel(); break;
            case APP_STEP.DETECT_CORNERS: return this.renderCornerBoard(); break;
            case APP_STEP.DETECT_OBJECTS: return this.renderDetectionBoard(); break;
            case APP_STEP.DOWNLOAD_PPT: return this.renderPPTDownloadBoard(); break;
        }
    }

    renderUploadPanel = () => {
        const isSelectedImage = this.state.isSelectedImage;
        let step;
        if (isSelectedImage) {
            step = <PreviewImage imageSource={this.state.imageSrc} />;
        } else {
            step = <UploadArea onFileInputChange={this.handleChange}/>;
        }
        return step;
    }

    renderCornerBoard = () => {
        return (
            <CornerBoard 
            topLeft={this.state.topLeft}
            topRight={this.state.topRight}
            bottomLeft={this.state.bottomLeft}
            bottomRight={this.state.bottomRight}
            imageSource={this.state.imageSrc}
            width={this.state.cornerWidth}
            height={this.state.cornerHeight}
            onMovingCorners={(objId, top, left) => this.onMovingCorners(objId, top, left)}
            />
        );
    }

    renderDetectionBoard = () => {
        return (
            <DetectionBoard 
            detectedObjets={this.state.detectedObjets} 
            imageSource={this.state.imageSrc}
            />
        )
    }

    renderPPTDownloadBoard = () => {
        return <DownpptxBoard link={this.state.linkDownloadPPTX}/>
    }

    detectCorners = async() => {

        let uploadData = {
            method: 'POST',
            headers: new Headers()
        }

        let cornersRes = await AIService.detectCorners(uploadData);

        AIService.storeCornerInformation(cornersRes);

        let mainBoardWidth = document.getElementById('main-board').offsetWidth;
        let canvasWidth = mainBoardWidth - 40;
        let scale = canvasWidth / cornersRes.corners.size.width;

            
        this.setState({
            topLeft: cornersRes.corners.topLeft,
            topRight: cornersRes.corners.topRight,
            bottomRight: cornersRes.corners.bottomRight,
            bottomLeft: cornersRes.corners.bottomLeft,
            cornerWidth: cornersRes.corners.size.width * scale,
            cornerHeight: cornersRes.corners.size.height * scale,
        });
    }

    detectObjects = async() => {

        let uploadData = AIService.getCornersFromStorage();

        let detectResult = await AIService.detectObjectcs(uploadData);

        AIService.storeDetectionObjects(detectResult.detectionObjects);

        this.setState({
            detectedObjets: AIService.getDetectionObjectsFromStorage()
        });
    }

    getPPTX = async() => {
        let uploadData = {
            method: 'POST',
            headers: new Headers()
        }
        let getPPTXResult = await AIService.getPPTX(uploadData);

        this.setState({
            linkDownloadPPTX: getPPTXResult.link
        });
    }

    onMovingCorners = (objId, top, left) => {
        switch (objId) {
            case 1:
                AIService.uploadCornerInformation(CORNERS.TOP_LEFT, left, top);
                this.setState({ topLeft: { x: left, y: top } });
                break;
            case 2:
                AIService.uploadCornerInformation(CORNERS.TOP_RIGHT, left, top);
                this.setState({ topRight: { x: left, y: top } });
                break;
            case 3:
                AIService.uploadCornerInformation(CORNERS.BOTTOM_RIGHT, left, top);
                this.setState({ bottomRight: { x: left, y: top } });
                break;
            case 4:
                AIService.uploadCornerInformation(CORNERS.BOTTOM_LEFT, left, top);
                this.setState({ bottomLeft: { x: left, y: top } });
                break;
        }
    }

    processNextStep = async(currentStep) => {
        this.setState({loading: true});

        switch(currentStep) {
            case APP_STEP.UPLOAD_IMAGE:
                await this.detectCorners();
                break;
            case APP_STEP.DETECT_CORNERS:
                await this.detectObjects();
                break;
            case APP_STEP.DETECT_OBJECTS:
                await this.getPPTX();
                break;
        }
        
        let nextStep = currentStep + 1;
        this.setState({ 
            step: nextStep,
            loading: false
        });
        this.props.updateStep(nextStep);
    }

    handleNextStep = async () => {
        if (!this.state.isSelectedImage) {
            return alert('Please select an image');
        }
        let currentStep = this.state.step;
        if (currentStep >= APP_STEP.DOWNLOAD_PPT) {
            return;
        }
        await this.processNextStep(currentStep);
    }

    handleBackPreviousStep = () => {
        let currentStep = this.state.step;
        if (currentStep <= 1) {
            return;
        }
        currentStep -= 1;
        this.setState({ step: currentStep });
        this.props.updateStep(currentStep);
    }

    render() {
        return (
            <div className="row setup-content" id="step-1">
                <div className="col-xs-12">
                    <StepController 
                    onNext={this.handleNextStep} 
                    onPrevious={this.handleBackPreviousStep}
                    loading={this.state.loading}
                    />
                    <div className="well text-center" id="main-board">
                        {this.renderStep(this.state.step)}
                    </div>
                </div>
            </div>
        )
    }
}