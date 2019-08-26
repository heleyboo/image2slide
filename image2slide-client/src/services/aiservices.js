import { API_SERVER, LOCAL_STORAGE_ITEMS } from '../constants/index';
import { async } from 'q';

export default class AIService {
    static detectCorners = async(data) => {
        let uploadData = {
            method: 'POST',
            headers: new Headers(),
            body: data
        }

        return await fetch(API_SERVER.UPLOAD_IMAGE, uploadData).then((res) => res.json());
    }

    static detectObjectcs = async(data) => {
        let uploadData = {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify(data)
        }
        return await fetch(API_SERVER.DETECT_OBJECTS, uploadData).then((res) => res.json());
    }

    static getProcessedResult = async(data) => {
        let uploadData = {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify(data)
        }
        return await fetch(API_SERVER.GET_PROCESSED_RESULT, uploadData).then((res) => res.json());
    }

    static storeCornerInformation = (corners) => {
        localStorage.removeItem(LOCAL_STORAGE_ITEMS.CORNERS);
        localStorage.setItem(LOCAL_STORAGE_ITEMS.CORNERS, JSON.stringify(corners));
    }

    static getCornersFromStorage = () => {
        let dataConer = localStorage.getItem(LOCAL_STORAGE_ITEMS.CORNERS);
        return JSON.parse(dataConer);
    }

    static uploadCornerInformation = (cornerID, xValue, yValue) => {
        let dataConer = localStorage.getItem(LOCAL_STORAGE_ITEMS.CORNERS);
        let corner = JSON.parse(dataConer);
        if (corner && corner.corners) {
            corner.corners[cornerID] = { x: xValue, y: yValue };
            localStorage.setItem(LOCAL_STORAGE_ITEMS.CORNERS, JSON.stringify(corner));
        }
    }

    static storeDetectionObjects = (detectObjectcs) => {
        localStorage.removeItem(LOCAL_STORAGE_ITEMS.DETECTION_OBJECTS);
        localStorage.setItem(LOCAL_STORAGE_ITEMS.DETECTION_OBJECTS, JSON.stringify(detectObjectcs));
    }

    static getDetectionObjectsFromStorage = () => {
        let objects = localStorage.getItem(LOCAL_STORAGE_ITEMS.DETECTION_OBJECTS);
        return JSON.parse(objects);
    }
}