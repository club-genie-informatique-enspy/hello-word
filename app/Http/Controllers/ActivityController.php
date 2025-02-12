<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ActivityController extends Controller
{
    public function index()
    {
        return response()->json(Activity::with('messages', 'likes')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        $activity = Activity::create([
            'activity_uuid' => Str::uuid(),
            'type' => $request->type,
            'title' => $request->title,
            'description' => $request->description,
            'nb_vues' => 0,
        ]);

        return response()->json($activity, 201);
    }

    public function like($uuid)
    {
        $activity = Activity::where('activity_uuid', $uuid)->firstOrFail();
        $user = Auth::user();
        $activity->likes()->attach($user->id);
        return response()->json(['message' => 'Liked!']);
    }

    public function toggleLike($uuid)
    {
        $activity = Activity::where('activity_uuid', $uuid)->firstOrFail();
        $user = Auth::user();
        $message = $activity->toggleLike($user->id);

        return response()->json(['message' => $message]);
    }

    public function incrementViews($uuid)
    {
        $activity = Activity::where('activity_uuid', $uuid)->firstOrFail();
        $activity->incrementViews();

        return response()->json(['message' => 'View count incremented']);
    }

    public function getLikesCount($uuid)
    {
        $activity = Activity::where('activity_uuid', $uuid)->firstOrFail();
        return response()->json(['likes' => $activity->getLikesCount()]);
    }

    public function getViewsCount($uuid)
    {
        $activity = Activity::where('activity_uuid', $uuid)->firstOrFail();
        return response()->json(['views' => $activity->nb_vues]);
    }

    public function update(Request $request, $uuid)
{
    $request->validate([
        'type' => 'sometimes|string',
        'title' => 'sometimes|string',
        'description' => 'sometimes|string',
    ]);

    $activity = Activity::where('activity_uuid', $uuid)->firstOrFail();
    $activity->update($request->only(['type', 'title', 'description']));

    return response()->json(['message' => 'Activity updated!', 'activity' => $activity]);
}

public function destroy($uuid)
{
    $activity = Activity::where('activity_uuid', $uuid)->firstOrFail();
    $activity->delete();

    return response()->json(['message' => 'Activity deleted!']);
}


}
