
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Pet = Tables<'pets'>;

export const getPets = async (filters?: {
  location?: string;
  type?: string;
  size?: string;
  age?: string;
}) => {
  let query = supabase.from('pets').select('*').eq('pet_category', 'adoption');

  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }

  if (filters?.type && filters.type !== 'Todos') {
    query = query.eq('type', filters.type);
  }

  if (filters?.size && filters.size !== 'Todos') {
    query = query.eq('size', filters.size);
  }

  if (filters?.age && filters.age !== 'Todos') {
    query = query.eq('age', filters.age);
  }

  const { data, error } = await query.order('urgent', { ascending: false });

  if (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }

  return data || [];
};

export const getMyPets = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('pet_category', 'personal')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching my pets:', error);
    throw error;
  }

  return data || [];
};

export const createMyPet = async (petData: {
  name: string;
  type: string;
  breed: string;
  age: string;
  size: string;
  gender: string;
  description: string;
  vaccinated: boolean;
  sterilized: boolean;
  characteristics: string[];
  image?: string;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('pets')
    .insert({
      ...petData,
      pet_category: 'personal',
      owner_id: user.id,
      location: 'Mi hogar',
      shelter_name: 'Personal',
      shelter_contact: user.email || '',
      adoption_fee: 0,
      urgent: false,
      image: petData.image || 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=400&h=300&fit=crop'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating pet:', error);
    throw error;
  }

  return data;
};

export const updateMyPet = async (id: string, petData: Partial<Pet>) => {
  const { data, error } = await supabase
    .from('pets')
    .update(petData)
    .eq('id', id)
    .eq('pet_category', 'personal')
    .select()
    .single();

  if (error) {
    console.error('Error updating pet:', error);
    throw error;
  }

  return data;
};

export const deleteMyPet = async (id: string) => {
  const { error } = await supabase
    .from('pets')
    .delete()
    .eq('id', id)
    .eq('pet_category', 'personal');

  if (error) {
    console.error('Error deleting pet:', error);
    throw error;
  }
};

export const getPetById = async (id: string) => {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching pet:', error);
    throw error;
  }

  return data;
};
