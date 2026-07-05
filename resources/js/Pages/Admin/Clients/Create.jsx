import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        email: '',
        card_number: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.clients.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.clients.index')} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Nouveau Client</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">Créez un profil client et associez une carte de fidélité</p>
                    </div>
                </div>
            }
        >
            <Head title="Nouveau Client" />

            <div className="max-w-2xl mx-auto mt-8">
                <div className="bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/40 rounded-3xl border border-slate-100 overflow-hidden relative">

                    {/* Decorative Background inside card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-bl-full -z-10"></div>

                    <form onSubmit={submit} className="p-10 space-y-8">

                        <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-100">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 shadow-inner shadow-white/20 flex items-center justify-center text-white transform -rotate-3">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Informations du Client</h3>
                                <p className="text-sm text-slate-500 leading-relaxed mt-1">
                                    Saisissez les informations de base. Vous pouvez scanner une carte vierge pour l'assigner immédiatement.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nom Complet <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-slate-50 border-0 border-b-2 border-slate-200 px-4 py-3 rounded-t-xl text-slate-800 focus:bg-white focus:border-orange-500 focus:ring-0 transition-all shadow-sm"
                                    required
                                    placeholder="Ex: Jean "
                                />
                                {errors.name && <div className="text-red-500 text-xs font-bold mt-2">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Téléphone <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full bg-slate-50 border-0 border-b-2 border-slate-200 px-4 py-3 rounded-t-xl text-slate-800 focus:bg-white focus:border-orange-500 focus:ring-0 transition-all shadow-sm"
                                    required
                                    placeholder="Ex: 06 12 34 56 78"
                                />
                                {errors.phone && <div className="text-red-500 text-xs font-bold mt-2">{errors.phone}</div>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Adresse Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full bg-slate-50 border-0 border-b-2 border-slate-200 px-4 py-3 rounded-t-xl text-slate-800 focus:bg-white focus:border-orange-500 focus:ring-0 transition-all shadow-sm"
                                placeholder="Ex: jean.t@email.com"
                            />
                            {errors.email && <div className="text-red-500 text-xs font-bold mt-2">{errors.email}</div>}
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Numéro de Carte (Scan)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                                </div>
                                <input
                                    type="text"
                                    value={data.card_number}
                                    onChange={e => setData('card_number', e.target.value)}
                                    className="w-full bg-slate-50 border-0 border-b-2 border-slate-200 pl-12 pr-4 py-4 rounded-t-xl text-slate-800 font-bold tracking-widest focus:bg-white focus:border-orange-500 focus:ring-0 transition-all shadow-sm"
                                    placeholder="Scannez ou saisissez la carte ici..."
                                    autoComplete="off"
                                />
                            </div>
                            {errors.card_number && <div className="text-red-500 text-xs font-bold mt-2">{errors.card_number}</div>}
                            <p className="text-xs text-slate-400 mt-2">Cliquez dans le champ et utilisez la douchette pour associer la carte.</p>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6 mt-8 border-t border-slate-100">
                            <Link
                                href={route('admin.clients.index')}
                                className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                            >
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="relative overflow-hidden group px-8 py-3 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-900 transition-colors disabled:opacity-50 shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40"
                            >
                                <span className="relative z-10">{processing ? 'Création...' : 'Créer le client'}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
