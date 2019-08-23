import { LINE_ITEM } from '../constants/index'; 
import Line from './line';
import Position from './position';
import Rect from './rect';
import BndBox from './bndbox';

export default class Detection {
    constructor(canvasWidth, annotation) {
        this._scale = annotation.size && annotation.size.width ? canvasWidth / parseFloat(annotation.size.width) : 1;
        this._width = parseFloat(annotation.size.width) * this._scale;
        this._height = parseFloat(annotation.size.height) * this._scale;
        this._objects = this.parseObjects(annotation);
    }

    parseObjects(annotation) {
        return annotation.object.map((object) => {
            return this.parseOnboardObject(object);
        });
    }

    parseOnboardObject(object) {
        if (object.name === LINE_ITEM.name) {
            let xstart = parseFloat(object.position.xstart) * this._scale;
            let xend = parseFloat(object.position.xend) * this._scale;
            let ystart = parseFloat(object.position.ystart) * this._scale;
            let yend = parseFloat(object.position.yend) * this._scale;
            return new Line(object['@idx'], object.name, new Position(xstart, ystart, xend, yend));
        } else  {
            let xmin = parseFloat(object.bndbox.xmin) * this._scale;
            let xmax = parseFloat(object.bndbox.xmax) * this._scale;
            let ymin = parseFloat(object.bndbox.ymin) * this._scale;
            let ymax = parseFloat(object.bndbox.ymax) * this._scale;
            return new Rect(object['@idx'], object.name, new BndBox(xmin, ymin, xmax, ymax));
        }
    }

    addOject(object) {
        this._objects.push(object);
    }

    removeObject(objectId) {
        
    }

    updateObject(objectId) {

    }
}