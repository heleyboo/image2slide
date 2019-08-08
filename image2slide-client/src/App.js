import React from 'react';

import './App.css';

import Navbar from './components/navbar/navbar';
import StepNav from './components/step-nav/step-nav';
import Toolbox from './components/draw-tools/toolbox';
import ShapeProperties from './components/shape-properties/shape-properties';
import DrawPanel from './components/draw-area/draw-panel';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="container-full">
        <Navbar/>
        <div className="container-fluid">
            <StepNav/>
            <div className="col-md-12 col-lg-12 col-xs-12">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-2 col-xs-12">
                            <Toolbox/>
                        </div>
                        <div className="col-md-8 col-xs-12">
                            <DrawPanel/>
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

export default App;
