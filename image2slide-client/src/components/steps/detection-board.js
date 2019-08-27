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
                    return <Line key={index} name={object.name} idx={object.id} position={object.position} selectable={true} evented={true} />
                } else if (object instanceof RectObj) {
                    return <Rect key={index} name={object.name} idx={object.id} bndbox={object.bndbox} strokeWidth={2} />
                }
            });
        }
    }

    removeActiveObject = (objectId) => {
        if (this.child) {
            this.child.removeActiveObject(objectId);
        }
    }

    updateActiveObjectProperties = (objectId, name, xMin, yMin, xMax, yMax) => {
        if (this.child) {
            this.child.updateObjectProperties(
                objectId, 
                name, 
                parseInt(xMin), 
                parseInt(yMin), 
                parseInt(xMax), 
                parseInt(yMax)
            );
        }
    }
    
    render() {
        return (
            <DesignCanvas
            type={CANVAS_BOARD_TYPE.EDITOR}
            imageSource={this.props.imageSource}
            onDrawEnded={this.props.onDrawEnded}
            drawing={this.props.drawing}
            onObjectSelected={(objectId, xMin, yMin, xMax, yMax) => this.props.onObjectSelected(objectId, xMin, yMin, xMax, yMax)}
            onCanvasMousedown={(x1, y1, x2, y2) => this.props.onCanvasMousedown(x1, y1, x2, y2)}
            scale={this.props.scale}
            data={this.props.data}
            ref={instance => { this.child = instance; }}
            >
                { this.renderDetectedObjects(this.props.data) }
            </DesignCanvas>
        );
    }
}
