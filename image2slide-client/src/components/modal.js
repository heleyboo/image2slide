import React, { Component } from 'react';

export default class MModal extends Component {
    render() {

        const classN = this.props.show ? "show" : "fade";

        return (
            <div className={`modal ${ classN }`} id="myModal" role="dialog">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" onClick={() => this.props.onModalClose()}>&times;</button>
                    <h4 className="modal-title">{ this.props.title }</h4>
                    </div>
                    <div className="modal-body">
                    <p>{ this.props.content }</p>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-dismiss="modal" 
                    onClick={() => this.props.onModalClose()}>Close</button>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
