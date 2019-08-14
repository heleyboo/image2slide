import React from 'react';

export default class PreviewImage extends React.Component {
    render() {
        return (
            <>
                <img className="image-preview" src={this.props.imageSource} alt="Preview image" />
            </>
        )
    }
}