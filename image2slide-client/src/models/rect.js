import OnboardObject from "./onboardobject";

export default class Rect extends OnboardObject {
    constructor(id, name, bndbox) {
        super(id, name);
        this._bndbox = bndbox;
    }

    get bndbox() {
        return this._bndbox;
    }

    set bndbox(bndbox) {
        this._bndbox = bndbox;
    }
}