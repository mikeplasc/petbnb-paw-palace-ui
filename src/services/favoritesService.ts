import { supabase } from '@/integrations/supabase/client';

export interface Favorite {
  id: string;
  user_id: string;
  item_id: string;
  item_type: 'pet' | 'host';
  created_at: string;
}

export const getFavorites = async (itemType?: 'pet' | 'host'): Promise<Favorite[]> => {
  let query = supabase
    .from('favorites')
    .select('*')
    .order('created_at', { ascending: false });

  if (itemType) {
    query = query.eq('item_type', itemType);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }

  // Asegurar que item_type sea del tipo correcto
  return (data || []).map(item => ({
    ...item,
    item_type: item.item_type as 'pet' | 'host'
  }));
};

export const addToFavorites = async (itemId: string, itemType: 'pet' | 'host'): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be logged in to add favorites');
  }

  const { error } = await supabase
    .from('favorites')
    .insert({
      user_id: user.id,
      item_id: itemId,
      item_type: itemType
    });

  if (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (itemId: string, itemType: 'pet' | 'host'): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be logged in to remove favorites');
  }

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', user.id)
    .eq('item_id', itemId)
    .eq('item_type', itemType);

  if (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

export const isFavorite = async (itemId: string, itemType: 'pet' | 'host'): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;

  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('item_id', itemId)
    .eq('item_type', itemType)
    .maybeSingle();

  if (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }

  return !!data;
};
