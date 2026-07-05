<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PointRule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PointRuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pointRules = PointRule::latest()->get();

        return Inertia::render('Admin/PointRules/Index', [
            'pointRules' => $pointRules,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return redirect()->route('admin.point-rules.index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'value' => 'required|numeric|min:0',
            'is_active' => 'boolean',
            'conditions' => 'nullable|array',
        ]);

        PointRule::create($validated);

        return redirect()->route('admin.point-rules.index')->with('success', 'Règle de fidélité créée avec succès.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PointRule $pointRule)
    {
        return redirect()->route('admin.point-rules.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PointRule $pointRule)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'value' => 'required|numeric|min:0',
            'is_active' => 'boolean',
            'conditions' => 'nullable|array',
        ]);

        // Default value for is_active if not present
        if (!isset($validated['is_active'])) {
            $validated['is_active'] = false;
        }

        $pointRule->update($validated);

        return redirect()->route('admin.point-rules.index')->with('success', 'Règle de fidélité modifiée avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PointRule $pointRule)
    {
        $pointRule->delete();

        return redirect()->route('admin.point-rules.index')->with('success', 'Règle de fidélité supprimée avec succès.');
    }
}
