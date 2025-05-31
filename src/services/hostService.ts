
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Host = Tables<'hosts'>;
export type Review = Tables<'reviews'>;

export const getHosts = async (filters?: {
  location?: string;
  petType?: string;
  type?: string;
}) => {
  let query = supabase
    .from('hosts')
    .select('*')
    .eq('availability', true);

  if (filters?.location) {
    query = query.ilike('city', `%${filters.location}%`);
  }

  if (filters?.type) {
    query = query.eq('type', filters.type);
  }

  if (filters?.petType) {
    query = query.contains('accepted_pets', [filters.petType]);
  }

  const { data, error } = await query.order('rating', { ascending: false });

  if (error) {
    console.error('Error fetching hosts:', error);
    throw error;
  }

  return data || [];
};

export const getHostById = async (id: string) => {
  const { data, error } = await supabase
    .from('hosts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching host:', error);
    throw error;
  }

  return data;
};

export const getHostReviews = async (hostId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('host_id', hostId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }

  return data || [];
};

export const getVeterinaries = async (location?: string) => {
  let query = supabase
    .from('hosts')
    .select('*')
    .eq('type', 'veterinary')
    .eq('availability', true);

  if (location) {
    query = query.ilike('city', `%${location}%`);
  }

  const { data, error } = await query.order('rating', { ascending: false });

  if (error) {
    console.error('Error fetching veterinaries:', error);
    throw error;
  }

  return data || [];
};
