
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Host = Tables<'hosts'>;

export const getHosts = async (filters?: {
  location?: string;
  type?: string;
  priceRange?: [number, number];
  services?: string[];
  certifiedOnly?: boolean;
}) => {
  let query = supabase.from('hosts').select('*');

  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }

  if (filters?.type && filters.type !== 'Todos') {
    query = query.eq('type', filters.type);
  }

  if (filters?.priceRange) {
    query = query
      .gte('price_per_night', filters.priceRange[0])
      .lte('price_per_night', filters.priceRange[1]);
  }

  if (filters?.services && filters.services.length > 0) {
    query = query.overlaps('services', filters.services);
  }

  if (filters?.certifiedOnly) {
    query = query.not('certifications', 'is', null).gt('certifications', '{}');
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
