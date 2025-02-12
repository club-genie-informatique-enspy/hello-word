<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class MessageController extends Controller
{
    public function index($activity_uuid)
    {
        return response()->json(Message::where('activity_uuid', $activity_uuid)->with('likes')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'activity_uuid' => 'required|exists:activities,activity_uuid',
            'sender' => 'required|string',
            'contenu' => 'required|string',
            'receiver' => 'nullable|string',
        ]);

        $message = Message::create([
            'message_uuid' => Str::uuid(),
            'activity_uuid' => $request->activity_uuid,
            'sender' => $request->sender,
            'contenu' => $request->contenu,
            'receiver' => $request->receiver,
            'nb_vues' => 0,
        ]);

        return response()->json($message, 201);
    }

    public function like($uuid)
    {
        $message = Message::where('message_uuid', $uuid)->firstOrFail();
        $user = Auth::user();
        $message->likes()->attach($user->id);
        return response()->json(['message' => 'Liked!']);
    }
    public function toggleLike($uuid)
{
    $message = Message::where('message_uuid', $uuid)->firstOrFail();
    $user = Auth::user();
    $message = $message->toggleLike($user->id);

    return response()->json(['message' => $message]);
}

    public function incrementViews($uuid)
    {
        $message = Message::where('message_uuid', $uuid)->firstOrFail();
        $message->incrementViews();

        return response()->json(['message' => 'View count incremented']);
    }

    public function getLikesCount($uuid)
    {
        $message = Message::where('message_uuid', $uuid)->firstOrFail();
        return response()->json(['likes' => $message->getLikesCount()]);
    }

    public function getViewsCount($uuid)
    {
        $message = Message::where('message_uuid', $uuid)->firstOrFail();
        return response()->json(['views' => $message->nb_vues]);
    }

    public function update(Request $request, $uuid)
{
    $request->validate([
        'contenu' => 'sometimes|string',
        'receiver' => 'nullable|string',
    ]);

    $message = Message::where('message_uuid', $uuid)->firstOrFail();
    $message->update($request->only(['contenu', 'receiver']));

    return response()->json(['message' => 'Message updated!', 'message_data' => $message]);
}

public function destroy($uuid)
{
    $message = Message::where('message_uuid', $uuid)->firstOrFail();
    $message->delete();

    return response()->json(['message' => 'Message deleted!']);
}


}
