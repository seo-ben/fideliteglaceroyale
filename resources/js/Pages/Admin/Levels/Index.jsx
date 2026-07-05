import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Index({ levels }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentLevelId, setCurrentLevelId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [levelToDelete, setLevelToDelete] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        points_required: '',
        reward_description: ''
    });

    const openCreateModal = () => {
        setIsEditing(false);
        setCurrentLevelId(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (level) => {
        setIsEditing(true);
        setCurrentLevelId(level.id);
        setData({
            name: level.name,
            points_required: level.points_required,
            reward_description: level.reward_description || '',
        });
        clearErrors();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => reset(), 300);
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.levels.update', currentLevelId), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.levels.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const openDeleteModal = (level) => {
        setLevelToDelete(level);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setTimeout(() => setLevelToDelete(null), 300);
    };

    const confirmDelete = () => {
        if (levelToDelete) {
            destroy(route('admin.levels.destroy', levelToDelete.id), {
                preserveScroll: true,
                onSuccess: () => {
                    closeDeleteModal();
                    if (isModalOpen) closeModal();
                },
            });
        }
    };

    const emojis = ['💖', '🤩', '🔥', '👑', '💎', '🚀', '🌟', '🏆'];

    // Calcul de la largeur totale du SVG basée sur le nombre de niveaux
    const svgWidth = Math.max(800, levels.length * 200 + 200);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Jungle des Niveaux</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">Le parcours de récompenses de vos clients</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2 transform hover:scale-[1.02]"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Nouveau Palier
                    </button>
                </div>
            }
        >
            <Head title="Jungle des Niveaux" />

            <div className="mt-8 pb-12">
                <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden relative">
                    
                    {/* Header bar of the map */}
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 sticky left-0 z-20">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <span className="text-2xl">🗺️</span> Parcours d'évolution
                        </h2>
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                            {levels.length} paliers configurés
                        </span>
                    </div>

                    {/* The Map Container */}
                    <div className="relative w-full overflow-x-auto overflow-y-hidden h-[400px] hide-scrollbar custom-map-bg">
                        {/* Define the animated background directly in the style or rely on a subtle pattern */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f97316 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
                        
                        {levels.length === 0 ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                    <span className="text-5xl">🌴</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-700">La jungle est vide !</h3>
                                <p className="text-slate-500 mt-2 text-lg max-w-md text-center">Commencez à tracer le chemin en ajoutant votre premier palier de récompense.</p>
                                <button
                                    onClick={openCreateModal}
                                    className="mt-6 bg-slate-800 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-900 transition-colors shadow-lg"
                                >
                                    Planter le premier palier
                                </button>
                            </div>
                        ) : (
                            <div className="relative h-full" style={{ width: svgWidth }}>
                                
                                {/* CSS for dash animation */}
                                <style>{`
                                    @keyframes dashFlow {
                                        to { stroke-dashoffset: -40; }
                                    }
                                `}</style>

                                {/* SVG Lines linking nodes */}
                                <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#ef4444" /> {/* red-500 */}
                                            <stop offset="100%" stopColor="#f97316" /> {/* orange-500 */}
                                        </linearGradient>
                                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                            <feGaussianBlur stdDeviation="4" result="blur" />
                                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                        </filter>
                                    </defs>
                                    
                                    {levels.map((level, i) => {
                                        if (i === levels.length - 1) return null;
                                        
                                        const cx1 = 100 + i * 200;
                                        const cy1 = i % 2 === 0 ? 100 : 300;
                                        const cx2 = 100 + (i + 1) * 200;
                                        const cy2 = (i + 1) % 2 === 0 ? 100 : 300;
                                        
                                        // Smooth S-curve path
                                        const d = `M ${cx1} ${cy1} C ${cx1 + 100} ${cy1}, ${cx2 - 100} ${cy2}, ${cx2} ${cy2}`;
                                        
                                        return (
                                            <g key={`path-${i}`}>
                                                {/* Thick semi-transparent shadow line */}
                                                <path
                                                    d={d}
                                                    fill="none"
                                                    stroke="#fdba74"
                                                    strokeWidth="12"
                                                    opacity="0.3"
                                                />
                                                {/* Animated dashed line */}
                                                <path
                                                    d={d}
                                                    fill="none"
                                                    stroke="url(#lineGradient)"
                                                    strokeWidth="6"
                                                    strokeDasharray="10 10"
                                                    style={{ animation: 'dashFlow 1s linear infinite' }}
                                                    filter="url(#glow)"
                                                />
                                            </g>
                                        );
                                    })}
                                </svg>

                                {/* Interactive Nodes */}
                                {levels.map((level, i) => {
                                    const cx = 100 + i * 200;
                                    const cy = i % 2 === 0 ? 100 : 300;
                                    
                                    return (
                                        <div 
                                            key={level.id}
                                            className="absolute z-10"
                                            style={{ left: cx, top: cy, transform: 'translate(-50%, -50%)' }}
                                        >
                                            <button 
                                                onClick={() => openEditModal(level)}
                                                className="relative flex flex-col items-center justify-center group transition-all duration-300 hover:scale-110 hover:-translate-y-2 focus:outline-none"
                                            >
                                                {/* The Node Bubble */}
                                                <div className="relative w-16 h-16 bg-white rounded-full shadow-2xl shadow-orange-500/30 border-[3px] border-white flex items-center justify-center text-3xl z-10 group-hover:shadow-orange-500/50 group-hover:border-orange-100 transition-all overflow-hidden">
                                                    {/* Background soft glow based on index */}
                                                    <div className="absolute inset-0 bg-orange-100 opacity-50"></div>
                                                    <span className="relative z-10 drop-shadow-md">{emojis[i % emojis.length]}</span>
                                                </div>
                                                
                                                {/* Tooltip / Info Card */}
                                                <div className={`absolute w-48 text-center transition-all duration-300 ${i % 2 === 0 ? 'top-[4.5rem] group-hover:top-[5rem]' : 'bottom-[4.5rem] group-hover:bottom-[5rem]'}`}>
                                                    <div className="bg-slate-800 text-white text-[10px] font-black tracking-widest uppercase rounded-full px-3 py-1 mb-2 inline-block shadow-lg">
                                                        {level.points_required} PTS
                                                    </div>
                                                    
                                                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-slate-100 group-hover:border-orange-200 transition-colors">
                                                        <h4 className="text-sm font-black text-slate-800 tracking-tight leading-tight mb-1.5">{level.name}</h4>
                                                        {level.reward_description ? (
                                                            <p className="text-[11px] font-bold text-orange-500 bg-orange-50 rounded-lg py-1.5 px-2 shadow-sm border border-orange-100 leading-snug line-clamp-2">
                                                                🎁 {level.reward_description}
                                                            </p>
                                                        ) : (
                                                            <p className="text-[10px] font-medium text-slate-400 italic">Aucune récompense</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Création/Édition */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="xl">
                <div className="p-8 relative">
                    {/* Delete button in top right of edit modal */}
                    {isEditing && (
                        <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); openDeleteModal({ id: currentLevelId, name: data.name }); }}
                            className="absolute top-8 right-16 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            title="Supprimer ce palier"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    )}

                    <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                                {isEditing ? 'Modifier le palier' : 'Planter un nouveau palier'}
                                <span className="text-3xl">{isEditing ? '🛠️' : '🌱'}</span>
                            </h2>
                            <p className="text-sm text-slate-500 font-medium mt-1">
                                {isEditing ? 'Ajustez les points ou la récompense' : 'Créez une nouvelle étape dans le parcours de vos clients'}
                            </p>
                        </div>
                        <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nom du Niveau</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-slate-800 font-bold focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                placeholder="ex: VIP Gold, Roi de la Jungle..."
                                required
                            />
                            {errors.name && <div className="text-red-500 text-xs font-bold mt-2">{errors.name}</div>}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Points Requis</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={data.points_required}
                                    onChange={e => setData('points_required', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 pr-16 rounded-xl text-slate-800 font-bold text-lg focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    placeholder="ex: 500"
                                    required
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm uppercase">pts</div>
                            </div>
                            {errors.points_required && <div className="text-red-500 text-xs font-bold mt-2">{errors.points_required}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Récompense (Optionnelle)</label>
                            <textarea
                                value={data.reward_description}
                                onChange={e => setData('reward_description', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-slate-800 font-medium focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                                placeholder="ex: 10% de réduction immédiate, 1 Burger offert..."
                                rows="3"
                            ></textarea>
                            {errors.reward_description && <div className="text-red-500 text-xs font-bold mt-2">{errors.reward_description}</div>}
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-8">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-6 py-2.5 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500 text-white font-bold py-2.5 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Sauvegarde...' : (isEditing ? 'Enregistrer' : 'Créer le palier')}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Modal de Suppression */}
            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal} maxWidth="md">
                <div className="p-8 text-center relative z-[60]">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">Abattre ce palier ?</h2>
                    <p className="text-slate-500 font-medium mb-8">
                        Êtes-vous sûr de vouloir supprimer le palier <span className="font-bold text-slate-700">"{levelToDelete?.name}"</span> de votre jungle ? Cette action est définitive.
                    </p>
                    
                    <div className="flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={closeDeleteModal}
                            className="px-6 py-2.5 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-red-500/30 transition-all flex items-center gap-2"
                            disabled={processing}
                        >
                            {processing ? 'Suppression...' : 'Oui, abattre'}
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
