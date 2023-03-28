<?php

namespace App\Http\Controllers;

use App\Models\Exams;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExamController extends Controller
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
        if (
            $request->teacher_id_1 &&
            $request->teacher_id_2 &&
            $request->teacher_id_3 &&
            $request->teacher_student &&
            $request->center_id &&
            $request->student_id &&
            $request->tarik &&
            $request->grade &&
            $request->jizie_from &&
            $request->jizie_to &&
            $request->decision &&
            $request->date
        ) {
            $exam = Exams::create([
                'teacher_id_1'      => $request->teacher_id_1,
                'teacher_id_2'      => $request->teacher_id_2,
                'teacher_id_3'      => $request->teacher_id_3,
                'teacher_student'   => $request->teacher_student,
                'center_id'         => $request->center_id,
                'student_id'        => $request->student_id,
                'tarik'             => $request->tarik,
                'grade'             => $request->grade,
                'jizie_from'        => $request->jizie_from,
                'jizie_to'          => $request->jizie_to,
                'decision'          => $request->decision,
                'date'              => $request->date,
                'note'              => $request->note,
                'has_receive_ijaza' => $request->has_receive_ijaza,
                'recieve_ijaza_date' => $request->recieve_ijaza_date
            ]);
            if ($exam->id) {
                return response([
                    'message' => __('message.exam_added'),
                    'success' => true
                ]);
            }
        }
    }

    public function moujazstudents()
    {
        try {
            // Retrieve exams with related students and select only first_name and last_name fields
            $exams = Exams::join('students', 'students.id', '=', 'exams.student_id')
                ->join('users', 'users.id', '=', 'exams.teacher_student')
                ->select(
                    'students.id as student_id',
                    'users.id as teacher_id',
                    'exams.id as exam_id',
                    'exams.decision as exam_decision',
                    'exams.has_receive_ijaza',
                    DB::raw('CONCAT(students.first_name," ",students.middle_name," ",students.last_name) as student_name'),
                    DB::raw('CONCAT(users.first_name," ",users.middle_name," ",users.last_name) as teacher_name')
                )
                ->paginate(10);
            return response([
                'data' => $exams,
                'success' => true
            ]);

            // return $exams;
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
