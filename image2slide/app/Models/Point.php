<?php

namespace App\Models;

class Point
{
    /**
     *X position
     *
     * @var int
     */
    public $x;

    /**
     *Y position
     *
     * @var int
     */
    public $y;

    /**
     * Constructor
     *
     * @param int $x X position
     * @param int $y Y position
     *
     * @return Point
     */
    public function __construct($x, $y)
    {
        $this->x = $x;
        $this->y = $y;
    }
}
