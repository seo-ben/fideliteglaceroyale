import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
            <Head title="Connexion Admin" />

            {/* Arrière-plan : Logo très flouté */}
            <div 
                className="absolute inset-0 z-0 opacity-40 blur-3xl scale-110"
                style={{
                    backgroundImage: "url('/assets/images/logoci.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>
            
            {/* Voile sombre pour s'assurer que la carte ressort bien */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            {/* Container 3D */}
            <div className="relative z-10 perspective-[1500px]">
                
                {/* La Carte (Dimensions exactes de carte de crédit : 85.6mm x 53.98mm -> ratio 1.586) */}
                {/* Ici on utilise w-[400px] h-[252px] avec de beaux arrondis */}
                <div 
                    className="w-[400px] h-[252px] relative transform -rotate-12 rotate-y-12 rotate-x-6 shadow-[20px_30px_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden bg-gradient-to-br from-[#f25c54] via-[#f48c06] to-[#ffba08] border border-white/20 transition-all duration-700 hover:-translate-y-2 hover:-rotate-6 hover:shadow-[30px_40px_60px_rgba(0,0,0,0.4)] group"
                    style={{
                        transformStyle: 'preserve-3d',
                    }}
                >
                    
                    {/* Effet de reflet (Shine) sur la carte */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-[100%] group-hover:translate-x-[100%] transition-all duration-1000 z-0"></div>

                    {status && (
                        <div className="absolute top-0 left-0 right-0 text-center text-[10px] font-bold text-white bg-black/30 p-1 z-20 backdrop-blur-md">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="absolute inset-0 flex flex-col justify-center px-10 py-6 z-10">
                        
                        {/* Puce électronique stylisée (Simulée avec CSS) */}
                        <div className="w-10 h-8 rounded border border-white/30 bg-white/10 mb-4 ml-1 flex flex-col justify-between p-[2px] opacity-80 shadow-inner">
                            <div className="w-full h-[1px] bg-white/20"></div>
                            <div className="w-full h-[1px] bg-white/20"></div>
                            <div className="w-full h-[1px] bg-white/20"></div>
                        </div>

                        <div className="space-y-3 relative z-20">
                            <div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full bg-black/10 border-0 border-b border-white/30 text-white placeholder-white/70 rounded-t-md px-3 py-1.5 text-sm focus:outline-none focus:ring-0 focus:border-white focus:bg-black/20 transition-all shadow-inner"
                                    placeholder="Adresse Email"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-1 text-white font-bold bg-black/40 px-2 py-0.5 rounded text-[9px] w-fit shadow-md" />
                            </div>

                            <div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full bg-black/10 border-0 border-b border-white/30 text-white placeholder-white/70 rounded-t-md px-3 py-1.5 text-sm focus:outline-none focus:ring-0 focus:border-white focus:bg-black/20 transition-all shadow-inner"
                                    placeholder="Mot de passe"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-1 text-white font-bold bg-black/40 px-2 py-0.5 rounded text-[9px] w-fit shadow-md" />
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <label className="flex items-center cursor-pointer group-checkbox">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="bg-black/20 border-white/30 w-3 h-3 text-orange-500 focus:ring-white/50 rounded-sm"
                                    />
                                    <span className="ml-1.5 text-[10px] text-white/80 font-medium tracking-wide">
                                        Mémoriser
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-[10px] text-white/70 hover:text-white underline transition-colors"
                                    >
                                        Oublié ?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-white/90 text-orange-600 font-bold tracking-wider text-[11px] rounded shadow-lg px-4 py-2.5 mt-2 hover:bg-white focus:outline-none transition-all active:scale-95 disabled:opacity-70 flex justify-center uppercase"
                            >
                                {processing ? 'Connexion...' : 'S\'identifier'}
                            </button>
                        </div>

                    </form>
                </div>

                {/* Ombre portée au sol pour renforcer l'effet 3D de la carte */}
                <div className="absolute -bottom-10 left-4 w-[350px] h-[30px] bg-black/60 blur-2xl transform -rotate-12 rounded-[100%] z-0 pointer-events-none"></div>
            </div>
        </div>
    );
}
