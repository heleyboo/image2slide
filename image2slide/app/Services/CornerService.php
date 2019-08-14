<?php

namespace App\Services;

use App\Models\Corners;
use App\Models\ImageSize;
use App\Models\Point;

class CornerService
{

    public function calculateCorners($fileName) {
        //$filePath = storage_path() . \config('appx.UPLOAD_DIRECTORY') . $fileName;
        $corners = new Corners();
        //TODO run AI scrip to return corner

        //stub corner
        $corners->setFileName($fileName)
                ->setSize(new ImageSize(788, 591))
                ->setTopLeft(new Point(10, 10))
                ->setTopRight(new Point(788, 10))
                ->setBottomLeft(new Point(10, 591))
                ->setBottomRight(new Point(788, 591));
        return $corners;
    }
}
