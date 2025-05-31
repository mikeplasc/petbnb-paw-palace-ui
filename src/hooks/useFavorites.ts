
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavorites, addToFavorites, removeFromFavorites } from '@/services/favoritesService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useFavorites = (itemType?: 'pet' | 'host') => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites', itemType, user?.id],
    queryFn: () => getFavorites(itemType),
    enabled: !!user,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: ({ itemId, itemType }: { itemId: string; itemType: 'pet' | 'host' }) =>
      addToFavorites(itemId, itemType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success('Añadido a favoritos');
    },
    onError: (error) => {
      console.error('Error adding to favorites:', error);
      toast.error('Error al añadir a favoritos');
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: ({ itemId, itemType }: { itemId: string; itemType: 'pet' | 'host' }) =>
      removeFromFavorites(itemId, itemType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success('Eliminado de favoritos');
    },
    onError: (error) => {
      console.error('Error removing from favorites:', error);
      toast.error('Error al eliminar de favoritos');
    },
  });

  const toggleFavorite = (itemId: string, itemType: 'pet' | 'host') => {
    if (!user) {
      toast.error('Debes iniciar sesión para usar favoritos');
      return;
    }

    const isFav = favorites.some(fav => fav.item_id === itemId && fav.item_type === itemType);
    
    if (isFav) {
      removeFavoriteMutation.mutate({ itemId, itemType });
    } else {
      addFavoriteMutation.mutate({ itemId, itemType });
    }
  };

  const isFavorite = (itemId: string, itemType: 'pet' | 'host') => {
    return favorites.some(fav => fav.item_id === itemId && fav.item_type === itemType);
  };

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite,
    isAdding: addFavoriteMutation.isPending,
    isRemoving: removeFavoriteMutation.isPending,
  };
};
