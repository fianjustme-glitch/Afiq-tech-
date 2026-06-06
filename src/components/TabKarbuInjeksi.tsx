import React from 'react';
import { cn } from '../lib/utils';
import { AlertTriangle } from 'lucide-react';

export function TabKarbuInjeksi({ isInjection, totalCc, rasioKompresi }: any) {
  
  const remapLevels = [
    { range: '< 130 cc', title: 'Remap Ringan', desc: 'Fuel +8-12%, timing stock', tools: 'BRT Juken 3 / Juken 5 / Vortex Piggyback', min: 0, max: 130 },
    { range: '140-160 cc', title: 'Remap Menengah', desc: 'Fuel +12-18%, timing +2°', tools: 'BRT Juken 5+ / Powertronic', min: 130, max: 160 },
    { range: '160-250 cc', title: 'Remap Agresif', desc: 'Fuel +18-25%, timing +3°', tools: 'aRacer RC1 / aRacer RC Super X', min: 160, max: 250 },
    { range: '250-450 cc', title: 'Tuning 250cc+', desc: 'Custom fuel & ignition map', tools: 'aRacer Super X / Dynojet Power Commander / RapidBike', min: 250, max: 450 },
    { range: '450-800 cc', title: 'Moge Mid-weight', desc: 'ECU Reflash / Piggyback, custom mapping', tools: 'Woolich Racing / Dynojet PC6 / RapidBike Evo', min: 450, max: 800 },
    { range: '> 800 cc', title: 'Superbike Race', desc: 'Full mapping, telemetry, blipper tuning', tools: 'Woolich Racing / MoTeC / aRacer', min: 800, max: 99999 }
  ];

  const afrGuide = [
    { name: 'AFR Harian (stoichiometric)', val: '14.7 : 1' },
    { name: 'AFR Power Maksimal', val: '12.5-13.0 : 1' },
    { name: 'AFR Efisiensi BBM', val: '15.0-15.5 : 1' },
    { name: 'AFR Full Race / WOT', val: '11.5-12.5 : 1' }
  ];

  const busiGuide = [
    { color: 'Coklat Muda / Abu Kecoklatan', desc: 'Campuran ideal — AFR benar, setting sempurna', dot: 'bg-amber-600' },
    { color: 'Putih / Abu Terang', desc: 'Terlalu kurus (lean) — naikkan main jet atau tambah fuel map', dot: 'bg-gray-200' },
    { color: 'Hitam Basah / Jelaga', desc: 'Terlalu kaya (rich) — turunkan main jet atau kurangi fuel map', dot: 'bg-zinc-800 border border-gray-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
         <div className="bg-[#111] border border-white/5 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] text-gray-500 font-mono tracking-widest mb-1">CC KALKULATOR</span>
            <span className="text-xl font-display font-bold text-red-500">{totalCc > 0 ? totalCc.toFixed(1) : '-'}</span>
         </div>
         <div className="bg-[#111] border border-white/5 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] text-gray-500 font-mono tracking-widest mb-1">SISTEM</span>
            <span className="text-xl font-display font-bold text-red-500 uppercase">{isInjection ? 'FI' : 'KARBU'}</span>
         </div>
         <div className="bg-[#111] border border-white/5 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] text-gray-500 font-mono tracking-widest mb-1">KOMPRESI</span>
            <span className="text-xl font-display font-bold text-red-500">{rasioKompresi > 0 ? rasioKompresi.toFixed(2) : '-'}</span>
         </div>
      </div>

      <div className="border border-red-900/30 rounded-xl p-6 bg-[#0a0a0a]">
        <div>
           <label className="text-sm font-bold text-gray-200 block mb-2">Sistem Bahan Bakar</label>
           <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold tracking-widest">
             {isInjection ? 'INJEKSI (FI)' : 'KARBURATOR'}
           </div>
        </div>
      </div>

      {isInjection ? (
        <>
        <div className="border border-red-500/30 bg-red-950/10 rounded-xl p-6">
          <h3 className="text-[10px] font-mono text-red-500 mb-2 tracking-widest flex items-center gap-2">
            <AlertTriangle className="w-3 h-3" /> REKOMENDASI {totalCc >= 250 ? 'MOGE / BIG BIKE' : 'HARIAN & RACING'}
          </h3>
          <div className="flex gap-4 items-start mt-4">
             <div className="px-2 py-1 bg-red-600 rounded text-xs font-bold text-white font-mono">FI</div>
             <div>
                <h4 className="text-sm font-bold text-gray-200">
                  {totalCc >= 250 ? 'REFLASH / PIGGYBACK / STANDALONE' : 'ECU AFTERMARKET WAJIB'}
                </h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {totalCc >= 250 
                    ? 'Untuk mesin besar (>= 250cc), disarankan ECU Reflash (Woolich) atau Piggyback (Dynojet/RapidBike) untuk penggunaan jalan raya. Full Standalone (MoTeC, aRacer) direkomendasikan khusus spec balap.' 
                    : 'Full standalone ECU (BRT Juken / aRacer). Dyno tune mandatory apabila target kompresi > 11:1 atau ubahan kem (noken as) ekstrem.'}
                </p>
             </div>
          </div>
        </div>

        <div className="border border-red-900/30 rounded-xl p-6 bg-[#0a0a0a]">
          <h3 className="text-xs font-mono text-red-500 mb-4 tracking-widest">LEVEL REMAP ECU</h3>
          <div className="space-y-2">
            {remapLevels.map((lvl, i) => {
              const highlights = totalCc >= lvl.min && totalCc < lvl.max;
              
              return (
              <div key={i} className={cn("p-4 rounded-lg bg-[#111] border transition-colors flex justify-between", highlights ? "border-red-500/50" : "border-white/5" )}>
                 <div>
                    <span className="text-[10px] text-gray-500 font-mono block mb-1">{lvl.range}</span>
                    <p className="text-sm text-gray-300 mb-1">{lvl.desc}</p>
                    <p className="text-[10px] text-gray-600 font-mono">Tools: {lvl.tools}</p>
                 </div>
                 <div className="text-right flex flex-col justify-between">
                    <span className="text-xs text-gray-500">{lvl.title}</span>
                    {highlights && <span className="text-[10px] text-red-500 font-mono mt-2">← kamu</span>}
                 </div>
              </div>
            )})}
          </div>
        </div>
        </>
      ) : (
        <div className="border border-yellow-500/30 bg-yellow-950/10 rounded-xl p-6">
          <h3 className="text-[10px] font-mono text-yellow-500 mb-2 tracking-widest flex items-center gap-2">
            <AlertTriangle className="w-3 h-3" /> TUNING KARBURATOR
          </h3>
          <p className="text-sm text-gray-300 mt-4 leading-relaxed">Peringatan: Setingan karburator sangat dipengaruhi tekanan udara, suhu, dan kelembaban. Lakukan re-jetting (Pilot/Main Jet) secara bertahap.</p>
        </div>
      )}

      {/* Panduan AFR & Busi */}
      <div className="border border-red-900/30 rounded-xl p-6 bg-[#0a0a0a]">
         <h3 className="text-xs font-mono text-red-500 mb-4 tracking-widest">PANDUAN AFR</h3>
         <div className="space-y-1">
            {afrGuide.map((item, i) => (
              <div key={i} className="flex justify-between p-3 bg-[#111] border-b border-white/5 last:border-0">
                 <span className="text-xs text-gray-400">{item.name}</span>
                 <span className="text-xs font-mono text-green-500">{item.val}</span>
              </div>
            ))}
         </div>
      </div>

      <div className="border border-red-900/30 rounded-xl p-6 bg-[#0a0a0a]">
         <h3 className="text-xs font-mono text-red-500 mb-4 tracking-widest">BACA WARNA BUSI</h3>
         <div className="space-y-2">
            {busiGuide.map((item, i) => (
              <div key={i} className="flex p-4 rounded-lg bg-[#111] border border-white/5 gap-4">
                 <div className={cn("w-3 h-3 rounded-full mt-1 shrink-0", item.dot)}></div>
                 <div>
                    <p className="text-sm font-bold text-gray-200 mb-1">{item.color}</p>
                    <p className="text-[11px] text-gray-500">{item.desc}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>

    </div>
  );
}
