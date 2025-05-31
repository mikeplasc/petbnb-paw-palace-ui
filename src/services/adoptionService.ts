
import { Pet, AdoptionRequest } from '@/types/adoption';
import { generatePets } from '@/utils/petGenerator';

const pets = generatePets();

// Storage para las solicitudes de adopción del usuario
let userAdoptionRequests: AdoptionRequest[] = [];

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

  const request: AdoptionRequest = {
    id: Date.now().toString(),
    petId,
    petName: pet.name,
    petImage: pet.image,
    userInfo,
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
    shelterName: pet.shelterName
  };

  userAdoptionRequests.push(request);
  console.log('Solicitud de adopción creada:', request);
  return request;
};

export const getUserAdoptionRequests = () => {
  return userAdoptionRequests;
};

// Re-export types for convenience
export type { Pet, AdoptionRequest };
