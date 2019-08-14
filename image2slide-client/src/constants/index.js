export const APP_STEP = {
    UPLOAD_IMAGE: 1,
    DETECT_CORNERS: 2,
    DETECT_OBJECTS: 3,
    DOWNLOAD_PPT: 4
};

export const API_SERVER = {
    UPLOAD_IMAGE: 'http://localhost:8000/upload',
    DETECT_OBJECTS: 'http://localhost:8000/detect-objects',
    GET_PPTX: 'http://localhost:8000/get-pptx'
};

export const OBJECT_NAME = {
    CIRCLE: 'circle',
    RECTANGLE: 'rectangle',
    TRIANGLE: 'triangle',
    LINE: 'line',
};

