import React from 'react';
import { cn } from '../lib/utils';
import { CheckCircle2 } from 'lucide-react';

export function TabInletKnalpot({ cylinders, totalCc, bore }: any) {
  const currentBore = parseFloat(bore || '0');
  
  // Fake catalog data based on screenshots
  const catalog = [
    {
       size: '50', target: 'HARIAN & TOURING',
       spek: 'Mesin Standar / Standar Porting',
       kebutuhan: 'Penggunaan Harian & Touring — Fokus Torsi Bawah',
       desc: 'Ideal untuk mesin pabrikan yang belum dimodifikasi. Torsi bawah-menengah optimal, efisiensi BBM terjaga, karakter mesin tetap nyaman untuk harian dan touring jarak jauh.',
       color: 'border-green-800'
    },
    {
       size: '55', target: 'STREET PERFORMANCE',
       spek: 'Porting Polish / Remap ECU / Ganti Knalpot Only',
       kebutuhan: 'Street Performance & Daily Racing',
       desc: 'Untuk mesin yang sudah disentuh ringan — porting polish, knalpot aftermarket, atau remap ECU. Aliran gas buang lebih lancar di RPM menengah tanpa kehilangan torsi bawah untuk harian.',
       color: 'border-blue-800'
    },
    {
       size: '60', target: 'ROAD RACE & TRACKDAY',
       spek: 'Porting Polish + Noken As Custom + ECU Standalone',
       kebutuhan: 'Road Race & Trackday',
       desc: 'Cocok untuk mesin dengan camshaft aftermarket durasi besar dan ECU standalone. Aliran gas buang optimal di RPM menengah-tinggi. Power delivery lebih linear dan konsisten di sirkuit.',
       color: 'border-yellow-800'
    },
    {
       size: '63', target: 'BRACKET / ROAD RACE OPEN',
       spek: 'Bore Up Piston 62-64mm + Klep Lebar + Per Klep Racing',
       kebutuhan: 'Bracket Race & Road Race Kelas Open',
       desc: 'Dirancang untuk mesin bore up dengan klep diameter lebih besar. Mendukung volume gas buang yang meningkat akibat perbesaran piston dan klep. Optimal di RPM tinggi dan karakter over-rev.',
       color: 'border-purple-800'
    },
    {
       size: '65-68', target: 'BALAP SPEK FFA',
       spek: 'Bore Up Piston 65mm + Stroke Up (Kruk As)',
       kebutuhan: 'Balap Spek FFA (Free For All)',
       desc: 'Untuk build bore up dengan stroke up. Displacement naik drastis sehingga volume gas buang meningkat signifikan. Diameter inlet memastikan aliran buang tidak menjadi bottleneck di RPM tinggi.',
       color: 'border-teal-800'
    },
    {
       size: '70', target: 'SPEK MONSTER FFA',
       spek: 'Bore Up Piston 66-67mm ke Atas + Stroke Up + Klep Lebar',
       kebutuhan: 'Spek Monster FFA — Maximum Power Output',
       desc: 'Batas maksimal build mesin. Piston yang dikombinasi stroke up ekstrim dan klep oversized menghasilkan volume gas buang terbesar. Inlet 70mm wajib agar power tidak tercekik.',
       color: 'border-[#4a1010]'
    }
  ];

  // Determine recommendation index based on bore and cc roughly
  let recIndex = 0;
  if (currentBore >= 66 || totalCc >= 250) {
    recIndex = 5; // 70mm
  } else if (currentBore >= 65 || totalCc >= 220) {
    recIndex = 4; // 65-68mm
  } else if (currentBore >= 62 || totalCc >= 180) {
    recIndex = 3; // 63mm
  } else if (currentBore >= 58 || totalCc >= 150) {
    recIndex = 2; // 60mm
  } else if (currentBore >= 54 || totalCc >= 125) {
    recIndex = 1; // 55mm
  } else {
    recIndex = 0; // 50mm
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="border border-teal-900/30 rounded-xl bg-[#020b12]">
        <div className="p-6 border-b border-teal-500/10">
          <h3 className="text-xs font-mono text-teal-400 mb-2 tracking-widest uppercase">REKOMENDASI SPEK INLET</h3>
          <p className="text-sm text-gray-400 mb-6">Berikut adalah ukuran inlet knalpot yang direkomendasikan berdasarkan spek bore {currentBore}mm dan kapasitas {Math.round(totalCc)}cc.</p>
          <span className="text-[10px] text-teal-500 font-mono tracking-widest block uppercase mb-4">KELOMPOK: {cylinders} SILINDER (UNIVERSAL)</span>

          <div className="space-y-2">
             {catalog.map((item, i) => {
               const isRec = i === recIndex;
               return (
                 <div key={i} className={cn("flex justify-between items-center p-4 rounded bg-[#06141c] border transition-colors", isRec ? "border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.2)] bg-teal-950/20" : "border-teal-500/10")}>
                   <div>
                     <p className="text-sm font-bold text-gray-200 uppercase tracking-wide">
                       TAHAP {i+1} — {item.target}
                     </p>
                     <p className="text-xs text-gray-500 mt-1 font-mono">Inlet: {item.size}mm</p>
                   </div>
                   {isRec && (
                     <div className="px-3 py-1 bg-teal-400 text-white text-[10px] font-mono font-bold rounded">
                       REKOMENDASI
                     </div>
                   )}
                 </div>
               );
             })}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-mono text-teal-400 mb-4 tracking-widest uppercase">DETAIL KATALOG EXHAUST</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {catalog.map((item, i) => {
             const isRec = i === recIndex;
             return (
               <div key={i} className={cn("rounded-lg bg-[#06141c] overflow-hidden border-t-2 h-full flex flex-col transition-all", item.color, isRec ? "ring-2 ring-teal-400/50" : "")}>
                  <div className="p-4 bg-gradient-to-b from-[#1a1a1a] to-[#111]">
                     <div className="flex justify-between items-start">
                       <div className="flex items-baseline gap-1 mb-1">
                          <span className={cn("text-3xl font-display font-bold", item.color.replace('border-', 'text-').replace('-800', '-500'))}>{item.size}</span>
                          <span className={cn("text-xs font-mono", item.color.replace('border-', 'text-').replace('-800', '-700'))}>MM</span>
                       </div>
                       {isRec && <CheckCircle2 className="w-5 h-5 text-teal-400" />}
                     </div>
                     <span className={cn("text-[9px] font-mono tracking-widest uppercase block mt-1", item.color.replace('border-', 'text-').replace('-800', '-600'))}>
                        {item.target}
                     </span>
                  </div>
                  <div className="p-4 pt-2 space-y-3 flex-grow flex flex-col">
                     <p className="text-[11px] leading-relaxed"><span className="text-gray-400">SPEK:</span> {item.spek}</p>
                     <p className="text-[11px] leading-relaxed"><span className="text-gray-400">KEBUTUHAN:</span> {item.kebutuhan}</p>
                     <p className="text-[11px] text-gray-500 leading-relaxed border-t border-teal-500/10 pt-3 mt-auto">{item.desc}</p>
                  </div>
               </div>
             );
           })}
        </div>
      </div>

    </div>
  );
}
