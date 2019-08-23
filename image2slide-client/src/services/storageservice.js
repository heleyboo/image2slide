export default class StorageService {
    static KEY = {
        CORNERS: 'corners',
        DETECTION_OBJECTS: 'detection_objects',
        SELECTED_SHAPE: 'selected_shape',
        DRAWING: 'drawing',
        SESSION_ID: 'session_id'
    }
    static setItem = (key, value) => {
        localStorage.removeItem(key);
        let data = value instanceof Object ? JSON.stringify(value) : value;
        localStorage.setItem(key, data);
    }

    static getItem = (key) => {
        let object = localStorage.getItem(key);
        try {
            return JSON.parse(object);
        } catch (error) {
            return object;
        }
    }
}