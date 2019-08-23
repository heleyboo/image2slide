import React, { Component } from 'react';


export default class StepController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processingUpload: false
        }
    }
    render() {
        if (this.props.loading) {
            return (
                <div className="row" id="btn-steps">
                    <div className="col-md-12 col-xs-12">
                        <div className="btn-group pull-right">
                            <button className="btn btn-warning pull-left" disabled>Processing</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row" id="btn-steps">
                    <div className="col-md-12 col-xs-12">
                        <button className="btn btn-default pull-left" onClick={this.props.onPrevious}>Back step</button>
                        <button className="btn btn-success pull-right" onClick={this.props.onNext}>Next step</button>
                    </div>
                </div>
            )
        }
    }
}
