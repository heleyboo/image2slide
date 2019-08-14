import { API_SERVER, APP_STEP } from '../constants/index';
import { async } from 'q';

export default class AIService {
    static detectCorners = async(data) => {
        let uploadData = {
            method: 'POST',
            headers: new Headers()
        }
        return await fetch(API_SERVER.UPLOAD_IMAGE, uploadData).then((res) => res.json());
    }

    static detectObjectcs = async(data) => {
        let uploadData = {
            method: 'POST',
            headers: new Headers()
        }
        return await fetch(API_SERVER.DETECT_OBJECTS, uploadData).then((res) => res.json());
    }

    static getPPTX = async(data) => {
        let uploadData = {
            method: 'POST',
            headers: new Headers()
        }
        return await fetch(API_SERVER.GET_PPTX, uploadData).then((res) => res.json());
    }
}