import React, { Component } from 'react';

import DesignCanvas from '../canvas/DesignCanvas'
import Line from '../canvas/Line';
import Circle from '../canvas/Circle';
import PropTypes from 'prop-types';

export default class CornerBoard extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        corners: PropTypes.object.isRequired
    }

    static defaultProps = {
        corners: {
            "size": {
                "width": 800,
                "height": 600
            },
            "topLeft": {
                "x": 0,
                "y": 0
            },
            "topRight": {
                "x": 800,
                "y": 0
            },
            "bottomLeft": {
                "x": 600,
                "y": 0
            },
            "bottomRight": {
                "x": 800,
                "y": 600
            }
        }
    }

    
    render() {
        return (
            <DesignCanvas 
            width={this.props.width}
            height={this.props.height}
            onMoving={(objId, top, left) => this.props.onMovingCorners(objId, top, left)}
            imageSource={this.props.imageSource}>
                <Line startPoint={this.props.topLeft} endPoint={this.props.topRight} />
                <Line startPoint={this.props.topRight} endPoint={this.props.bottomRight} />
                <Line startPoint={this.props.bottomRight} endPoint={this.props.bottomLeft} />
                <Line startPoint={this.props.bottomLeft} endPoint={this.props.topLeft} />
                <Circle id={1} top={this.props.topLeft.y} left={this.props.topLeft.x} />
                <Circle id={2} top={this.props.topRight.y} left={this.props.topRight.x} />
                <Circle id={3} top={this.props.bottomRight.y} left={this.props.bottomRight.x} />
                <Circle id={4} top={this.props.bottomLeft.y} left={this.props.bottomLeft.x} />
            </DesignCanvas>
        )
    }
}
