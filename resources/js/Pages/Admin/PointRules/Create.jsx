import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'spend',
        value: '',
        is_active: true,
        conditions: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.point-rules.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.point-rules.index')} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Nouvelle Règle</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">Définissez comment vos clients cumulent des points</p>
                    </div>
                </div>
            }
        >
            <Head title="Créer une Règle" />

            <div className="mt-8 pb-12 max-w-3xl mx-auto">
                <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Nom de la règle */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Nom de la règle</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Ex: Dépense classique, Bonus de bienvenue..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="mt-2 text-sm font-bold text-red-500">{errors.name}</p>}
                            </div>

                            {/* Type de règle */}
                            <div>
                                <label htmlFor="type" className="block text-sm font-bold text-slate-700 mb-2">Type d'attribution</label>
                                <div className="relative">
                                    <select
                                        id="type"
                                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium cursor-pointer"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                    >
                                        <option value="spend">Dépense (x FCFA = 1 point)</option>
                                        <option value="welcome_bonus">Bonus de Bienvenue (points fixes)</option>
                                        <option value="happy_hour">Multiplicateur Happy Hour (x points)</option>
                                        <option value="visit_bonus">Bonus par Visite (points fixes)</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                                {errors.type && <p className="mt-2 text-sm font-bold text-red-500">{errors.type}</p>}
                            </div>

                            {/* Valeur */}
                            <div>
                                <label htmlFor="value" className="block text-sm font-bold text-slate-700 mb-2">
                                    {data.type === 'spend' ? 'Montant en FCFA pour 1 point' : 'Valeur (points ou multiplicateur)'}
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="value"
                                        placeholder="0.00"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-16 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-lg"
                                        value={data.value}
                                        onChange={(e) => setData('value', e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4">
                                        <span className="text-slate-400 font-bold text-sm uppercase">
                                            {data.type === 'spend' ? 'FCFA' : (data.type === 'happy_hour' ? 'X' : 'PTS')}
                                        </span>
                                    </div>
                                </div>
                                {errors.value && <p className="mt-2 text-sm font-bold text-red-500">{errors.value}</p>}
                            </div>

                            {/* Statut actif */}
                            <div className="pt-4 border-t border-slate-100">
                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                        />
                                        <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${data.is_active ? 'bg-orange-500' : 'bg-slate-200'}`}></div>
                                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out shadow-sm ${data.is_active ? 'transform translate-x-6' : ''}`}></div>
                                    </div>
                                    <div>
                                        <span className="text-sm font-bold text-slate-800 block">Activer cette règle</span>
                                        <span className="text-xs font-medium text-slate-500">Les clients cumuleront des points selon cette règle immédiatement.</span>
                                    </div>
                                </label>
                                {errors.is_active && <p className="mt-2 text-sm font-bold text-red-500">{errors.is_active}</p>}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-8">
                                <Link
                                    href={route('admin.point-rules.index')}
                                    className="px-6 py-2.5 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-colors"
                                >
                                    Annuler
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-900 hover:to-slate-800 text-white font-bold py-2.5 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={processing}
                                >
                                    {processing ? 'Création...' : 'Créer la règle'}
                                    {!processing && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
