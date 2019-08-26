import React from 'react'
import PropTypes from 'prop-types'
import { OBJECT_NAME } from '../../constants/index'

const fabric = window.fabric

export default class Rect extends React.Component {
    static propTypes = {
        canvas: PropTypes.object,
        fill: PropTypes.string.isRequired,
        stroke: PropTypes.string.isRequired,
        strokeWidth: PropTypes.number.isRequired,
        selectable: PropTypes.bool.isRequired,
        evented: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        idx: PropTypes.string.isRequired,
        bndbox: PropTypes.object.isRequired
    }

    static defaultProps = {
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
        const bndbox = this.props.bndbox;
        const strokeColor = this.getStrokeColorByObjectName(this.props.name);
        const options = {
            top: bndbox.ymax,
            left: bndbox.xmin,
            width: bndbox.xmax - bndbox.xmin,
            height: bndbox.ymax - bndbox.ymin,
            fill: this.props.fill,
            stroke: strokeColor,
            strokeWidth: this.props.strokeWidth,
            hasControls: this.props.hasControls,
            hasBorders: this.props.hasBorders,
            selectable: this.props.selectable,
            evented: this.props.evented,
            idx: this.props.idx,
            name: this.props.name
        }
        const rect = new fabric.Rect(options)
        const innerText = this.props.name + ":" + this.props.idx;
        const text = new fabric.Text(innerText, {
            fontSize: 10,
            top: bndbox.ymax - 12,
            left: bndbox.xmin,
            textBackgroundColor: strokeColor
        })
        const group = new fabric.Group([rect, text], {
            originX:'center',
            originY:'center',
            idx: this.props.idx
        })
        this.props.canvas.add(group)
    }

    render() {
        return null
    }
}
