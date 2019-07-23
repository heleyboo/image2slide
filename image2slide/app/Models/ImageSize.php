<?php

namespace App\Models;

class ImageSize
{
    /**
     * Width of Image
     *
     * @var int
     */
    public $width;

    /**
     * Height of Image
     *
     * @var int
     */
    public $height;

    /**
     * Constructor
     *
     * @param int $w Width
     * @param int $h Height
     * @return ImageSize
     */
    public function __construct($w, $h)
    {
        $this->width = $w;
        $this->height = $h;
    }
}
