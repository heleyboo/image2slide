import React from 'react';

import UploadArea from '../steps/upload-area';
import PreviewImage from '../steps/preview-image';
import StepController from '../steps/step-controller';
import CornerBoard from '../steps/corner-board';
import DetectionBoard from '../steps/detection-board';
import { async } from 'q';
import { APP_STEP, LINE_ITEM, CORNER_ID } from '../../constants/index';
import AIService from '../../services/aiservices';
import DownpptxBoard from '../steps/downpptx-board';
import Toolbox from '../draw-tools/toolbox';
import ShapeProperties from '../shape-properties/shape-properties';
import Corners from '../../models/corners';
import Detection from '../../models/detection';
import StorageService from '../../services/storageservice';
import DrawService from '../../services/drawservice';
import Rect from '../../models/rect';
import BndBox from '../../models/bndbox';
import Line from '../../models/line';
import Position from '../../models/position';
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
            corners: null,
            detection: null
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

    handleCanvasMousedown = (x1, y1, x2, y2) => {
        let item = DrawService.getDrawItem();
        let detection = this.state.detection;
        if (detection instanceof Detection) {
            let obj = null;
            if (item.name === LINE_ITEM.name) {
                obj = new Line(null, item.name, new Position(x1, y1, x2, y2));
            } else {
                const xmin = Math.min(x1, x2);
                const xmax = Math.max(x1, x2);
                const ymin = Math.min(y1, y2) - Math.abs(y1-y2);
                const ymax = Math.max(y1, y2) - Math.abs(y1-y2);
                obj = new Rect(null, item.name, new BndBox(xmin, ymin, xmax, ymax));
            }
            detection.addOject(obj);
            this.setState({detection: detection});
        }
    }

    renderDetectionBoard = () => {
        return (
            <DetectionBoard 
            detectedObjets={this.state.detectedObjets}
            data={this.state.detection}
            onDrawEnded={this.onDrawEnded}
            imageSource={this.state.imageSrc}
            drawing={this.state.drawing}
            onObjectSelected={(object) => this.handleOjectSelection(object)}
            onCanvasMousedown={(x1, y1, x2, y2) => this.handleCanvasMousedown(x1, y1, x2, y2)}
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
            corners: {
                topLeft: this.state.topLeft,
                topRight: this.state.topRight,
                bottomLeft: this.state.bottomLeft,
                bottomRight: this.state.bottomRight
            },
            session_id: StorageService.getItem(StorageService.KEY.SESSION_ID)
        }

        let detectResult = await AIService.detectObjectcs(uploadData);

        let mainBoardWidth = document.getElementById('main-board').offsetWidth;
        let canvasWidth = mainBoardWidth - 40;
        let detection = new Detection(canvasWidth, detectResult.annotation);

        this.setState({
            detectedObjets: [],
            detection: detection
        });
    }

    getProcessedResult = async() => {
        let uploadData = {
            session_id: StorageService.getItem(StorageService.KEY.SESSION_ID)
        }
        let result = await AIService.getProcessedResult(uploadData);

        this.setState({
            linkDownloadPPTX: result.pptx
        });
    }

    onMovingCorners = (objId, top, left) => {
        switch (objId) {
            case CORNER_ID.TOP_LEFT:
                this.setState({ topLeft: { x: left, y: top } });
                break;
            case CORNER_ID.TOP_RIGHT:
                this.setState({ topRight: { x: left, y: top } });
                break;
            case CORNER_ID.BOTTOM_RIGHT:
                this.setState({ bottomRight: { x: left, y: top } });
                break;
            case CORNER_ID.BOTTOM_LEFT:
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
                await this.getProcessedResult();
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
                        <div className="well text-center" id="main-board">
                            {this.renderStep(this.state.step)}
                        </div>
                        <StepController 
                        onNext={this.handleNextStep} 
                        onPrevious={this.handleBackPreviousStep}
                        loading={this.state.loading}
                        />
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