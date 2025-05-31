
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type LostPet = Tables<'lost_pets'>;

export const getLostPets = async () => {
  const { data, error } = await supabase
    .from('lost_pets')
    .select(`
      *,
      pets (
        id,
        name,
        type,
        breed,
        age,
        size,
        gender,
        image,
        characteristics
      )
    `)
    .eq('status', 'lost')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching lost pets:', error);
    throw error;
  }

  return data || [];
};

export const reportLostPet = async (lostPetData: {
  pet_id: string;
  last_seen_date: string;
  last_seen_location: string;
  last_seen_latitude?: number;
  last_seen_longitude?: number;
  description?: string;
  reward_amount?: number;
  contact_phone?: string;
  contact_email?: string;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('lost_pets')
    .insert({
      ...lostPetData,
      owner_id: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error('Error reporting lost pet:', error);
    throw error;
  }

  // También marcar la mascota como perdida en la tabla pets
  await supabase
    .from('pets')
    .update({ is_lost: true })
    .eq('id', lostPetData.pet_id);

  return data;
};

export const markPetAsFound = async (lostPetId: string) => {
  const { data, error } = await supabase
    .from('lost_pets')
    .update({ 
      status: 'found',
      updated_at: new Date().toISOString()
    })
    .eq('id', lostPetId)
    .select()
    .single();

  if (error) {
    console.error('Error marking pet as found:', error);
    throw error;
  }

  // También desmarcar la mascota como perdida en la tabla pets
  if (data) {
    await supabase
      .from('pets')
      .update({ is_lost: false })
      .eq('id', data.pet_id);
  }

  return data;
};
