import React, { Component } from 'react';
import { MESSAGES } from '../message';

export default class MModal extends Component {
    render() {

        const classN = this.props.show ? "show" : "fade";
        const message = this.props.message;
        const title = message && message.title ? message.title : MESSAGES.UNKNOW_ERROR.title;
        const content = message && message.content ? message.content : MESSAGES.UNKNOW_ERROR.content;

        return (
            <div className={`modal ${ classN }`} id="myModal" role="dialog">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" onClick={() => this.props.onModalClose()}>&times;</button>
                    <h4 className="modal-title">{ title }</h4>
                    </div>
                    <div className="modal-body">
                    <p>{ content }</p>
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
