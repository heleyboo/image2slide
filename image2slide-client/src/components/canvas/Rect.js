import React from 'react'
import PropTypes from 'prop-types'

const fabric = window.fabric

export default class Rect extends React.Component {
    static propTypes = {
        canvas: PropTypes.object,
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        fill: PropTypes.string.isRequired,
        stroke: PropTypes.string.isRequired,
        strokeWidth: PropTypes.number.isRequired
    }

    static defaultProps = {
        top: 0,
        left: 0,
        width: 50,
        height: 50,
        fill: '',
        stroke: 'white',
        strokeWidth: 1
    }

    componentDidMount() {
        const rect = new fabric.Rect(this.props)
        this.props.canvas.add(rect)
    }

    render() {
        return null
    }
}
