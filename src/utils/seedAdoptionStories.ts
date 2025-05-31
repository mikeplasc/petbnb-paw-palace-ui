import { supabase } from '@/integrations/supabase/client';

export const seedAdoptionStories = async () => {
  const sampleStories = [
    {
      user_id: '123', // This will be replaced with actual user ID
      pet_id: '456', // This will be replaced with actual pet ID
      pet_name: 'Luna',
      pet_image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
      title: '¡Luna encontró su hogar para siempre!',
      content: 'Después de meses buscando el hogar perfecto, Luna finalmente encontró su familia. Cuando la vi por primera vez en el refugio, supe que era especial. Su dulce personalidad y ojos expresivos me cautivaron. Ahora, después de 3 meses juntos, no puedo imaginar la vida sin ella. Se ha adaptado perfectamente a nuestro hogar y se lleva increíble con los niños. ¡Gracias PetBnB por ayudarnos a encontrarnos!',
      images: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583511655826-05700442b31b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=400&h=300&fit=crop'
      ],
      likes: 24
    },
    {
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
      likes: 42
    },
    {
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
      likes: 38
    }
  ];

  // First, let's get some actual user IDs from the profiles table
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id')
    .limit(3);

  if (profilesError) {
    console.error('Error fetching profiles:', profilesError);
    throw profilesError;
  }

  // Next, let's get some actual pet IDs from the pets table
  const { data: pets, error: petsError } = await supabase
    .from('pets')
    .select('id')
    .limit(3);

  if (petsError) {
    console.error('Error fetching pets:', petsError);
    throw petsError;
  }

  // Update the stories with real IDs
  const storiesWithRealIds = sampleStories.map((story, index) => ({
    ...story,
    user_id: profiles?.[index]?.id || story.user_id,
    pet_id: pets?.[index]?.id || story.pet_id,
    created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString() // Random date within last 30 days
  }));

  // Insert the stories
  const { data, error } = await supabase
    .from('adoption_stories')
    .insert(storiesWithRealIds)
    .select();

  if (error) {
    console.error('Error seeding adoption stories:', error);
    throw error;
  }

  console.log('Sample adoption stories created:', data);
  return data;
}; 