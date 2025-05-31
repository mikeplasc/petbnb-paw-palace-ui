
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type VeterinaryInsert = Database['public']['Tables']['hosts']['Insert'];
type VeterinaryRow = Database['public']['Tables']['hosts']['Row'];

export interface VeterinaryData {
  name: string;
  location: string;
  description: string;
  services: string[];
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  images: string[];
  certifications: string[];
  specialties: string[];
  responseTime: string;
  acceptedPets: string[];
}

export const createVeterinary = async (veterinaryData: VeterinaryData): Promise<VeterinaryRow> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Usuario no autenticado');
  }

  const veterinaryRecord: VeterinaryInsert = {
    name: veterinaryData.name,
    type: 'veterinary',
    city: veterinaryData.location.split(',')[0].trim(),
    location: veterinaryData.location,
    description: veterinaryData.description,
    price_per_night: veterinaryData.pricePerNight,
    rating: veterinaryData.rating,
    review_count: veterinaryData.reviewCount,
    images: veterinaryData.images,
    services: veterinaryData.services,
    certifications: veterinaryData.certifications,
    specialties: veterinaryData.specialties,
    response_time: veterinaryData.responseTime,
    accepted_pets: veterinaryData.acceptedPets,
    owner_id: user.id,
    availability: true
  };

  const { data, error } = await supabase
    .from('hosts')
    .insert(veterinaryRecord)
    .select()
    .single();

  if (error) {
    console.error('Error creating veterinary:', error);
    throw error;
  }

  return data;
};

export const getMyVeterinaries = async (): Promise<VeterinaryRow[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Usuario no autenticado');
  }

  const { data, error } = await supabase
    .from('hosts')
    .select('*')
    .eq('type', 'veterinary')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching veterinaries:', error);
    throw error;
  }

  return data || [];
};

export const updateVeterinary = async (id: string, veterinaryData: VeterinaryData): Promise<VeterinaryRow> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Usuario no autenticado');
  }

  const veterinaryRecord: Partial<VeterinaryInsert> = {
    name: veterinaryData.name,
    city: veterinaryData.location.split(',')[0].trim(),
    location: veterinaryData.location,
    description: veterinaryData.description,
    price_per_night: veterinaryData.pricePerNight,
    rating: veterinaryData.rating,
    review_count: veterinaryData.reviewCount,
    images: veterinaryData.images,
    services: veterinaryData.services,
    certifications: veterinaryData.certifications,
    specialties: veterinaryData.specialties,
    response_time: veterinaryData.responseTime,
    accepted_pets: veterinaryData.acceptedPets,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('hosts')
    .update(veterinaryRecord)
    .eq('id', id)
    .eq('owner_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating veterinary:', error);
    throw error;
  }

  return data;
};

export const deleteVeterinary = async (id: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Usuario no autenticado');
  }

  const { error } = await supabase
    .from('hosts')
    .delete()
    .eq('id', id)
    .eq('owner_id', user.id);

  if (error) {
    console.error('Error deleting veterinary:', error);
    throw error;
  }
};
