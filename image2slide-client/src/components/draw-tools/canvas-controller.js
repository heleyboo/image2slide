import React from 'react';

export default class CanvasController extends React.Component {
    render() {
        if (this.props.step && this.props.step !== 3) {
            return null
        }
        return (
            <div className="well">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle btn-block" type="button" data-toggle="dropdown">Add auto shap
                                        <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        <li><a href="#">Rectangle</a></li>
                        <li><a href="#">Triangle</a></li>
                        <li><a href="#">Circle</a></li>
                        <li><a href="#">Smiley Face</a></li>
                        <li><a href="#">Cylinder</a></li>
                        <li><a href="#">Block Arrow</a></li>
                        <li><a href="#">Star</a></li>
                        <li><a href="#">Line Arrow</a></li>
                        <li><a href="#">Cloud</a></li>
                        <li><a href="#">Computer</a></li>
                        <li><a href="#">Human</a></li>
                        <li><a href="#">Wifi</a></li>
                    </ul>
                </div>
                <br />
                <button className="btn btn-primary btn-block" type="button">Add line</button>
            </div>
        )
    }
}