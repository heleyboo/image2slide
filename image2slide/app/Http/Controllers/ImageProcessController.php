<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\CornerService;
use App\Services\ObjectDetectService;
use App\Models\Corners;
use App\Models\Detections;

class ImageProcessController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * upload Controller to receive and analyze corners information
     *
     * @return array Json of data
     */
    public function upload()
    {
        // $file = Request::file('fileToUpload');
        // $originalName = $file->getClientOriginalName();
        // $newName = time() . $originalName;
        // $file->storeAs(config('appx.UPLOAD_DIRECTORY'), $newName);
        $cornerService = new CornerService();
        $corners = $cornerService->calculateCorners("test");
        $result = array(
            "fileName" => "test",
            "status" => 0,
            "corners" => $corners
        );
        return $result;
    }

    public function detectObjects()
    {
        //TODO get updated corners data
        //Call service to get detection objects and preprocess Image
        $detectService = new ObjectDetectService();

        $detection = $detectService->detectObjects('test', new Corners());

        return json_encode($detection);
    }

    public function getPPTX()
    {
        //TODO get updated detections data
        //Call service to get PPTX file
        $detectService = new ObjectDetectService();
        return $detectService->exportPPTX(new Detections());
    }
}
