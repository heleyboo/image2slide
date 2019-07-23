<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;
use App\Services\CornerService;

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
    public function upload() {
        $file = Request::file('fileToUpload');
        $originalName = $file->getClientOriginalName();
        $newName = time() . $originalName;
        $file->storeAs(config('appx.UPLOAD_DIRECTORY'), $newName);
        $cornerService = new CornerService();
        $corners = $cornerService->calculateCorners($newName);
        $result = array(
            "fileName" => $newName,
             "status" => 0,
             "corners" => $corners
        );
        return $result;
    }

    public function detectObjects() {
        //TODO get updated corners data
        //Call service to get detection objects and preprocess Image
        return [];
    }

    public function getPPTX() {
        //TODO get updated detections data
        //Call service to get PPTX file
        return [];
    }
}
