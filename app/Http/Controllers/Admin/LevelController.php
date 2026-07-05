<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Level;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LevelController extends Controller
{
    public function index()
    {
        $levels = Level::with('rewards')->orderBy('points_required', 'asc')->get();
        return Inertia::render('Admin/Levels/Index', [
            'levels' => $levels
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'points_required' => 'required|integer|min:0',
            'reward_description' => 'nullable|string'
        ]);

        Level::create($validated);

        return redirect()->back()->with('success', 'Niveau créé.');
    }

    public function update(Request $request, Level $level)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'points_required' => 'required|integer|min:0',
            'reward_description' => 'nullable|string'
        ]);

        $level->update($validated);

        return redirect()->back()->with('success', 'Niveau mis à jour.');
    }

    public function destroy(Level $level)
    {
        $level->delete();
        return redirect()->back()->with('success', 'Niveau supprimé.');
    }
}
