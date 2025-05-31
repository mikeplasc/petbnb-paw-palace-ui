import { faker } from '@faker-js/faker';

export type Pet = {
  id: string;
  name: string;
  breed: string;
  age: string;
  size: string;
  gender: string;
  type: string;
  description: string;
  image: string;
  location: string;
  shelter_name: string;
  shelter_contact: string;
  characteristics: string[];
  pet_category: string;
  vaccinated: boolean;
  sterilized: boolean;
  urgent: boolean;
  is_lost: boolean;
  adoption_fee: number;
  created_at: string;
  updated_at: string;
  owner_id: string | null;
};

const dogBreeds = [
  'Labrador Retriever',
  'German Shepherd',
  'Golden Retriever',
  'French Bulldog',
  'Bulldog',
  'Poodle',
  'Beagle',
  'Rottweiler',
  'Dachshund',
  'German Shorthaired Pointer',
];

const catBreeds = [
  'Maine Coon',
  'Ragdoll',
  'British Shorthair',
  'Persian',
  'Siamese',
  'Bengal',
  'Sphynx',
  'Abyssinian',
  'Scottish Fold',
  'Russian Blue',
];

const ages = ['Cachorro', 'Adulto', 'Senior'];
const sizes = ['Pequeño', 'Mediano', 'Grande'];
const genders = ['Macho', 'Hembra'];
const petTypes = ['Adopción', 'Rescate', 'Encontrado', 'Extraviado'];
const petCharacteristics = [
  'Amigable',
  'Juguetón',
  'Tranquilo',
  'Inteligente',
  'Leal',
  'Protector',
  'Independiente',
  'Cariñoso',
  'Divertido',
  'Paciente',
];

const dogImages = [
  '/images/dogs/dog-1.jpg',
  '/images/dogs/dog-2.jpg',
  '/images/dogs/dog-3.jpg',
  '/images/dogs/dog-4.jpg',
  '/images/dogs/dog-5.jpg',
  '/images/dogs/dog-6.jpg',
  '/images/dogs/dog-7.jpg',
  '/images/dogs/dog-8.jpg',
  '/images/dogs/dog-9.jpg',
  '/images/dogs/dog-10.jpg',
];

const catImages = [
  '/images/cats/cat-1.jpg',
  '/images/cats/cat-2.jpg',
  '/images/cats/cat-3.jpg',
  '/images/cats/cat-4.jpg',
  '/images/cats/cat-5.jpg',
  '/images/cats/cat-6.jpg',
  '/images/cats/cat-7.jpg',
  '/images/cats/cat-8.jpg',
  '/images/cats/cat-9.jpg',
  '/images/cats/cat-10.jpg',
];

const cities = [
  'Buenos Aires',
  'Córdoba',
  'Rosario',
  'Mendoza',
  'La Plata',
  'Mar del Plata',
  'Tucumán',
  'Salta',
  'Santa Fe',
  'Corrientes',
];

const shelters = [
  'Huellitas Felices',
  'Patitas al Rescate',
  'Amores Peludos',
  'Refugio Esperanza',
  'El Arca de Noé',
];

const shelterContacts = [
  'info@huellitasfelices.org',
  'adopciones@patitasalrescate.com',
  'contacto@amorespeludos.org',
  'ayuda@refugioesperanza.org',
  'salvaunavida@elarcadenoe.com',
];

export const generatePet = (i: number): Pet => {
  const breed = faker.helpers.arrayElement(dogBreeds.concat(catBreeds));
  const age = faker.helpers.arrayElement(ages);
  const size = faker.helpers.arrayElement(sizes);
  const gender = faker.helpers.arrayElement(genders);
  const type = faker.helpers.arrayElement(['Perro', 'Gato']);
  const imageArray = type === 'Perro' ? dogImages : catImages;
  const image = faker.helpers.arrayElement(imageArray);
  const city = faker.helpers.arrayElement(cities);
  const petType = faker.helpers.arrayElement(petTypes);
  const urgent = faker.datatype.boolean(0.2);
  const shelter = faker.helpers.arrayElement(shelters);
  const shelterContact = faker.helpers.arrayElement(shelterContacts);
  const vaccinated = faker.datatype.boolean(0.8);
  const sterilized = faker.datatype.boolean(0.7);
  const characteristics = faker.helpers.arrayElements(
    petCharacteristics,
    faker.number.int({ min: 2, max: 4 })
  );

  return {
    id: `pet-${i}`,
    name: faker.person.firstName(),
    breed,
    age,
    size,
    gender,
    type,
    description: faker.lorem.sentences(2),
    image,
    location: city,
    shelter_name: shelter,
    shelter_contact: shelterContact,
    characteristics,
    pet_category: petType,
    vaccinated,
    sterilized,
    urgent,
    is_lost: false,
    adoption_fee: faker.number.int({ min: 50, max: 500 }),
    created_at: faker.date.recent().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    owner_id: null
  };
};

export const generatePets = (count: number): Pet[] => {
  return Array.from({ length: count }, (_, i) => generatePet(i));
};
