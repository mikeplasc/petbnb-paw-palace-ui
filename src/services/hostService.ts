
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Host = Tables<'hosts'>;
export type Review = Tables<'reviews'>;

export const getHosts = async (filters?: {
  location?: string;
  petType?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  certified?: boolean;
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
    // Use @> operator to check if the petType is contained in the accepted_pets array
    query = query.contains('accepted_pets', [filters.petType]);
  }

  if (filters?.minPrice !== undefined && filters.minPrice > 0) {
    query = query.gte('price_per_night', filters.minPrice);
  }

  if (filters?.maxPrice !== undefined && filters.maxPrice < 2000) {
    query = query.lte('price_per_night', filters.maxPrice);
  }

  if (filters?.minRating !== undefined && filters.minRating > 0) {
    query = query.gte('rating', filters.minRating);
  }

  if (filters?.certified) {
    // Filter hosts that have certifications (non-empty array)
    query = query.not('certifications', 'is', null).neq('certifications', '{}');
  }

  const { data, error } = await query.order('rating', { ascending: false });

  if (error) {
    console.error('Error fetching hosts:', error);
    throw error;
  }

  console.log('Database query result:', data);
  console.log('Applied filters:', filters);
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
