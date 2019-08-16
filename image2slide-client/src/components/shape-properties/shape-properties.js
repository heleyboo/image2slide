import React from 'react';
import { APP_STEP } from '../../constants/index';

export default class ShapeProperties extends React.Component {
    render() {
        if (this.props.step && this.props.step !== APP_STEP.DETECT_OBJECTS) {
            return null
        }
        return (
            <div className="well">
                <form>
                    <div className="form-group">
                        <label>Category:</label>
                        <select name="class-type" id="class-type" className="form-control">
                            <option>Autoshape</option>
                            <option>Mark</option>
                            <option>Line</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Shap Type:</label>
                        <select name="shap-type" id="shape-type" className="form-control">
                            <option>Rectangle</option>
                            <option>Triangle</option>
                            <option>Circle</option>
                            <option>Smiley Face</option>
                            <option>Cylinder</option>
                            <option>Block Arrow</option>
                            <option>Star</option>
                            <option>Line Arrow</option>
                            <option>Cloud</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6 col-lg-6 col-xs-12">
                                <label>Xmin:</label>
                                <input type="number" className="form-control" id="xmin" />
                            </div>
                            <div className="col-md-6 col-lg-6 col-xs-12">
                                <label>Xmax:</label>
                                <input type="number" className="form-control" id="xmax" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6 col-lg-6 col-xs-12">
                                <label>Ymin:</label>
                                <input type="number" className="form-control" id="ymin" />
                            </div>
                            <div className="col-md-6 col-lg-6 col-xs-12">
                                <label>Ymax:</label>
                                <input type="number" className="form-control" id="ymax" />
                            </div>
                        </div>
                    </div>
                    <button onClick={() => this.props.onSave()} className="btn btn-success btn-block">Save</button>
                    <button onClick={() => this.props.onDelete()} className="btn btn-warning btn-block">Delete</button>
                </form>
            </div>
        )
    }
}