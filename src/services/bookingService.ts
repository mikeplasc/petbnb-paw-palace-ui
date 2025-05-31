
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Booking = Tables<'bookings'>;

export const createBooking = async (bookingData: {
  hostId: string;
  hostName: string;
  hostImage: string;
  petInfo?: any;
  petType: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  location: string;
  services: string[];
  type?: string;
  serviceType?: string;
  preferredTime?: string;
  notes?: string;
}) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      host_id: bookingData.hostId,
      host_name: bookingData.hostName,
      host_image: bookingData.hostImage,
      pet_info: bookingData.petInfo,
      pet_type: bookingData.petType,
      start_date: bookingData.startDate,
      end_date: bookingData.endDate,
      total_price: bookingData.totalPrice,
      location: bookingData.location,
      services: bookingData.services,
      type: bookingData.type || 'host',
      service_type: bookingData.serviceType,
      preferred_time: bookingData.preferredTime,
      notes: bookingData.notes,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }

  return data;
};

export const getUserBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user bookings:', error);
    return [];
  }

  return data || [];
};
