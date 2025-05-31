
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

export type AdoptionRequest = Tables<'adoption_requests'>;

export const submitAdoptionRequest = async (
  petId: string,
  petName: string,
  petImage: string,
  shelterName: string,
  userInfo: any
) => {
  const { data, error } = await supabase
    .from('adoption_requests')
    .insert({
      pet_id: petId,
      pet_name: petName,
      pet_image: petImage,
      shelter_name: shelterName,
      user_info: userInfo,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    console.error('Error submitting adoption request:', error);
    throw error;
  }

  return data;
};

export const getUserAdoptionRequests = async () => {
  const { data, error } = await supabase
    .from('adoption_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching adoption requests:', error);
    throw error;
  }

  return data || [];
};
