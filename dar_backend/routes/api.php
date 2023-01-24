<?php

use App\Http\Controllers\CentersController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\TeachersController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//PROTECTED ROUTES
Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::post('/logout',[UsersController::class,'logout']);
});

//USERS
Route::post('/addteacher',[UsersController::class,'register']);
Route::post('/login',[UsersController::class,'login']);
Route::get('getUserbyToken',[UsersController::class,'getUserbyToken']);
Route::get('/tryme',[UsersController::class,'omarsfunction']);

//TEACHERS
// Route::post('/addteacher',[TeachersController::class,'store']);
Route::get('/getteachers',[TeachersController::class,'index']);
Route::put('/deleteteacher/{id}',[TeachersController::class,'destroy']);
Route::get('/try',[TeachersController::class,'getTeacherbySupervisor']);


//STUDENTS
Route::post('/addstudent',[StudentsController::class,'store']);


//CENTER
Route::get('/getcenters',[CentersController::class,'index']);
Route::post('/addcenter',[CentersController::class,'store']);
Route::put('/deleteCenter/{id}',[CentersController::class,'destroy']);
Route::get('/getget',[CentersController::class,'studentsbycenter']);

