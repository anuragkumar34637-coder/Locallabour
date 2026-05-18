import { AppUser, WorkerProfile, Booking } from './types';

export const MOCK_WORKERS: (AppUser & { profile: WorkerProfile })[] = [
  {
    uid: 'w1',
    role: 'worker',
    name: 'Rajesh Kumar',
    phone: '9876543210',
    photoURL: 'https://images.unsplash.com/photo-1540560341492-642491216173?w=400&h=400&fit=crop',
    location: { lat: 28.6139, lng: 77.2090, address: 'Civil Lines, Delhi' },
    isVerified: true,
    createdAt: new Date().toISOString(),
    profile: {
      workerId: 'w1',
      skills: ['Plumbing', 'Pipe Repair'],
      category: 'plumber',
      bio: 'Expert plumber with 10 years experience in leak repairs and bathroom fittings.',
      hourlyRate: 250,
      availability: true,
      rating: 4.8,
      reviewCount: 45,
      lastActive: new Date().toISOString(),
    }
  },
  {
    uid: 'w2',
    role: 'worker',
    name: 'Sunita Devi',
    phone: '8765432109',
    photoURL: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
    location: { lat: 28.6200, lng: 77.2200, address: 'Near Market, Delhi' },
    isVerified: true,
    createdAt: new Date().toISOString(),
    profile: {
      workerId: 'w2',
      skills: ['Field Work', 'Sowing', 'Harvesting'],
      category: 'farm',
      bio: 'Fast and reliable farm help available for seasonal work.',
      hourlyRate: 150,
      availability: true,
      rating: 4.5,
      reviewCount: 28,
      lastActive: new Date().toISOString(),
    }
  },
  {
    uid: 'w3',
    role: 'worker',
    name: 'Amit Singh',
    phone: '7654321098',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    location: { lat: 28.6100, lng: 77.2300, address: 'Colony A, Delhi' },
    isVerified: true,
    createdAt: new Date().toISOString(),
    profile: {
      workerId: 'w3',
      skills: ['Wiring', 'Appliance Repair', 'Switchboards'],
      category: 'electrician',
      bio: 'Certified electrician specializing in home wiring and troubleshooting.',
      hourlyRate: 300,
      availability: false,
      rating: 4.9,
      reviewCount: 62,
      lastActive: new Date().toISOString(),
    }
  },
  {
    uid: 'w4',
    role: 'worker',
    name: 'Pankaj Sharma',
    phone: '6543210987',
    photoURL: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
    location: { lat: 28.6300, lng: 77.2100, address: 'Sector 5, Delhi' },
    isVerified: false,
    createdAt: new Date().toISOString(),
    profile: {
      workerId: 'w4',
      skills: ['Painting', 'Wall Putty', 'Texture'],
      category: 'painter',
      bio: 'Professional house painter with attention to detail.',
      hourlyRate: 200,
      availability: true,
      rating: 4.2,
      reviewCount: 15,
      lastActive: new Date().toISOString(),
    }
  }
];

export const MOCK_USER: AppUser = {
  uid: 'u1',
  role: 'customer',
  name: 'Anurag Kumar',
  phone: '9998887776',
  email: 'anurag@example.com',
  isVerified: true,
  createdAt: new Date().toISOString(),
  location: { lat: 28.6139, lng: 77.2090, address: 'Lajpat Nagar, Delhi' }
};
