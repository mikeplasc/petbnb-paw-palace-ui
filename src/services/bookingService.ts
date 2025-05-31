
export interface Booking {
  id: string;
  hostId: string;
  hostName: string;
  hostImage: string;
  petType: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  location: string;
  services: string[];
}

// Mock booking storage - in a real app this would be a database
let bookings: Booking[] = [];

export const createBooking = (hostId: string, hostData: any): Booking => {
  const newBooking: Booking = {
    id: Date.now().toString(),
    hostId,
    hostName: hostData.name,
    hostImage: hostData.image,
    petType: 'Perro', // This would come from user selection
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    totalPrice: hostData.pricePerNight * 7,
    status: 'pending',
    createdAt: new Date().toISOString(),
    location: hostData.location,
    services: hostData.services
  };

  bookings.push(newBooking);
  return newBooking;
};

export const getUserBookings = (): Booking[] => {
  return bookings;
};
