
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type Booking = Database['public']['Tables']['bookings']['Row'];

export const createBooking = async (
  hostId: string, 
  hostData: any, 
  type: 'host' | 'veterinary' = 'host',
  formData?: any
): Promise<Booking> => {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Debes iniciar sesión para crear una reserva');
  }

  const bookingData = {
    host_id: hostId,
    user_id: user.id,
    host_name: hostData.name,
    host_image: Array.isArray(hostData.images) ? hostData.images[0] : hostData.image || '',
    pet_type: formData?.selectedPetId ? 'pet' : 'general',
    start_date: formData?.preferredDate || new Date().toISOString().split('T')[0],
    end_date: formData?.preferredDate || new Date().toISOString().split('T')[0],
    total_price: hostData.price_per_night || 0,
    location: hostData.location || hostData.city || '',
    services: JSON.stringify(hostData.services || []),
    type,
    service_type: formData?.serviceType || 'cuidado_general',
    preferred_time: formData?.preferredTime || '',
    notes: formData?.notes || '',
    pet_info: formData?.selectedPetId ? JSON.stringify({ petId: formData.selectedPetId }) : null,
    status: 'pending'
  };

  console.log('Creating booking with data:', bookingData);

  const { data, error } = await supabase
    .from('bookings')
    .insert(bookingData)
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    throw new Error('Error al crear la reserva: ' + error.message);
  }

  console.log('Booking created successfully:', data);
  return data;
};

export const getUserBookings = async (): Promise<Booking[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }

  return data || [];
};
