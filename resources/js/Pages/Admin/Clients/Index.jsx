import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, clients }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Répertoire Clients</h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">Gérez vos clients et leurs cartes de fidélité associées</p>
                </div>
            }
        >
            <Head title="Clients & Cartes" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Stats / Summary */}
                <div className="flex items-center gap-4">
                    <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Clients</p>
                            <p className="text-xl font-black text-slate-800">{clients.length}</p>
                        </div>
                    </div>
                </div>

                <Link
                    href={route('admin.clients.create')}
                    className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-300 bg-gradient-to-r from-red-500 to-orange-400 rounded-xl hover:from-red-600 hover:to-orange-500 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Nouveau Client
                </Link>
            </div>

            <div className="bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/40 rounded-3xl border border-slate-100 overflow-hidden">
                {clients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-700">Aucun client</h3>
                        <p className="text-slate-400 mt-2 max-w-sm">Vous n'avez pas encore ajouté de client à votre programme de fidélité.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">N° Carte</th>
                                    <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Statut / Niveau</th>
                                    <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {clients.map((client) => (
                                    <tr key={client.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold border border-white shadow-sm">
                                                    {(client.name || 'A').charAt(0).toUpperCase()}
                                                </div>
                                                <div className="font-bold text-slate-800">{client.name || 'Client Anonyme'}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-500 font-medium">{client.email || '—'}</div>
                                            <div className="text-xs text-slate-400 mt-0.5">{client.phone || '—'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {client.loyalty_card ? (
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-100 text-orange-600 font-bold text-sm shadow-sm">
                                                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                                    {client.loyalty_card.card_number.replace(/(\d{5})(\d{5})/, '$1 $2')}
                                                </div>
                                            ) : (
                                                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-400">Non assignée</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-lg font-black text-slate-800">{client.total_points}</span>
                                                    <span className="text-xs font-bold text-slate-400">pts</span>
                                                </div>
                                                {client.current_level && (
                                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-white">
                                                        {client.current_level.name}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link 
                                                    href={route('admin.clients.edit', client.id)} 
                                                    className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 transition-all opacity-0 group-hover:opacity-100"
                                                    title="Modifier le client"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                </Link>
                                                <Link 
                                                    href={route('admin.clients.show', client.id)} 
                                                    className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all opacity-0 group-hover:opacity-100"
                                                    title="Voir le profil"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
