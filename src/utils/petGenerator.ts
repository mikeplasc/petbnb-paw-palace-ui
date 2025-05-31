
import { faker } from '@faker-js/faker';

const petTypes = ['Perro', 'Gato', 'Conejo', 'Hámster', 'Pájaro'];
const dogBreeds = ['Labrador', 'Golden Retriever', 'Bulldog', 'Pastor Alemán', 'Chihuahua', 'Beagle', 'Poodle', 'Rottweiler'];
const catBreeds = ['Persa', 'Siamés', 'Maine Coon', 'British Shorthair', 'Ragdoll', 'Bengalí', 'Sphynx', 'Mestizo'];
const sizes = ['Pequeño', 'Mediano', 'Grande'];
const genders = ['Macho', 'Hembra'];
const ages = ['Cachorro', 'Joven', 'Adulto', 'Senior'];

const getBreedByType = (type: string): string => {
  switch (type) {
    case 'Perro':
      return faker.helpers.arrayElement(dogBreeds);
    case 'Gato':
      return faker.helpers.arrayElement(catBreeds);
    default:
      return 'Mestizo';
  }
};

const getCharacteristics = (type: string): string[] => {
  const commonCharacteristics = [
    'Juguetón', 'Tranquilo', 'Sociable', 'Cariñoso', 'Activo', 'Inteligente',
    'Obediente', 'Protector', 'Tímido', 'Energético', 'Amigable', 'Independiente'
  ];
  
  const typeSpecific = {
    'Perro': ['Leal', 'Guardián', 'Entrenado', 'Le gusta caminar'],
    'Gato': ['Independiente', 'Limpio', 'Cazador', 'Le gusta dormir'],
    'Conejo': ['Silencioso', 'Pequeño', 'Herbívoro'],
    'Hámster': ['Nocturno', 'Pequeño', 'Fácil cuidado'],
    'Pájaro': ['Cantarín', 'Colorido', 'Social']
  };

  const available = [...commonCharacteristics, ...(typeSpecific[type as keyof typeof typeSpecific] || [])];
  return faker.helpers.arrayElements(available, { min: 2, max: 4 });
};

export const generatePet = (petCategory: 'adoption' | 'personal' = 'adoption') => {
  const type = faker.helpers.arrayElement(petTypes);
  const breed = getBreedByType(type);
  const characteristics = getCharacteristics(type);
  
  return {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    breed,
    age: faker.helpers.arrayElement(ages),
    size: faker.helpers.arrayElement(sizes),
    gender: faker.helpers.arrayElement(genders),
    type,
    description: `${faker.lorem.sentence()} Es muy ${characteristics[0].toLowerCase()} y ${characteristics[1].toLowerCase()}.`,
    image: `https://picsum.photos/400/300?random=${faker.number.int(1000)}`,
    location: faker.location.city(),
    vaccinated: faker.datatype.boolean(0.8),
    sterilized: faker.datatype.boolean(0.6),
    urgent: faker.datatype.boolean(0.2),
    is_lost: false,
    characteristics,
    pet_category: petCategory,
    created_at: faker.date.recent().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    adoption_fee: petCategory === 'adoption' ? faker.number.int({ min: 0, max: 500 }) : 0,
    shelter_name: petCategory === 'adoption' ? faker.company.name() + ' Shelter' : null,
    shelter_contact: petCategory === 'adoption' ? faker.phone.number() : null,
    owner_id: petCategory === 'personal' ? faker.string.uuid() : null,
  };
};

export const generatePets = (count: number, petCategory: 'adoption' | 'personal' = 'adoption') => {
  return Array.from({ length: count }, () => generatePet(petCategory));
};
