import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { guestsDirectory } from '../../data/adminMock';

function tierStyle(tier) {
  if (tier === 'Platinum') return 'bg-slate-900 text-white';
  if (tier === 'Gold') return 'bg-amber-100 text-amber-900';
  return 'bg-slate-100 text-slate-700';
}

const GuestsPage = () => {
  const [q, setQ] = useState('');

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return guestsDirectory;
    return guestsDirectory.filter(
      (g) =>
        g.name.toLowerCase().includes(s) ||
        g.email.toLowerCase().includes(s) ||
        g.phone.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <>
      <Helmet>
        <title>Guests — Hotel Management</title>
      </Helmet>

      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-slate-900 sm:text-3xl">Guest directory</h1>
          <p className="mt-1 text-sm text-slate-600">Search filters the list on the client (demo).</p>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, email, or phone…"
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none ring-primary-500/20 placeholder:text-slate-400 focus:border-primary-300 focus:ring-2"
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 sm:px-6">Guest</th>
                  <th className="px-4 py-3 sm:px-6">Email</th>
                  <th className="px-4 py-3 sm:px-6">Phone</th>
                  <th className="px-4 py-3 sm:px-6">Stays</th>
                  <th className="px-4 py-3 sm:px-6">Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={g.avatar}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
                          loading="lazy"
                        />
                        <span className="font-medium text-slate-900">{g.name}</span>
                      </div>
                    </td>
                    <td className="break-all px-4 py-3 text-slate-600 sm:px-6">{g.email}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600 sm:px-6">{g.phone}</td>
                    <td className="px-4 py-3 text-slate-800 sm:px-6">{g.stays}</td>
                    <td className="px-4 py-3 sm:px-6">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${tierStyle(g.tier)}`}>
                        {g.tier}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-slate-500">No guests match your search.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GuestsPage;
