import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Welcome() {
    const teal = '#0b838e';
    const orange = '#eb8b22';

    const { data, setData, post, processing, errors } = useForm({
        card_number: '',
    });

    const [formattedNumber, setFormattedNumber] = useState('');

    const handleInputChange = (e) => {
        // Only allow digits and spaces
        let value = e.target.value.replace(/[^\d\s]/g, '');
        // Remove spaces for raw data
        const rawValue = value.replace(/\s+/g, '');
        
        // Auto-format with space after 5 digits
        let formatted = rawValue;
        if (rawValue.length > 5) {
            formatted = rawValue.slice(0, 5) + ' ' + rawValue.slice(5, 10);
        }

        setFormattedNumber(formatted);
        setData('card_number', rawValue);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('client.login'));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 selection:bg-teal-500 selection:text-white">
            <Head title="Espace Fidélité" />

            <div className="w-full max-w-lg mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
                    Mon Espace <span style={{ color: orange }}>Fidélité</span>
                </h1>
                <p className="text-slate-500 text-sm md:text-base">
                    Saisissez votre numéro de carte pour consulter vos points et vos récompenses.
                </p>
            </div>

            {errors.card_number && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r shadow-sm w-full max-w-[550px]">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700 font-medium">
                                {errors.card_number}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={submit} className="w-full flex flex-col items-center">
                
                {/* INTERACTIVE CARD */}
                <div className="relative w-full max-w-[550px] aspect-[550/348] bg-[#f9fdfd] rounded-2xl overflow-hidden shadow-2xl flex transition-transform hover:scale-[1.02] duration-300 ring-1 ring-black/5">
                    
                    {/* SVG Background Layer */}
                    <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 550 348" preserveAspectRatio="none">
                        <defs>
                            <pattern id="fidelPatternRecto" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                                <g stroke="#ffffff" fill="none" strokeWidth="1.5" opacity="0.04">
                                    <path d="M10,20 L10,35 L25,35 L25,20 Z" />
                                    <path d="M13,20 C13,10 22,10 22,20" />
                                    <path d="M50,15 L53,22 L60,22 L55,27 L57,34 L50,30 L43,34 L45,27 L40,22 L47,22 Z" />
                                    <rect x="25" y="55" width="15" height="15" />
                                    <path d="M32.5,55 L32.5,70 M25,62.5 L40,62.5" />
                                </g>
                            </pattern>
                        </defs>
                        
                        <path d="M0,0 L370,0 C250,120 230,220 280,348 L0,348 Z" fill={teal} />
                        <path d="M0,0 L370,0 C250,120 230,220 280,348 L0,348 Z" fill="url(#fidelPatternRecto)" />
                        <path d="M388,0 C268,120 248,220 298,348" fill="none" stroke={orange} strokeWidth="3" />
                        
                        <g stroke="#a8d0d6" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" transform="translate(420, 260) scale(0.9)">
                            <path d="M50,120 Q0,80 -50,0" />
                            <path d="M-50,0 C-70,-10 -60,20 -40,10" fill="#f9fdfd"/>
                            <path d="M-30,20 C-50,10 -40,40 -20,30" fill="#f9fdfd"/>
                            <path d="M-10,40 C-30,30 -20,60 0,50" fill="#f9fdfd"/>
                            <path d="M10,60 C-10,50 0,80 20,70" fill="#f9fdfd"/>
                            <path d="M30,80 C10,70 20,100 40,90" fill="#f9fdfd"/>
                            <path d="M-40,10 C-30,-10 -10,-10 -20,10" fill="#f9fdfd"/>
                            <path d="M-20,30 C-10,10 10,10 0,30" fill="#f9fdfd"/>
                            <path d="M0,50 C10,30 30,30 20,50" fill="#f9fdfd"/>
                            <path d="M20,70 C30,50 50,50 40,70" fill="#f9fdfd"/>
                        </g>
                    </svg>

                    <div className="absolute left-0 top-0 bottom-0 w-[55%] z-20 flex flex-col items-center text-white pt-6 md:pt-8 pb-6 md:pb-10 px-4 md:px-8">
                        <img src="/assets/images/logoci.png" alt="Logo" className="h-[80px] md:h-[130px] object-contain filter drop-shadow-lg mb-2 md:mb-4" />
                        <div className="text-center w-full">
                            <h2 className="text-[12px] md:text-[15px] font-bold leading-tight tracking-widest mb-1.5">VOTRE FIDÉLITÉ</h2>
                            <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
                                <svg className="w-2 md:w-2.5 h-2 md:h-2.5" style={{ color: orange }} fill="currentColor" viewBox="0 0 24 24" transform="rotate(-15)"><path d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9L12 2Z"/></svg>
                                <h2 className="text-[14px] md:text-[16px] font-extrabold leading-tight tracking-wide" style={{ color: orange }}>RÉCOMPENSÉE !</h2>
                                <svg className="w-2 md:w-2.5 h-2 md:h-2.5" style={{ color: orange }} fill="currentColor" viewBox="0 0 24 24" transform="rotate(15)"><path d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9L12 2Z"/></svg>
                            </div>
                            <svg className="w-3 h-3 md:w-3.5 md:h-3.5 mx-auto" style={{ color: orange }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                        </div>
                        <div className="flex justify-between items-end w-full md:w-[85%] mt-auto pb-2">
                            <div className="flex flex-col items-center">
                                <svg className="w-5 h-5 md:w-6 md:h-6 mb-1 md:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                <span className="text-[5px] md:text-[6.5px] font-extrabold tracking-[0.1em]">ACHETEZ</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <svg className="w-5 h-5 md:w-6 md:h-6 mb-1 md:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                                <span className="text-[5px] md:text-[6.5px] font-extrabold tracking-[0.1em] leading-tight text-center">CUMULEZ<br/>DES POINTS</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <svg className="w-5 h-5 md:w-6 md:h-6 mb-1 md:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v14M8 7H4M20 7h-4"></path></svg>
                                <span className="text-[5px] md:text-[6.5px] font-extrabold tracking-[0.1em] leading-tight text-center">RECEVEZ<br/>DES CADEAUX</span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute right-0 top-0 bottom-0 w-[45%] z-20 flex flex-col justify-center items-center">
                        <div className="absolute top-4 right-4 md:top-5 md:right-5 flex flex-col items-center">
                            <div className="p-1 border-[1.5px] rounded-[0.4rem] bg-white transition-all duration-300" style={{ borderColor: teal, transform: data.card_number ? 'scale(1.05)' : 'scale(1)' }}>
                                <img 
                                    src={data.card_number 
                                        ? `https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${data.card_number}&color=000000`
                                        : `https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=entrez_votre_numero&color=cbd5e1`} 
                                    alt="QR Code" 
                                    className="w-[50px] h-[50px] md:w-[70px] md:h-[70px]" 
                                />
                            </div>
                        </div>
                        <div className="absolute top-[35%] md:top-[140px] text-center w-full px-2 md:px-4 z-30 pl-4 md:pl-6">
                            <h2 className="text-[13px] md:text-[17px] font-extrabold tracking-[0.15em]" style={{ color: teal }}>CARTE DE FIDÉLITÉ</h2>
                            <p className="text-[6.5px] md:text-[8.5px] font-semibold mt-1 text-slate-500 tracking-wide">Plus vous achetez, plus vous gagnez !</p>
                            
                            <div className="mt-4 md:mt-8 relative z-50">
                                <label htmlFor="card_number" className="block text-[7px] md:text-[8px] font-extrabold uppercase tracking-widest mb-1.5" style={{ color: teal }}>
                                    Entrez votre numéro
                                </label>
                                <input
                                    id="card_number"
                                    type="text"
                                    name="card_number"
                                    value={formattedNumber}
                                    onChange={handleInputChange}
                                    placeholder="12345 67890"
                                    className={`w-4/5 md:w-3/4 mx-auto text-center font-mono font-bold tracking-[0.2em] md:tracking-[0.25em] text-[14px] md:text-[17px] bg-white/70 backdrop-blur-sm border-2 rounded-lg py-1 md:py-2 focus:outline-none transition-colors shadow-inner ${errors.card_number ? 'border-red-400 text-red-600' : 'border-teal-200/50 text-teal-800 focus:border-teal-500 focus:bg-white'}`}
                                    style={{ color: teal }}
                                    maxLength={11}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        type="submit"
                        disabled={processing || data.card_number.length < 5}
                        className={`px-8 py-3.5 rounded-full font-bold text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 ${processing || data.card_number.length < 5 ? 'bg-slate-300 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 hover:-translate-y-1'}`}
                    >
                        <span>Accéder à mes récompenses</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                </div>

            </form>
            
            <div className="mt-12 text-slate-400 text-xs text-center max-w-sm font-medium">
                © {new Date().getFullYear()} Ci Gusta! Reggio Emilia. <br/>
                Votre fidélité, notre plus belle récompense.
            </div>
        </div>
    );
}
