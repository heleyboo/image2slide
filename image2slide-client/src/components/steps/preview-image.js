import React from 'react';

export default class PreviewImage extends React.Component {

    constructor(props) {
        super(props);
    }

    handleUploadImage = () => {

    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="btn-group">
                        <button type="button" className="btn btn-warning" onClick={this.props.onDeleteImage}>Delete</button>
                        <button type="button" className="btn btn-success" onClick={this.handleUploadImage}>Upload</button>
                    </div>
                </div>
                <img className="image-preview" src={this.props.imageSource} alt="Preview image" />
            </>
        )
    }
}