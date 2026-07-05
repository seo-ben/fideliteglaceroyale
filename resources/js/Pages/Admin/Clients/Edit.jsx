import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ client }) {
    const { data, setData, put, processing, errors } = useForm({
        name: client.name || '',
        phone: client.phone || '',
        email: client.email || '',
        card_number: client.loyalty_card ? client.loyalty_card.card_number : '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.clients.update', client.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.clients.index')} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Modifier le Client</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">Mettez à jour le profil client ou sa carte de fidélité</p>
                    </div>
                </div>
            }
        >
            <Head title="Modifier le Client" />

            <div className="max-w-2xl mx-auto mt-8">
                <div className="bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/40 rounded-3xl border border-slate-100 overflow-hidden relative">
                    
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-bl-full -z-10"></div>

                    <form onSubmit={submit} className="p-10 space-y-8">
                        
                        <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-100">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 shadow-inner shadow-white/20 flex items-center justify-center text-white transform -rotate-3">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Mise à jour des informations</h3>
                                <p className="text-sm text-slate-500 leading-relaxed mt-1">
                                    Modifiez les données personnelles. Vous pouvez également scanner une nouvelle carte pour l'assigner à la place de l'ancienne.
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
                            />
                            {errors.email && <div className="text-red-500 text-xs font-bold mt-2">{errors.email}</div>}
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Numéro de Carte (Scan)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
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
                            <p className="text-xs text-slate-400 mt-2">
                                {client.loyalty_card 
                                    ? "Ce client possède déjà une carte. Scannez-en une nouvelle pour la remplacer." 
                                    : "Cliquez dans le champ et utilisez la douchette pour associer une carte."}
                            </p>
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
                                <span className="relative z-10">{processing ? 'Mise à jour...' : 'Enregistrer les modifications'}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
