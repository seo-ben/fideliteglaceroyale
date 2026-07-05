import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, recent_transactions, level_breakdown, recent_clients }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-slate-900">
                            Tableau de Bord
                        </h2>
                        <p className="text-sm text-slate-400 font-medium mt-1">
                            Vue d'ensemble de votre programme de fidélité CIGUSTA
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm text-xs font-semibold text-slate-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Synchronisé avec SmartFlow POS
                    </div>
                </div>
            }
        >
            <Head title="Tableau de Bord" />

            <div className="space-y-8">
                {/* Stats Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Clients Stat */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Clients</p>
                                <h3 className="text-4xl font-black text-slate-800 mt-2 tracking-tight">
                                    {stats.total_clients}
                                </h3>
                                <p className="text-xs font-semibold text-emerald-500 mt-2 flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                    Mise à jour automatique
                                </p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-orange-50 text-orange-500 border border-orange-100 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Points Stat */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Points Distribués</p>
                                <h3 className="text-4xl font-black text-slate-800 mt-2 tracking-tight">
                                    {stats.total_points.toLocaleString()}
                                </h3>
                                <p className="text-xs font-semibold text-slate-400 mt-2">
                                    Encours cumulé des clients
                                </p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-red-50 text-red-500 border border-red-100 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Cards Stat */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Cartes Générées</p>
                                <h3 className="text-4xl font-black text-slate-800 mt-2 tracking-tight">
                                    {stats.total_cards}
                                </h3>
                                <p className="text-xs font-medium text-slate-500 mt-2 flex items-center gap-2">
                                    <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-600 text-[10px]">{stats.assigned_cards} actives</span>
                                    <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-50/50 font-bold text-indigo-600 border border-indigo-100/50 text-[10px]">{stats.unassigned_cards} libres</span>
                                </p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-500 border border-indigo-100 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column (col-span-2) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Recent Clients Section */}
                        <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="text-lg font-black text-slate-800">Derniers Clients Enregistrés</h3>
                                <Link href={route('admin.clients.index')} className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1 group">
                                    Voir tout
                                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                                </Link>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                                            <th className="py-4 px-6">Client</th>
                                            <th className="py-4 px-4">Contact</th>
                                            <th className="py-4 px-4">Niveau / Carte</th>
                                            <th className="py-4 px-6 text-right">Points</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        {recent_clients.length > 0 ? (
                                            recent_clients.map((client) => (
                                                <tr key={client.id} className="hover:bg-slate-50/40 transition-colors">
                                                    <td className="py-4 px-6">
                                                        <Link href={route('admin.clients.show', client.id)} className="font-bold text-slate-800 hover:text-orange-500 transition-colors">
                                                            {client.name}
                                                        </Link>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <p className="text-xs text-slate-500 font-semibold">{client.phone}</p>
                                                        <p className="text-[10px] text-slate-400 truncate max-w-[150px]">{client.email}</p>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 mb-1">
                                                            {client.level}
                                                        </span>
                                                        <p className="text-[10px] font-mono font-medium text-slate-400">Card: {client.card_number}</p>
                                                    </td>
                                                    <td className="py-4 px-6 text-right font-black text-slate-800">
                                                        {client.total_points}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="py-8 text-center text-slate-400 font-medium">
                                                    Aucun client enregistré pour le moment.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recent Transactions Section */}
                        <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                            <div className="p-6 border-b border-slate-50">
                                <h3 className="text-lg font-black text-slate-800">Activité Récente</h3>
                            </div>

                            <div className="p-6 space-y-5">
                                {recent_transactions.length > 0 ? (
                                    recent_transactions.map((transaction) => (
                                        <div key={transaction.id} className="flex justify-between items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 hover:border-slate-200/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2.5 rounded-xl border ${transaction.type === 'credit' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                                    {transaction.type === 'credit' ? (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                                                    ) : (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"></path></svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-700">
                                                        {transaction.client_name}
                                                    </p>
                                                    <p className="text-xs text-slate-400 font-medium">
                                                        {transaction.note} • Par {transaction.created_by}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-base font-black ${transaction.type === 'credit' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                    {transaction.type === 'credit' ? '+' : '-'}{transaction.points} pts
                                                </span>
                                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{transaction.created_at}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center py-6 text-slate-400 font-medium">
                                        Aucune transaction récente enregistrée.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (col-span-1) */}
                    <div className="space-y-8">
                        
                        {/* Levels & Distribution */}
                        <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] p-6">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                                <h3 className="text-lg font-black text-slate-800">Distribution par Palier</h3>
                                <Link href={route('admin.levels.index')} className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors">Gérer</Link>
                            </div>
                            
                            <div className="space-y-6">
                                {level_breakdown.length > 0 ? (
                                    level_breakdown.map((level, idx) => {
                                        const percentage = stats.total_clients > 0 
                                            ? Math.round((level.clients_count / stats.total_clients) * 100) 
                                            : 0;
                                        
                                        // Dynamic level styling colors
                                        const colors = [
                                            { bg: 'bg-amber-100', text: 'text-amber-700', bar: 'bg-amber-500' }, // Bronze
                                            { bg: 'bg-slate-100', text: 'text-slate-700', bar: 'bg-slate-400' }, // Silver
                                            { bg: 'bg-yellow-100', text: 'text-yellow-800', bar: 'bg-yellow-500' }, // Gold
                                        ];
                                        const color = colors[idx % colors.length];

                                        return (
                                            <div key={level.name} className="space-y-2">
                                                <div className="flex justify-between items-center text-xs font-semibold">
                                                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${color.bg} ${color.text}`}>
                                                        {level.name}
                                                    </span>
                                                    <span className="text-slate-500">
                                                        {level.clients_count} clients ({percentage}%)
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                                    <div className={`h-full rounded-full transition-all duration-500 ${color.bar}`} style={{ width: `${percentage}%` }}></div>
                                                </div>
                                                <p className="text-[10px] text-slate-400 font-medium">Requis : {level.points_required} points</p>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-center py-6 text-slate-400 font-medium">
                                        Aucun niveau configuré.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions Card */}
                        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[24px] shadow-2xl p-6 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>
                            
                            <h3 className="text-lg font-black tracking-tight mb-2">Actions Rapides</h3>
                            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                                Accédez instantanément aux fonctionnalités clés de gestion.
                            </p>

                            <div className="space-y-3 relative z-10">
                                <Link href={route('admin.cards.generator')} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group-hover:-translate-y-0.5 duration-300">
                                    <span className="text-xs font-bold">Générateur Batch Cartes</span>
                                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                                </Link>

                                <Link href={route('admin.clients.create')} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group-hover:-translate-y-0.5 duration-300">
                                    <span className="text-xs font-bold">Créer un Client</span>
                                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                                </Link>

                                <Link href={route('admin.point-rules.index')} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group-hover:-translate-y-0.5 duration-300">
                                    <span className="text-xs font-bold">Règles & Barèmes</span>
                                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
