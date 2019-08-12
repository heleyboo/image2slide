import React, { Component } from 'react'
import DesignCanvas from '../canvas/DesignCanvas'
import Rect from '../canvas/Rect'

export default class DetectionBoard extends Component {
    render() {
        return (
            <DesignCanvas imageSource={this.props.imageSource}>
                <Rect width={100} height={100} stroke="red" strokeWidth={2} />
                <Rect width={100} height={100} stroke="red" strokeWidth={2} />
                <Rect width={100} height={100} stroke="blue" strokeWidth={2} />
                <Rect width={100} height={100} stroke="green" strokeWidth={2} />
                <Rect width={100} height={100} stroke="orange" strokeWidth={2} />
            </DesignCanvas>
        );
    }
}
