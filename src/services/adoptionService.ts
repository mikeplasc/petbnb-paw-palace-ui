
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type Pet = Database['public']['Tables']['pets']['Row'];
export type AdoptionRequest = Database['public']['Tables']['adoption_requests']['Row'];

export const getPets = async (): Promise<Pet[]> => {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pets:', error);
    return [];
  }

  return data || [];
};

export const createAdoptionRequest = async (pet: Pet, userInfo: any): Promise<AdoptionRequest> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User must be authenticated to create adoption request');
  }

  const adoptionData = {
    pet_id: pet.id,
    user_id: user.id,
    pet_name: pet.name,
    pet_image: pet.image,
    user_info: JSON.stringify(userInfo),
    shelter_name: pet.shelter_name,
    status: 'pending' as const
  };

  const { data, error } = await supabase
    .from('adoption_requests')
    .insert(adoptionData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getUserAdoptionRequests = async (): Promise<AdoptionRequest[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('adoption_requests')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching adoption requests:', error);
    return [];
  }

  return data || [];
};
