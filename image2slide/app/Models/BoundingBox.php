<?php

namespace App\Models;

class BoundingBox
{
    /**
     *Min X position
     *
     * @var int
     */
    public $minX;

    /**
     *Max X position
     *
     * @var int
     */
    public $maxX;

    /**
     *Min Y position
     *
     * @var int
     */
    public $minY;

    /**
     *Max Y position
     *
     * @var int
     */
    public $maxY;


    /**
     * Constructor
     *
     * @param int $minX Min X position
     * @param int $minY Min Y position
     * @param int $maxX Max X position
     * @param int $maxY Max Y position
     *
     * @return BoundingBox
     */
    public function __construct($minX, $minY, $maxX, $maxY)
    {
        $this->minX = $minX;
        $this->minY = $minY;
        $this->maxX = $maxX;
        $this->maxY = $maxY;
    }
}
