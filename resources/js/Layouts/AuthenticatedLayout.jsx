import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { name: 'Dashboard', href: route('dashboard'), active: route().current('dashboard'), icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Clients & Cartes', href: route('admin.clients.index'), active: route().current('admin.clients.*'), icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { name: 'Générateur Batch', href: route('admin.cards.generator'), active: route().current('admin.cards.*'), icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { name: 'Niveaux & Récompenses', href: route('admin.levels.index'), active: route().current('admin.levels.*'), icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
        { name: 'Règles de Fidélité', href: route('admin.point-rules.index'), active: route().current('admin.point-rules.*'), icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800 selection:bg-orange-500 selection:text-white">
            {/* Sidebar */}
            <aside className={`bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 ease-in-out z-20 flex flex-col ${sidebarOpen ? 'w-72' : 'w-20'}`}>
                <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
                    {sidebarOpen && (
                        <Link href="/" className="flex items-center gap-2 overflow-hidden">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30">FC</div>
                            <span className="text-xl font-black tracking-tight text-slate-900">Fidélité<span className="text-orange-500"> Glace Royale</span></span>
                        </Link>
                    )}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>

                <div className="flex-1 py-8 px-4 overflow-y-auto space-y-2">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${item.active ? 'bg-gradient-to-r from-red-500 to-orange-400 text-white shadow-lg shadow-orange-500/25 transform scale-[1.02]' : 'text-slate-500 hover:bg-slate-50 hover:text-orange-500'}`}>
                            <svg className={`w-5 h-5 shrink-0 transition-colors ${item.active ? 'text-white' : 'currentColor'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                            </svg>
                            <span className={`font-semibold whitespace-nowrap transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>{item.name}</span>
                        </Link>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-100">
                    <div className={`flex items-center gap-3 p-3 rounded-2xl bg-slate-50 ${!sidebarOpen && 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0 border border-white shadow-sm">
                            {user.name.charAt(0)}
                        </div>
                        {sidebarOpen && (
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold truncate text-slate-700">{user.name}</p>
                                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header Blur */}
                <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-100/50 px-8 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex-1">{header}</div>
                    <div className="flex items-center gap-4 ml-4 shrink-0">
                        {/* Notifications */}
                        <button className="relative p-2 text-slate-400 hover:text-orange-500 transition-colors">
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        </button>
                        <Link href={route('logout')} method="post" as="button" className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                            Déconnexion
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto relative">
                    {/* Background decorations */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto p-8 relative">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
