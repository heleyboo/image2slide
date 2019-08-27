import OnboardObject from "./onboardobject";
const fabric = window.fabric;
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

    getFabricObject() {
        const options = {
            top: this._bndbox.ymax,
            left: this._bndbox.xmin,
            width: this._bndbox.xmax - this._bndbox.xmin,
            height: this._bndbox.ymax - this._bndbox.ymin,
            fill: '',
            stroke: 'red',
            strokeWidth: 1,
            hasControls: true,
            hasBorders: true,
            selectable: true,
            evented: true,
            idx: this._id,
            name: this._name
        }
        const rect = new fabric.Rect(options);
        const innerText = this._name + ":" + this._id;
        const text = new fabric.Text(innerText, {
            fontSize: 10,
            top: this._bndbox.ymax - 12,
            left: this._bndbox.xmin,
            textBackgroundColor: 'red'
        });
        return new fabric.Group([rect, text], {
            originX:'left',
            originY:'top',
            idx: this._id
        });
    }

    toXML() {
        let xmlContent = `
            <object idx="${this._id}">
                <name>${this._name}</name>
                ${this._bndbox.toXML()}
            </object>
        `;
        return xmlContent;
    }
}