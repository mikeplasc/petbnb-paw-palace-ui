
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type PetLocation = Tables<'pet_locations'>;

export const getPetLocations = async (petId: string) => {
  const { data, error } = await supabase
    .from('pet_locations')
    .select('*')
    .eq('pet_id', petId)
    .order('timestamp', { ascending: false });

  if (error) {
    console.error('Error fetching pet locations:', error);
    throw error;
  }

  return data || [];
};

export const getLatestPetLocation = async (petId: string) => {
  const { data, error } = await supabase
    .from('pet_locations')
    .select('*')
    .eq('pet_id', petId)
    .order('timestamp', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching latest pet location:', error);
    throw error;
  }

  return data;
};

export const addPetLocation = async (locationData: {
  pet_id: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  battery_level?: number;
  device_id?: string;
}) => {
  const { data, error } = await supabase
    .from('pet_locations')
    .insert(locationData)
    .select()
    .single();

  if (error) {
    console.error('Error adding pet location:', error);
    throw error;
  }

  return data;
};
