import React, { Component } from 'react'
import DesignCanvas from '../canvas/DesignCanvas'
import Rect from '../canvas/Rect'
import { OBJECT_NAME } from '../../constants/index'
import Line from '../canvas/Line';
export default class DetectionBoard extends Component {

    /**
     * Render detected objects on canvas
     * @param {} objects Detected objects
     */
    renderDetectedObjects = (objects) => {

        if (objects && objects.length > 0) {
            return objects.map((object, index) => {
                let data = object.data
                switch(object.name) {
                    case OBJECT_NAME.LINE:
                        return <Line key={index} startPoint={data.start} endPoint={data.end} />
                    default:
                        return <Rect key={index} detectionObject={object} strokeWidth={2} />
                }
            });
        }
    }

    //
    renderObject = (object) => {
        if (object.name === OBJECT_NAME.LINE) {
            return <Line/>
        } else {
            return <Rect detectionObject={object} strokeWidth={2} />
        }
    }
    
    render() {
        return (
            <DesignCanvas imageSource={this.props.imageSource}>
                { this.renderDetectedObjects(this.props.detectedObjets) }
            </DesignCanvas>
        );
    }
}
