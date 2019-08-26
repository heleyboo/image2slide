import { LINE_ITEM } from '../constants/index'; 
import Line from './line';
import Position from './position';
import Rect from './rect';
import BndBox from './bndbox';
import OnboardObject from './onboardobject';

export default class Detection {
    constructor(canvasWidth, annotation) {
        this._scale = annotation.size && annotation.size.width ? canvasWidth / parseFloat(annotation.size.width) : 1;
        this._width = parseFloat(annotation.size.width) * this._scale;
        this._height = parseFloat(annotation.size.height) * this._scale;
        this._onBoardObjects = this.parseObjects(annotation);
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

    getNewObjectId() {
        let maxId = 0;
        for (let index = 0; index < this.onBoardObjects.length; index++) {
            const element = this.onBoardObjects[index];
            if (element.id && parseInt(element.id) > maxId) {
                maxId = parseInt(element.id);
            }
        }
        return maxId + 1;
    }

    get onBoardObjects() {
        return this._onBoardObjects;
    }

    set onBoardObjects(objects) {
        this._onBoardObjects = objects;
    }

    addOject(object) {
        if (object instanceof OnboardObject) {
            this._onBoardObjects.push(object);
        }
    }

    removeObject(objectId) {
        const tmpArr = this._onBoardObjects.filter(function(ele){
            if (ele instanceof OnboardObject) {
                return ele.id != objectId;
            }
        });

        this._onBoardObjects = tmpArr;
        console.log(tmpArr);
    }

    updateObjectProperties(objectId, newName, xmin, ymin, xmax, ymax) {
        const selectedObject = this.getObjectById(objectId);

        if (!selectedObject) {
            return;
        }

        let newObj;

        if (newName === LINE_ITEM.name) {
            newObj = new Line(objectId, newName, new Position(xmin, ymin, xmax, ymax));
        } else {
            newObj = new Rect(objectId, newName, new BndBox(xmin, ymin, xmax, ymax));
        }

        this.removeObject(objectId);

        this._onBoardObjects.push(newObj);
    }

    getObjectById(objectId) {
        let object = null;
        for (let index = 0; index < this._onBoardObjects.length; index++) {
            const element = this._onBoardObjects[index];
            if (element instanceof OnboardObject && element.id == objectId) {
                return element;
            }
        }
        return object;
    }
}