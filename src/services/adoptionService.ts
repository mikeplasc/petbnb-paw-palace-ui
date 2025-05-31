
export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  size: 'Pequeño' | 'Mediano' | 'Grande';
  gender: 'Macho' | 'Hembra';
  type: 'Perro' | 'Gato' | 'Ave' | 'Conejo' | 'Hámster';
  description: string;
  image: string;
  location: string;
  vaccinated: boolean;
  sterilized: boolean;
  urgent: boolean;
  shelterName: string;
  shelterContact: string;
  adoptionFee: number;
  dateAdded: string;
  characteristics: string[];
}

const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Max',
    breed: 'Labrador Retriever',
    age: '2 años',
    size: 'Grande',
    gender: 'Macho',
    type: 'Perro',
    description: 'Max es un perro muy cariñoso y juguetón. Le encanta correr y jugar con niños.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
    location: 'Madrid, España',
    vaccinated: true,
    sterilized: true,
    urgent: false,
    shelterName: 'Refugio Esperanza',
    shelterContact: 'contacto@refugioesperanza.es',
    adoptionFee: 150,
    dateAdded: '2024-01-15',
    characteristics: ['Sociable', 'Activo', 'Entrenado']
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Mestizo',
    age: '1 año',
    size: 'Mediano',
    gender: 'Hembra',
    type: 'Perro',
    description: 'Luna es una perra muy dulce que busca una familia amorosa.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    location: 'Barcelona, España',
    vaccinated: true,
    sterilized: false,
    urgent: true,
    shelterName: 'Protectora Barcelona',
    shelterContact: 'info@protectorabcn.es',
    adoptionFee: 100,
    dateAdded: '2024-01-20',
    characteristics: ['Cariñosa', 'Tranquila', 'Obediente']
  },
  {
    id: '3',
    name: 'Mimi',
    breed: 'Siamés',
    age: '3 años',
    size: 'Pequeño',
    gender: 'Hembra',
    type: 'Gato',
    description: 'Mimi es una gata independiente pero muy cariñosa cuando te conoce.',
    image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=300&fit=crop',
    location: 'Valencia, España',
    vaccinated: true,
    sterilized: true,
    urgent: false,
    shelterName: 'Asociación Felina',
    shelterContact: 'gatos@felina.org',
    adoptionFee: 80,
    dateAdded: '2024-01-18',
    characteristics: ['Independiente', 'Limpia', 'Inteligente']
  }
];

// Generar más mascotas hasta llegar a 100
const generatePets = (): Pet[] => {
  const names = ['Buddy', 'Bella', 'Charlie', 'Daisy', 'Rocky', 'Molly', 'Jack', 'Maggie', 'Toby', 'Sophie', 'Coco', 'Lola', 'Oscar', 'Zoey', 'Teddy', 'Chloe', 'Duke', 'Penny', 'Zeus', 'Ruby', 'Milo', 'Sadie', 'Otis', 'Stella', 'Leo', 'Nala', 'Simba', 'Princess', 'Tiger', 'Angel'];
  const dogBreeds = ['Labrador', 'Golden Retriever', 'Pastor Alemán', 'Bulldog', 'Mestizo', 'Beagle', 'Poodle', 'Husky', 'Chihuahua', 'Border Collie'];
  const catBreeds = ['Persa', 'Siamés', 'Maine Coon', 'Mestizo', 'Bengalí', 'Ragdoll', 'British Shorthair', 'Abisinio'];
  const cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas'];
  const shelters = ['Refugio Esperanza', 'Protectora Local', 'Asociación Animal', 'Casa de Mascotas', 'Refugio del Corazón'];
  const characteristics = ['Sociable', 'Activo', 'Tranquilo', 'Cariñoso', 'Juguetón', 'Obediente', 'Protector', 'Inteligente', 'Leal', 'Energético'];

  const allPets = [...mockPets];

  for (let i = 4; i <= 100; i++) {
    const isPet = Math.random() > 0.2; // 80% perros/gatos, 20% otras mascotas
    const isDog = isPet && Math.random() > 0.3; // 70% perros, 30% gatos entre perros/gatos
    
    let type: Pet['type'];
    let breed: string;
    
    if (isDog) {
      type = 'Perro';
      breed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
    } else if (isPet) {
      type = 'Gato';
      breed = catBreeds[Math.floor(Math.random() * catBreeds.length)];
    } else {
      const otherTypes: Pet['type'][] = ['Ave', 'Conejo', 'Hámster'];
      type = otherTypes[Math.floor(Math.random() * otherTypes.length)];
      breed = type === 'Ave' ? 'Canario' : type === 'Conejo' ? 'Holland Lop' : 'Sirio';
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
      image: type === 'Perro' 
        ? `https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=300&fit=crop` 
        : type === 'Gato'
        ? `https://images.unsplash.com/photo-${1600000000000 + i}?w=400&h=300&fit=crop`
        : `https://images.unsplash.com/photo-${1400000000000 + i}?w=400&h=300&fit=crop`,
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

const pets = generatePets();

export const getPets = (filters?: {
  type?: Pet['type'];
  size?: Pet['size'];
  location?: string;
  urgent?: boolean;
}) => {
  let filteredPets = pets;

  if (filters?.type) {
    filteredPets = filteredPets.filter(pet => pet.type === filters.type);
  }

  if (filters?.size) {
    filteredPets = filteredPets.filter(pet => pet.size === filters.size);
  }

  if (filters?.location) {
    filteredPets = filteredPets.filter(pet => 
      pet.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  if (filters?.urgent) {
    filteredPets = filteredPets.filter(pet => pet.urgent);
  }

  return filteredPets;
};

export const getPetById = (id: string) => {
  return pets.find(pet => pet.id === id);
};

export const createAdoptionRequest = (petId: string, userInfo: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const pet = getPetById(petId);
  if (!pet) {
    throw new Error('Mascota no encontrada');
  }

  const request = {
    id: Date.now().toString(),
    petId,
    petName: pet.name,
    userInfo,
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
    shelterName: pet.shelterName
  };

  console.log('Solicitud de adopción creada:', request);
  return request;
};
