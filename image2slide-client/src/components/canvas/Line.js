import React, { Component } from 'react'
import PropTypes from 'prop-types'

const fabric = window.fabric

export default class Line extends Component {

    constructor(props) {
        super(props)
        this.state = { line: null }
    }

    static propTypes = {
        canvas: PropTypes.object,
        fill: PropTypes.string.isRequired,
        stroke: PropTypes.string.isRequired,
        strokeWidth: PropTypes.number.isRequired,
        selectable: PropTypes.bool.isRequired,
        evented: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        fill: 'orange',
        stroke: 'red',
        strokeWidth: 2,
        selectable: true,
        evented: true,
        strokeDashArray: [0, 0],
        originX: 'center',
        originY: 'center'
    }

    componentDidMount() {
        let x1 = this.props.startPoint.x
        let y1 = this.props.startPoint.y
        let x2 = this.props.endPoint.x
        let y2 = this.props.endPoint.y
        const coords = [x1, y1, x2, y2]
        this.state.line = new fabric.Line(coords, Line.defaultProps)
        this.props.canvas.add(this.state.line)
    }

    render() {
        let x1 = this.props.startPoint.x
        let y1 = this.props.startPoint.y
        let x2 = this.props.endPoint.x
        let y2 = this.props.endPoint.y

        if (this.state.line) {
            this.state.line.set({ 'x2': x2, 'y2': y2 })
            this.state.line.set({ 'x1': x1, 'y1': y1 })
        }

        return null
    }
}