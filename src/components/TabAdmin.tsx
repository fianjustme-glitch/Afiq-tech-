import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Check, X, Search, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

export function TabAdmin() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData: any[] = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      // Sort by creation date or just name
      usersData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      });
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const toggleAccess = async (userId: string, currentStatus: boolean) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        hasPaidAccess: !currentStatus
      });
    } catch (error) {
      console.error("Error updating access:", error);
      alert("Gagal mengupdate status. Pastikan Anda memiliki koneksi internet.");
    }
  };

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="border border-red-500/30 bg-red-950/10 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-10">
          <ShieldAlert className="w-48 h-48 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 relative z-10">Admin & Kelola Akun</h3>
        <p className="text-sm text-gray-400 relative z-10 max-w-2xl">
          Halaman ini khusus untuk Anda (<span className="text-red-400">fianjustme@gmail.com</span>).  
          Ketika ada user yang konfirmasi pembayaran di WhatsApp, cari email mereka di bawah ini lalu klik tombol "AKTIFKAN" untuk membuka kunci akses website mereka secara instan.
        </p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl p-4">
        <div className="relative mb-6">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama atau email email..." 
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] uppercase font-mono text-gray-500 bg-[#0a0a0a] border-y border-white/5">
              <tr>
                <th className="px-4 py-3">Pengguna</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status Akses</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500 font-mono text-xs">
                    Tidak ada pengguna yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {u.photoURL ? (
                          <img src={u.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-white/10" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-gray-400">
                            {u.name?.charAt(0) || '?'}
                          </div>
                        )}
                        <span className="font-medium text-white">{u.name || 'Tanpa Nama'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-400 font-mono text-xs">
                      {u.email}
                    </td>
                    <td className="px-4 py-4">
                      {u.hasPaidAccess ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono tracking-wider text-green-500 bg-green-500/10 px-2 py-1 rounded">
                          <Check className="w-3 h-3" /> PREMIUM
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono tracking-wider text-gray-500 bg-gray-500/10 px-2 py-1 rounded">
                          <X className="w-3 h-3" /> TERKUNCI
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                      {u.email === 'fianjustme@gmail.com' ? (
                        <span className="text-xs font-mono text-red-500 bg-red-500/10 px-2 py-1 rounded">ADMIN (Otomatis)</span>
                      ) : (
                        <button
                          onClick={() => toggleAccess(u.id, u.hasPaidAccess)}
                          className={cn(
                            "px-4 py-1.5 rounded text-[10px] font-mono font-bold transition-all border",
                            u.hasPaidAccess 
                              ? "bg-transparent border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white" 
                              : "bg-red-600 border-red-600 text-white hover:bg-red-700"
                          )}
                        >
                          {u.hasPaidAccess ? 'CABUT AKSES' : 'AKTIFKAN AKSES'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
