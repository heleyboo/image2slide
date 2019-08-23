import React from 'react';

import UploadArea from '../steps/upload-area';
import PreviewImage from '../steps/preview-image';
import StepController from '../steps/step-controller';
import CornerBoard from '../steps/corner-board';
import DetectionBoard from '../steps/detection-board';
import { async } from 'q';
import { APP_STEP, CORNERS, CORNER_ID } from '../../constants/index';
import AIService from '../../services/aiservices';
import DownpptxBoard from '../steps/downpptx-board';
import Toolbox from '../draw-tools/toolbox';
import ShapeProperties from '../shape-properties/shape-properties';
import Corners from '../../models/corners';
import Detection from '../../models/detection';
export default class DrawPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            isSelectedImage: false,
            selectedFile: null,
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
            selectedObject: null,
            drawing: false,
            corners: null
        };
    }

    handleChange = (files) => {

        this.setState({selectedFile: files[0]});

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

    onDrawEnded = () => {
        this.setState({drawing: false});
    }

    handleOjectSelection = (object) => {
        this.setState({selectedObject: object});
    }

    renderDetectionBoard = () => {
        return (
            <DetectionBoard 
            detectedObjets={this.state.detectedObjets}
            onDrawEnded={this.onDrawEnded} 
            imageSource={this.state.imageSrc}
            drawing={this.state.drawing}
            onObjectSelected={(object) => this.handleOjectSelection(object)}
            />
        )
    }

    renderPPTDownloadBoard = () => {
        return <DownpptxBoard link={this.state.linkDownloadPPTX}/>
    }

    detectCorners = async() => {

        const formData = new FormData();
        formData.append('image', this.state.selectedFile);

        let cornersRes = await AIService.detectCorners(formData);

        AIService.storeCornerInformation(cornersRes);

        let mainBoardWidth = document.getElementById('main-board').offsetWidth;
        let canvasWidth = mainBoardWidth - 40;

        let corners = new Corners(canvasWidth, cornersRes.annotation);

        this.setState({
            topLeft: corners.scaledTopLeft,
            topRight: corners.scaledTopRight,
            bottomRight: corners.scaledBottomRight,
            bottomLeft: corners.scaledBottomLeft,
            cornerWidth: corners.scaledWidth,
            cornerHeight: corners.scaledHeight,
            corners: corners
        });

    }

    detectObjects = async() => {

        let uploadData = {
            corners: this.state.corners,
            session_id: '4534534534'
        }

        let detectResult = await AIService.detectObjectcs(uploadData);

        let mainBoardWidth = document.getElementById('main-board').offsetWidth;
        let canvasWidth = mainBoardWidth - 40;
        let detection = new Detection(canvasWidth, detectResult.annotation);
        console.log(detection);

        this.setState({
            detectedObjets: []
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
            case CORNER_ID.TOP_LEFT:
                AIService.uploadCornerInformation(CORNERS.TOP_LEFT, left, top);
                this.setState({ topLeft: { x: left, y: top } });
                break;
            case CORNER_ID.TOP_RIGHT:
                AIService.uploadCornerInformation(CORNERS.TOP_RIGHT, left, top);
                this.setState({ topRight: { x: left, y: top } });
                break;
            case CORNER_ID.BOTTOM_RIGHT:
                AIService.uploadCornerInformation(CORNERS.BOTTOM_RIGHT, left, top);
                this.setState({ bottomRight: { x: left, y: top } });
                break;
            case CORNER_ID.BOTTOM_LEFT:
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
            <div className="panel-body">
                <div className="col-md-2 col-xs-12">
                    <Toolbox step={this.state.step} />
                </div>
                <div className="col-md-8 col-xs-12">
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
                </div>
                <div className="col-md-2 col-xs-12">
                    <ShapeProperties targetObject={this.state.selectedObject} step={this.state.step}/>
                </div>
            </div>
        )
    }
}