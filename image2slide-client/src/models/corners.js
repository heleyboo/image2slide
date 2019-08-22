export default class Corners {
    constructor(canvasWidth, annotation) {
        this._scale = annotation.size && annotation.size.width ? canvasWidth / parseFloat(annotation.size.width) : 1;
        this._topLeft = this.parseCorners(annotation, 'top_left');
        this._topRight = this.parseCorners(annotation, 'top_right');
        this._bottomLeft = this.parseCorners(annotation, 'bottom_left');
        this._bottomRight = this.parseCorners(annotation, 'bottom_right');
        this._scaledTopLeft = this.calculateScaled(this._topLeft);
        this._scaledTopRight = this.calculateScaled(this._topRight);
        this._scaledBottomLeft = this.calculateScaled(this._bottomLeft);
        this._scaledBottomRight = this.calculateScaled(this._bottomRight);
        this._width = annotation.size && annotation.size.width ? parseFloat(annotation.size.width) : 0;
        this._height = annotation.size && annotation.size.height ? parseFloat(annotation.size.height) : 0;
        this._scaledWidth = this._width * this._scale;
        this._scaledHeight = this._height * this._scale;
    }

    parseCorners(annotation, name) {
        let objects = annotation.object;
        if (objects) {
            for (let index = 0; index < objects.length; index++) {
                const element = objects[index];
                if (element && element.name && element.name === name) {
                    let ret = {
                        x: parseFloat(element.position.x),
                        y: parseFloat(element.position.y)
                    }
                    return ret;
                }
            }
        }
    }

    calculateScaled(pos) {
        let ret = {
            x: pos.x * this.scale,
            y: pos.y * this.scale
        }
        return ret;
    }

    get topLeft() {
        return this._topLeft;
    }

    get scaledTopLeft() {
        return this._scaledTopLeft;
    }

    get topRight() {
        return this._topRight;
    }

    get scaledTopRight() {
        return this._scaledTopRight;
    }

    get bottomLeft() {
        return this._bottomLeft;
    }

    get scaledBottomLeft() {
        return this._scaledBottomLeft;
    }

    get bottomRight() {
        return this._bottomRight;
    }

    get scaledBottomRight() {
        return this._scaledBottomRight;
    }

    get scale() {
        return this._scale;
    }

    get width() {
        return this._width;
    }

    get scaledWidth() {
        return this._scaledWidth;
    }

    get height() {
        return this._height;
    }

    get scaledHeight() {
        return this._scaledHeight;
    }

    set topLeft(newTopLeft) {
        this._topLeft.x = newTopLeft.x / this._scale;
        this._topLeft.y = newTopLeft.y / this._scale
    }
    
    set topRight(newtopRight) {
        this._topRight.x = newtopRight.x / this._scale;
        this._topRight.y = newtopRight.y / this._scale
    }

    set bottomLeft(newbottomLeft) {
        this._bottomLeft.x = newbottomLeft.x / this._scale;
        this._bottomLeft.y = newbottomLeft.y / this._scale
    }

    set bottomRight(newbottomRight) {
        this._bottomRight.x = newbottomRight.x / this._scale;
        this._bottomRight.y = newbottomRight.y / this._scale
    }

}