
import { supabase } from '@/integrations/supabase/client';

export interface AdoptionStory {
  id: string;
  user_id: string;
  pet_id: string;
  pet_name: string;
  pet_image: string;
  title: string;
  content: string;
  images: string[];
  likes: number;
  created_at: string;
  user_name: string;
  user_avatar: string;
}

// Mock data for development
const mockStories: AdoptionStory[] = [
  {
    id: '1',
    user_id: '123',
    pet_id: '456',
    pet_name: 'Luna',
    pet_image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    title: '¡Luna encontró su hogar para siempre!',
    content: 'Después de meses buscando el hogar perfecto, Luna finalmente encontró su familia. Cuando la vi por primera vez en el refugio, supe que era especial. Su dulce personalidad y ojos expresivos me cautivaron. Ahora, después de 3 meses juntos, no puedo imaginar la vida sin ella. Se ha adaptado perfectamente a nuestro hogar y se lleva increíble con los niños. ¡Gracias PetBnB por ayudarnos a encontrarnos!',
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1583511655826-05700442b31b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=400&h=300&fit=crop'
    ],
    likes: 24,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    user_name: 'María González',
    user_avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b15c?w=60&h=60&fit=crop&crop=face'
  },
  {
    id: '2',
    user_id: '124',
    pet_id: '457',
    pet_name: 'Max',
    pet_image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
    title: 'Max: De la calle a nuestro corazón',
    content: 'Hace un año, encontramos a Max abandonado en la calle. Estaba asustado y desnutrido. Gracias a PetBnB, pudimos completar su proceso de adopción y darle el hogar que merecía. Hoy, Max es el perro más feliz del mundo. Le encanta jugar en el parque, perseguir pelotas y dormir en su cama favorita. Su transformación ha sido increíble, y nos ha enseñado tanto sobre el amor incondicional.',
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1567014543648-e4391c989aab?w=400&h=300&fit=crop'
    ],
    likes: 42,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    user_name: 'Carlos Ruiz',
    user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
  },
  {
    id: '3',
    user_id: '125',
    pet_id: '458',
    pet_name: 'Mimi',
    pet_image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=300&fit=crop',
    title: 'Mimi: Una historia de amor felino',
    content: 'Adoptar a Mimi fue la mejor decisión que pudimos tomar. Al principio era muy tímida y se escondía debajo de la cama, pero con paciencia y amor, poco a poco fue ganando confianza. Ahora es la reina de la casa, le encanta acurrucarse en nuestro regazo y jugar con sus juguetes. Su ronroneo llena nuestro hogar de alegría. Si estás pensando en adoptar, ¡hazlo! Cambiarás una vida para siempre.',
    images: [
      'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=400&h=300&fit=crop'
    ],
    likes: 38,
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    user_name: 'Ana López',
    user_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face'
  }
];

export const getAdoptionStories = async (): Promise<AdoptionStory[]> => {
  // For now, always return mock data since the adoption_stories table doesn't exist yet
  return mockStories;
};

export const createAdoptionStory = async (storyData: Omit<AdoptionStory, 'id' | 'created_at' | 'likes' | 'user_name' | 'user_avatar'>): Promise<AdoptionStory | null> => {
  // For now, just return a mock story since the table doesn't exist yet
  console.log('Creating adoption story (mock):', storyData);
  
  const newStory: AdoptionStory = {
    ...storyData,
    id: Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    likes: 0,
    user_name: 'Usuario',
    user_avatar: ''
  };
  
  return newStory;
};

export const likeAdoptionStory = async (storyId: string): Promise<void> => {
  // For now, just log the action since the table doesn't exist yet
  console.log(`Liked story ${storyId} (mock)`);
};
