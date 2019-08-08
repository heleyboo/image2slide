import React from 'react';

export default class StepNav extends React.Component {
    render() {
        return (
            <div className="form-group">
                <div className="col-xs-12">
                    <ul className="nav nav-pills nav-justified thumbnail setup-panel">
                        <li className="active">
                            <a href="#step-1">
                                <h4 className="list-group-item-heading">Step 1</h4>
                                <p className="list-group-item-text">Upload image</p>
                            </a>
                        </li>
                        <li className="disabled">
                            <a href="#step-2">
                                <h4 className="list-group-item-heading">Step 2</h4>
                                <p className="list-group-item-text">Show and adjust board corners</p>
                            </a>
                        </li>
                        <li className="disabled">
                            <a href="#step-3">
                                <h4 className="list-group-item-heading">Step 3</h4>
                                <p className="list-group-item-text">Show and adjust detection result</p>
                            </a>
                        </li>
                        <li className="disabled">
                            <a href="#step-4">
                                <h4 className="list-group-item-heading">Step 4</h4>
                                <p className="list-group-item-text">Generate and download PPTX file</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}