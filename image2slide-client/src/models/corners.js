import { DEFAULT_CANVAS_SIZE } from '../constants/index';
export default class Corners {
    constructor(annotation) {
        this._filename = annotation.filename;
        this._scale = annotation.size && annotation.size.width ? DEFAULT_CANVAS_SIZE.WIDTH / parseInt(annotation.size.width) : 1;
        this._topLeft = this.parseCorners(annotation, 'top_left');
        this._topRight = this.parseCorners(annotation, 'top_right');
        this._bottomLeft = this.parseCorners(annotation, 'bottom_left');
        this._bottomRight = this.parseCorners(annotation, 'bottom_right');
        this._scaledTopLeft = this.calculateScaled(this._topLeft);
        this._scaledTopRight = this.calculateScaled(this._topRight);
        this._scaledBottomLeft = this.calculateScaled(this._bottomLeft);
        this._scaledBottomRight = this.calculateScaled(this._bottomRight);
        this._width = annotation.size && annotation.size.width ? parseInt(annotation.size.width) : 0;
        this._height = annotation.size && annotation.size.height ? parseInt(annotation.size.height) : 0;
        this._depth = annotation.size && annotation.size.depth ? parseInt(annotation.size.depth) : 0;
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
                        x: parseInt(element.position.x),
                        y: parseInt(element.position.y)
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

    toXML() {
        let xmlContent = 
            `<annotation>
                <filename>${this._filename}</filename>
                <size>
                    <width>${this._width}</width>
                    <height>${this._height}</height>
                    <depth>${this._depth}</depth>
                </size>
                <object>
                    <name>top_left</name>
                    <position>
                        <x>${this._topLeft.x}</x>
                        <y>${this._topLeft.y}</y>
                    </position>
                </object>
                <object>
                    <name>top_right</name>
                    <position>
                        <x>${this._topRight.x}</x>
                        <y>${this._topRight.y}</y>
                    </position>
                </object>
                <object>
                    <name>bottom_right</name>
                    <position>
                        <x>${this._bottomRight.x}</x>
                        <y>${this._bottomRight.y}</y>
                    </position>
                </object>
                <object>
                    <name>bottom_left</name>
                    <position>
                        <x>${this._bottomLeft.x}</x>
                        <y>${this._bottomLeft.y}</y>
                    </position>
                </object>
            </annotation>
            `
        return xmlContent;
    }

}