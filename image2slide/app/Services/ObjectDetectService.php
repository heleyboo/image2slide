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
        $detections->setSize(new ImageSize(800, 600));
        $detectOpbject = new DetectionObject('1', 'rectangle', new BoundingBox(10, 10, 100, 100));

        $detectOpbject3 = new DetectionObject('2', 'circle', new BoundingBox(100, 100, 200, 200));
        $detectOpbject4 = new DetectionObject('3', 'circle', new BoundingBox(100, 100, 400, 400));
        $detectOpbject5 = new DetectionObject('4', 'triangle', new BoundingBox(100, 100, 200, 200));
        $detectOpbject6 = new DetectionObject('5', 'computer', new BoundingBox(100, 100, 200, 200));
        $detections->setDetectionObjects([
            $detectOpbject,
            $detectOpbject3,
            $detectOpbject4,
            $detectOpbject5,
            $detectOpbject6,
        ]);

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
