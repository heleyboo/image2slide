<?php

namespace App\Services;

use App\Models\Corners;
use App\Models\ImageSize;
use App\Models\Point;
use App\Models\Detections;
use App\Models\DetectionObject;
use App\Models\BoundingBox;
use App\Models\Line;

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
        $detectOpbject = new DetectionObject('1', 'rectangle', new BoundingBox(10, 10, 100, 100));
        $detectOpbject1 = new DetectionObject('2', 'rectangle', new BoundingBox(100, 100, 200, 200));
        $start = new Point(100, 100);
        $end = new Point(400, 400);
        $detectOpbject2 = new DetectionObject('3', 'line', new Line($start, $end));
        $detections->setDetectionObjects([$detectOpbject, $detectOpbject1, $detectOpbject2]);

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
        return [
            'link' => 'https://google.com'
        ];
    }
}
