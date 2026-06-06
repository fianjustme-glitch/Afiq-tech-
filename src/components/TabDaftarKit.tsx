import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { ShieldAlert, Wrench } from 'lucide-react';

export function TabDaftarKit() {
  const [modLevel, setModLevel] = useState(0);

  const modLists = [
    { name: 'MESIN STANDAR', desc: 'Belum ada modifikasi internal apapun.' },
    { name: 'PORTING POLISH + KNALPOT / REMAP ECU', desc: 'Saluran gas diperhalus, knalpot racing, ECU di-remap ringan.' },
    { name: 'NOKEN AS CUSTOM + ECU STANDALONE', desc: 'Camshaft aftermarket, per klep racing, ECU standalone.' },
    { name: 'BORE UP BASIC + KLEP LEBAR', desc: 'Piston oversize 62-64mm, klep diperbesar, injektor besar.' },
    { name: 'BORE UP EXTREME + STROKE UP', desc: 'Piston 65mm+ & stroke up kruk as, head CNC, full racing build.' },
    { name: 'MONSTER FFA (FREE FOR ALL)', desc: 'Spek kompetisi maksimal. Batas akhir kapasitas mesin.' }
  ];

  const recommendations = [
    // Level 0: Mesin Standar
    [
      { title: 'Oli Mesin Berkualitas', desc: 'Motul 5100 / Liqui Moly Street — menjaga perlindungan ekstra walau standar.' },
      { title: 'Filter Udara Racing', desc: 'Ferrox / K&N — nafas sedikit lebih lega tanpa ubahan mesin.' },
      { title: 'Busi Iridium', desc: 'NGK Iridium / Denso — pengapian lebih fokus dan awet.' },
      { title: 'Upgrade Kirian (Matic)', desc: 'Roller & Per CVT custom untuk tarikan awal lebih responsif.' }
    ],
    // Level 1: Porting + Knalpot
    [
      { title: 'Knalpot Racing Full System', desc: 'Racemaster / R9 / Proliner — wajib untuk membuang gas dari porting.' },
      { title: 'Piggyback / Remap ECU', desc: 'BRT Juken / Power Commander — sesuaikan debit bensin untuk knalpot baru.' },
      { title: 'Filter Udara Open', desc: 'Velocitiy stack / open filter untuk asupan udara lebih banyak.' },
      { title: 'Kampas & Per Kopling Racing', desc: 'BRT / TDR / R9 — meminimalkan tenaga selip saat akselerasi.' }
    ],
    // Level 2: Noken As + Standalone
    [
      { title: 'ECU Standalone Full Programmable', desc: 'BRT Juken 5+ / aRacer RC Mini X — mapping pengapian & bensin mandiri.' },
      { title: 'Noken As / Camshaft Racing', desc: 'BRT / Kawahara / Moto1 — durasi dan lift disesuaikan spek.' },
      { title: 'Per Klep Racing', desc: 'Swedia / Moto1 / BRT — mencegah klep floating di RPM tinggi.' },
      { title: 'Knalpot Inlet 50-55mm', desc: 'Racemaster Street Performance — mendukung napas atas camshaft racing.' },
      { title: 'Koil Racing', desc: 'USR / KTC / YZ — api busi lebih besar membakar campuran kayak bensin.' }
    ],
    // Level 3: Bore Up Basic
    [
      { title: 'Paket Blok & Piston Forged 62-64mm', desc: 'BRT / KTC / XTR — material kuat untuk kompresi tinggi.' },
      { title: 'Head Cylinder Klep Lebar', desc: 'Albronze/Beryllium seat (misal 22/19 atau 25/22) sesuai diameter bore.' },
      { title: 'Throttle Body / Karbu Besar (32-36mm)', desc: 'BRT / 4S1M / PWK Sudco — nafas setara kapasitas mesin baru.' },
      { title: 'Injector Debit Besar (150cc-200cc)', desc: 'Wajib mengimbangi volume ruang bakar yang naik drastis.' },
      { title: 'Knalpot Inlet 55-60mm', desc: 'Racemaster Road Race / Bracket series.' },
      { title: 'Radiator Besar / Oil Cooler', desc: 'Bpro / QTT — kompresi tinggi butuh pendinginan optimal.' }
    ],
    // Level 4: Bore Up + Stroke Up
    [
      { title: 'Kruk As Stroke Up', desc: 'BRT / Moto1 / Custom geser torsi — menaikkan displacement & torsi brutal.' },
      { title: 'Head Cylinder Full CNC', desc: 'Porting CNC & profil kubah dihitung presisi untuk efisiensi volumetris.' },
      { title: 'ECU Standalone Grade Pro', desc: 'aRacer Super X / Ecumaster — butuh fitur tuning ekstra kompleks.' },
      { title: 'TB Downdraft / Karbu Gambot', desc: 'Downdraft 38-40mm atau PWK 38 Strike — air velocity langsung.' },
      { title: 'Knalpot Inlet 63-65mm', desc: 'Racemaster Balap Spek FFA — buangan gas raksasa butuh pipa besar.' },
      { title: 'Gigi Rasio Custom', desc: 'Moto1 / QTT — napas mesin cepat habis jika rasio girboks masih standar.' }
    ],
    // Level 5: Monster FFA
    [
      { title: 'Blok Mesin & Forged Piston Custom', desc: 'LHK / Custom Boring Diesel — piston 66mm+ ke atas, stang seher pendek.' },
      { title: 'Head Klep Titanium Oversized', desc: 'Bahan titanium super ringan agar bisa tembus RPM 14.000+ tanpa floating.' },
      { title: 'ECU Race Data Logging', desc: 'MoTeC / aRacer / Ecumaster Black — pantau sensor AFR, EGT, O2 real-time.' },
      { title: 'Sistem Dual Injector', desc: 'Satu injector di throttle body bawah, satu di atas velocity (shower system).' },
      { title: 'Knalpot Monster Inlet 68-70+mm', desc: 'Racemaster Monster FFA — diameter pipa maksimal menghindari choke.' },
      { title: 'Water Pump Elektrik & Dry Clutch', desc: 'Meringankan beban putaran kruk as untuk power murni tanpa beban aksesori.' }
    ]
  ];

  const currentRecs = recommendations[modLevel];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Mod List */}
      <div className="border border-teal-900/30 rounded-xl p-6 bg-[#020b12]">
        <h3 className="text-xs font-mono text-teal-400 mb-4 tracking-widest">DAFTAR MODIFIKASI MESIN</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {modLists.map((mod, i) => (
            <label 
              key={i} 
              className={cn(
                "flex gap-4 p-4 rounded-lg bg-[#06141c] border border-teal-500/10 hover:border-teal-400/50 cursor-pointer transition-colors group",
                modLevel === i && "border-teal-400/80 bg-teal-950/10"
              )}
            >
              <div className="pt-0.5">
                <input 
                  type="radio" 
                  name="mod_level" 
                  checked={modLevel === i}
                  onChange={() => setModLevel(i)}
                  className="w-4 h-4 accent-teal-500 bg-transparent border-gray-500" 
                />
              </div>
              <div className="flex-1">
                <p className={cn("text-sm font-bold transition-colors uppercase tracking-wide", modLevel === i ? "text-teal-300" : "text-gray-200 group-hover:text-teal-300")}>{mod.name}</p>
                <p className={cn("text-xs mt-1 leading-relaxed", modLevel === i ? "text-gray-300" : "text-gray-500")}>{mod.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Wajib Ganti / Rekomendasi */}
      <div className="border border-teal-900/30 rounded-xl p-6 bg-[#020b12] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           {modLevel > 2 ? <ShieldAlert className="w-32 h-32" /> : <Wrench className="w-32 h-32" />}
        </div>
        
        <h3 className="text-xs font-mono text-teal-400 mb-4 tracking-widest uppercase flex items-center gap-2">
          {modLevel === 0 ? "REKOMENDASI PERAWATAN / UPGRADE RINGAN" : "KOMPONEN WAJIB GANTI & REKOMENDASI KIT"}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          {currentRecs.map((item, i) => (
            <div key={i} className="flex gap-3 bg-[#06141c] border border-teal-500/10 p-4 rounded-lg">
              <div className="min-w-1.5 min-h-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5"></div>
              <div>
                <span className="text-sm font-bold text-gray-200 block mb-1">{item.title}</span>
                <span className="text-xs text-gray-400 leading-relaxed block">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
