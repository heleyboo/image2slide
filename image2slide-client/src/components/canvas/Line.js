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
        strokeDashArray: PropTypes.array.isRequired,
        idx: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }

    static defaultProps = {
        fill: 'orange',
        stroke: 'red',
        strokeWidth: 2,
        selectable: false,
        evented: false,
        strokeDashArray: [0, 0],
        originX: 'center',
        originY: 'center'
    }

    componentDidMount() {
        let x1 = this.props.position.xstart
        let y1 = this.props.position.ystart
        let x2 = this.props.position.xend
        let y2 = this.props.position.yend
        const coords = [x1, y1, x2, y2]
        this.state.line = new fabric.Line(coords, this.props)
        this.props.canvas.add(this.state.line)
    }

    render() {
        let x1 = this.props.position.xstart
        let y1 = this.props.position.ystart
        let x2 = this.props.position.xend
        let y2 = this.props.position.yend

        if (this.state.line) {
            this.state.line.set({ 'x2': x2, 'y2': y2 })
            this.state.line.set({ 'x1': x1, 'y1': y1 })
        }

        return null
    }
}