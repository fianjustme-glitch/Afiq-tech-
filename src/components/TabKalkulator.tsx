import React, { useMemo } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Search, Settings2 } from 'lucide-react';
import { presetMotorGroups } from '../data';
import { cn } from '../lib/utils';

export function TabKalkulator({ 
  bore, setBore, 
  stroke, setStroke, 
  cylinders, setCylinders,
  clearance, setClearance,
  headVc, setHeadVc,
  valveRelief, setValveRelief,
  isInjection, setIsInjection,
  calcMode, setCalcMode,
  selectedMotorName, setSelectedMotorName
}: any) {
  
  const totalCc = useMemo(() => {
    const b = parseFloat(bore);
    const s = parseFloat(stroke);
    const c = parseInt(cylinders, 10);
    if (!b || !s || !c) return 0;
    const radius = b / 2;
    const vol = Math.PI * Math.pow(radius, 2) * s * c;
    return vol / 1000;
  }, [bore, stroke, cylinders]);

  const totalCcPerCyl = totalCc / parseInt(cylinders, 10);

  const rasioKompresi = useMemo(() => {
    const vcPiston = parseFloat(clearance) || 0;
    const vcHead = parseFloat(headVc) || 0;
    const vcValve = parseFloat(valveRelief) || 0;
    
    const totalVc = vcPiston + vcHead - vcValve;
    if (totalVc <= 0 || !totalCcPerCyl) return 0;
    
    return (totalCcPerCyl + totalVc) / totalVc;
  }, [clearance, headVc, valveRelief, totalCcPerCyl]);

  // Rough estimation based on mode
  const { peakHpRpm, estPower, estTorsi, dynoData } = useMemo(() => {
    const b = parseFloat(bore) || 0;
    const s = parseFloat(stroke) || 0;
    let meanPistonSpeed = 18; // m/s
    let bmep = 12.5; // bar
    
    if (calcMode === 'street') {
      meanPistonSpeed = 20;
      bmep = 13.5;
    } else if (calcMode === 'race') {
      meanPistonSpeed = 22;
      bmep = 14.5;
    }

    let pRpm = 0;
    if (s > 0) {
      pRpm = (meanPistonSpeed * 60000) / (2 * s);
    }
    
    // HP = (BMEP * Displ * RPM) / const
    // Very simplified empirical:
    const baseHp = (totalCc / 1000) * (bmep * 8); 
    const pPower = baseHp * (pRpm / 8000); 

    // Torsi = (HP * 5252) / RPM -> or CC based approx. 
    // Approx 90-100 Nm per 1000cc for NA engines depending on tune.
    let torqueMultiplier = 90;
    if (calcMode === 'street') torqueMultiplier = 100;
    if (calcMode === 'race') torqueMultiplier = 110;
    const pTorq = (totalCc / 1000) * torqueMultiplier;

    const data = [];
    if (pRpm > 0) {
      for(let i = 1000; i <= pRpm + 2000; i += 500) {
        // Bell curve approximation for dyno graph
        const hpDrop = Math.exp(-Math.pow(i - pRpm, 2) / (2 * Math.pow(2000, 2)));
        const tDrop = Math.exp(-Math.pow(i - (pRpm * 0.75), 2) / (2 * Math.pow(2500, 2)));
        data.push({
          rpm: i,
          hp: pPower * hpDrop,
          nm: pTorq * tDrop,
        });
      }
    }

    return { peakHpRpm: pRpm, estPower: pPower, estTorsi: pTorq, dynoData: data };
  }, [bore, stroke, totalCc, calcMode]);


  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Configuration Box */}
      <div className="border border-red-900/30 rounded-xl p-6 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/10 blur-[50px]"></div>
        
        <h3 className="text-xs font-mono text-gray-500 mb-4 tracking-widest">PILIH MOTOR & KONFIGURASI</h3>

        {/* Motor Selection */}
        <div className="relative mb-6">
          <select 
            value={selectedMotorName}
            onChange={(e) => setSelectedMotorName(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-4 text-white font-sans text-sm focus:outline-none focus:border-red-500 transition-colors appearance-none"
          >
            {presetMotorGroups.map((group, idx) => (
              group.category === 'Manual' ? (
                <option key={`m-${idx}`} value={group.motors[0].name}>{group.motors[0].name}</option>
              ) : (
                <optgroup key={`g-${idx}`} label={group.category} className="bg-[#111] text-gray-400">
                  {group.motors.map((m, mIdx) => (
                    <option key={`m-${idx}-${mIdx}`} value={m.name} className="text-white">{m.name}</option>
                  ))}
                </optgroup>
              )
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <Settings2 className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Cylinder Selector */}
        <div className="flex bg-[#111] rounded-lg p-1 mb-6 border border-white/5">
          {[1, 2, 3, 4].map(num => (
            <button
              key={num}
              onClick={() => setCylinders(num.toString())}
              className={cn(
                "flex-1 py-3 rounded-md text-xs font-bold transition-all",
                cylinders === num.toString() 
                  ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              {num} SILINDER
            </button>
          ))}
        </div>

        {/* Sliders Area */}
        <h3 className="text-xs font-mono text-red-500/80 mb-4 tracking-widest mt-8">DIMENSI MESIN</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bore Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-400 font-mono tracking-wider">BORE / DIAMETER (MM)</label>
                <div className="bg-[#111] border border-white/10 px-3 py-1 rounded text-red-400 font-mono font-bold">
                  <input type="number" value={bore} onChange={e=>setBore(e.target.value)} className="bg-transparent w-16 text-right outline-none" />
                </div>
              </div>
              <input type="range" min="40" max="100" step="0.5" value={bore} onChange={e=>setBore(e.target.value)}
                className="w-full accent-red-600 bg-[#222] h-1.5 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:rounded-full cursor-pointer" />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1 font-mono">
                <span>40</span>
                <span>100</span>
              </div>
            </div>

            {/* Stroke Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-400 font-mono tracking-wider">STROKE / LANGKAH (MM)</label>
                <div className="bg-[#111] border border-white/10 px-3 py-1 rounded text-red-400 font-mono font-bold">
                  <input type="number" value={stroke} onChange={e=>setStroke(e.target.value)} className="bg-transparent w-16 text-right outline-none" />
                </div>
              </div>
              <input type="range" min="30" max="90" step="0.1" value={stroke} onChange={e=>setStroke(e.target.value)}
                className="w-full accent-red-600 bg-[#222] h-1.5 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:rounded-full cursor-pointer" />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1 font-mono">
                <span>30</span>
                <span>90</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
             {/* Vc Piston */}
             <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] text-gray-400 font-mono tracking-wider truncate">VOL. CLEARANCE PISTON (CC)</label>
                <div className="bg-[#111] border border-white/10 px-2 py-1 rounded text-white font-mono font-bold text-sm">
                  <input type="number" value={clearance} onChange={e=>setClearance(e.target.value)} className="bg-transparent w-12 text-right outline-none" />
                </div>
              </div>
              <input type="range" min="0.5" max="8" step="0.5" value={clearance} onChange={e=>setClearance(e.target.value)}
                className="w-full accent-red-600 bg-[#222] h-1.5 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer" />
            </div>
            
            {/* Vc Head */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] text-gray-400 font-mono tracking-wider truncate">VOL. RUANG BAKAR HEAD (CC)</label>
                <div className="bg-[#111] border border-white/10 px-2 py-1 rounded text-white font-mono font-bold text-sm">
                  <input type="number" value={headVc} onChange={e=>setHeadVc(e.target.value)} className="bg-transparent w-12 text-right outline-none" />
                </div>
              </div>
              <input type="range" min="5" max="25" step="0.5" value={headVc} onChange={e=>setHeadVc(e.target.value)}
                className="w-full accent-red-600 bg-[#222] h-1.5 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
             {/* Vc Valve Relief */}
             <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] text-gray-400 font-mono tracking-wider truncate">VOL. VALVE RELIEF (CC)</label>
                <div className="bg-[#111] border border-white/10 px-2 py-1 rounded text-white font-mono font-bold text-sm">
                  <input type="number" value={valveRelief} onChange={e=>setValveRelief(e.target.value)} className="bg-transparent w-12 text-right outline-none" />
                </div>
              </div>
              <input type="range" min="0" max="4" step="0.5" value={valveRelief} onChange={e=>setValveRelief(e.target.value)}
                className="w-full accent-red-600 bg-[#222] h-1.5 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer" />
            </div>

            {/* Injeksi Display */}
            <div className="flex items-center justify-between mt-2">
               <div>
                  <label className="text-sm text-gray-200">Sistem Bahan Bakar</label>
                  <p className="text-xs text-red-500 font-mono mt-1 font-bold">{isInjection ? 'INJEKSI (FI)' : 'KARBURATOR'}</p>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mode Kalkulasi */}
      <div className="border border-red-900/30 rounded-xl p-6 bg-[#0a0a0a]">
         <h3 className="text-xs font-mono text-gray-500 mb-4 tracking-widest">MODE KALKULASI</h3>
         <div className="flex bg-[#111] rounded border border-white/5 p-1 mb-2">
            {['standar', 'street', 'race'].map(mode => (
              <button
                key={mode}
                onClick={() => setCalcMode(mode)}
                className={cn(
                  "flex-1 py-2 text-xs font-mono uppercase tracking-wider transition-colors",
                  calcMode === mode ? "text-red-500 bg-[#1a0f0f] border border-red-900/50" : "text-gray-500 hover:text-gray-300"
                )}
              >
                {mode}
              </button>
            ))}
         </div>
         <p className="text-[10px] text-gray-600 font-mono text-center mt-2">
            {calcMode === 'standar' && "VE 85% • Cam 240° • AFR 14.7 • Header Std"}
            {calcMode === 'street' && "VE 95% • Cam 260° • AFR 13.5 • Header Racing"}
            {calcMode === 'race' && "VE 110% • Cam 280° • AFR 12.5 • Header FFA"}
         </p>
      </div>

      {/* Hasil Grid */}
      <div>
         <h3 className="text-xs font-mono text-red-500 mb-4 tracking-widest">HASIL KALKULATOR</h3>
         <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[#111] border border-white/5 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
               <span className="text-[10px] text-gray-500 font-mono tracking-widest mb-2">TOTAL CC</span>
               <span className="text-3xl font-display font-bold text-red-500 mb-1">{totalCc > 0 ? totalCc.toFixed(1) : '-'}</span>
               <span className="text-[10px] text-gray-600 font-mono">CC</span>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-50"></div>
               <span className="text-[10px] text-gray-500 font-mono tracking-widest mb-2">RASIO KOMPRESI</span>
               <span className="text-3xl font-display font-bold text-yellow-500 mb-1">{rasioKompresi > 0 ? rasioKompresi.toFixed(2) : '-'}</span>
               <span className="text-[10px] text-gray-600 font-mono">: 1</span>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50"></div>
               <span className="text-[10px] text-gray-500 font-mono tracking-widest mb-2">EST. POWER</span>
               <span className="text-3xl font-display font-bold text-blue-400 mb-1">{estPower > 0 ? estPower.toFixed(1) : '-'}</span>
               <span className="text-[10px] text-gray-600 font-mono">HP</span>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
               <span className="text-[10px] text-gray-500 font-mono tracking-widest mb-2">EST. TORSI</span>
               <span className="text-2xl font-display font-bold text-gray-300 mb-1">{estTorsi > 0 ? estTorsi.toFixed(1) : '-'}</span>
               <span className="text-[10px] text-gray-600 font-mono">NM</span>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-lg p-4 flex flex-col items-center justify-center">
               <span className="text-[10px] text-gray-500 font-mono tracking-widest mb-2">PEAK HP RPM</span>
               <span className="text-2xl font-display font-bold text-red-400 mb-1">{peakHpRpm > 0 ? Math.round(peakHpRpm) : '-'}</span>
               <span className="text-[10px] text-gray-600 font-mono">RPM</span>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-lg p-4 flex flex-col items-center justify-center">
               <span className="text-[10px] text-gray-500 font-mono tracking-widest mb-2">PEAK TORQ RPM</span>
               <span className="text-2xl font-display font-bold text-gray-400 mb-1">{peakHpRpm > 0 ? Math.round(peakHpRpm * 0.75) : '-'}</span>
               <span className="text-[10px] text-gray-600 font-mono">RPM</span>
            </div>
         </div>
      </div>

      {/* Dyno Graph */}
      <div className="border border-red-900/30 rounded-xl p-6 bg-[#0a0a0a]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-mono text-gray-500 tracking-widest">DYNO SIMULATION</h3>
          <div className="flex gap-4 text-[10px] font-mono">
            <span className="flex items-center gap-1 text-red-500"><div className="w-2 h-2 rounded bg-red-500"></div> HP</span>
            <span className="flex items-center gap-1 text-yellow-500"><div className="w-2 h-2 rounded bg-yellow-500"></div> Nm</span>
          </div>
        </div>
        
        <div className="h-64 w-full">
          {dynoData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dynoData}>
                <defs>
                  <linearGradient id="colorHp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="rpm" stroke="#333" tick={{fill: '#666', fontSize: 10}} minTickGap={30} />
                <YAxis yAxisId="left" stroke="#333" tick={{fill: '#ef4444', fontSize: 10}} orientation="left" />
                <YAxis yAxisId="right" stroke="#333" tick={{fill: '#eab308', fontSize: 10}} orientation="right" />
                <Tooltip contentStyle={{backgroundColor: '#111', borderColor: '#333', fontSize: 12, color: '#fff'}} />
                <Area yAxisId="left" type="monotone" dataKey="hp" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorHp)" />
                <Area yAxisId="right" type="monotone" dataKey="nm" stroke="#eab308" strokeWidth={2} fillOpacity={1} fill="url(#colorNm)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
             <div className="h-full flex items-center justify-center text-sm font-mono text-gray-700">INPUT DATA UNTUK MELIHAT GRAFIK</div>
          )}
        </div>
      </div>

    </div>
  );
}
