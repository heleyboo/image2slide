import React from 'react';
import { APP_STEP, SHAPE_ITEMS, LINE_ITEM } from '../../constants/index';
import DrawService from '../../services/drawservice';
export default class Toolbox extends React.Component {

    selectedShape = (item) => {
        DrawService.setSelectItem(item);
    }

    render() {
        if (this.props.step && this.props.step !== APP_STEP.DETECT_OBJECTS) {
            return null
        }
        let items = Object.values(SHAPE_ITEMS);
        return (
            <div className="well">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle btn-block" type="button" data-toggle="dropdown">Add auto shap
                                        <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        {items.map((item) => (
                            <li key={item.id}><a href='javascript:void(0)' onClick={() => this.selectedShape(item)}>{item.displayText}</a></li>
                        ))}
                    </ul>
                </div>
                <br />
                <button onClick={() => this.selectedShape(LINE_ITEM)} className="btn btn-primary btn-block" type="button">Add line</button>
            </div>
        )
    }
}