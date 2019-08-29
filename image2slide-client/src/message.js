export const MESSAGES = {
    UNKNOW_ERROR: {
        code: 5000,
        title: 'Unknow error',
        content: 'An unknown error has been occured',
    },
    API_SERVER_ERROR: {
        code: 5001,
        title: 'API Server error',
        content: 'API server error, please contact administrators',
    },
    AI_CONN_ERROR: {
        code: 5002,
        title: 'API Server error',
        content: '[5002] Could not connect to AI module, please contact administrators',
    },

    NO_DETECTED_OBJECTS: {
        code: 5001,
        title: 'API Server error',
        content: 'Sever do not response any detected objects'
    },
    WRONG_IMAGE_TYPE: {
        code: 4000,
        title: 'Client error',
        content: 'Please select an image, accepted image types ["image/gif", "image/jpeg", "image/png"]',
    },
    NO_INPUT_IMAGE: {
        code: 4001,
        title: 'Client error',
        content: 'Please select an image',
    }
}

export default class Message {
    static getMessageByCode(code) {
        console.log(code);
        if (MESSAGES[code]) {
            return MESSAGES[code];
        } else {
            return MESSAGES.UNKNOW_ERROR;
        }
    }
}

