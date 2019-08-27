export default class BndBox {
    constructor(xmin, ymin, xmax, ymax) {
        this._xmin = xmin;
        this._xmax = xmax;
        this._ymin = ymin;
        this._ymax = ymax;
    }

    get xmin() {
        return this._xmin;
    }

    get xmax() {
        return this._xmax;
    }

    get ymin() {
        return this._ymin;
    }

    get ymax() {
        return this._ymax;
    }

    set xmin(xmin) {
        this._xmin = xmin;
    }

    set xmax(xmax) {
        this._xmax = xmax;
    }

    set ymin(ymin) {
        this._ymin = ymin;
    }

    set ymax(ymax) {
        this._ymax = ymax; 
    }

    toXML() {
        let xmlContent = `
            <bndbox>
                <xmin>${this._xmin}</xmin>
                <ymin>${this._ymin}</ymin>
                <xmax>${this._xmax}</xmax>
                <ymax>${this._ymax}</ymax>
            </bndbox>
        `;
        return xmlContent;
    }
}