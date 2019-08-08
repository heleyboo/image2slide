import React from 'react';

export default class DrawPanel extends React.Component {
    render() {
        return (
            <div className="row setup-content" id="step-1">
                <div className="col-xs-12">
                    <div className="well text-center">
                        <div className="file-upload">
                            <button className="file-upload-btn" type="button">Add Image</button>

                            <div className="image-upload-wrap">
                                <input className="file-upload-input" type="file" accept="image/*" />
                                <div className="drag-text">
                                    <h3>Drag and drop a file or select add Image</h3>
                                </div>
                            </div>
                            <div className="file-upload-content">
                                <img className="file-upload-image" src="#" alt="your image" />
                                <div className="image-title-wrap">
                                    <button type="button" className="remove-image">Remove <span className="image-title">Uploaded Image</span></button>
                                </div>
                            </div>
                        </div>
                        <div className="row" id="btn-steps">
                            <div className="col-md-12 col-xs-12">
                                <button className="btn btn-default pull-left">Back to previous step</button>
                                <button className="btn btn-success pull-right">Next step</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}