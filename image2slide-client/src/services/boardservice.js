export default class BoardService {
    constructor(canvasWidth, annotation) {
        this._scale = annotation.size && annotation.size.width ? canvasWidth / parseFloat(annotation.size.width) : 1;
        this._width = parseFloat(annotation.size.width);
        this._height = parseFloat(annotation.size.height);
        this._objects = this.parseObjects(annotation);
    }

    parseObjects(annotation) {
        annotation.object.map((object) => {
            return this.parseOnboardObject(object);
        });
    }

    parseOnboardObject(object) {

    }
}