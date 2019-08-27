import React, { Component } from 'react';

import DesignCanvas from '../canvas/DesignCanvas'
import Line from '../canvas/Line';
import Circle from '../canvas/Circle';
import PropTypes from 'prop-types';
import { CORNER_ID, CANVAS_BOARD_TYPE } from '../../constants/index';
import Position from '../../models/position';

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
        let positionLine1 = new Position(
            this.props.topLeft.x, 
            this.props.topLeft.y, 
            this.props.topRight.x, 
            this.props.topRight.y
        );
        let positionLine2 = new Position(
            this.props.topRight.x, 
            this.props.topRight.y,
            this.props.bottomRight.x,
            this.props.bottomRight.y
        );
        let positionLine3 = new Position(
            this.props.bottomRight.x,
            this.props.bottomRight.y,
            this.props.bottomLeft.x, 
            this.props.bottomLeft.y
        );
        let positionLine4 = new Position(
            this.props.bottomLeft.x, 
            this.props.bottomLeft.y,
            this.props.topLeft.x, 
            this.props.topLeft.y
        );

        return (
            <DesignCanvas
            type={CANVAS_BOARD_TYPE.CORNER}
            width={this.props.width}
            height={this.props.height}
            scale={this.props.scale}
            onMoving={(objId, top, left) => this.props.onMovingCorners(objId, top, left)}
            imageSource={this.props.imageSource}>
                <Line key={1} name="topLeft" idx="1" position={positionLine1} />
                <Line key={2} name="topRight" idx="2" position={positionLine2} />
                <Line key={3} name="bottomRight" idx="3" position={positionLine3} />
                <Line key={4} name="bottomLeft" idx="4" position={positionLine4} />
                <Circle fill='red' id={CORNER_ID.TOP_LEFT} top={this.props.topLeft.y} left={this.props.topLeft.x} />
                <Circle id={CORNER_ID.TOP_RIGHT} top={this.props.topRight.y} left={this.props.topRight.x} />
                <Circle id={CORNER_ID.BOTTOM_RIGHT} top={this.props.bottomRight.y} left={this.props.bottomRight.x} />
                <Circle id={CORNER_ID.BOTTOM_LEFT} top={this.props.bottomLeft.y} left={this.props.bottomLeft.x} />
            </DesignCanvas>
        )
    }
}
