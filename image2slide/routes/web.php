<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',  [
    'as'=> 'index',
    'uses'=> 'IndexController@index'
]);

Route::post('/upload',  [
    'as'=> 'upload',
    'uses'=> 'ImageProcessController@upload'
]);

Route::post('/detect-objects',  [
    'as'=> 'detectObjects',
    'uses'=> 'ImageProcessController@detectObjects'
]);

Route::post('/get-pptx',  [
    'as'=> 'getPPTX',
    'uses'=> 'ImageProcessController@getPPTX'
]);
