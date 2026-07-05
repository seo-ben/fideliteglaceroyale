<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PointRule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $rules = PointRule::all();
        return Inertia::render('Admin/Settings', [
            'rules' => $rules
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'rules' => 'required|array',
            'rules.*.id' => 'required|exists:point_rules,id',
            'rules.*.value' => 'required|numeric|min:0',
            'rules.*.is_active' => 'required|boolean',
        ]);

        foreach ($request->rules as $ruleData) {
            PointRule::where('id', $ruleData['id'])->update([
                'value' => $ruleData['value'],
                'is_active' => $ruleData['is_active'],
            ]);
        }

        return redirect()->back()->with('success', 'Règles mises à jour avec succès.');
    }
}
