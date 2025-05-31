
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type Pet = Database['public']['Tables']['pets']['Row'];
export type AdoptionRequest = Database['public']['Tables']['adoption_requests']['Row'];

export const getPets = async (filters?: {
  location?: string;
  type?: string;
  size?: string;
  age?: string;
}): Promise<Pet[]> => {
  let query = supabase
    .from('pets')
    .select('*')
    .eq('pet_category', 'adoption')
    .order('created_at', { ascending: false });

  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  
  if (filters?.type && filters.type !== 'all') {
    query = query.eq('type', filters.type);
  }
  
  if (filters?.size && filters.size !== 'all') {
    query = query.eq('size', filters.size);
  }

  if (filters?.age && filters.age !== 'all') {
    query = query.eq('age', filters.age);
  }

  const { data, error } = await query;

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
    user_info: userInfo,
    shelter_name: pet.shelter_name || 'Refugio',
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
