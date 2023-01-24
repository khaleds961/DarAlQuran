<?php

namespace App\Http\Controllers;

use App\Models\Students;
use App\Models\Users;
use Illuminate\Http\Request;

class StudentsController extends Controller
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
        if ($request->username && $request->password) {
           $user = Users::create([
                'username' => $request->username,
                'password' => $request->password,
                'role_id'  => $request->role_id
            ]);
            Students::create([
                'user_id'    => $user->id,
                'first_name' => $request->first_name
            ]);
            return response([
                'message' => __('message.student_added'),
                'success' => true
            ]);
        } else {
            $user = Users::create([
                'username' => null,
                'password' => null,
                'role_id'  => $request->role_id
            ]);

            Students::create([
                'user_id'    => $user->id,
                'first_name' => $request->first_name
            ]);
            return response([
                'message' => __('message.student_added'),
                'success' => true
            ]);
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
