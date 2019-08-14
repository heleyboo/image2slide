<?php

namespace App\Models;

class DetectionObject
{
    public $id;
    public $name;
    public $data;

    public function __construct($id, $name, $data)
    {
        $this->id = $id;
        $this->name = $name;
        $this->data = $data;
    }

}
