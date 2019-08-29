export const APP_STEP = {
    UPLOAD_IMAGE: 1,
    DETECT_CORNERS: 2,
    DETECT_OBJECTS: 3,
    DOWNLOAD_PPT: 4
};

export const API_SERVER = {
    UPLOAD_IMAGE: 'http://117.0.39.150:8088/corner_detection',
    DETECT_OBJECTS: 'http://117.0.39.150:8088/object_detection',
    GET_PROCESSED_RESULT: 'http://117.0.39.150:8088/get_processed_result'
};

export const OBJECT_NAME = {
    CIRCLE: 'circle',
    RECTANGLE: 'rectangle',
    TRIANGLE: 'triangle',
    LINE: 'line',
};

export const LOCAL_STORAGE_ITEMS = {
    CORNERS: 'corners',
    DETECTION_OBJECTS: 'detection_objects',
    SELECTED_SHAPE: 'selected_shape',
    DRAWING: 'drawing',
    SESSION_ID: 'session_id'
};

export const CORNERS = {
    TOP_LEFT: 'topLeft',
    TOP_RIGHT: 'topRight',
    BOTTOM_LEFT: 'bottomLeft',
    BOTTOM_RIGHT: 'bottomRight',
};

export const CORNER_ID = {
    TOP_LEFT: 1,
    TOP_RIGHT: 2,
    BOTTOM_LEFT: 4,
    BOTTOM_RIGHT: 3,
};

export const CANVAS_BOARD_TYPE = {
    EDITOR: 'editor',
    CORNER: 'corner'
};

export const DRAWING_MODE = {
    ON: 'on',
    OFF: 'off'
}

export const SHAPE_ITEMS = {
    RECTANGLE: {
        id: 1,
        name: 'rectangle',
        displayText: 'Rectangle'
    },
    TRIANGLE: {
        id: 2,
        name: 'triangle',
        displayText: 'Triangle'
    },
    CIRCLE: {
        id: 3,
        name: 'circle',
        displayText: 'Circle'
    },
    SMILE_FACE: {
        id: 4,
        name: 'smileface',
        displayText: 'Smile face'
    },
    CYLINDER: {
        id: 5,
        name: 'cylinder',
        displayText: 'Cylinder'
    },
    ARROW_UP: {
        id: 6,
        name: 'arrow_up',
        displayText: 'Arrow up'
    },
    ARROW_DOWN: {
        id: 7,
        name: 'arrow_down',
        displayText: 'Arrow down'
    },
    ARROW_LEFT: {
        id: 8,
        name: 'arrow_left',
        displayText: 'Arrow left'
    },
    ARROW_RIGHT: {
        id: 9,
        name: 'arrow_right',
        displayText: 'Arrow right'
    },
    STAR: {
        id: 11,
        name: 'star',
        displayText: 'Star'
    },
    LINE_ARROW: {
        id: 12,
        name: 'line_arrow',
        displayText: 'Line arrow'
    },
    CLOUD: {
        id: 13,
        name: 'cloud',
        displayText: 'Cloud'
    },
    HUMAN: {
        id: 14,
        name: 'human',
        displayText: 'Human',
    },
    COMPUTER: {
        id: 15,
        name: 'computer',
        displayText: 'Computer'
    },
    WIFI: {
        id: 16,
        name: 'wifi',
        displayText: 'Wifi'
    },
};

export const LINE_ITEM = {
    id: 17,
    name: 'line',
    displayText: 'Line'
};


export const SHAPE_CATEGORY = {
    AUTO_SHAPE: {
        id: 1,
        name: 'auto_shape',
        displayText: 'Auto shape',
        subItems: [
            {
                id: 1,
                name: 'rectangle',
                displayText: 'Rectangle'
            },
            {
                id: 2,
                name: 'triangle',
                displayText: 'Triangle'
            },
            {
                id: 3,
                name: 'circle',
                displayText: 'Circle'
            },
            {
                id: 4,
                name: 'smileface',
                displayText: 'Smile face'
            },
            {
                id: 5,
                name: 'cylinder',
                displayText: 'Cylinder'
            },
            {
                id: 6,
                name: 'arrow_up',
                displayText: 'Arrow up'
            },
            {
                id: 7,
                name: 'arrow_down',
                displayText: 'Arrow down'
            },
            {
                id: 8,
                name: 'arrow_left',
                displayText: 'Arrow left'
            },
            {
                id: 9,
                name: 'arrow_right',
                displayText: 'Arrow right'
            },
            {
                id: 11,
                name: 'star',
                displayText: 'Star'
            },
            {
                id: 12,
                name: 'line_arrow',
                displayText: 'Line arrow'
            },
            {
                id: 13,
                name: 'cloud',
                displayText: 'Cloud'
            },
        ]
    },
    MARK: {
        id: 2,
        name: 'mark',
        displayText: 'Mark',
        subItems: [
            {
                id: 14,
                name: 'human',
                displayText: 'Human',
            },
            {
                id: 15,
                name: 'computer',
                displayText: 'Computer'
            },
            {
                id: 16,
                name: 'wifi',
                displayText: 'Wifi'
            },
        ]
    },
    LINE: {
        id: 3,
        name: 'line',
        displayText: 'Line',
        subItems: [
            LINE_ITEM
        ]
    }
};



export const FABRIC_OBJECT_TYPE = {
    RECT: 'rect',
    LINE: 'line',
    GROUP: 'group'
}

export const DEFAULT_CANVAS_SIZE = {
    WIDTH: 800,
    HEIGHT: 600,
}

