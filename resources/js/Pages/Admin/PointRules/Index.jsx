import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';

export default function Index({ auth, pointRules }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRuleId, setCurrentRuleId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [ruleToDelete, setRuleToDelete] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors, transform } = useForm({
        name: '',
        type: 'spend',
        custom_type: '',
        value: '',
        is_active: true,
        conditions: null,
    });

    transform((data) => ({
        ...data,
        type: data.type === 'custom' ? data.custom_type : data.type,
    }));

    const presetTypes = ['spend', 'welcome_bonus', 'happy_hour', 'visit_bonus'];

    const openCreateModal = () => {
        setIsEditing(false);
        setCurrentRuleId(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (rule) => {
        setIsEditing(true);
        setCurrentRuleId(rule.id);
        const isPreset = presetTypes.includes(rule.type);
        setData({
            name: rule.name,
            type: isPreset ? rule.type : 'custom',
            custom_type: isPreset ? '' : rule.type,
            value: rule.value,
            is_active: rule.is_active,
            conditions: rule.conditions || null,
        });
        clearErrors();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => reset(), 200); // Wait for modal animation
    };

    const submit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        
        if (isEditing) {
            put(route('admin.point-rules.update', currentRuleId), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.point-rules.store'), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const openDeleteModal = (rule) => {
        setRuleToDelete(rule);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setTimeout(() => setRuleToDelete(null), 300); // Wait for modal animation
    };

    const confirmDelete = () => {
        if (ruleToDelete) {
            destroy(route('admin.point-rules.destroy', ruleToDelete.id), {
                preserveScroll: true,
                onSuccess: () => closeDeleteModal(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Règles de Fidélité</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">Gérez l'attribution des points de vos clients</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2 transform hover:scale-[1.02]"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Nouvelle Règle
                    </button>
                </div>
            }
        >
            <Head title="Règles de Fidélité" />

            <div className="mt-8 pb-12">
                <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h2 className="text-lg font-bold text-slate-800">Toutes les règles actives et inactives</h2>
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                            {pointRules.length} règles
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="text-xs uppercase bg-slate-50 text-slate-400 border-b border-slate-100 font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Nom de la règle</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Valeur</th>
                                    <th className="px-6 py-4 text-center">Statut</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pointRules.map((rule) => (
                                    <tr key={rule.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-5 font-semibold text-slate-800">
                                            {rule.name}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 inline-flex text-xs font-bold rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                                                {rule.type === 'spend' && 'Dépense'}
                                                {rule.type === 'welcome_bonus' && 'Bonus Bienvenue'}
                                                {rule.type === 'happy_hour' && 'Happy Hour'}
                                                {rule.type === 'visit_bonus' && 'Bonus Visite'}
                                                {!['spend', 'welcome_bonus', 'happy_hour', 'visit_bonus'].includes(rule.type) && rule.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 font-bold text-orange-500">
                                            {rule.type === 'spend' && `${rule.value} FCFA = 1 pt`}
                                            {rule.type !== 'spend' && `+${rule.value} pts`}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            {rule.is_active ? (
                                                <span className="px-3 py-1 inline-flex items-center gap-1.5 text-xs font-bold rounded-lg bg-green-50 text-green-600 border border-green-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Actif
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 inline-flex items-center gap-1.5 text-xs font-bold rounded-lg bg-slate-50 text-slate-500 border border-slate-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Inactif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEditModal(rule)}
                                                    className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                                                    title="Modifier"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(rule)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {pointRules.length === 0 && (
                            <div className="py-16 text-center flex flex-col items-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                </div>
                                <p className="text-slate-500 font-medium text-lg">Aucune règle définie</p>
                                <p className="text-slate-400 text-sm mt-1 mb-6">Commencez par créer une règle pour attribuer des points.</p>
                                <button
                                    onClick={openCreateModal}
                                    className="text-orange-500 font-bold hover:text-orange-600 transition-colors flex items-center gap-1"
                                >
                                    Créer ma première règle <span aria-hidden="true">&rarr;</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Création/Édition */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800">
                                {isEditing ? 'Modifier la règle' : 'Nouvelle Règle'}
                            </h2>
                            <p className="text-sm text-slate-500 font-medium mt-1">
                                {isEditing ? 'Mettez à jour les paramètres de cette règle' : 'Définissez comment vos clients cumulent des points'}
                            </p>
                        </div>
                        <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <form className="space-y-6">
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
                        <div className="space-y-4">
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
                                        <option value="custom">Autre (Personnalisé)...</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                                {errors.type && <p className="mt-2 text-sm font-bold text-red-500">{errors.type}</p>}
                            </div>

                            {data.type === 'custom' && (
                                <div className="animate-fade-in-up">
                                    <label htmlFor="custom_type" className="block text-sm font-bold text-slate-700 mb-2">Saisissez votre type personnalisé</label>
                                    <input
                                        type="text"
                                        id="custom_type"
                                        placeholder="Ex: Bonus Anniversaire, Parrainage..."
                                        className="w-full bg-orange-50/30 border border-orange-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                                        value={data.custom_type}
                                        onChange={(e) => setData('custom_type', e.target.value)}
                                    />
                                    {errors.type && <p className="mt-2 text-sm font-bold text-red-500">Ce champ est requis.</p>}
                                </div>
                            )}
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

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div>
                                <span className="text-sm font-bold text-gray-800 block">
                                    {data.is_active ? 'Règle actuellement : Activée' : 'Règle actuellement : Désactivée'}
                                </span>
                                <span className="text-xs font-medium text-gray-500">
                                    {data.is_active 
                                        ? 'Les clients cumulent des points selon cette règle.' 
                                        : 'Cette règle est en pause, aucun point ne sera attribué.'}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setData('is_active', !data.is_active)}
                                style={{ backgroundColor: data.is_active ? '#f97316' : '#cbd5e1' }}
                                className="relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-inner"
                                role="switch"
                                aria-checked={data.is_active}
                            >
                                <span className="sr-only">Activer la règle</span>
                                <span
                                    aria-hidden="true"
                                    className={`${
                                        data.is_active ? 'translate-x-6' : 'translate-x-0'
                                    } pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                />
                            </button>
                        </div>
                        {errors.is_active && <p className="mt-1 text-sm font-bold text-red-500">{errors.is_active}</p>}

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-8">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-6 py-2.5 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                onClick={submit}
                                className="bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500 text-white font-bold py-2.5 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={processing}
                            >
                                {processing ? 'Enregistrement...' : (isEditing ? 'Enregistrer les modifications' : 'Créer la règle')}
                                {!processing && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Modal de Suppression */}
            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal} maxWidth="md">
                <div className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">Confirmer la suppression</h2>
                    <p className="text-slate-500 font-medium mb-8">
                        Êtes-vous sûr de vouloir supprimer la règle <span className="font-bold text-slate-700">"{ruleToDelete?.name}"</span> ? Cette action est définitive.
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
                            {processing ? 'Suppression...' : 'Oui, supprimer'}
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
