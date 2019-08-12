import React, { Component } from 'react';

import DesignCanvas from '../canvas/DesignCanvas'
import Line from '../canvas/Line';
import Circle from '../canvas/Circle';

export default class CornerBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            line11: [0, 0],
            line12: [100, 100],
            line21: [0, 0],
            line22: [100, 100],
            line31: [0, 0],
            line32: [100, 100],
            line41: [0, 0],
            line42: [100, 100],
        }
    }
    onMoving = (objId, top, left) => {
        switch(objId) {
            case 1: 
                this.setState({line11: [left, top]});
                this.setState({line42: [left, top]});
            break;
            case 2: 
                this.setState({line12: [left, top]});
                this.setState({line21: [left, top]});
            break;
            case 3: 
                this.setState({line22: [left, top]});
                this.setState({line31: [left, top]});
            break;
            case 4: 
                this.setState({line32: [left, top]});
                this.setState({line41: [left, top]});
            break;
        }
    }
    render() {
        return (
            <DesignCanvas imageSource={this.props.imageSource}>
                {/* <Circle id={1} onMoving={ (objId, top, left) => this.onMoving(objId, top, left) } />
                <Circle id={2} onMoving={ (objId, top, left) => this.onMoving(objId, top, left) } />
                <Circle id={3} onMoving={ (objId, top, left) => this.onMoving(objId, top, left) } />
                <Circle id={4} onMoving={ (objId, top, left) => this.onMoving(objId, top, left) } />
                <Line startPoint={this.state.line11} endPoint={this.state.line12} />
                <Line startPoint={this.state.line21} endPoint={this.state.line22} />
                <Line startPoint={this.state.line31} endPoint={this.state.line32} />
                <Line startPoint={this.state.line41} endPoint={this.state.line42} /> */}
            </DesignCanvas>
        )
    }
}
