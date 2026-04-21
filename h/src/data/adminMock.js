/** Demo data for the hotel management UI (replace with API calls later). */
import { roomPhotos, guestAvatars } from '../constants/images';

export const kpiStats = [
  { id: 'occ', label: 'Occupancy tonight', value: '78%', change: '+4.2%', positive: true },
  { id: 'adr', label: 'ADR', value: '$214', change: '+$12', positive: true },
  { id: 'rev', label: 'RevPAR', value: '$167', change: '-$3', positive: false },
  { id: 'arr', label: 'Arrivals today', value: '24', change: '6 pending', positive: null },
];

export const arrivalsToday = [
  { id: 'R-1042', guest: 'James Mitchell', room: '412', time: '14:30', status: 'Checked in', avatar: guestAvatars.m1 },
  { id: 'R-1043', guest: 'Sofia Laurent', room: '305', time: '15:00', status: 'Expected', avatar: guestAvatars.e1 },
  { id: 'R-1044', guest: 'Wei Chen', room: '508', time: '16:15', status: 'Expected', avatar: guestAvatars.m2 },
  { id: 'R-1045', guest: 'Emma Brooks', room: '201', time: '17:00', status: 'Late', avatar: guestAvatars.e2 },
];

export const reservations = [
  { id: 'BK-9001', guest: 'James Mitchell', roomType: 'Deluxe Ocean', checkIn: '2026-04-19', checkOut: '2026-04-22', status: 'Confirmed', total: '$1,842', image: roomPhotos.deluxeOcean },
  { id: 'BK-9002', guest: 'Sofia Laurent', roomType: 'Executive', checkIn: '2026-04-19', checkOut: '2026-04-21', status: 'Confirmed', total: '$1,120', image: roomPhotos.executive },
  { id: 'BK-9003', guest: 'Marcus Reid', roomType: 'Standard King', checkIn: '2026-04-20', checkOut: '2026-04-23', status: 'Pending', total: '$945', image: roomPhotos.standard },
  { id: 'BK-9004', guest: 'Priya Sharma', roomType: 'Presidential Suite', checkIn: '2026-04-21', checkOut: '2026-04-25', status: 'Confirmed', total: '$4,200', image: roomPhotos.presidential },
  { id: 'BK-9005', guest: 'Oliver Grant', roomType: 'Deluxe Ocean', checkIn: '2026-04-22', checkOut: '2026-04-24', status: 'Cancelled', total: '$0', image: roomPhotos.deluxeOcean },
];

export const roomsInventory = [
  { id: '201', type: 'Standard King', floor: 2, status: 'occupied', housekeeping: 'Clean', image: roomPhotos.standard },
  { id: '305', type: 'Executive', floor: 3, status: 'due_in', housekeeping: 'Clean', image: roomPhotos.executive },
  { id: '412', type: 'Deluxe Ocean', floor: 4, status: 'occupied', housekeeping: 'Clean', image: roomPhotos.deluxeOcean },
  { id: '508', type: 'Deluxe Ocean', floor: 5, status: 'vacant', housekeeping: 'Dirty', image: roomPhotos.deluxeOcean },
  { id: '601', type: 'Junior Suite', floor: 6, status: 'maintenance', housekeeping: 'Out of order', image: roomPhotos.family },
  { id: '702', type: 'Presidential Suite', floor: 7, status: 'vacant', housekeeping: 'Clean', image: roomPhotos.presidential },
];

export const guestsDirectory = [
  { id: 1, name: 'James Mitchell', email: 'j.mitchell@email.com', phone: '+1 310 555 0142', stays: 4, tier: 'Gold', avatar: guestAvatars.m1 },
  { id: 2, name: 'Sofia Laurent', email: 's.laurent@email.com', phone: '+33 6 12 34 56 78', stays: 1, tier: 'Member', avatar: guestAvatars.e1 },
  { id: 3, name: 'Wei Chen', email: 'wei.c@email.com', phone: '+86 138 0000 0000', stays: 7, tier: 'Platinum', avatar: guestAvatars.m2 },
  { id: 4, name: 'Emma Brooks', email: 'emma.b@email.com', phone: '+44 20 7946 0958', stays: 2, tier: 'Member', avatar: guestAvatars.e2 },
];
