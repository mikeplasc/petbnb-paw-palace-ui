
import { supabase } from '@/integrations/supabase/client';

export const seedSamplePets = async () => {
  const samplePets = [
    {
      name: 'Max',
      breed: 'Labrador Retriever',
      age: '2 años',
      size: 'Grande',
      gender: 'Macho',
      type: 'Perro',
      description: 'Max es un perro muy cariñoso y juguetón. Le encanta correr y jugar con niños. Es perfecto para familias activas.',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
      location: 'Madrid, España',
      vaccinated: true,
      sterilized: true,
      urgent: false,
      shelter_name: 'Refugio Esperanza',
      shelter_contact: 'contacto@refugioesperanza.es',
      adoption_fee: 150,
      characteristics: ['Sociable', 'Activo', 'Entrenado'],
      pet_category: 'adoption'
    },
    {
      name: 'Luna',
      breed: 'Mestizo',
      age: '1 año',
      size: 'Mediano',
      gender: 'Hembra',
      type: 'Perro',
      description: 'Luna es una perra muy dulce que busca una familia amorosa. Es tranquila y se lleva bien con otros animales.',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
      location: 'Barcelona, España',
      vaccinated: true,
      sterilized: false,
      urgent: true,
      shelter_name: 'Protectora Barcelona',
      shelter_contact: 'info@protectorabcn.es',
      adoption_fee: 100,
      characteristics: ['Cariñosa', 'Tranquila', 'Obediente'],
      pet_category: 'adoption'
    },
    {
      name: 'Mimi',
      breed: 'Siamés',
      age: '3 años',
      size: 'Pequeño',
      gender: 'Hembra',
      type: 'Gato',
      description: 'Mimi es una gata independiente pero muy cariñosa cuando te conoce. Perfect para apartamentos.',
      image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=300&fit=crop',
      location: 'Valencia, España',
      vaccinated: true,
      sterilized: true,
      urgent: false,
      shelter_name: 'Asociación Felina',
      shelter_contact: 'gatos@felina.org',
      adoption_fee: 80,
      characteristics: ['Independiente', 'Limpia', 'Inteligente'],
      pet_category: 'adoption'
    }
  ];

  const { data, error } = await supabase
    .from('pets')
    .insert(samplePets)
    .select();

  if (error) {
    console.error('Error seeding pets:', error);
    throw error;
  }

  console.log('Sample pets created:', data);
  return data;
};
