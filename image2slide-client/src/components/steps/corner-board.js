import React, { Component } from 'react';

import DesignCanvas from '../canvas/DesignCanvas'
import Line from '../canvas/Line';
import Circle from '../canvas/Circle';
import PropTypes from 'prop-types';
import { CORNER_ID, CANVAS_BOARD_TYPE } from '../../constants/index';

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
            type={CANVAS_BOARD_TYPE.CORNER}
            width={this.props.width}
            height={this.props.height}
            onMoving={(objId, top, left) => this.props.onMovingCorners(objId, top, left)}
            imageSource={this.props.imageSource}>
                <Line key={1} name="topLeft" idx="1" startPoint={this.props.topLeft} endPoint={this.props.topRight} />
                <Line key={2} name="topRight" idx="2" startPoint={this.props.topRight} endPoint={this.props.bottomRight} />
                <Line key={3} name="bottomRight" idx="3" startPoint={this.props.bottomRight} endPoint={this.props.bottomLeft} />
                <Line key={4} name="bottomLeft" idx="4" startPoint={this.props.bottomLeft} endPoint={this.props.topLeft} />
                <Circle id={CORNER_ID.TOP_LEFT} top={this.props.topLeft.y} left={this.props.topLeft.x} />
                <Circle id={CORNER_ID.TOP_RIGHT} top={this.props.topRight.y} left={this.props.topRight.x} />
                <Circle id={CORNER_ID.BOTTOM_RIGHT} top={this.props.bottomRight.y} left={this.props.bottomRight.x} />
                <Circle id={CORNER_ID.BOTTOM_LEFT} top={this.props.bottomLeft.y} left={this.props.bottomLeft.x} />
            </DesignCanvas>
        )
    }
}
