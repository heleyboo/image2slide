<?php

namespace App\Models;

use SimpleXMLElement;

class Detections
{
    /**
     *File Name
     *
     * @var string
     */
    public $fileName;

    /**
     * Image size
     *
     * @var \App\Models\ImageSize
     */
    public $size;

    /**
     * List of detection objects
     *
     * @var DetectionObject[]
     */
    public $detectionObjects;



    /**
     * Return File Name
     *
     * @return string
     */
    public function getFileName()
    {
        return $this->fileName;
    }

    /**
     * Return size
     *
     * @return ImageSize
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Get list of detection objects
     *
     * @return DetectionObject[]
     */
    public function getDetectionObjects(){
        return $this->detectionObjects;
    }

     /**
     * Set File Name
     *
     * @param string $fn
     * @return Detections
     */
    public function setFileName($fn)
    {
        $this->fileName = $fn;
        return $this;
    }

    /**
     * set Size of Image
     *
     * @param ImageSize $size
     * @return Detections
     */
    public function setSize(ImageSize $size)
    {
        $this->size = $size;
        return $this;
    }

    /**
     * Set list of detection objects
     *
     * @return Detections
     */
    public function setDetectionObjects($objs){
        $this->detectionObjects = $objs;
        return $this;
    }

    /**
     * get Data from XML doc
     *
     * @param SimpleXMLElement $xml
     * @return void
     */
    public function fromXmlDoc(SimpleXMLElement $xml) {
        //TODO parse Data from xml doc
    }

    /**
     * Get Xml doc
     * @return SimpleXMLElement
     */
    public function toXmlDoc() : SimpleXMLElement{
        $xmlDoc = new SimpleXMLElement('');
        return $xmlDoc;
    }
}
