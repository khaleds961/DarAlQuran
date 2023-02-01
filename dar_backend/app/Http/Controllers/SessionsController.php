<?php

namespace App\Http\Controllers;

use App\Models\Sessions;
use App\Models\Students_Centers_Teachers;
use Exception;
use Illuminate\Http\Request;

class SessionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $center_id = $request['center_id'];
            $student_id = $request['student_id'];
            $teacher_id = $request['user_id'];
            $st_ct_te_id = Students_Centers_Teachers::where('center_id', $center_id)
                ->where('student_id', $student_id)
                ->where('user_id', $teacher_id)->first()->id;
            $time = $request['time'];
            $day = $request['day'];
            $check_session = Sessions::where('center_student_teacher_id', $st_ct_te_id)
                ->where('weekday', $day)->first();

            if(!$check_session){
            $session = new Sessions();
            $session->center_student_teacher_id = $st_ct_te_id;
            $session->weekday = $day;
            $session->session_time = $time;
            $session->save();

            if ($session) return response([
                'message' => __('message.session_added'),
                'success' => true
            ]); 
        }else{
            return response([
                'message' => __('message.session_exist'),
                'success' => true
            ]); 
        }
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
