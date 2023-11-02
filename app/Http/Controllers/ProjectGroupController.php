<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectGroupResource;
use App\Models\ProjectGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(ProjectGroupResource::collection(ProjectGroup::where('user_id', Auth::id())->get()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $group = ProjectGroup::create([
        'name' => $request->name,
        'comment' => $request->comment,
        'user_id' => Auth::id()
      ]);
      return response()->json(new ProjectGroupResource($group));
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
      $group = ProjectGroup::find($id);
      if ($group->user_id <> Auth::id()) {
        return null;
      }
      $group->update([
        'name' => $request->name,
        'comment' => $request->comment
      ]);
      return response()->json(new ProjectGroupResource($group));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return ProjectGroup::find($id)->delete();
    }
}
