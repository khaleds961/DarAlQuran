<?php

namespace App\Http\Controllers;

use App\Models\Students_Centers_Teachers;
use App\Models\Teachers;
use App\Models\Users;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

class TeachersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $teachers = Teachers::where('is_deleted', 0)->get();
            return response(
                [
                    'data' => $teachers,
                    'success' => true
                ]
            );
        } catch (Exception $e) {
            return response($e->getMessage());
        }
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
        if ($request->username && $request->password) {
            $user = Users::create([
                'username' => $request->username,
                'password' => bcrypt($request->password),
                'role_id' => $request->role_id
            ]);
        } else {
            $user = Users::create([
                'username' => null,
                'password' => null,
                'role_id' => $request->role_id
            ]);
        }

        $teacher = Teachers::create([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'phone_number' => $request->phone_number,
            'user_id' => $user->id
        ]);
        return response([
            'data' => $teacher,
            'success' => true
        ]);
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
        $teacher = Teachers::find($id);
        if ($teacher) {
            $teacher_user_id = $teacher->user_id;
            Users::where('id', $teacher_user_id)->update(['is_deleted' => 1]);
            $teacher->update(['is_deleted' => 1]);
            return response([
                'message' => __('message.teacher_deleted'),
                'success' => true
            ]);
        } else {
            return 'error';
        }
    }

    public function getTeacherbySupervisor(Request $request)
    {
        // get teachers by center id
        $teacher_ids = Students_Centers_Teachers::select('teacher_id')->where('center_id', $request['center_id'])->get();

        $teacher = [];
        //get teacher details
        foreach ($teacher_ids as $teacher_id) {
            $teacher[] = Teachers::find($teacher_id)->first();
        }
        return response([
            'data' => $teacher,
            'success' => true
        ]);
    }
}
