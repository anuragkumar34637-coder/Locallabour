export type UserRole = 'customer' | 'worker' | 'admin';

export interface UserLocation {
  lat: number;
  lng: number;
  address?: string;
}

export interface AppUser {
  uid: string;
  role: UserRole;
  name: string;
  phone?: string;
  photoURL?: string;
  location?: UserLocation;
  email?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface WorkerProfile {
  workerId: string;
  skills: string[];
  category: string;
  bio?: string;
  hourlyRate?: number;
  availability: boolean;
  rating: number;
  reviewCount: number;
  lastActive: string;
}

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customerId: string;
  workerId: string;
  status: BookingStatus;
  serviceType: string;
  description: string;
  scheduledAt: string;
  location?: UserLocation;
  amount?: number;
  createdAt: string;
  updatedAt: string;
}
