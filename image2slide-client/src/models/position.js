export default class Position {
    constructor(xstart, ystart, xend, yend) {
        this._xstart = xstart;
        this._ystart = ystart;
        this._xend = xend;
        this._yend = yend;
    }

    get xstart() {
        return this._xstart;
    }

    get xend() {
        return this._xend;
    }

    get ystart() {
        return this._ystart;
    }

    get yend() {
        return this._yend;
    }

    set xstart(xstart) {
        this._xstart = xstart;
    }

    set xend(xend) {
        this._xend = xend;
    }

    set ystart(ystart) {
        this._ystart = ystart;
    }

    set yend(yend) {
        this._yend = yend;
    }

    toXML() {
        let xmlContent = 
        `
            <position>
                <xstart>${this._xstart}</xstart>
                <ystart>${this._xend}</ystart>
                <xend>${this._ystart}</xend>
                <yend>${this._yend}</yend>
            </position>
        `;
        return xmlContent;
    }
}