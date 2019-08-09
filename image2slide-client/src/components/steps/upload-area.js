import React from 'react';

export default class UploadArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="file-upload">
                <div className="image-upload-wrap">
                    <input className="file-upload-input" onChange={(e) => this.props.onFileInputChange(e.target.files)} type="file" accept="image/*" />
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
        )
    }
}