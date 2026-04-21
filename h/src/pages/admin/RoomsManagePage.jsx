import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Wrench } from 'lucide-react';
import { roomsInventory } from '../../data/adminMock';

function roomStatus(status) {
  const labels = {
    occupied: { label: 'Occupied', className: 'bg-indigo-100 text-indigo-800' },
    vacant: { label: 'Vacant', className: 'bg-emerald-100 text-emerald-800' },
    due_in: { label: 'Due in', className: 'bg-sky-100 text-sky-800' },
    maintenance: { label: 'Maintenance', className: 'bg-rose-100 text-rose-800' },
  };
  return labels[status] || { label: status, className: 'bg-slate-100 text-slate-700' };
}

const RoomsManagePage = () => {
  return (
    <>
      <Helmet>
        <title>Rooms — Hotel Management</title>
      </Helmet>

      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-playfair text-2xl font-bold text-slate-900 sm:text-3xl">Rooms & housekeeping</h1>
            <p className="mt-1 text-sm text-slate-600">
              Grid layout adapts from one column on phones to three on large screens.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Turnover priority: 508
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
              <Wrench className="h-3.5 w-3.5 text-slate-500" />
              OOO: 601
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {roomsInventory.map((room) => {
            const st = roomStatus(room.status);
            return (
              <div
                key={room.id}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-36 w-full">
                  <img
                    src={room.image}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <span className={`absolute right-3 top-3 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${st.className}`}>
                    {st.label}
                  </span>
                </div>
                <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-playfair text-xl font-bold text-slate-900">Room {room.id}</p>
                    <p className="text-sm text-slate-500">{room.type}</p>
                    <p className="mt-1 text-xs text-slate-400">Floor {room.floor}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Housekeeping</span>
                  <span className="text-sm font-medium text-slate-800">{room.housekeeping}</span>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RoomsManagePage;
