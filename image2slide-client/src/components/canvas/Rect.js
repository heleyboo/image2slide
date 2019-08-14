import React from 'react'
import PropTypes from 'prop-types'
import { OBJECT_NAME } from '../../constants/index'

const fabric = window.fabric

export default class Rect extends React.Component {
    static propTypes = {
        canvas: PropTypes.object,
        detectionObject: PropTypes.object.isRequired,
        fill: PropTypes.string.isRequired,
        stroke: PropTypes.string.isRequired,
        strokeWidth: PropTypes.number.isRequired,
        selectable: PropTypes.bool.isRequired,
        evented: PropTypes.bool.isRequired,
        key: PropTypes.number.isRequired
    }

    static defaultProps = {
        detectionObject: {
            id: 1,
            name: 'rectangle',
            bndbox: {
                minX: 0,
                maxX: 100,
                minY: 0,
                maxY: 100
            },
        },
        fill: '',
        stroke: 'white',
        strokeWidth: 1,
        hasControls: true,
        hasBorders: true,
        selectable: true,
        evented: true,
    }

    getStrokeColorByObjectName(objName) {
        switch(objName) {
            case OBJECT_NAME.CIRCLE: return 'blue'; break;
            case OBJECT_NAME.RECTANGLE: return 'orange'; break;
            case OBJECT_NAME.TRIANGLE: return 'yellow'; break;
            default: return '#ccc'; break;
        }
    }

    componentDidMount() {
        const bndbox = this.props.detectionObject.data;
        const strokeColor = this.getStrokeColorByObjectName(this.props.detectionObject.name);
        const options = {
            top: bndbox.maxY,
            left: bndbox.minX,
            width: bndbox.maxX - bndbox.minX,
            height: bndbox.maxY - bndbox.minY,
            fill: this.props.fill,
            stroke: strokeColor,
            strokeWidth: this.props.strokeWidth,
            hasControls: this.props.hasControls,
            hasBorders: this.props.hasBorders,
            selectable: this.props.selectable,
            evented: this.props.evented,
            key: this.props.key
        }
        const rect = new fabric.Rect(options)
        this.props.canvas.add(rect)
    }

    render() {
        return null
    }
}
