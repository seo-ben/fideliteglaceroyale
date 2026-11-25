<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Erreur Interne | {{ config('app.name', 'Fidélité Glace Royale') }}</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Outfit', sans-serif;
            background-color: #030712; /* Extreme dark */
        }
        /* Custom animated grid background */
        .grid-bg {
            background-size: 50px 50px;
            background-image: 
                linear-gradient(to right, rgba(245, 158, 11, 0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(245, 158, 11, 0.04) 1px, transparent 1px);
        }
        /* Radical glowing mesh spots */
        .spot-1 {
            background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(0,0,0,0) 70%);
        }
        .spot-2 {
            background: radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(0,0,0,0) 70%);
        }
        .spot-3 {
            background: radial-gradient(circle, rgba(217, 70, 239, 0.1) 0%, rgba(0,0,0,0) 70%);
        }
        /* Premium Card style with border gradient */
        .glass-card {
            background: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 
                0 4px 30px rgba(0, 0, 0, 0.4),
                0 0 40px rgba(245, 158, 11, 0.05),
                inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }
        /* Glitchy float keyframe */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
        }
        .animate-float {
            animation: float 5s ease-in-out infinite;
        }
        /* Button gradient animation */
        .btn-gradient {
            background: linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #d946ef 100%);
            background-size: 200% auto;
            transition: 0.5s;
        }
        .btn-gradient:hover {
            background-position: right center;
            box-shadow: 0 0 25px rgba(245, 158, 11, 0.45);
        }
    </style>
</head>
<body class="min-h-screen text-slate-100 flex items-center justify-center p-6 relative overflow-hidden select-none">
    
    <!-- Grid Overlay -->
    <div class="absolute inset-0 grid-bg pointer-events-none z-0"></div>

    <!-- Glowing spots -->
    <div class="absolute w-[800px] h-[800px] spot-1 -top-[300px] -left-[200px] pointer-events-none z-0"></div>
    <div class="absolute w-[800px] h-[800px] spot-2 -bottom-[300px] -right-[200px] pointer-events-none z-0"></div>
    <div class="absolute w-[600px] h-[600px] spot-3 top-[30%] left-[40%] pointer-events-none z-0 opacity-60"></div>

    <!-- Main Container -->
    <div class="relative z-10 w-full max-w-xl animate-float">
        
        <!-- Glowing ring around card -->
        <div class="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-red-600 to-fuchsia-500 rounded-[32px] blur-2xl opacity-20 pointer-events-none"></div>

        <div class="glass-card rounded-[28px] p-12 text-center relative overflow-hidden">
            
            <!-- Technical Grid Header element -->
            <div class="flex justify-between items-center text-[10px] font-mono text-amber-400/50 mb-8 border-b border-white/5 pb-4">
                <span>SYSTEM_STATUS: SERVER_ERROR_500</span>
                <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            </div>

            <!-- Error Code Container with Glow -->
            <div class="relative inline-block mb-2">
                <span class="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full scale-125"></span>
                <h1 class="relative text-[11rem] font-black leading-none tracking-tighter bg-gradient-to-br from-white via-amber-200 to-amber-950 bg-clip-text text-transparent">
                    500
                </h1>
            </div>

            <!-- Title -->
            <h2 class="text-3xl font-extrabold text-white mb-4 tracking-tight">
                Perturbation Système
            </h2>

            <!-- Message -->
            <p class="text-slate-400 text-base leading-relaxed max-w-md mx-auto mb-10">
                Une anomalie interne a été détectée sur nos serveurs. L'incident a été enregistré et nos équipes travaillent à rétablir la liaison.
            </p>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="/" class="w-full sm:w-auto btn-gradient text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform active:scale-95 text-center text-sm tracking-wider uppercase">
                    Retourner à la base
                </a>
            </div>

            <!-- Tech Footer element -->
            <div class="mt-12 text-[9px] font-mono text-slate-600">
                SMARTFLOW_LOYALTY_CORE_V1 // REF_ID: {{ time() }}
            </div>
        </div>
    </div>
</body>
</html>
