<?php

use App\Http\Controllers\CentersController;
use App\Http\Controllers\SessionsController;
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
Route::get('/getteachers/{user_id}',[UsersController::class,'getAllUsers']);
Route::get('/getTeacherbySupervisor/{center_id}/{supervisor_id}',[UsersController::class,'getTeacherbySupervisor']);
Route::get('/getAllTeachersByCenter/{center_id}',[UsersController::class,'getAllTeachersByCenter']);
Route::get('/getTeachersByCenter/{center_id}',[UsersController::class,'getTeachersByCenter']);

//STUDENTS
Route::get('/getAllStudents',[StudentsController::class,'index']);
Route::get('/getStudentsByCenter/{center_id}',[StudentsController::class,'getStudentsByCenter']);
Route::get('/getStudentsByTeacher/{center_id}/{user_id}',[StudentsController::class,'getStudentsByTeacher']);
Route::post('/addstudent',[StudentsController::class,'store']);
Route::delete('/deletestudent/{id}/{center_id}',[StudentsController::class,'destroy']);


//CENTER
Route::get('/getcenters',[CentersController::class,'index']);
Route::post('/addcenter',[CentersController::class,'store']);
Route::put('/deleteCenter/{id}',[CentersController::class,'destroy']);
Route::get('/getcenterbyid/{id}',[CentersController::class,'show']);
// Route::get('/getget',[CentersController::class,'studentsbycenter']);

//Sessions
Route::post('/addsession',[SessionsController::class,'store']);
