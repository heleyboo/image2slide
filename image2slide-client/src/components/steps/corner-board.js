import React, { Component } from 'react';

// import { Container } from './styles';

export default class CornerBoard extends Component {
    render() {
        return (
            <>
                <img className="image-preview" src={this.props.imageSource} alt="Preview image" />
            </>
        )
    }
}
