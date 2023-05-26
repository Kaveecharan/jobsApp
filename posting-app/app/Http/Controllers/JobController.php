<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function getJobs()
    {
        $jobs = Job::all();

        return response()->json(['jobs' => $jobs]);
    }

    public function addJob(Request $request)
    {
        $job = new Job();
        $job->image = $request->input('image');
        $job->jobTitle = $request->input('jobTitle');
        $job->category = $request->input('category');
        $job->content = $request->input('content');
        $job->save();

        $jobId = $job->id;

        return response()->json(['message' => 'Job added successfully', 'jobId' => $jobId], 201);
    }

    public function updateJob(Request $request, $id)
    {
        $job = Job::findOrFail($id);
        $job->image = $request->input('image');
        $job->jobTitle = $request->input('jobTitle');
        $job->category = $request->input('category');
        $job->content = $request->input('content');
        $job->save();

        return response()->json(['message' => 'Job updated successfully']);
    }

    public function deleteJob($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();

        return response()->json(['message' => 'Job deleted successfully']);
    }
}
