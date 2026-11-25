import { Head } from '@inertiajs/react';

export default function PrintBatch({ cards }) {
    // Exact Colors from the Glace Royale Logo
    const logoBlue = '#4dd1fb';
    const teal = '#0284c7';
    const orange = '#eb8b22';
    const lightTeal = '#e0f6fe';

    // Scaling to fit 89.6mm x 58mm (including bleed)
    // 58mm is ~219px. 348px * 0.63 = 219px.
    const scale = 0.63;

    return (
        <div className="print-container bg-gray-100 min-h-screen">
            <Head title="Impression des cartes" />
            
            {/* CSS Injecté pour l'impression */}
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
                .font-cursive { font-family: 'Dancing Script', cursive; }
                .font-card { font-family: 'Share Tech Mono', monospace; }
                
                @media print {
                    @page {
                        size: 550px 348px; /* Proportions parfaites de la carte, PDF en haute résolution vectorielle */
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        background: white;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .print-container {
                        background: white !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .print-page {
                        page-break-after: always;
                        page-break-inside: avoid;
                        margin: 0;
                        padding: 0;
                        width: 550px;
                        height: 348px;
                        overflow: hidden;
                        position: relative;
                        background: white;
                    }
                }

                @media screen {
                    .print-page {
                        width: 550px;
                        height: 348px;
                        overflow: hidden;
                        position: relative;
                        background: white;
                        margin: 20px auto;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        border: 1px solid #e5e7eb;
                    }
                }
            `}} />

            <div className="no-print text-center py-4 bg-white border-b shadow-sm sticky top-0 z-50">
                <h1 className="text-xl font-bold text-slate-800 mb-2">Prêt pour l'impression ({cards.length} cartes générées)</h1>
                <p className="text-sm text-slate-600 mb-4">
                    Appuyez sur <kbd className="bg-gray-100 px-2 py-1 rounded">Ctrl + P</kbd> (ou Cmd + P sur Mac) pour imprimer.<br/>
                    Choisissez <strong>"Enregistrer au format PDF"</strong>. Assurez-vous que les options <em>"Graphiques d'arrière-plan"</em> sont <strong>activées</strong>, et que les <em>"Marges"</em> sont définies sur <strong>"Aucune"</strong>.
                </p>
                <button onClick={() => window.print()} className="bg-[#0c7b80] hover:bg-[#095f63] text-white px-6 py-2 rounded-lg font-bold shadow-md">
                    Ouvrir la fenêtre d'impression
                </button>
            </div>

            <div className="print-content flex flex-col items-center">
                {cards.map((card, index) => (
                    <div key={card.id}>
                        {/* RECTO */}
                        <div className="print-page flex items-center justify-center">
                            <div className="relative w-[550px] h-[348px] bg-[#f9fdfd] overflow-hidden flex">
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
                                        
                                        <path d="M0,0 L370,0 C250,120 230,220 280,348 L0,348 Z" fill={logoBlue} />
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

                                    <div className="absolute left-0 top-0 bottom-0 w-[55%] z-20 flex flex-col items-center text-white pt-8 pb-10 px-8">
                                        <img src="/assets/images/logoci.png" alt="Logo" className="h-[130px] object-contain filter drop-shadow-lg mb-4" />
                                        <div className="text-center w-full">
                                            <h2 className="text-[15px] font-bold leading-tight tracking-widest mb-1.5">VOTRE FIDÉLITÉ</h2>
                                            <div className="flex items-center justify-center gap-2 mb-6">
                                                <svg className="w-2.5 h-2.5" style={{ color: orange }} fill="currentColor" viewBox="0 0 24 24" transform="rotate(-15)"><path d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9L12 2Z"/></svg>
                                                <h2 className="text-[16px] font-extrabold leading-tight tracking-wide" style={{ color: orange }}>RÉCOMPENSÉE !</h2>
                                                <svg className="w-2.5 h-2.5" style={{ color: orange }} fill="currentColor" viewBox="0 0 24 24" transform="rotate(15)"><path d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9L12 2Z"/></svg>
                                            </div>
                                            <svg className="w-3.5 h-3.5 mx-auto" style={{ color: orange }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                                        </div>
                                        <div className="flex justify-between items-end w-[85%] mt-auto pb-2">
                                            <div className="flex flex-col items-center">
                                                <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                                <span className="text-[6.5px] font-extrabold tracking-[0.1em]">ACHETEZ</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                                                <span className="text-[6.5px] font-extrabold tracking-[0.1em] leading-tight text-center">CUMULEZ<br/>DES POINTS</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v14M8 7H4M20 7h-4"></path></svg>
                                                <span className="text-[6.5px] font-extrabold tracking-[0.1em] leading-tight text-center">RECEVEZ<br/>DES CADEAUX</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute right-0 top-0 bottom-0 w-[45%] z-20 flex flex-col justify-center items-center">
                                        <div className="absolute top-5 right-5 flex flex-col items-center">
                                            <div className="p-1 border-[1.5px] rounded-[0.4rem] bg-white" style={{ borderColor: teal }}>
                                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${window.location.origin}/c/${card.qr_token}&color=000000`} alt="QR Code" className="w-[70px] h-[70px]" />
                                            </div>
                                            <div className="text-center mt-1.5 w-[85px]">
                                                <p className="text-[6.5px] font-black tracking-widest leading-[1.3]" style={{ color: teal }}>SCANNEZ &<br/>DÉCOUVREZ<br/>VOS POINTS !</p>
                                            </div>
                                        </div>
                                        <div className="absolute top-[140px] text-center w-full px-4 z-10 pl-6">
                                            <h2 className="text-[17px] font-extrabold tracking-[0.15em]" style={{ color: teal }}>CARTE DE FIDÉLITÉ</h2>
                                            <p className="text-[8.5px] font-semibold mt-1 text-slate-500 tracking-wide">Plus vous achetez, plus vous gagnez !</p>
                                            <div className="flex items-center justify-center gap-3 mt-4 mb-6">
                                                <div className="h-[1.5px] w-6 bg-orange-400"></div>
                                                <svg className="w-3.5 h-3.5" style={{ color: orange }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                                                <div className="h-[1.5px] w-6 bg-orange-400"></div>
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-extrabold uppercase tracking-widest mb-1.5" style={{ color: teal }}>Numéro Unique</p>
                                                <div className="inline-block font-card font-bold tracking-[0.25em] text-[17px] mt-1" style={{ color: teal, textShadow: '1px 1px 1px rgba(0,0,0,0.15), -1px -1px 1px rgba(255,255,255,0.8)' }}>
                                                    {card.card_number.replace(/(\d{5})(\d{5})/, '$1 $2')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        {/* VERSO */}
                        <div className="print-page flex items-center justify-center">
                            <div className="relative w-[550px] h-[348px] bg-white overflow-hidden flex">
                                <div className="absolute bottom-0 right-0 w-[60%] h-[40px] z-0 rounded-br-[1.5rem]" style={{ backgroundColor: lightTeal }}></div>
                                    
                                    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 550 348" preserveAspectRatio="none">
                                        <defs>
                                            <pattern id="fidelPatternVerso" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                                                <g stroke="#ffffff" fill="none" strokeWidth="1.5" opacity="0.04">
                                                    <path d="M10,20 L10,35 L25,35 L25,20 Z" />
                                                    <path d="M13,20 C13,10 22,10 22,20" />
                                                    <path d="M50,15 L53,22 L60,22 L55,27 L57,34 L50,30 L43,34 L45,27 L40,22 L47,22 Z" />
                                                    <rect x="25" y="55" width="15" height="15" />
                                                    <path d="M32.5,55 L32.5,70 M25,62.5 L40,62.5" />
                                                </g>
                                            </pattern>
                                        </defs>

                                        <path d="M0,0 L290,0 C210,120 210,228 290,348 L0,348 Z" fill={orange} />
                                        <path d="M0,0 L260,0 C180,120 180,228 260,348 L0,348 Z" fill={logoBlue} />
                                        <path d="M0,0 L260,0 C180,120 180,228 260,348 L0,348 Z" fill="url(#fidelPatternVerso)" />
                                        
                                        <g transform="translate(30, 315) scale(1.1)" opacity="0.95">
                                            <path d="M8,2 C25,-10 40,5 25,20 C15,30 0,40 5,20" fill="#f9fdfd" opacity="0.9"/>
                                            <path d="M0,10 C15,-5 30,15 15,30 C5,40 -10,50 -5,30" fill="#f9fdfd" opacity="0.9" transform="rotate(40)"/>
                                            <circle cx="0" cy="0" r="14" fill="#ffffff" />
                                            <circle cx="0" cy="0" r="5" fill={orange} />
                                        </g>
                                    </svg>

                                    <div className="absolute left-0 top-0 bottom-0 w-[35%] z-20 flex flex-col items-center py-8 px-4 text-white text-center">
                                        <img src="/assets/images/logoci.png" alt="Logo" className="h-[100px] w-full max-w-[140px] object-contain filter drop-shadow-md mb-4" />
                                        <h3 className="text-[22px] font-cursive leading-tight tracking-wide mb-4">Merci pour<br/>votre fidélité !</h3>
                                        <svg className="w-3.5 h-3.5 mb-10" style={{ color: orange }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                                        <p className="text-[8px] leading-[1.5] font-bold tracking-wide mt-auto">
                                            Cette carte est personnelle,<br/>
                                            non cessible et reste la propriété<br/>
                                            de Glace Royale.
                                        </p>
                                    </div>

                                    <div className="absolute right-0 top-0 bottom-0 w-[60%] z-20 flex flex-col pt-8">
                                        <div className="flex items-center justify-center gap-3 mb-6 pr-6 pl-4">
                                            <div className="flex flex-col gap-[2.5px] items-end opacity-80">
                                                <div className="w-2.5 h-[1.5px] rounded-full rotate-[15deg]" style={{ backgroundColor: orange }}></div>
                                                <div className="w-3.5 h-[1.5px] rounded-full" style={{ backgroundColor: orange }}></div>
                                                <div className="w-2.5 h-[1.5px] rounded-full -rotate-[15deg]" style={{ backgroundColor: orange }}></div>
                                            </div>
                                            <h3 className="text-[11.5px] font-black tracking-[0.08em]" style={{ color: teal }}>COMMENT ÇA MARCHE ?</h3>
                                            <div className="flex flex-col gap-[2.5px] items-start opacity-80">
                                                <div className="w-2.5 h-[1.5px] rounded-full -rotate-[15deg]" style={{ backgroundColor: orange }}></div>
                                                <div className="w-3.5 h-[1.5px] rounded-full" style={{ backgroundColor: orange }}></div>
                                                <div className="w-2.5 h-[1.5px] rounded-full rotate-[15deg]" style={{ backgroundColor: orange }}></div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center items-center gap-4 mb-6 pr-6 pl-4">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#edf6f7', color: teal }}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                                </div>
                                                <p className="text-[6.5px] font-extrabold leading-tight tracking-wider" style={{ color: teal }}>PRÉSENTEZ<br/>VOTRE CARTE</p>
                                            </div>
                                            <svg className="w-3 h-3 text-slate-300 -mt-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#edf6f7', color: teal }}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                                                </div>
                                                <p className="text-[6.5px] font-extrabold leading-tight tracking-wider" style={{ color: teal }}>CUMULEZ<br/>DES POINTS</p>
                                            </div>
                                            <svg className="w-3 h-3 text-slate-300 -mt-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#edf6f7', color: teal }}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v14M8 7H4M20 7h-4"></path></svg>
                                                </div>
                                                <p className="text-[6.5px] font-extrabold leading-tight tracking-wider" style={{ color: teal }}>OBTENEZ<br/>VOS RÉCOMPENSES</p>
                                            </div>
                                        </div>

                                        <div className="w-[60%] border-t-[1.5px] border-dashed border-teal-200/60 mb-4 ml-6"></div>

                                        <div className="flex-1 relative w-full pl-4 pr-6 flex items-center justify-between pb-4">
                                            <div className="w-[50%]">
                                                <h4 className="text-[9.5px] font-black mb-1.5 tracking-wide" style={{ color: teal }}>CONSULTEZ VOS POINTS</h4>
                                                <p className="text-[7px] text-slate-600 mb-3 font-semibold tracking-wide">Scannez le QR Code ou rendez-vous sur</p>
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[8px] font-bold shadow-md w-max" style={{ backgroundColor: teal }}>
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                                                    {window.location.host}
                                                </div>
                                            </div>

                                            <div className="w-[85px] h-[160px] bg-white border-[3px] border-slate-800 rounded-[1.2rem] shadow-[0_15px_25px_-5px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col items-center pt-3 z-10 mr-2 -mt-6 rotate-[5deg]">
                                                <div className="w-6 h-[2px] bg-slate-800 rounded-full mb-2"></div>
                                                <img src="/assets/images/logoci.png" alt="Logo" className="w-10 mb-1.5 object-contain" />
                                                <p className="text-[5px] font-extrabold text-gray-500 mb-1.5">Bonjour !</p>
                                                <div className="w-[85%] h-12 bg-[#f4f8f9] rounded-lg border border-gray-100 flex flex-col items-center justify-center shadow-sm">
                                                    <p className="text-[4px] text-gray-400 font-bold uppercase tracking-wide">Vos points actuels</p>
                                                    <p className="text-[12px] font-black mt-0.5" style={{ color: teal }}>★★★★</p>
                                                </div>
                                                <p className="text-[4.5px] text-gray-400 mt-2 text-center leading-tight font-medium">Prochaine récompense<br/>dans ★★★ points</p>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-0 right-0 w-full h-[40px] flex items-center px-6 z-20 pointer-events-none" style={{ color: teal }}>
                                            <div className="flex-1 flex justify-between items-center pr-[10px] pl-[55px] pointer-events-auto">
                                                <div className="flex items-center gap-1.5 text-[6.5px] font-extrabold tracking-widest leading-tight">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                    SÉCURISÉE • UNIQUE •<br/>PERSONNELLE
                                                </div>
                                                <div className="flex items-center gap-1.5 pl-2">
                                                    <span className="text-[11px] font-cursive tracking-wide">Votre fidélité, notre plus belle récompense.</span>
                                                    <svg className="w-3 h-3" style={{ color: orange }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    );
}
