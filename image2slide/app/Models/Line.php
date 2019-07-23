<?php

namespace App\Models;

class Line
{
    /**
     *Min X position
     *
     * @var Point
     */
    public $start;

    /**
     *Max X position
     *
     * @var Point
     */
    public $end;

    /**
     * Constructor
     *
     * @param int $start Max X position
     * @param int $end Max Y position`
     *
     * @return Line
     */
    public function __construct($start, $end)
    {
        $this->start = $start;
        $this->end = $end;
    }
}
