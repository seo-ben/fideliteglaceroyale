import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import { Transition } from '@headlessui/react';

export default function Settings({ auth, rules }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        rules: rules
    });

    const handleRuleChange = (index, field, value) => {
        const newRules = [...data.rules];
        newRules[index][field] = value;
        setData('rules', newRules);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Règles de Fidélité (Marketing)</h2>}
        >
            <Head title="Configuration des Règles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Paramétrage Global</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Activez et définissez les valeurs des différentes règles qui permettront à vos clients de gagner des points lors du passage en caisse.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {data.rules.map((rule, index) => (
                                <div key={rule.id} className={`p-4 border rounded-md flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-colors ${rule.is_active ? 'bg-white border-indigo-200 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-75'}`}>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold text-lg ${rule.is_active ? 'text-indigo-900' : 'text-gray-600'}`}>{rule.name}</h3>
                                        <p className="text-xs text-gray-400 font-mono mt-1">Identifiant: {rule.type}</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <InputLabel value="Valeur" />
                                            <TextInput
                                                type="number"
                                                step="0.01"
                                                className="mt-1 block w-28 text-center"
                                                value={rule.value}
                                                onChange={(e) => handleRuleChange(index, 'value', e.target.value)}
                                            />
                                        </div>
                                        
                                        <div className="flex flex-col items-center justify-center mt-5">
                                            <label className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                    <Checkbox 
                                                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                        checked={rule.is_active}
                                                        onChange={(e) => handleRuleChange(index, 'is_active', e.target.checked)}
                                                    />
                                                </div>
                                                <span className="ml-2 text-sm font-medium text-gray-700">Actif</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex items-center gap-4 pt-6 border-t mt-8">
                                <PrimaryButton disabled={processing}>Enregistrer les règles</PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out duration-300"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded">✅ Modifications enregistrées avec succès.</p>
                                </Transition>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
