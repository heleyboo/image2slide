import { LINE_ITEM } from '../constants/index'; 
import Line from './line';
import Position from './position';
import Rect from './rect';
import BndBox from './bndbox';
import OnboardObject from './onboardobject';
import { DEFAULT_CANVAS_SIZE } from '../constants/index';
import { type } from 'os';

export default class Detection {
    constructor(annotation) {
        this._scale = annotation.size && annotation.size.width ? DEFAULT_CANVAS_SIZE.WIDTH / parseFloat(annotation.size.width) : 1;
        this._width = parseFloat(annotation.size.width) * this._scale;
        this._height = parseFloat(annotation.size.height) * this._scale;
        this._depth = parseInt(annotation.size.depth);
        this._filename = annotation.filename;
        this._onBoardObjects = this.parseObjects(annotation);
    }

    parseObjects(annotation) {
        let objects = [];
        if (!annotation.object) {
            return objects;
        }
        if (Array.isArray(annotation.object)) {
            return annotation.object.map((object) => {
                return this.parseOnboardObject(object);
            });
        } else {
            objects.push(this.parseOnboardObject(annotation.object));
            return objects;
        }
        
    }

    parseOnboardObject(object) {
        if (object.name === LINE_ITEM.name) {
            let xstart = parseFloat(object.position.xstart) * this._scale;
            let xend = parseFloat(object.position.xend) * this._scale;
            let ystart = parseFloat(object.position.ystart) * this._scale;
            let yend = parseFloat(object.position.yend) * this._scale;
            return new Line(object['@idx'], object.name, new Position(xstart, ystart, xend, yend));
        } else  {
            let xmin = parseFloat(object.bndbox.xmin) * this._scale;
            let xmax = parseFloat(object.bndbox.xmax) * this._scale;
            let ymin = parseFloat(object.bndbox.ymin) * this._scale;
            let ymax = parseFloat(object.bndbox.ymax) * this._scale;
            return new Rect(object['@idx'], object.name, new BndBox(xmin, ymin, xmax, ymax));
        }
    }

    getNewObjectId() {
        let maxId = 0;
        for (let index = 0; index < this.onBoardObjects.length; index++) {
            const element = this.onBoardObjects[index];
            if (element.id && parseInt(element.id) > maxId) {
                maxId = parseInt(element.id);
            }
        }
        return maxId + 1;
    }

    objects2XML() {
        let xml = '';
        for (let index = 0; index < this.onBoardObjects.length; index++) {
            const element = this.onBoardObjects[index];
            xml += element.toXML();
        }
        return xml;
    }

    get onBoardObjects() {
        return this._onBoardObjects;
    }

    get scale() {
        return this._scale;
    }

    set onBoardObjects(objects) {
        this._onBoardObjects = objects;
    }

    addOject(object) {
        if (object instanceof OnboardObject) {
            this._onBoardObjects.push(object);
        }
    }

    removeObject(objectId) {
        const tmpArr = this._onBoardObjects.filter(function(ele){
            if (ele instanceof OnboardObject) {
                return ele.id != objectId;
            }
        });

        this._onBoardObjects = tmpArr;
    }

    updateObjectProperties(objectId, newName, xmin, ymin, xmax, ymax) {
        const selectedObject = this.getObjectById(objectId);

        if (!selectedObject) {
            return;
        }

        let newObj;

        if (newName === LINE_ITEM.name) {
            newObj = new Line(objectId, newName, new Position(xmin, ymin, xmax, ymax));
        } else {
            newObj = new Rect(objectId, newName, new BndBox(xmin, ymin, xmax, ymax));
        }

        this.removeObject(objectId);

        this._onBoardObjects.push(newObj);
    }

    getObjectById(objectId) {
        let object = null;
        for (let index = 0; index < this._onBoardObjects.length; index++) {
            const element = this._onBoardObjects[index];
            if (element instanceof OnboardObject && element.id == objectId) {
                return element;
            }
        }
        return object;
    }

    toXML() {
        
        let xmlContent = `
                <annotation>
                <filename>${this._filename}</filename>
                <size>
                    <width>${this._width}</width>
                    <height>${this._height}</height>
                    <depth>${this._depth}</depth>
                </size>
                <object idx="1">
                    <name>circle</name>
                    <bndbox>
                        <xmin>308</xmin>
                        <ymin>209</ymin>
                        <xmax>467</xmax>
                        <ymax>352</ymax>
                    </bndbox>
                </object>
                <object idx="2">
                    <name>rectangle</name>
                    <bndbox>
                        <xmin>118</xmin>
                        <ymin>104</ymin>
                        <xmax>165</xmax>
                        <ymax>149</ymax>
                    </bndbox>
                </object>
                <object idx="3">
                    <name>rectangle</name>
                    <bndbox>
                        <xmin>127</xmin>
                        <ymin>190</ymin>
                        <xmax>173</xmax>
                        <ymax>240</ymax>
                    </bndbox>
                </object>
                <object idx="4">
                    <name>rectangle</name>
                    <bndbox>
                        <xmin>131</xmin>
                        <ymin>285</ymin>
                        <xmax>178</xmax>
                        <ymax>334</ymax>
                    </bndbox>
                </object>
                <object idx="5">
                    <name>rectangle</name>
                    <bndbox>
                        <xmin>137</xmin>
                        <ymin>386</ymin>
                        <xmax>187</xmax>
                        <ymax>435</ymax>
                    </bndbox>
                </object>
                <object idx="6">
                    <name>rectangle</name>
                    <bndbox>
                        <xmin>562</xmin>
                        <ymin>108</ymin>
                        <xmax>619</xmax>
                        <ymax>173</ymax>
                    </bndbox>
                </object>
                <object idx="7">
                    <name>rectangle</name>
                    <bndbox>
                        <xmin>569</xmin>
                        <ymin>232</ymin>
                        <xmax>619</xmax>
                        <ymax>293</ymax>
                    </bndbox>
                </object>
                <object idx="8">
                    <name>rectangle</name>
                    <bndbox>
                        <xmin>570</xmin>
                        <ymin>347</ymin>
                        <xmax>623</xmax>
                        <ymax>411</ymax>
                    </bndbox>
                </object>
                <object idx="9">
                    <name>triangle</name>
                    <bndbox>
                        <xmin>124</xmin>
                        <ymin>143</ymin>
                        <xmax>168</xmax>
                        <ymax>172</ymax>
                    </bndbox>
                </object>
                <object idx="10">
                    <name>triangle</name>
                    <bndbox>
                        <xmin>132</xmin>
                        <ymin>235</ymin>
                        <xmax>175</xmax>
                        <ymax>268</ymax>
                    </bndbox>
                </object>
                <object idx="11">
                    <name>triangle</name>
                    <bndbox>
                        <xmin>136</xmin>
                        <ymin>329</ymin>
                        <xmax>181</xmax>
                        <ymax>364</ymax>
                    </bndbox>
                </object>
                <object idx="12">
                    <name>triangle</name>
                    <bndbox>
                        <xmin>144</xmin>
                        <ymin>430</ymin>
                        <xmax>180</xmax>
                        <ymax>467</ymax>
                    </bndbox>
                </object>
                <object idx="13">
                    <name>triangle</name>
                    <bndbox>
                        <xmin>567</xmin>
                        <ymin>167</ymin>
                        <xmax>615</xmax>
                        <ymax>202</ymax>
                    </bndbox>
                </object>
                <object idx="14">
                    <name>triangle</name>
                    <bndbox>
                        <xmin>575</xmin>
                        <ymin>290</ymin>
                        <xmax>619</xmax>
                        <ymax>331</ymax>
                    </bndbox>
                </object>
                <object idx="15">
                    <name>triangle</name>
                    <bndbox>
                        <xmin>569</xmin>
                        <ymin>407</ymin>
                        <xmax>627</xmax>
                        <ymax>446</ymax>
                    </bndbox>
                </object>
                <object idx="16">
                    <name>line</name>
                    <position>
                        <xstart>217</xstart>
                        <ystart>142</ystart>
                        <xend>297</xend>
                        <yend>208</yend>
                    </position>
                </object>
                <object idx="17">
                    <name>line</name>
                    <position>
                        <xstart>206</xstart>
                        <ystart>234</ystart>
                        <xend>290</xend>
                        <yend>256</yend>
                    </position>
                </object>
                <object idx="18">
                    <name>line</name>
                    <position>
                        <xstart>211</xstart>
                        <ystart>352</ystart>
                        <xend>279</xend>
                        <yend>299</yend>
                    </position>
                </object>
                <object idx="19">
                    <name>line</name>
                    <position>
                        <xstart>222</xstart>
                        <ystart>441</ystart>
                        <xend>297</xend>
                        <yend>352</yend>
                    </position>
                </object>
                <object idx="20">
                    <name>line</name>
                    <position>
                        <xstart>486</xstart>
                        <ystart>228</ystart>
                        <xend>545</xend>
                        <yend>160</yend>
                    </position>
                </object>
                <object idx="21">
                    <name>line</name>
                    <position>
                        <xstart>499</xstart>
                        <ystart>270</ystart>
                        <xend>550</xend>
                        <yend>266</yend>
                    </position>
                </object>
                <object idx="22">
                    <name>line</name>
                    <position>
                        <xstart>488</xstart>
                        <ystart>309</ystart>
                        <xend>549</xend>
                        <yend>363</yend>
                    </position>
                </object>
            </annotation>`;
        return xmlContent;
    }
}