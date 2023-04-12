<?php

use App\Http\Controllers\CentersController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\RevisonsController;
use App\Http\Controllers\RingCommentsController;
use App\Http\Controllers\RingRevisionController;
use App\Http\Controllers\RingsController;
use App\Http\Controllers\SessionsController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\TeachersController;
use App\Http\Controllers\UsersController;
use App\Models\RingComments;
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

Route::post('/login', [UsersController::class, 'login']);


//PROTECTED ROUTES
Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('/logout', [UsersController::class, 'logout']);

    //USERS
    Route::post('/addteacher', [UsersController::class, 'register']);
    Route::get('allteachers', [UsersController::class, 'allteachers']);
    Route::get('getUserbyToken', [UsersController::class, 'getUserbyToken']);
    Route::get('/getteachers/{user_id}', [UsersController::class, 'getAllUsers']);
    Route::get('/getTeacherbySupervisor/{center_id}/{supervisor_id}', [UsersController::class, 'getTeacherbySupervisor']);
    Route::get('/getAllTeachersByCenter/{center_id}', [UsersController::class, 'getAllTeachersByCenter']);
    Route::get('/getTeachersByCenter/{center_id}', [UsersController::class, 'getTeachersByCenter']);
    Route::get('/checkteacher/{center_id}/{user_id}', [UsersController::class, 'checkteacher']);
    Route::get('/getteacherbyid/{user_id}', [UsersController::class, 'getteacherbyid']);
    Route::post('/editteacherbyid/{user_id}', [UsersController::class, 'update']);
    Route::delete('/deleteteacher/{teacher_id}', [UsersController::class, 'destroy']);
    Route::get('/counting', [UsersController::class, 'counting']);
    Route::get('/getCenterIdByTeacher/{teacher_id}', [UsersController::class, 'getCenterIdByTeacher']);

    //STUDENTS
    Route::get('/getAllStudents', [StudentsController::class, 'index']);
    Route::get('/allstudents', [StudentsController::class, 'allstudents']);
    Route::get('/getStudentsByCenter/{center_id}', [StudentsController::class, 'getStudentsByCenter']);
    Route::get('/getStudentsByTeacher/{center_id}/{user_id}', [StudentsController::class, 'getStudentsByTeacher']);
    Route::get('/getStudentsByTeacherPagination/{center_id}/{user_id}', [StudentsController::class, 'getStudentsByTeacherPagination']);
    Route::get('/getstudentsbystcete/{id}', [StudentsController::class, 'getstudentsbystcete']);
    Route::get('/getstudentsbyring/{ring_id}', [StudentsController::class, 'getstudentsbyring']);
    Route::get('/getstudentbyid/{id}', [StudentsController::class, 'show']);
    Route::get('/getringstudentbyid/{id}', [StudentsController::class, 'showRingStudent']);
    Route::post('/addstudent', [StudentsController::class, 'store']);
    Route::post('/searchforstudent', [StudentsController::class, 'searchforstudent']);
    Route::post('/editstudent/{id}', [StudentsController::class, 'update']);
    Route::post('/editPdf/{id}',[StudentsController::class, 'editPdf']);
    Route::delete('/deletestudent/{id}/{center_id}', [StudentsController::class, 'destroy']);


    //CENTER
    Route::get('/getcenters', [CentersController::class, 'index']);
    Route::post('/addcenter', [CentersController::class, 'store']);
    Route::delete('/deleteCenter/{id}', [CentersController::class, 'destroy']);
    Route::get('/getcenterbyid/{id}', [CentersController::class, 'show']);
    Route::post('/updatecenter/{id}', [CentersController::class, 'update']);

    //Sessions
    Route::get('/getsessions/{center_id}', [SessionsController::class, 'index']);
    Route::post('/getsessionsbyids/{teacher_id}/{student_id}', [SessionsController::class, 'getsessionsbyids']);
    Route::post('/addsession', [SessionsController::class, 'store']);
    Route::get('/deletesession/{id}/{st_ce_te}', [SessionsController::class, 'destroy']);
    Route::get('/getsessionsbyid/{id}', [SessionsController::class, 'getSessionsById']);
    Route::get('/getsessionsbystcente/{id}', [SessionsController::class, 'getsessionsbystcente']);
    Route::get('/getsessionsbyteacher/{center_id}/{teacher_id}', [SessionsController::class, 'getsessionsbyteacher']);
    Route::get('/teacherschedule/{center_id}/{teacher_id}', [SessionsController::class, 'teacherschedule']);
    Route::post('/monthyteachereport/{center_id}/{teacher_id}', [SessionsController::class, 'MonthlyTeacherReport']);

    //Ring
    Route::get('/getrings/{center_id}', [RingsController::class, 'index']);
    Route::get('/getringbyid/{ring_id}', [RingsController::class, 'show']);
    Route::get('/getringsbycenter/{center_id}', [RingsController::class, 'getringsbycenter']);
    Route::get('/getringsbycenterpagination/{center_id}', [RingsController::class, 'getringsbycenterpagination']);
    Route::get('/getringsbyteacher/{teacher_id}', [RingsController::class, 'getringsbyteacher']);
    Route::get('/getallringsbyteacher/{teacher_id}', [RingsController::class, 'getallringsbyteacher']);
    Route::get('/filterRings/{center_id}/{teacher_id}/{filter_id}', [RingsController::class, 'filterRings']);
    Route::post('/addring', [RingsController::class, 'store']);
    Route::post('/editring/{id}', [RingsController::class, 'update']);
    Route::delete('/deletering/{id}', [RingsController::class, 'destroy']);

    // Route::get('/getsessionsbyid/{id}',[SessionsController::class,'getSessionsById']);

    //Revision
    Route::post('/addrevision', [RevisonsController::class, 'store']);
    Route::delete('/deleterevision/{revision_id}', [RevisonsController::class, 'destroy']);


    //RingRevision
    Route::post('/addsessionring', [RingRevisionController::class, 'store']);
    Route::post('/monthlyRingReport', [RingRevisionController::class, 'monthlyRingReport']);
    Route::post('/testme', [RingRevisionController::class, 'testme']);

    //RingComment
    Route::post('/addcommentring', [RingCommentsController::class, 'store']);

    //Exams
    Route::post('/addexam', [ExamController::class, 'store']);
    Route::get('/moujazstudents', [ExamController::class, 'moujazstudents']);
    Route::delete('/deleteexam/{exam_id}', [ExamController::class, 'destroy']);
});
