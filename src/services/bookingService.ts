
export interface Booking {
  id: string;
  hostId: string;
  hostName: string;
  hostImage: string;
  petInfo?: {
    id: number;
    name: string;
    type: string;
    breed: string;
    age: number;
  };
  petType: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  location: string;
  services: string[];
  type?: 'host' | 'veterinary'; // Add type to distinguish booking types
  serviceType?: string; // For veterinary bookings
  preferredTime?: string; // For veterinary bookings
  notes?: string; // For veterinary bookings
}

// Mock booking storage - in a real app this would be a database
let bookings: Booking[] = [];

export const createBooking = (hostId: string, hostData: any, bookingType: 'host' | 'veterinary' = 'host', formData?: any): Booking => {
  const newBooking: Booking = {
    id: Date.now().toString(),
    hostId,
    hostName: hostData.name,
    hostImage: hostData.image,
    petInfo: hostData.petInfo,
    petType: hostData.petInfo ? hostData.petInfo.type : 'Perro',
    startDate: bookingType === 'veterinary' && formData?.preferredDate 
      ? formData.preferredDate 
      : new Date().toISOString().split('T')[0],
    endDate: bookingType === 'veterinary' && formData?.preferredDate 
      ? formData.preferredDate 
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    totalPrice: hostData.pricePerNight * (bookingType === 'veterinary' ? 1 : 7),
    status: 'pending',
    createdAt: new Date().toISOString(),
    location: hostData.location,
    services: hostData.services,
    type: bookingType,
    serviceType: formData?.serviceType,
    preferredTime: formData?.preferredTime,
    notes: formData?.notes
  };

  bookings.push(newBooking);
  console.log('Nueva reserva creada:', newBooking);
  return newBooking;
};

export const getUserBookings = (): Booking[] => {
  return bookings;
};
