@extends('layout.app')
@section('content')
<div class="form-group">
    <div class="col-xs-12">
        <ul class="nav nav-pills nav-justified thumbnail setup-panel">
            <li class="active">
                <a href="#step-1">
                    <h4 class="list-group-item-heading">Step 1</h4>
                    <p class="list-group-item-text">Upload image</p>
                </a>
            </li>
            <li class="disabled">
                <a href="#step-2">
                    <h4 class="list-group-item-heading">Step 2</h4>
                    <p class="list-group-item-text">Show and adjust board corners</p>
                </a>
            </li>
            <li class="disabled">
                <a href="#step-3">
                    <h4 class="list-group-item-heading">Step 3</h4>
                    <p class="list-group-item-text">Show and adjust detection result</p>
                </a>
            </li>
            <li class="disabled">
                <a href="#step-4">
                    <h4 class="list-group-item-heading">Step 4</h4>
                    <p class="list-group-item-text">Generate and download PPTX file</p>
                </a>
            </li>
        </ul>
    </div>
</div>
<div class="col-md-12 col-lg-12 col-xs-12">
    <div class="panel panel-default">
        <div class="panel-body" style="height: 100%;">
            <div class="col-md-2 col-xs-12">
                <div class="well">
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle btn-block" type="button" data-toggle="dropdown">Add auto shap
                            <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li><a href="#">Rectangle</a></li>
                            <li><a href="#">Triangle</a></li>
                            <li><a href="#">Circle</a></li>
                            <li><a href="#">Smiley Face</a></li>
                            <li><a href="#">Cylinder</a></li>
                            <li><a href="#">Block Arrow</a></li>
                            <li><a href="#">Star</a></li>
                            <li><a href="#">Line Arrow</a></li>
                            <li><a href="#">Cloud</a></li>
                            <li><a href="#">Computer</a></li>
                            <li><a href="#">Human</a></li>
                            <li><a href="#">Wifi</a></li>
                        </ul>
                    </div>
                    <br />
                    <button class="btn btn-primary btn-block" type="button">Add line</button>
                </div>
            </div>
            <div class="col-md-8 col-xs-12">
                <div class="row setup-content" id="step-1">
                    <div class="col-xs-12">
                        <div class="well text-center" style="height: 400px;">
                            <div class="file-upload">
                                <button class="file-upload-btn" type="button" onclick="$('.file-upload-input').trigger( 'click' )">Add Image</button>

                                <div class="image-upload-wrap">
                                    <input class="file-upload-input" type="file" accept="image/*">
                                    <div class="drag-text">
                                    <h3>Drag and drop a file or select add Image</h3>
                                    </div>
                                </div>
                                <div class="file-upload-content">
                                    <img class="file-upload-image" src="#" alt="your image">
                                    <div class="image-title-wrap">
                                    <button type="button" class="remove-image">Remove <span class="image-title">Uploaded Image</span></button>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="btn-steps">
                                <div class="col-md-12 col-xs-12">
                                    <button class="btn btn-default pull-left">Back to previous step</button>
                                    <button class="btn btn-success pull-right">Next step</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row setup-content" id="step-2">
                    <div class="col-xs-12">
                        <div class="col-md-12 well">
                            <h1 class="text-center"> STEP 2</h1>
                        </div>
                    </div>
                </div>
                <div class="row setup-content" id="step-3">
                    <div class="col-xs-12">
                        <div class="col-md-12 well">
                            <h1 class="text-center"> STEP 3</h1>
                        </div>
                    </div>
                </div>
                <div class="row setup-content" id="step-4">
                    <div class="col-xs-12">
                        <div class="col-md-12 well">
                            <h1 class="text-center"> STEP 4</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-xs-12">
                <div class="well">
                    <form>
                        <div class="form-group">
                            <label for="class-type">Category:</label>
                            <select name="class-type" id="class-type" class="form-control" autocomplete="off">
                                <option>Autoshape</option>
                                <option>Mark</option>
                                <option>Line</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="shap-type">Shap Type:</label>
                            <select name="shap-type" id="shape-type" class="form-control" autocomplete="off">
                                <option>Rectangle</option>
                                <option>Triangle</option>
                                <option>Circle</option>
                                <option>Smiley Face</option>
                                <option>Cylinder</option>
                                <option>Block Arrow</option>
                                <option>Star</option>
                                <option>Line Arrow</option>
                                <option>Cloud</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-xs-12">
                                    <label for="xmin">Xmin:</label>
                                    <input type="number" class="form-control" id="xmin">
                                </div>
                                <div class="col-md-6 col-lg-6 col-xs-12">
                                    <label for="xmax">Xmax:</label>
                                    <input type="number" class="form-control" id="xmax">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-xs-12">
                                    <label for="ymin">Ymin:</label>
                                    <input type="number" class="form-control" id="ymin">
                                </div>
                                <div class="col-md-6 col-lg-6 col-xs-12">
                                    <label for="ymax">Ymax:</label>
                                    <input type="number" class="form-control" id="ymax">
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success btn-block">Save</button>
                        <button type="submit" class="btn btn-warning btn-block">Delete</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
