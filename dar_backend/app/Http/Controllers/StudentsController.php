<?php

namespace App\Http\Controllers;

use App\Models\Centers;
use App\Models\Rings;
use App\Models\Students;
use App\Models\Students_Centers_Teachers;
use App\Models\Users;
use Exception;
use Illuminate\Foundation\Auth\User;
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
        try {
            $students = Students::where('is_deleted', 0)->paginate(10);
            return response([
                'data' => $students,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function getstudentsbyring($ring_id){
        try{
            $students = Students::where('ring_id',$ring_id)->paginate(10);
            $teacher_ring = Rings::with('teacher')->find($ring_id);
            return response([
                'data'    => $students,
                'teacher_ring' => $teacher_ring,
                'success' => true
            ]);
        }catch(Exception $e){
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
        try {
            if ($request->is_ring == 1) {
                $student = Students::create([
                    'first_name'        => $request->first_name,
                    'middle_name'       => $request->middle_name,
                    'last_name'         => $request->last_name,
                    'mother_name'       => $request->mother_name,
                    'place_of_birth'    => $request->place_of_birth,
                    'birthdate'         => $request->birthdate,
                    'school_uni_name'   => $request->school_uni_name,
                    'major'             => $request->major,
                    'gender'            => $request->gender,
                    'nationality'       => $request->nationality,
                    'phone_number'      => $request->phone_number,
                    'mother_number'     => $request->mother_number,
                    'father_number'     => $request->father_number,
                    'father_work'       => $request->father_work,
                    'mother_work'       => $request->mother_work,
                    'address'           => $request->address,
                    'is_ring'           => $request->is_ring,
                    'ring_id'           => $request->ring_id,
                    'skills'            => $request->skills,
                    'rate'              => $request->rate,
                    'notes'             => $request->notes
                ]);
            } else {
                $student = Students::create([
                    'first_name'        => $request->first_name,
                    'middle_name'       => $request->middle_name,
                    'last_name'         => $request->last_name,
                    'mother_name'       => $request->mother_name,
                    'place_of_birth'    => $request->place_of_birth,
                    'birthdate'         => $request->birthdate,
                    'marital_status'    => $request->marital_status,
                    'reading_level'     => $request->reading_level,
                    'school_uni_name'   => $request->school_uni_name,
                    'major'             => $request->major,
                    'blood_type'        => $request->blood_type,
                    'gender'            => $request->gender,
                    'nationality'       => $request->nationality,
                    'current_job'       => $request->current_job,
                    'phone_number'      => $request->phone_number,
                    'work_number'       => $request->work_number,
                    'home_number'       => $request->home_number,
                    'student_level_status' => $request->student_level_status,
                    'address'           => $request->address,
                    'suitable_days'     => $request->suitable_days,
                    'suitable_times'    => $request->suitable_times,
                    'sheikh_names'      => $request->sheikh_names,
                    'memorizing'        => $request->memorizing,
                    'female_question'   => $request->female_question,
                    'skills'            => $request->skills,
                    'rate'              => $request->rate,
                    'notes'             => $request->notes
                ]);
                if ($student) {
                    Students_Centers_Teachers::create([
                        'student_id' => $student['id'],
                        'center_id' => $request['center_id'],
                        'user_id' => $request['teacher_id']
                    ]);
                }
            }
            if ($student) {
                return response([
                    'message' => __('message.student_added'),
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
    //not ring
    public function show($id)
    {
        try {
            $student = Students::where('is_deleted', 0)->where('ring_id', null)->find($id);
            $teacher_id = Students_Centers_Teachers::where('student_id', $id)->first()->user_id;
            $center_id = Students_Centers_Teachers::where('student_id', $id)
                ->where('user_id', $teacher_id)->first()->center_id;
            $student->teacher_id = $teacher_id;
            $student->center_id = $center_id;
            return response([
                'data' => $student,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
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
        $student = Students::find($id);
        if ($request->is_ring) { } else {
            $student->update([
                'first_name' => $request->first_name,
                'middle_name' => $request->middle_name,
                'last_name' => $request->last_name,
                'mother_name' => $request->mother_name,
                'address' => $request->address,
                'place_of_birth' => $request->place_of_birth,
                'birthdate' => $request->birthdate,
                'marital_status' => $request->marital_status,
                'reading_level' => $request->reading_level,
                'school_uni_name' => $request->school_uni_name,
                'major' => $request->major,
                'blood_type' => $request->blood_type,
                'gender' => $request->gender,
                'nationality' => $request->nationality,
                'current_job' => $request->current_job,
                'work_number' => $request->work_number,
                'home_number' => $request->home_number,
                'student_level_status' => $request->student_level_status,
                'suitable_days' => $request->suitable_days,
                'suitable_times' => $request->suitable_times,
                'sheikh_names' => $request->sheikh_names,
                'memorizing' => $request->memorizing,
                'female_question' => $request->female_question
            ]);
            $student_center_teacher = Students_Centers_Teachers::where('student_id',$id)->first();
            
            $student_center_teacher->update([
                'user_id' => $request->teacher_id,
                'center_id' => $request->center_id
            ]);

            if ($student->wasChanged() || $student_center_teacher->wasChanged()) {
                return response([
                    'message' => __('message.student_updated'),
                    'success' => true
                ]);
            }else{
                return response([
                    'success' => false
                ]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($student_id, $center_id)
    {
        try {
            Students::find($student_id)->delete();
            Students_Centers_Teachers::where('student_id', $student_id)
                ->where('center_id', $center_id)
                ->delete();
            $check_stud = Students::find($student_id);
            if (!$check_stud) return response([
                'message' => __('message.student_deleted'),
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    //pagination
    public function getStudentsByCenter($center_id)
    {
        try {
            if ($center_id != 0) {
                $center = Centers::find($center_id);
                $students = $center->students()
                    ->join('users', 'users.id', '=', 'students_centers_teachers.user_id')
                    ->join('centers', 'centers.id', '=', 'students_centers_teachers.center_id')
                    ->select(
                        'users.id as teacher_id',
                        'users.first_name as teacher_fn',
                        'users.middle_name as teacher_mn',
                        'users.last_name as teacher_ln',
                        'centers.id as center_id',
                        'centers.name as center_name'
                    )
                    ->paginate(10);
            } else {
                $students = Students::join('students_centers_teachers', 'students_centers_teachers.student_id', '=', 'students.id')
                    ->join('centers', 'centers.id', '=', 'students_centers_teachers.center_id')
                    ->join('users', 'users.id', '=', 'students_centers_teachers.user_id')
                    ->select(
                        'students.*',
                        'users.id as teacher_id',
                        'users.first_name as teacher_fn',
                        'users.middle_name as teacher_mn',
                        'users.last_name as teacher_ln',
                        'centers.id as center_id',
                        'centers.name as center_name'
                    )
                    ->where('students.is_deleted', 0)
                    ->paginate(10);
            }
            return response([
                'data' => $students,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function getStudentsByTeacher($center_id, $user_id)
    {
        try {
            $students = Students::join('students_centers_teachers', 'students_centers_teachers.student_id', '=', 'students.id')
                ->join('centers', 'centers.id', '=', 'students_centers_teachers.center_id')
                ->join('users', 'users.id', '=', 'students_centers_teachers.user_id')
                ->select('users.id as user_id', 'students.*', 'centers.id as center_id')
                ->where('centers.id', $center_id)
                ->where('users.id', $user_id)
                ->get();
            return response([
                'data' => $students,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function getStudentsByTeacherPagination($center_id, $user_id)
    {
        try {
            $students = Students::join('students_centers_teachers', 'students_centers_teachers.student_id', '=', 'students.id')
                ->join('centers', 'centers.id', '=', 'students_centers_teachers.center_id')
                ->join('users', 'users.id', '=', 'students_centers_teachers.user_id')
                ->select(
                    'users.id as user_id',
                    'users.first_name as teacher_fn',
                    'users.middle_name as teacher_mn',
                    'users.last_name as teacher_ln',
                    'students.*',
                    'centers.id as center_id',
                    'centers.name as center_name',
                )
                ->where('centers.id', $center_id)
                ->where('users.id', $user_id)
                ->paginate(10);
            return response([
                'data' => $students,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function getstudentsbystcete($id)
    {
        try {
            $stu_cent_teac = Students_Centers_Teachers::find($id);
            $center_id = $stu_cent_teac->center_id;
            $teacher_id = $stu_cent_teac->user_id;
            return $this->getStudentsByTeacher($center_id, $teacher_id);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }
}
