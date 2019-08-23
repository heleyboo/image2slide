import React, { Component } from 'react'
import DesignCanvas from '../canvas/DesignCanvas'
import Rect from '../canvas/Rect'
import { CANVAS_BOARD_TYPE } from '../../constants/index'
import Line from '../canvas/Line';
import LineObj from '../../models/line';
import RectObj from '../../models/rect';
export default class DetectionBoard extends Component {

    /**
     * Render detected objects on canvas
     * @param {} objects Detected objects
     */
    renderDetectedObjects = (data) => {
        let detectionObjects = data.onBoardObjects;
        if (detectionObjects && detectionObjects.length > 0) {
            return detectionObjects.map((object, index) => {
                if (object instanceof LineObj) {
                    return <Line key={index} name={object.name} idx={object.id} position={object.position} />
                } else if (object instanceof RectObj) {
                    return <Rect key={index} name={object.name} idx={object.id} bndbox={object.bndbox} strokeWidth={2} />
                }
            });
        }
    }
    
    render() {
        return (
            <DesignCanvas
            type={CANVAS_BOARD_TYPE.EDITOR}
            imageSource={this.props.imageSource}
            onDrawEnded={this.props.onDrawEnded}
            drawing={this.props.drawing}
            onObjectSelected={(object) => this.props.onObjectSelected(object)}
            onCanvasMousedown={(x1, y1, x2, y2) => this.props.onCanvasMousedown(x1, y1, x2, y2)}
            >
                { this.renderDetectedObjects(this.props.data) }
            </DesignCanvas>
        );
    }
}
