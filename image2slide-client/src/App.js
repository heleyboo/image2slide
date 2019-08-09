import React, { Component } from 'react';

import './App.css';

import Navbar from './components/navbar/navbar';
import StepNav from './components/step-nav/step-nav';
import Toolbox from './components/draw-tools/toolbox';
import ShapeProperties from './components/shape-properties/shape-properties';
import DrawPanel from './components/draw-area/draw-panel';
import Footer from './components/footer/footer';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        }
    }

    updateStep = (step) => {
        this.setState({
            step: step
        });
    }

    render() {
        return (
          <div className="container-full">
              <Navbar/>
              <div className="container-fluid">
                  <StepNav step={this.state.step} />
                  <div className="col-md-12 col-lg-12 col-xs-12">
                      <div className="panel panel-default">
                          <div className="panel-body">
                              <div className="col-md-2 col-xs-12">
                                  <Toolbox/>
                              </div>
                              <div className="col-md-8 col-xs-12">
                                  <DrawPanel updateStep={(step) => this.updateStep(step)}/>
                              </div>
                              <div className="col-md-2 col-xs-12">
                                  <ShapeProperties/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <Footer/>
          </div>
        );
    }
}
