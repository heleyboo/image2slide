<?php

namespace App\Models;

class Corners
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
     * Position of top left
     *
     * @var \App\Models\Point
     */
    public $topLeft;

    /**
     * Position of top right
     *
     * @var \App\Models\Point
     */
    public $topRight;

    /**
     * Position of bottom left
     *
     * @var \App\Models\Point
     */
    public $bottomLeft;

    /**
     * Position of bottom right
     *
     * @var \App\Models\Point
     */
    public $bottomRight;

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
     * get Top Left position
     *
     * @return Point
     */
    public function getTopLeft()
    {
        return $this->topLeft;
    }
    /**
     * get Top Right position
     *
     * @return Point
     */
    public function getTopRight()
    {
        return $this->topRight;
    }
    /**
     * get Bottom Left position
     *
     * @return Point
     */
    public function getBottomLeft()
    {
        return $this->bottomLeft;
    }
    /**
     * get Bottom Left position
     *
     * @return Point
     */
    public function getBottomRight()
    {
        return $this->bottomRight;
    }

    /**
     * Set File Name
     *
     * @param string $fn
     * @return Corners
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
     * @return Corners
     */
    public function setSize($size)
    {
        $this->size = $size;
        return $this;
    }

    /**
     * set Top Left
     *
     * @param Point $topLeft
     * @return Corners
     */
    public function setTopLeft($topLeft)
    {
        $this->topLeft = $topLeft;
        return $this;
    }

    /**
     * set Top Right
     *
     * @param Point $topRight
     * @return Corners
     */
    public function setTopRight($topRight)
    {
        $this->topRight = $topRight;
        return $this;
    }
    /**
     * set Bottom Left
     *
     * @param Point $btLeft
     * @return Corners
     */
    public function setBottomLeft($btLeft)
    {
        $this->bottomLeft = $btLeft;
        return $this;
    }

    /**
     * set Bottom Right
     *
     * @param Point $btRight
     * @return Corners
     */
    public function setBottomRight($btRight)
    {
        $this->bottomRight = $btRight;
        return $this;
    }

    /**
     * get Data from XML doc
     *
     * @param SimpleXMLElement $xml
     * @return void
     */
    public function fromXmlDoc($xml) {
        //TODO parse Data from xml doc
    }

    /**
     * Get Xml doc
     *
     * @return SimpleXMLElement
     */
    public function toXmlDoc() {
        return $xmlDoc;
    }
}
