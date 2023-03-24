<?php

namespace App\Http\Controllers;

use App\Models\RingComments;
use App\Models\RingRevision;
use App\Models\Rings;
use Exception;
use TCPDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RingRevisionController extends Controller
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
            if ($request->date && $request->ring_id && $request->student_id) {
                $check_if_exist = RingRevision::where('student_id', $request->student_id)
                    ->where('date', $request->date)
                    ->where('ring_id', $request->ring_id)->first();
                if (!$check_if_exist) {
                    $add_ringrevision = new RingRevision;
                    $add_ringrevision->ring_id = $request->ring_id;
                    $add_ringrevision->student_id = $request->student_id;
                    $add_ringrevision->attendance = $request->attendance;
                    $add_ringrevision->from_surrah = $request->from_surrah;
                    $add_ringrevision->from_ayyah = $request->from_ayyah;
                    $add_ringrevision->to_surrah = $request->to_surrah;
                    $add_ringrevision->to_ayyah = $request->to_ayyah;
                    $add_ringrevision->date = $request->date;
                    $add_ringrevision->type = $request->type;
                    $add_ringrevision->save();
                    if ($add_ringrevision->exists) {
                        return response([
                            'message' => __('message.ring_revision_added'),
                            'success' => true
                        ]);
                    }
                } else {
                    return response([
                        'message' => __('message.ring_revision_exist'),
                        'success' => false
                    ]);
                }
            }
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function monthlyRingReport(Request $request)
    {
        try {
            if ($request->ring_id && $request->start && $request->end) {
                $report_comment = RingComments::where('ring_id',$request->ring_id)
                    ->whereBetween('date', [$request->start, $request->end])->first();
                $studentsByRings = Rings::find($request->ring_id)
                    ->students()
                    ->join('ring_revisions', 'ring_revisions.student_id', '=', 'students.id')
                    ->select(
                        DB::raw('CONCAT(first_name," ",middle_name," ",last_name) as full_name'),
                        'students.id as student_id'
                    )
                    ->groupBy('student_id')
                    ->paginate(5);


                $studentsByRings->getCollection()->map(function ($item) use ($request) {
                    $item->sessions = RingRevision::where('student_id', $item->student_id)
                        ->whereBetween('date', [$request->start, $request->end])
                        ->select(
                            'ring_revisions.id as revision_id',
                            'ring_revisions.date as revision_date',
                            'ring_revisions.from_surrah',
                            'ring_revisions.to_surrah',
                            'ring_revisions.from_ayyah',
                            'ring_revisions.to_ayyah',
                            'ring_revisions.attendance',
                            'ring_revisions.type'
                        )->orderBy('date')->get();
                    return $item;
                });
                return response([
                    'data' => $studentsByRings,
                    'report_comment' => $report_comment,
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
