import React from 'react'
import PropTypes from 'prop-types'

const fabric = window.fabric

export default class Image extends React.Component {
    static propTypes = {
        canvas: PropTypes.object,
        url: PropTypes.string.isRequired,
        top: PropTypes.number.isRequired,
        hasControls: PropTypes.bool.isRequired,
        lockMovementX: PropTypes.bool.isRequired,
        lockMovementY: PropTypes.bool.isRequired,

    }

    static defaultProps = {
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
    }

    componentDidMount() {
        const options = this.props;
        fabric.Image.fromURL(this.props.url, img => {
            this.props.canvas.add(img)
        }, options)
    }

    render() {
        return null
    }
}

