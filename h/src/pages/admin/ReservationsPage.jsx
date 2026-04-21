import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { reservations as allReservations } from '../../data/adminMock';

const filters = ['All', 'Confirmed', 'Pending', 'Cancelled'];

function statusStyle(status) {
  if (status === 'Confirmed') return 'bg-emerald-100 text-emerald-800';
  if (status === 'Pending') return 'bg-amber-100 text-amber-800';
  if (status === 'Cancelled') return 'bg-slate-200 text-slate-700';
  return 'bg-slate-100 text-slate-700';
}

const ReservationsPage = () => {
  const [filter, setFilter] = useState('All');

  const rows = useMemo(() => {
    if (filter === 'All') return allReservations;
    return allReservations.filter((r) => r.status === filter);
  }, [filter]);

  return (
    <>
      <Helmet>
        <title>Reservations — Hotel Management</title>
      </Helmet>

      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-playfair text-2xl font-bold text-slate-900 sm:text-3xl">Reservations</h1>
            <p className="mt-1 text-sm text-slate-600">Filter and review booking pipeline (responsive table).</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
          >
            New reservation
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-medium transition',
                filter === f
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50',
              ].join(' ')}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 sm:px-6">ID</th>
                  <th className="px-4 py-3 sm:px-6">Photo</th>
                  <th className="px-4 py-3 sm:px-6">Guest</th>
                  <th className="px-4 py-3 sm:px-6">Room type</th>
                  <th className="px-4 py-3 sm:px-6">Check-in</th>
                  <th className="px-4 py-3 sm:px-6">Check-out</th>
                  <th className="px-4 py-3 sm:px-6">Status</th>
                  <th className="px-4 py-3 text-right sm:px-6">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-600 sm:px-6">{r.id}</td>
                    <td className="px-4 py-3 sm:px-6">
                      <img
                        src={r.image}
                        alt=""
                        className="h-12 w-16 shrink-0 rounded-lg object-cover ring-1 ring-slate-100"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900 sm:px-6">{r.guest}</td>
                    <td className="px-4 py-3 text-slate-700 sm:px-6">{r.roomType}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600 sm:px-6">{r.checkIn}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600 sm:px-6">{r.checkOut}</td>
                    <td className="px-4 py-3 sm:px-6">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle(r.status)}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-slate-900 sm:px-6">{r.total}</td>
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

export default ReservationsPage;
