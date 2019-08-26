import { SHAPE_ITEMS, SHAPE_CATEGORY, LINE_ITEM } from '../constants/index';
export default class OnboardObject {
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._categoryName = this.setCategoryName(name);
    }

    setCategoryName = (name) => {
        switch(name) {
            case SHAPE_ITEMS.COMPUTER.name:
            case SHAPE_ITEMS.HUMAN.name:
            case SHAPE_ITEMS.WIFI.name:
                return SHAPE_CATEGORY.MARK.name;
                break;
            case LINE_ITEM.name:
                return SHAPE_CATEGORY.LINE.name;
                break;
            default:
                return SHAPE_CATEGORY.AUTO_SHAPE.name;
                break;
        }
    }

    get categoryName() {
        return this._categoryName;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }
    
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }
}