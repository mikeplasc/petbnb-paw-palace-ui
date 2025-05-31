
import { Pet } from '@/types/adoption';
import { mockPets } from '@/data/mockPets';

const names = ['Buddy', 'Bella', 'Charlie', 'Daisy', 'Rocky', 'Molly', 'Jack', 'Maggie', 'Toby', 'Sophie', 'Coco', 'Lola', 'Oscar', 'Zoey', 'Teddy', 'Chloe', 'Duke', 'Penny', 'Zeus', 'Ruby', 'Milo', 'Sadie', 'Otis', 'Stella', 'Leo', 'Nala', 'Simba', 'Princess', 'Tiger', 'Angel'];

const dogBreeds = ['Labrador', 'Golden Retriever', 'Pastor Alemán', 'Bulldog', 'Mestizo', 'Beagle', 'Poodle', 'Husky', 'Chihuahua', 'Border Collie'];

const catBreeds = ['Persa', 'Siamés', 'Maine Coon', 'Mestizo', 'Bengalí', 'Ragdoll', 'British Shorthair', 'Abisinio'];

const cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas'];

const shelters = ['Refugio Esperanza', 'Protectora Local', 'Asociación Animal', 'Casa de Mascotas', 'Refugio del Corazón'];

const characteristics = ['Sociable', 'Activo', 'Tranquilo', 'Cariñoso', 'Juguetón', 'Obediente', 'Protector', 'Inteligente', 'Leal', 'Energético'];

const dogImages = [
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1546975490-e8b92a360b24?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&h=300&fit=crop'
];

const catImages = [
  'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop'
];

const otherImages = [
  'https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=300&fit=crop'
];

export const generatePets = (): Pet[] => {
  const allPets = [...mockPets];

  for (let i = 4; i <= 100; i++) {
    const isPet = Math.random() > 0.2;
    const isDog = isPet && Math.random() > 0.3;
    
    let type: Pet['type'];
    let breed: string;
    let imageArray: string[];
    
    if (isDog) {
      type = 'Perro';
      breed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
      imageArray = dogImages;
    } else if (isPet) {
      type = 'Gato';
      breed = catBreeds[Math.floor(Math.random() * catBreeds.length)];
      imageArray = catImages;
    } else {
      const otherTypes: Pet['type'][] = ['Ave', 'Conejo', 'Hámster'];
      type = otherTypes[Math.floor(Math.random() * otherTypes.length)];
      breed = type === 'Ave' ? 'Canario' : type === 'Conejo' ? 'Holland Lop' : 'Sirio';
      imageArray = otherImages;
    }

    const name = names[Math.floor(Math.random() * names.length)];
    const age = `${Math.floor(Math.random() * 8) + 1} año${Math.floor(Math.random() * 8) + 1 === 1 ? '' : 's'}`;
    const sizes: Pet['size'][] = ['Pequeño', 'Mediano', 'Grande'];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const gender: Pet['gender'] = Math.random() > 0.5 ? 'Macho' : 'Hembra';
    const city = cities[Math.floor(Math.random() * cities.length)];
    const shelter = shelters[Math.floor(Math.random() * shelters.length)];
    
    const petCharacteristics = [];
    for (let j = 0; j < 3; j++) {
      const char = characteristics[Math.floor(Math.random() * characteristics.length)];
      if (!petCharacteristics.includes(char)) {
        petCharacteristics.push(char);
      }
    }

    const pet: Pet = {
      id: i.toString(),
      name,
      breed,
      age,
      size,
      gender,
      type,
      description: `${name} es un${gender === 'Hembra' ? 'a' : ''} ${type.toLowerCase()} muy especial que busca una familia amorosa.`,
      image: imageArray[Math.floor(Math.random() * imageArray.length)],
      location: `${city}, España`,
      vaccinated: Math.random() > 0.2,
      sterilized: Math.random() > 0.3,
      urgent: Math.random() > 0.8,
      shelterName: shelter,
      shelterContact: `contacto@${shelter.toLowerCase().replace(/\s+/g, '')}.org`,
      adoptionFee: Math.floor(Math.random() * 200) + 50,
      dateAdded: `2024-01-${Math.floor(Math.random() * 28) + 1}`,
      characteristics: petCharacteristics
    };

    allPets.push(pet);
  }

  return allPets;
};
