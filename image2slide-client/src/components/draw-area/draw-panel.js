import React from 'react';

import UploadArea from '../steps/upload-area';
import PreviewImage from '../steps/preview-image';
import StepController from '../steps/step-controller';
import CornerBoard from '../steps/corner-board';
import DetectionBoard from '../steps/detection-board';

export default class DrawPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            preview: false,
            imageSrc: ''
        };
    }

    handleChange = (files) => {
        console.log(files);
        let reader = new FileReader();

        let _self = this;
        reader.onload = function(e) {
            _self.setState({
                imageSrc: e.target.result,
                preview: true
            });
        }
          
        reader.readAsDataURL(files[0]);
    }

    handleDeleteImage = () => {
        this.setState({ preview: false });
    }

    renderStep = (step) => {
        console.log(step);
        switch(step) {
            case 1: return this.renderUploadPanel(); break;
            case 2: return this.renderCornerBoard(); break;
            case 3: return this.renderDetectionBoard(); break;
            case 4: return this.renderPPTDownloadBoard(); break;
        }
    }

    renderUploadPanel = () => {
        const isPreview = this.state.preview;
        let step;
        if (isPreview) {
            step = <PreviewImage imageSource={this.state.imageSrc} onDeleteImage={this.handleDeleteImage} />;
        } else {
            step = <UploadArea onFileInputChange={this.handleChange}/>;
        }
        return step;
    }

    renderCornerBoard = () => {
        return <CornerBoard imageSource={this.state.imageSrc}/>;
    }

    renderDetectionBoard = () => {
        return <DetectionBoard imageSource={this.state.imageSrc}/>
    }

    renderPPTDownloadBoard = () => {
        return <></>;
    }

    handleNextStep = () => {
        let currentStep = this.state.step;
        currentStep += 1;
        this.setState({ step: currentStep });
    }

    handleBackPreviousStep = () => {
        let currentStep = this.state.step;
        currentStep -= 1;
        this.setState({ step: currentStep });
    }

    render() {
        return (
            <div className="row setup-content" id="step-1">
                <div className="col-xs-12">
                    <div className="well text-center">
                        {/* <StepController/> */}
                        <StepController onNext={this.handleNextStep} onPrevious={this.handleBackPreviousStep}/>
                        {this.renderStep(this.state.step)}
                    </div>
                </div>
            </div>
        )
    }
}