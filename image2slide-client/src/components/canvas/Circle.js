import React, { Component } from 'react'
import PropTypes from 'prop-types'

const fabric = window.fabric

export default class Circle extends Component {
    static propTypes = {
        canvas: PropTypes.object,
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
        fill: PropTypes.string.isRequired,
    }

    static defaultProps = {
        left: 100,
        top: 100,
        strokeWidth: 5,
        radius: 12,
        fill: 'orange',
        stroke: '#666',
        originX: 'center',
        originY: 'center'
    }

    componentDidMount() {
        const circle = new fabric.Circle(this.props)
        this.props.canvas.add(circle)
        this.props.canvas.on('object:moving', (e) => {
            let p = e.target
            this.props.onMoving(p.id, p.top, p.left);
            this.props.canvas.renderAll()
        })
    }

    render() {
        return null
    }
}