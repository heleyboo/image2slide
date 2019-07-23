<?php

namespace App\Services;

use App\Models\Corners;
use App\Models\ImageSize;
use App\Models\Point;

class CornerService
{

    public function calculateCorners($fileName) {
        $filePath = storage_path() . \config('appx.UPLOAD_DIRECTORY') . $fileName;
        $corners = new Corners();
        //TODO run AI scrip to return corner

        //stub corner
        $corners->setFileName($fileName)
                ->setSize(new ImageSize(800, 600))
                ->setTopLeft(new Point(0,0))
                ->setTopRight(new Point(800, 0))
                ->setBottomLeft(new Point(600, 0))
                ->setBottomRight(new Point(800, 600));
        return $corners;
    }
}
