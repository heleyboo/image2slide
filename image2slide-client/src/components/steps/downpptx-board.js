import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class DownpptxBoard extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        link: PropTypes.string.isRequired
    }
    
    render() {
        return (
            <div id="download-board">
                <a href={this.props.link} className="btn btn-danger">Click to download file PPTX</a>
            </div>
        )
    }
}
