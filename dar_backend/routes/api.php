<?php

use App\Http\Controllers\CentersController;
use App\Http\Controllers\RevisonsController;
use App\Http\Controllers\RingsController;
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
Route::get('/checkteacher/{center_id}/{user_id}',[UsersController::class,'checkteacher']);
Route::get('/getteacherbyid/{user_id}',[UsersController::class,'getteacherbyid']);
Route::post('/editteacherbyid/{user_id}',[UsersController::class,'update']);
Route::delete('/deleteteacher/{teacher_id}',[UsersController::class,'destroy']);
Route::get('/counting',[UsersController::class,'counting']);

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
Route::post('/updatecenter/{id}',[CentersController::class,'update']);
// Route::get('/getget',[CentersController::class,'studentsbycenter']);

//Sessions
Route::get('/getsessions/{center_id}',[SessionsController::class,'index']);
Route::post('/addsession',[SessionsController::class,'store']);
Route::delete('/deletesession/{id}/{st_ce_te}',[SessionsController::class,'destroy']);
Route::get('/getsessionsbyid/{id}',[SessionsController::class,'getSessionsById']);
Route::get('/getsessionsbystcente/{id}',[SessionsController::class,'getsessionsbystcente']);
Route::get('/getsessionsbyteacher/{center_id}/{teacher_id}',[SessionsController::class,'getsessionsbyteacher']);

//Ring
Route::get('/getrings/{center_id}',[RingsController::class,'index']);
Route::get('/getringbyid/{ring_id}',[RingsController::class,'show']);
Route::get('/getringsbycenter/{center_id}',[RingsController::class,'getringsbycenter']);
Route::post('/addring',[RingsController::class,'store']);
Route::post('/editring/{id}',[RingsController::class,'update']);
Route::delete('/deletering/{id}',[RingsController::class,'destroy']);
// Route::get('/getsessionsbyid/{id}',[SessionsController::class,'getSessionsById']);

//Revision
Route::post('/addrevision',[RevisonsController::class,'store']);
