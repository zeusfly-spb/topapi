<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectGroupResource;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\ProjectGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $projectGroup = ProjectGroup::where('user_id', Auth::id())->where('id', $request->project_group_id)->first();
      $project = $projectGroup->projects()->create(['name' => $request->name]);
      return response()->json(new ProjectResource($project));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
      $project = Project::find($id);
      $project->update($request->all());
      return response()->json(new ProjectResource($project));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
      return Project::find($id)->delete();
    }
}
