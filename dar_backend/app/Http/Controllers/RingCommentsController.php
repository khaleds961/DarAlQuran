<?php

namespace App\Http\Controllers;

use App\Models\RingComments;
use Exception;
use Illuminate\Http\Request;

class RingCommentsController extends Controller
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
            if ($request->ring_id && $request->comment && $request->date) {

                $check_note = RingComments::where('ring_id', $request->ring_id)
                    ->where('date', $request->date)
                    ->first();

                if (!$check_note) {
                    $add_comment = RingComments::create([
                        'ring_id' => $request->ring_id,
                        'comment' => $request->comment,
                        'date' => $request->date
                    ]);
                    if ($add_comment->id) {
                        return response([
                            'message' => __('message.note_added'),
                            'success' => true
                        ]);
                    }
                } else {
                    return response([
                        'message' => __('message.note_exist'),
                        'success' => false
                    ]);
                }
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
