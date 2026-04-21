import React from 'react';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { kpiStats, arrivalsToday } from '../../data/adminMock';

function StatChange({ change, positive }) {
  if (positive === null) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
        <Minus className="h-3 w-3" />
        {change}
      </span>
    );
  }
  if (positive) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
        <TrendingUp className="h-3 w-3" />
        {change}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-600">
      <TrendingDown className="h-3 w-3" />
      {change}
    </span>
  );
}

function statusBadge(status) {
  const map = {
    'Checked in': 'bg-emerald-100 text-emerald-800',
    Expected: 'bg-sky-100 text-sky-800',
    Late: 'bg-amber-100 text-amber-800',
  };
  return map[status] || 'bg-slate-100 text-slate-700';
}

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Overview — Hotel Management</title>
      </Helmet>

      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-slate-900 sm:text-3xl">Operations overview</h1>
          <p className="mt-1 text-sm text-slate-600">
            Snapshot inspired by modern PMS dashboards — occupancy, revenue, and today&apos;s arrivals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiStats.map((k) => (
            <div
              key={k.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{k.label}</p>
              <div className="mt-2 flex items-end justify-between gap-2">
                <p className="font-playfair text-3xl font-bold text-slate-900">{k.value}</p>
                <StatChange change={k.change} positive={k.positive} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="font-playfair text-lg font-semibold text-slate-900">Occupancy (7 days)</h2>
            <p className="mt-1 text-sm text-slate-500">Illustrative bars — wire to your analytics endpoint.</p>
            <div className="mt-6 flex h-40 items-end justify-between gap-2 sm:gap-3">
              {[62, 71, 68, 74, 78, 81, 78].map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full max-w-[3rem] rounded-t-md bg-gradient-to-t from-primary-700 to-primary-400"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] font-medium text-slate-400 sm:text-xs">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-sm">
            <h2 className="font-playfair text-lg font-semibold">Tonight</h2>
            <p className="mt-1 text-sm text-slate-300">Room nights sold vs. available.</p>
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Sold</span>
                  <span className="font-semibold">156 / 200</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[78%] rounded-full bg-primary-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Groups</span>
                  <span className="font-semibold">32 rooms</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[40%] rounded-full bg-emerald-400/90" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex flex-col gap-1 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="font-playfair text-lg font-semibold text-slate-900">Today&apos;s arrivals</h2>
              <p className="text-sm text-slate-500">Front desk queue</p>
            </div>
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Open check-in
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 sm:px-6">Reservation</th>
                  <th className="px-4 py-3 sm:px-6">Guest</th>
                  <th className="px-4 py-3 sm:px-6">Room</th>
                  <th className="px-4 py-3 sm:px-6">ETA</th>
                  <th className="px-4 py-3 sm:px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {arrivalsToday.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-600 sm:px-6">{row.id}</td>
                    <td className="px-4 py-3 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={row.avatar}
                          alt=""
                          className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
                          loading="lazy"
                        />
                        <span className="font-medium text-slate-900">{row.guest}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700 sm:px-6">{row.room}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600 sm:px-6">{row.time}</td>
                    <td className="px-4 py-3 sm:px-6">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
