import React, { Component } from 'react'
import DesignCanvas from '../canvas/DesignCanvas'
import Rect from '../canvas/Rect'
import { OBJECT_NAME, CANVAS_BOARD_TYPE } from '../../constants/index'
import Line from '../canvas/Line';
export default class DetectionBoard extends Component {

    /**
     * Render detected objects on canvas
     * @param {} objects Detected objects
     */
    renderDetectedObjects = (objects) => {

        if (objects && objects.length > 0) {
            return objects.map((object, index) => {
                let data = object.data;
                switch(object.name) {
                    case OBJECT_NAME.LINE:
                        return <Line key={index} name={object.name} idx={object.id} startPoint={data.start} endPoint={data.end} />
                    default:
                        return <Rect key={index} name={object.name} idx={object.id} bndbox={data} strokeWidth={2} />
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
            >
                { this.renderDetectedObjects(this.props.detectedObjets) }
            </DesignCanvas>
        );
    }
}
