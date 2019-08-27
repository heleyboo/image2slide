import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CANVAS_BOARD_TYPE, DRAWING_MODE, LINE_ITEM, FABRIC_OBJECT_TYPE } from '../../constants/index'
import DrawService from '../../services/drawservice';
import Rect from '../../models/rect';

const fabric = window.fabric

export default class DesignCanvas extends Component {
    constructor(props) {
        super(props);
        DrawService.setDrawingStatus(DRAWING_MODE.OFF);
    }
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }

    static defaultProps = {
        width: 800,
        height: 600,
        drawing: false
    }

    state = {
        canvas: null,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        started: false,
    }

    componentDidMount() {
        const canvas = new fabric.Canvas(this.c, {
            originX:'left',
            originY:'bottom'
        })

        canvas.setBackgroundImage(this.props.imageSource, canvas.renderAll.bind(canvas), {
            backgroundImageOpacity: 1,
            backgroundImageStretch: false,
        });

        canvas.selection = false;

        if (this.props.type === CANVAS_BOARD_TYPE.EDITOR) {
            canvas.observe('mouse:down', (e) => {
                this.mousedown(e);
            });
            canvas.observe('mouse:move', (e) => {
                this.mousemove(e);
            });
            canvas.observe('mouse:up', (e) => {
                this.mouseup();
            });

            canvas.on('mouse:over', (e) => {
                if (DrawService.isInDrawingMode()) {
                    canvas.selection = false;
                } else {
                    
                }
            });
        }

        if (this.props.type === CANVAS_BOARD_TYPE.CORNER) {
            canvas.on('object:moving', (e) => {
                let p = e.target
                if (this.props.onMoving) {
                    this.props.onMoving(p.id, p.top, p.left)
                    canvas.renderAll();
                }
            });
        }

        this.setState({ canvas })
    }

    onCanvasMousedown(x1, y1, x2, y2) {
        if (this.props.onCanvasMousedown) {
            this.props.onCanvasMousedown(x1, y1, x2, y2);
        }
    }

    handleSelectObject = (e) => {
        if (e && e.target && this.props.onObjectSelected) {
            this.props.onObjectSelected(e.target.get('idx'));
        }
    }

    removeActiveObject = (objectId) => {
        if (this.state.canvas) {
            let activeObject = this.state.canvas.getActiveObject();
            this.state.canvas.remove(activeObject);
        }
    }

    updateObjectProperties = (objectId, name, xMin, yMin, xMax, yMax) => {
        console.log("Saved");
        if (this.state.canvas) {
            const w = Math.abs(xMax - xMin);
            const h = Math.abs(yMax - yMin);
            let activeObject = this.state.canvas.getActiveObject();
            console.log(activeObject);
            if (activeObject.get('type') === FABRIC_OBJECT_TYPE.GROUP) {
                let rect = activeObject.item(0);
                rect.set('width', w).set('height', h);
            }
            if (activeObject.get('type') === FABRIC_OBJECT_TYPE.LINE) {
                activeObject.set({ 'x1': xMin, 'y1': yMin });
                activeObject.set({ 'x2': xMax, 'y2': yMax });
            }
            this.state.canvas.renderAll();
        }
    }

    mousedown = (e) => {
        if (!DrawService.isInDrawingMode()) {
            return this.handleSelectObject(e);
        }
        let mouse = this.state.canvas.getPointer(e);
        this.setState({
            x1 : mouse.x,
            y1 : mouse.y,
            started: true
        });

        let drawItem = DrawService.getDrawItem();
        let object;

        if (drawItem && drawItem.id === LINE_ITEM.id) {
            let coords = [
                this.state.x1,
                this.state.y1,
                this.state.x2,
                this.state.y2
            ];
            let defaultLineProps = {
                fill: 'orange',
                stroke: 'red',
                strokeWidth: 2,
                selectable: true,
                evented: true,
                strokeDashArray: [0, 0],
                originX: 'center',
                originY: 'center'
            }
            object = new fabric.Line(coords, defaultLineProps);
        } else {
            object = new fabric.Rect({
                width: 0,
                height: 0,
                left: mouse.x,
                top: mouse.y, 
                fill: '',
                stroke: 'red',
                strokeWidth: 2,
            });
        }
        if (object) {
            this.state.canvas.add(object);
            this.state.canvas.setActiveObject(object);
        }
    }

    mousemove = (e) => {
        if (!DrawService.isInDrawingMode()) {
            return this.handleSelectObject(e);
        }
        if(!this.state.started) {
            return false;
        }
    
        let mouse = this.state.canvas.getPointer(e);
    
        let w = Math.abs(mouse.x - this.state.x1);
        let h = Math.abs(mouse.y - this.state.y1);
    
        if (!w || !h) {
            return false;
        }
    
        let activeObject = this.state.canvas.getActiveObject();
        if (activeObject.get('type') === FABRIC_OBJECT_TYPE.RECT) {
            activeObject.set('width', w).set('height', h);
        }
        if (activeObject.get('type') === FABRIC_OBJECT_TYPE.LINE) {
            activeObject.set({ 'x2': mouse.x, 'y2': mouse.y });
        }

        this.state.canvas.renderAll();
    }

    mouseup = (e) => {
        if (!DrawService.isInDrawingMode()) {
            return this.handleSelectObject(e);
        }
        if(this.state.started) {
            this.setState({started: false});
        }
    
        let activeObject = this.state.canvas.getActiveObject();
        this.state.canvas.remove(activeObject);
    
        this.state.canvas.renderAll();
        let mouse = this.state.canvas.getPointer(e);
        this.setState({
            x2 : mouse.x,
            y2 : mouse.y,
        });
        DrawService.setDrawingStatus(DRAWING_MODE.OFF);
        this.onCanvasMousedown(this.state.x1, this.state.y1, this.state.x2, this.state.y2);
    }

    render() {
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                canvas: this.state.canvas,
            })
        })
        const { width, height } = this.props
        return (
            <div>
                <canvas ref={c => (this.c = c)} width={width} height={height} />
                {this.state.canvas && children}
            </div>
        )
    }
}