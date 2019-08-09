import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const fabric = window.fabric

export default class DesignCanvas extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }

    static defaultProps = {
        width: 944,
        height: 600,
    }

    state = {
        canvas: null,
    }

    componentDidMount() {
        const canvas = new fabric.Canvas(this.c)
        canvas.setBackgroundImage(this.props.imageSource, canvas.renderAll.bind(canvas), {
            backgroundImageOpacity: 0.5,
            backgroundImageStretch: false,
            left: 80
        });
        this.setState({ canvas })
    }

    render() {
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                canvas: this.state.canvas,
            })
        })
        const { width, height } = this.props
        return (
            <Fragment>
                <canvas ref={c => (this.c = c)} width={width} height={height} />
                {this.state.canvas && children}
            </Fragment>
        )
    }
}