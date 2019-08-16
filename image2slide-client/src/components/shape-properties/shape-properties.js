import React from 'react';
import { APP_STEP, SHAPE_CATEGORY } from '../../constants/index';

export default class ShapeProperties extends React.Component {

    state = {
        selectedCatId: 1,
        selectedShapeId: 1
    }

    handleChangeValue = (val) => {

    }

    categoryChanged = (e) => {
        this.setState({selectedCatId: e.target.value});
    }

    shapeChanged = (shapeId) => {
        this.setState({selectedShapeId: shapeId});
    }

    renderShapeType = (catId) => {
        let subItems = [];
        catId = parseInt(catId);
        console.log(catId);

        switch(catId) {
            case SHAPE_CATEGORY.AUTO_SHAPE.id:
                subItems = SHAPE_CATEGORY.AUTO_SHAPE.subItems;
                break;
            case SHAPE_CATEGORY.MARK.id:
                subItems = SHAPE_CATEGORY.MARK.subItems;
                break;
            default:
                break;
        }

        console.log(subItems);

        return subItems.map((item) => (
            <option key={item.id} value={item.id}>{item.displayText}</option>
        ))
    }

    render() {
        if (this.props.step && this.props.step !== APP_STEP.DETECT_OBJECTS) {
            return null
        }
        let object = this.props.targetObject;
        let minX = 0;
        let minY = 0;
        let maxX = 0;
        let maxY = 0;
        if (object) {
            let coords = object.getCoords();
            minX = coords[0].x;
            minY = coords[0].y;
            maxX = coords[2].x;
            maxY = coords[2].y;
        }

        let categories = Object.values(SHAPE_CATEGORY);

        return (
            <div className="well">
                <form>
                    <div className="form-group">
                        <label>Category:</label>
                        <select name="class-type" id="class-type" className="form-control"  onChange={(e) => this.categoryChanged(e)} value={this.state.selectedCatId}>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.displayText}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Shap Type:</label>
                        <select name="shap-type" id="shape-type" className="form-control">
                            {this.renderShapeType(this.state.selectedCatId)}
                        </select>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xs-12">
                                <label>Xmin:</label>
                                <input type="number" className="form-control" id="xmin" value={minX} onChange={(val) => this.handleChangeValue(val)} />
                            </div>
                            <div className="col-md-12 col-lg-12 col-xs-12">
                                <label>Xmax:</label>
                                <input type="number" className="form-control" id="xmax" value={maxX} onChange={(val) => this.handleChangeValue(val)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xs-12">
                                <label>Ymin:</label>
                                <input type="number" className="form-control" id="ymin" value={minY} onChange={(val) => this.handleChangeValue(val)} />
                            </div>
                            <div className="col-md-12 col-lg-12 col-xs-12">
                                <label>Ymax:</label>
                                <input type="number" className="form-control" id="ymax" value={maxY} onChange={(val) => this.handleChangeValue(val)} />
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