import { LOCAL_STORAGE_ITEMS, DRAWING_MODE, LINE_ITEM } from '../constants/index';

export default class DrawService {

    static defaultLineProps = {
        fill: 'orange',
        stroke: 'red',
        strokeWidth: 2,
        selectable: false,
        evented: false,
        strokeDashArray: [0, 0],
        originX: 'center',
        originY: 'center'
    }

    static isInDrawingMode = () => {
        return DRAWING_MODE.ON === localStorage.getItem(LOCAL_STORAGE_ITEMS.DRAWING);
    }

    static setDrawingStatus = (mode) => {
        localStorage.removeItem(LOCAL_STORAGE_ITEMS.DRAWING);
        localStorage.setItem(LOCAL_STORAGE_ITEMS.DRAWING, mode);
    }

    static setSelectItem = (item) => {
        DrawService.setDrawingStatus(DRAWING_MODE.ON);
        localStorage.setItem(LOCAL_STORAGE_ITEMS.SELECTED_SHAPE, JSON.stringify(item));
    }

    static getDrawItem() {
        let selectedItemString = localStorage.getItem(LOCAL_STORAGE_ITEMS.SELECTED_SHAPE);
        return JSON.parse(selectedItemString);
    }
}