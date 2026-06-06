import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Activity, LogIn, Lock, ShieldAlert } from 'lucide-react';
import { presetMotorGroups } from './data';
import { auth, db, signInWithGoogle, logout } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

import { TabKalkulator } from './components/TabKalkulator';
import { TabDaftarKit } from './components/TabDaftarKit';
import { TabKarbuInjeksi } from './components/TabKarbuInjeksi';
import { TabInletKnalpot } from './components/TabInletKnalpot';
import { TabAdmin } from './components/TabAdmin';

type TabType = 'KALKULATOR' | 'DAFTAR KIT' | 'KARBU/INJEKSI' | 'INLET KNALPOT' | 'ADMIN';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('KALKULATOR');
  const [user, setUser] = useState<any>(null);
  const [hasPaidAccess, setHasPaidAccess] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Shared State
  const [selectedMotorName, setSelectedMotorName] = useState('Pilih Motor / Ketik Manual...');
  const [bore, setBore] = useState('58');
  const [stroke, setStroke] = useState('58');
  const [cylinders, setCylinders] = useState('1');
  const [clearance, setClearance] = useState('2.5');
  const [headVc, setHeadVc] = useState('10.5');
  const [valveRelief, setValveRelief] = useState('1.0');
  const [isInjection, setIsInjection] = useState(true);
  const [calcMode, setCalcMode] = useState<'standar' | 'street' | 'race'>('standar');

  const totalCc = useMemo(() => {
    const b = parseFloat(bore);
    const s = parseFloat(stroke);
    const c = parseInt(cylinders, 10);
    if (!b || !s || !c) return 0;
    const radius = b / 2;
    const vol = Math.PI * Math.pow(radius, 2) * s * c;
    return vol / 1000;
  }, [bore, stroke, cylinders]);

  const rasioKompresi = useMemo(() => {
    const vcPiston = parseFloat(clearance) || 0;
    const vcHead = parseFloat(headVc) || 0;
    const vcValve = parseFloat(valveRelief) || 0;
    const totalCcPerCyl = totalCc / parseInt(cylinders, 10);
    
    const totalVc = vcPiston + vcHead - vcValve;
    if (totalVc <= 0 || !totalCcPerCyl) return 0;
    
    return (totalCcPerCyl + totalVc) / totalVc;
  }, [clearance, headVc, valveRelief, totalCc, cylinders]);

  const handleManualBoreChange = (val: string) => {
    setBore(val);
  };

  const handleManualStrokeChange = (val: string) => {
    setStroke(val);
  };

  const handleManualCylindersChange = (val: string) => {
    setCylinders(val);
  };

  // Update bore/stroke automatically when a preset motor is selected
  useEffect(() => {
    if (selectedMotorName === 'Pilih Motor / Ketik Manual...') return;
    for (const group of presetMotorGroups) {
      const motor = group.motors.find((m) => m.name === selectedMotorName);
      if (motor) {
        setBore(motor.bore);
        setStroke(motor.stroke);
        setCylinders(motor.cylinders);
        if (motor.isFI !== undefined) {
          setIsInjection(motor.isFI);
        }
        break;
      }
    }
  }, [selectedMotorName]);

  useEffect(() => {
    let unsubDoc: (() => void) | undefined;
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (unsubDoc) {
        unsubDoc();
        unsubDoc = undefined;
      }
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        unsubDoc = onSnapshot(userRef, (docSnap) => {
          if ((docSnap.exists() && docSnap.data().hasPaidAccess) || currentUser.email === 'fianjustme@gmail.com') {
            setHasPaidAccess(true);
          } else {
            setHasPaidAccess(false);
          }
          setAuthLoading(false);
        }, (error) => {
          console.error("Firestore error:", error);
          setAuthLoading(false);
        });
      } else {
        setHasPaidAccess(false);
        setAuthLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubDoc) {
        unsubDoc();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#000] flex flex-col relative font-sans text-gray-200">
      
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#020b12] border-b border-teal-900/30">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-teal-500" />
          <div className="flex flex-col">
            <h1 className="text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase">
              BORE UP CALCULATOR - {cylinders} SILINDER
            </h1>
            <span className="text-[10px] font-mono tracking-widest text-teal-500">V2.0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[10px] font-mono text-teal-400 tracking-widest hidden sm:block">LIVE</span>
          </div>
          <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
          {user ? (
            <div className="flex items-center gap-3">
               <div className="flex flex-col items-end hidden sm:flex">
                 <span className="text-[10px] font-bold text-gray-200">{user.displayName}</span>
                 <span className={hasPaidAccess ? "text-[8px] font-mono text-green-500 tracking-widest" : "text-[8px] font-mono text-teal-400 tracking-widest"}>
                   {hasPaidAccess ? 'AKSES PREMIUM' : 'AKSES TERKUNCI'}
                 </span>
               </div>
               {user.photoURL ? (
                 <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full border border-teal-500/20 cursor-pointer" onClick={logout} title="Logout" />
               ) : (
                 <button onClick={logout} className="text-[10px] font-mono hover:text-teal-400 transition-colors">KELUAR</button>
               )}
            </div>
          ) : (
            <button onClick={signInWithGoogle} className="flex items-center gap-2 text-[10px] font-mono bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md transition-colors border border-teal-500/10">
              <LogIn className="w-3 h-3 text-gray-400" />
              LOGIN GOOGLE
            </button>
          )}
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-[#020b12] border-b border-teal-900/30 sticky top-0 z-50">
        <div className="flex overflow-x-auto scrollbar-hide max-w-4xl mx-auto md:justify-center relative">
          {(['KALKULATOR', 'DAFTAR KIT', 'KARBU/INJEKSI', 'INLET KNALPOT'] as TabType[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap flex-1 md:flex-none py-4 px-6 text-[10px] sm:text-xs font-mono tracking-[0.15em] transition-all relative
                ${activeTab === tab ? 'text-teal-400' : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="nav-pill" className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-500" />
              )}
            </button>
          ))}
          {user?.email === 'fianjustme@gmail.com' && (
            <button
              onClick={() => setActiveTab('ADMIN' as TabType)}
              className={`whitespace-nowrap md:flex-none py-4 px-6 text-[10px] sm:text-xs font-mono font-bold tracking-[0.15em] transition-all relative
                ${activeTab === 'ADMIN' ? 'text-teal-400' : 'text-teal-400/50 hover:text-teal-300'}
              `}
            >
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-3 h-3" /> ADMIN
              </span>
              {activeTab === 'ADMIN' && (
                <motion.div layoutId="nav-pill" className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-500" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8 pb-32 relative">
        <div className={!hasPaidAccess && !authLoading ? "blur-md pointer-events-none opacity-50 select-none" : ""}>
          <AnimatePresence mode="wait">
            {activeTab === 'KALKULATOR' && (
              <motion.div key="KALKULATOR" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <TabKalkulator 
                  bore={bore} setBore={handleManualBoreChange}
                  stroke={stroke} setStroke={handleManualStrokeChange}
                  cylinders={cylinders} setCylinders={handleManualCylindersChange}
                  clearance={clearance} setClearance={setClearance}
                  headVc={headVc} setHeadVc={setHeadVc}
                  valveRelief={valveRelief} setValveRelief={setValveRelief}
                  isInjection={isInjection} setIsInjection={setIsInjection}
                  calcMode={calcMode} setCalcMode={setCalcMode}
                  selectedMotorName={selectedMotorName} setSelectedMotorName={setSelectedMotorName}
                />
              </motion.div>
            )}

            {activeTab === 'DAFTAR KIT' && (
              <motion.div key="DAFTAR KIT" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <TabDaftarKit />
              </motion.div>
            )}

            {activeTab === 'KARBU/INJEKSI' && (
              <motion.div key="KARBU/INJEKSI" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <TabKarbuInjeksi 
                   isInjection={isInjection} 
                   totalCc={totalCc} 
                   rasioKompresi={rasioKompresi} 
                />
              </motion.div>
            )}

            {activeTab === 'INLET KNALPOT' && (
              <motion.div key="INLET KNALPOT" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <TabInletKnalpot cylinders={cylinders} totalCc={totalCc} bore={bore} />
              </motion.div>
            )}

            {activeTab === 'ADMIN' && user?.email === 'fianjustme@gmail.com' && (
              <motion.div key="ADMIN" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <TabAdmin />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!authLoading && !hasPaidAccess && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 px-4 mt-12 z-20 pointer-events-auto">
             <div className="bg-[#020b12] border border-teal-400/30 p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl shadow-teal-900/20">
               <div className="w-16 h-16 bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Lock className="w-8 h-8 text-teal-400" />
               </div>
               <h2 className="text-xl font-bold text-white mb-2 tracking-tight">Akses Terkunci</h2>
               <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                 {user 
                   ? 'Akun Anda belum memiliki akses premium. Silakan lakukan pembayaran ke pembuat website untuk mengaktifkan fitur kalkulator secara penuh.' 
                   : 'Login untuk menggunakan Kalkulator Bore Up Afiq Tech. Akses khusus untuk pengguna terdaftar.'}
               </p>
               
               {!user ? (
                 <button onClick={signInWithGoogle} className="w-full bg-white text-black font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                   <LogIn className="w-5 h-5" />
                   LOGIN DENGAN GOOGLE
                 </button>
               ) : (
                 <div className="text-xs flex flex-col gap-2 font-mono text-gray-400 bg-[#06141c] p-4 rounded-lg border border-teal-500/10 text-left w-full mt-4">
                   <p className="font-bold text-gray-200 border-b border-teal-500/20 pb-2 mb-1">PILIHAN PAKET PREMIUM</p>
                   <div className="grid grid-cols-2 gap-2 mb-2">
                     <div className="border border-teal-500/20 p-2 rounded bg-white/5 text-center">
                       <p className="text-[10px] font-bold text-white">1 BULAN</p>
                       <p className="text-teal-300 font-mono text-sm">Rp 25.000</p>
                     </div>
                     <div className="border border-teal-500/20 p-2 rounded bg-white/5 text-center">
                       <p className="text-[10px] font-bold text-white">3 BULAN</p>
                       <p className="text-teal-300 font-mono text-sm">Rp 60.000</p>
                     </div>
                     <div className="border border-teal-500/20 p-2 rounded bg-white/5 text-center">
                       <p className="text-[10px] font-bold text-white">9 BULAN</p>
                       <p className="text-teal-300 font-mono text-sm">Rp 150.000</p>
                     </div>
                     <div className="border border-teal-400/30 p-2 rounded bg-teal-400/10 text-center relative overflow-hidden">
                       <div className="absolute top-0 right-0 bg-teal-500 text-white text-[8px] px-1 font-bold">BEST</div>
                       <p className="text-[10px] font-bold text-white">PERMANEN</p>
                       <p className="text-teal-300 font-mono text-sm font-bold">Rp 200.000</p>
                     </div>
                   </div>
                   
                   <p className="font-bold text-gray-200 border-b border-teal-500/20 pb-2 mb-1 mt-2">CARA AKTIVASI</p>
                   <p>1. Transfer sesuai paket via DANA:<br/>
                     <span className="text-white font-bold text-sm tracking-widest mt-1 mb-1 inline-block">+62 851-2427-0691</span>
                   </p>
                   <p>2. Kirim bukti transfer dan email Anda (<span className="text-white">{user.email}</span>) ke admin:</p>
                   <div className="text-white font-bold grid gap-1 mt-1">
                     <a href="https://wa.me/62895325003291" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors">
                       WhatsApp: +62 895-3250-03291
                     </a>
                     <a href="https://wa.me/6285124270691" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors">
                       WhatsApp: +62 851-2427-0691
                     </a>
                   </div>
                 </div>
               )}
             </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#000] to-transparent pointer-events-none">
        <div className="max-w-3xl mx-auto flex justify-between items-end opacity-50">
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-200 tracking-widest">AFIQ TECH</span>
              <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">CUSTOM RACING EXHAUST & ENGINE LAB</span>
           </div>
           <div className="text-right flex flex-col">
              <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">ESTIMASI REAL KLAIM PABRIKAN</span>
           </div>
        </div>
      </footer>
    </div>
  );
}


