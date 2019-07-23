<?php

namespace App\Services;

use App\Models\Corners;
use App\Models\ImageSize;
use App\Models\Point;
use App\Models\Detections;

class ObjectDetectService
{
    /**
     * Call AI to get objects from Image
     *
     * @param string $fileName
     * @param \App\Models\Corners $corners updated corners
     * @return \App\Models\Detections;
     */
    public function detectObjects($fileName, Corners $corners)
    {
        //TODO run AI to get objects list
        $detections = new Detections();
        return $detections;
    }

    /**
     * Call AI to get pptx file
     *
     * @param Detections $detections
     *
     * @return binary
     */
    public function exportPPTX(Detections $detections)
    {
        //TODO modify Objects and get pptx file
    }
}
