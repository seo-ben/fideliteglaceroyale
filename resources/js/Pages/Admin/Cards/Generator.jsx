import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Generator({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        quantity: 50,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.cards.generate'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Générateur de Cartes (Batch)</h2>}
        >
            <Head title="Générateur de Cartes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium mb-4">Générer des cartes vierges pour impression</h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Cet outil génère de nouvelles cartes de fidélité non assignées. Un numéro unique et un QR Code seront créés pour chaque carte.
                                Une fois générées, une page spéciale s'ouvrira, prête à être exportée en PDF (haute définition, avec marges) pour votre imprimeur.
                            </p>

                            <form onSubmit={submit} className="space-y-6 max-w-md">
                                <div>
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                        Nombre de cartes à générer
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        min="1"
                                        max="500"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0c7b80] focus:ring-[#0c7b80] sm:text-sm"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                    />
                                    {errors.quantity && <p className="mt-2 text-sm text-red-600">{errors.quantity}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-[#0c7b80] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#095f63] focus:outline-none focus:ring-2 focus:ring-[#0c7b80] focus:ring-offset-2"
                                >
                                    {processing ? 'Génération en cours...' : 'Générer et Imprimer'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
