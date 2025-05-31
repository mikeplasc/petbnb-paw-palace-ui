
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Pet = Tables<'pets'>;

export const getPets = async (filters?: {
  location?: string;
  type?: string;
  size?: string;
  age?: string;
}) => {
  let query = supabase.from('pets').select('*');

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
