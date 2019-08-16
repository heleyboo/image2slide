<?php
use Illuminate\Support\Facades\Route;

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
])->middleware('cors');

Route::post('/detect-objects',  [
    'as'=> 'detectObjects',
    'uses'=> 'ImageProcessController@detectObjects'
])->middleware('cors');

Route::post('/get-pptx',  [
    'as'=> 'getPPTX',
    'uses'=> 'ImageProcessController@getPPTX'
])->middleware('cors');

Route::get('/api/books', [
    'as'=> 'books',
    'uses'=> 'ImageProcessController@getBooks'
]);

Route::get('/test', [
    'as' => 'test',
    'uses' => 'ImageProcessController@test'
]);
