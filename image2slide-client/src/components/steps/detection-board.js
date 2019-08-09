import React, { Component } from 'react';

export default class DetectionBoard extends Component {
    render() {
        return (
            <div>
                <img className="image-preview" src={this.props.imageSource} alt="Preview image" />
            </div>
        );
    }
}
