import React from 'react';
import { APP_STEP, SHAPE_CATEGORY } from '../../constants/index';
import OnboardObject from '../../models/onboardobject';
import Rect from '../../models/rect';
import Line from '../../models/line';

export default class ShapeProperties extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            selectedCatName: SHAPE_CATEGORY.AUTO_SHAPE.name,
            selectedShapeName: 'rectangle',
            minx: 0,
            maxx: 0,
            miny: 0,
            maxy: 0,
            objectId: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        const object = nextProps.targetObject;
        if (object && object instanceof Rect) {
            const bndbox = object.bndbox;
            this.setState({
                minx: bndbox.xmin,
                maxx: bndbox.xmax,
                miny: bndbox.ymin,
                maxy: bndbox.ymax,
            });
        }

        if (object && object instanceof Line) {
            const pos = object.position;

            this.setState({
                minx: Math.min(pos.xstart, pos.xend),
                maxx: Math.max(pos.xstart, pos.xend),
                miny: Math.min(pos.ystart, pos.yend),
                maxy: Math.max(pos.ystart, pos.yend),
            });
        }
    }

    handleChangeMinxValue = (val) => {
        this.setState({minx: val});
    }
    handleChangeMaxxValue = (val) => {
        this.setState({maxx: val});
    }
    handleChangeMinyValue = (val) => {
        this.setState({miny: val});
    }
    handleChangeMaxyValue = (val) => {
        this.setState({maxy: val});
    }

    categoryChanged = (e) => {
        this.setState({selectedCatName: e.target.value});
    }

    shapeChanged = (e) => {
        this.setState({selectedShapeName: e.target.value});
    }

    renderShapeType = (catName) => {
        let subItems = [];
        switch(catName) {
            case SHAPE_CATEGORY.AUTO_SHAPE.name:
                subItems = SHAPE_CATEGORY.AUTO_SHAPE.subItems;
                break;
            case SHAPE_CATEGORY.MARK.name:
                subItems = SHAPE_CATEGORY.MARK.subItems;
                break;
            case SHAPE_CATEGORY.LINE.name:
                subItems = SHAPE_CATEGORY.LINE.subItems;
                break;
            default:
                break;
        }

        return subItems.map((item) => (
            <option key={item.id} value={item.name}>{item.displayText}</option>
        ))
    }

    handleSaveObject = (objectId, shapeName) => {
        this.props.onSave(objectId, shapeName, this.state.minx, this.state.miny, this.state.maxx, this.state.maxy);
    }

    handleDeleteOject = (objectId) => {
        this.props.onDelete(objectId);
    }

    render() {
        if (this.props.step && this.props.step !== APP_STEP.DETECT_OBJECTS) {
            return null
        }

        let object = this.props.targetObject;
        let objectId = '';
        let shapeName = '';
        let catName = '';
        if (object && object instanceof OnboardObject) {
            objectId = object.id;
            shapeName = object.name;
            catName = object.categoryName;
        }

        let categories = Object.values(SHAPE_CATEGORY);

        return (
            <div className="well">
                    <div className="form-group">
                        <label>Category:</label>
                        <select name="class-type" id="class-type" className="form-control"  onChange={(e) => this.categoryChanged(e)} value={catName}>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>{category.displayText}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Shap Type:</label>
                        <select name="shap-type" id="shape-type" className="form-control" onChange={(e) => this.shapeChanged(e)} value={shapeName}>
                            {this.renderShapeType(catName)}
                        </select>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xs-12">
                                <label>Xmin:</label>
                                <input type="number" className="form-control" id="xmin" value={this.state.minx} onChange={(e) => this.handleChangeMinxValue(e.target.value)} />
                            </div>
                            <div className="col-md-12 col-lg-12 col-xs-12">
                                <label>Xmax:</label>
                                <input type="number" className="form-control" id="xmax" value={this.state.maxx} onChange={(e) => this.handleChangeMaxxValue(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xs-12">
                                <label>Ymin:</label>
                                <input type="number" className="form-control" id="ymin" value={this.state.miny} onChange={(e) => this.handleChangeMinyValue(e.target.value)} />
                            </div>
                            <div className="col-md-12 col-lg-12 col-xs-12">
                                <label>Ymax:</label>
                                <input type="number" className="form-control" id="ymax" value={this.state.maxy} onChange={(e) => this.handleChangeMaxyValue(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <button onClick={(e) => this.handleSaveObject(objectId, shapeName)} className="btn btn-success btn-block">Save</button>
                    <button onClick={(e) => this.handleDeleteOject(objectId)} className="btn btn-warning btn-block">Delete</button>
            </div>
        )
    }
}