import OnboardObject from "./onboardobject";

export default class Line extends OnboardObject {
    constructor(id, name, position) {
        super(id, name);
        this._position = position;
    }

    get position() {
        return this._position;
    }

    set position(position) {
        this._position = position;
    }
}