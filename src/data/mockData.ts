import { faker } from '@faker-js/faker';

// Function to generate a random pet type
const getRandomPetType = () => {
  const petTypes = ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'turtle'];
  return petTypes[Math.floor(Math.random() * petTypes.length)];
};

// Function to generate a random service
const getRandomService = () => {
  const services = ['Grooming', 'Training', 'Walking', 'Sitting', 'Boarding', 'Daycare'];
  return services[Math.floor(Math.random() * services.length)];
};

// Function to generate a random city
const getRandomCity = () => {
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  return cities[Math.floor(Math.random() * cities.length)];
};

// Function to generate a random rating
const getRandomRating = () => {
  return faker.number.float({ min: 3, max: 5, precision: 0.1 });
};

// Function to generate a random price per night
const getRandomPricePerNight = () => {
  return faker.number.int({ min: 20, max: 150 });
};

// Function to generate a random number of reviews
const getRandomReviewCount = () => {
  return faker.number.int({ min: 0, max: 500 });
};

// Function to generate a random response time
const getRandomResponseTime = () => {
  const responseTimes = ['within an hour', 'within a few hours', 'within a day'];
  return responseTimes[Math.floor(Math.random() * responseTimes.length)];
};

// Function to generate a random number of certifications
const getRandomCertifications = () => {
  const certifications = ['Certified Pet Sitter', 'Certified Dog Walker', 'Pet First Aid & CPR', 'Fear Free Certified'];
  const numberOfCertifications = faker.number.int({ min: 0, max: certifications.length });
  const randomCertifications = [];
  for (let i = 0; i < numberOfCertifications; i++) {
    randomCertifications.push(certifications[i]);
  }
  return randomCertifications;
};

// Function to generate a random number of services
const getRandomServices = () => {
  const services = ['Grooming', 'Training', 'Walking', 'Sitting', 'Boarding', 'Daycare', 'Bathing', 'Nail Trimming', 'Teeth Cleaning'];
  const numberOfServices = faker.number.int({ min: 1, max: services.length });
  const randomServices = [];
  for (let i = 0; i < numberOfServices; i++) {
    randomServices.push(services[i]);
  }
  return randomServices;
};

// Function to generate a random description
const getRandomDescription = () => {
  return faker.lorem.paragraph();
};

// Function to generate a random image
const getRandomImage = () => {
  return faker.image.urlPicsumPhotos();
};

export const mockHosts = [
  {
    id: '1',
    name: faker.company.name(),
    type: 'sitter' as const,
    location: faker.location.streetAddress(),
    city: getRandomCity(),
    pricePerNight: getRandomPricePerNight(),
    rating: getRandomRating(),
    reviewCount: getRandomReviewCount(),
    images: [
      getRandomImage(),
      getRandomImage(),
      getRandomImage()
    ],
    description: getRandomDescription(),
    services: getRandomServices(),
    responseTime: getRandomResponseTime(),
    certifications: getRandomCertifications(),
  },
  {
    id: '2',
    name: faker.company.name(),
    type: 'sitter' as const,
    location: faker.location.streetAddress(),
    city: getRandomCity(),
    pricePerNight: getRandomPricePerNight(),
    rating: getRandomRating(),
    reviewCount: getRandomReviewCount(),
    images: [
      getRandomImage(),
      getRandomImage(),
      getRandomImage()
    ],
    description: getRandomDescription(),
    services: getRandomServices(),
    responseTime: getRandomResponseTime(),
    certifications: getRandomCertifications(),
  },
  {
    id: '3',
    name: faker.company.name(),
    type: 'sitter' as const,
    location: faker.location.streetAddress(),
    city: getRandomCity(),
    pricePerNight: getRandomPricePerNight(),
    rating: getRandomRating(),
    reviewCount: getRandomReviewCount(),
    images: [
      getRandomImage(),
      getRandomImage(),
      getRandomImage()
    ],
    description: getRandomDescription(),
    services: getRandomServices(),
    responseTime: getRandomResponseTime(),
    certifications: getRandomCertifications(),
  },
  {
    id: '4',
    name: faker.company.name(),
    type: 'sitter' as const,
    location: faker.location.streetAddress(),
    city: getRandomCity(),
    pricePerNight: getRandomPricePerNight(),
    rating: getRandomRating(),
    reviewCount: getRandomReviewCount(),
    images: [
      getRandomImage(),
      getRandomImage(),
      getRandomImage()
    ],
    description: getRandomDescription(),
    services: getRandomServices(),
    responseTime: getRandomResponseTime(),
    certifications: getRandomCertifications(),
  },
  {
    id: '5',
    name: faker.company.name(),
    type: 'sitter' as const,
    location: faker.location.streetAddress(),
    city: getRandomCity(),
    pricePerNight: getRandomPricePerNight(),
    rating: getRandomRating(),
    reviewCount: getRandomReviewCount(),
    images: [
      getRandomImage(),
      getRandomImage(),
      getRandomImage()
    ],
    description: getRandomDescription(),
    services: getRandomServices(),
    responseTime: getRandomResponseTime(),
    certifications: getRandomCertifications(),
  },
  {
    id: 'vet-1',
    name: 'Clínica Veterinaria Roma',
    type: 'veterinary' as const,
    location: 'Calle Chihuahua 123, Roma Norte',
    city: 'Ciudad de México',
    pricePerNight: 550,
    rating: 4.7,
    reviewCount: 120,
    images: [
      'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617814912600-b2a94648addb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clínica veterinaria con servicios de consulta, vacunación, cirugía y estética canina y felina.',
    services: ['Consulta', 'Vacunación', 'Cirugía', 'Estética', 'Laboratorio'],
    responseTime: '20 minutos',
    certifications: ['CVMCDMX'],
    specialties: ['Medicina interna', 'Cirugía general']
  },
  {
    id: 'vet-2',
    name: 'Hospital Veterinario Satélite',
    type: 'veterinary' as const,
    location: 'Circuito Médicos 789, Ciudad Satélite',
    city: 'Naucalpan',
    pricePerNight: 800,
    rating: 4.9,
    reviewCount: 250,
    images: [
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591604314364-924997a43555?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hospital veterinario con atención las 24 horas, servicio de urgencias, laboratorio y hospitalización.',
    services: ['Urgencias 24h', 'Hospitalización', 'Laboratorio', 'Rayos X', 'Ultrasonido'],
    responseTime: '10 minutos',
    certifications: ['AAHA', 'AVMA'],
    specialties: ['Cardiología', 'Neurología']
  },
  {
    id: 'vet-3',
    name: 'Clínica Veterinaria Condesa',
    type: 'veterinary' as const,
    location: 'Avenida Amsterdam 45, Hipódromo Condesa',
    city: 'Ciudad de México',
    pricePerNight: 600,
    rating: 4.6,
    reviewCount: 95,
    images: [
      'https://images.unsplash.com/photo-1672496448770-99c599e5bc5b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1629410344212-48199989461a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clínica veterinaria con enfoque en medicina preventiva, planes de salud y nutrición para mascotas.',
    services: ['Medicina preventiva', 'Planes de salud', 'Nutrición', 'Homeopatía', 'Acupuntura'],
    responseTime: '30 minutos',
    certifications: ['AMMVEE'],
    specialties: ['Medicina preventiva', 'Nutrición clínica']
  },
  {
    id: 'vet-4',
    name: 'Pet Care Center Polanco',
    type: 'veterinary' as const,
    location: 'Luis Pasteur 98, Polanco',
    city: 'Ciudad de México',
    pricePerNight: 700,
    rating: 4.8,
    reviewCount: 180,
    images: [
      'https://images.unsplash.com/photo-1573878792447-097043589965?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1629410343972-8c77aa4367ca?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Centro de cuidado integral para mascotas con servicios de veterinaria, estética, pensión y adiestramiento.',
    services: ['Veterinaria', 'Estética', 'Pensión', 'Adiestramiento', 'Guardería'],
    responseTime: '15 minutos',
    certifications: ['CMPV'],
    specialties: ['Dermatología', 'Etología']
  },
  {
    id: 'vet-5',
    name: 'Unidad Veterinaria Narvarte',
    type: 'veterinary' as const,
    location: 'Eje Central Lázaro Cárdenas 1000, Narvarte',
    city: 'Ciudad de México',
    pricePerNight: 500,
    rating: 4.5,
    reviewCount: 75,
    images: [
      'https://images.unsplash.com/photo-1616624364808-99466801592f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591604304944-4f99c5a93990?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Unidad veterinaria con servicios de consulta, desparasitación, esterilización y venta de alimentos y accesorios.',
    services: ['Consulta', 'Desparasitación', 'Esterilización', 'Alimentos', 'Accesorios'],
    responseTime: '25 minutos',
    certifications: ['SEDESA'],
    specialties: ['Medicina general', 'Salud pública']
  },
  
  // Adding more veterinary records with different images
  {
    id: 'vet-6',
    name: 'Hospital Veterinario San Rafael',
    type: 'veterinary' as const,
    location: 'Av. Reforma 456, Roma Norte',
    city: 'Ciudad de México',
    pricePerNight: 800,
    rating: 4.9,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hospital veterinario de alta especialidad con tecnología de vanguardia y atención 24/7. Especialistas en cirugía, cardiología y oncología veterinaria.',
    services: ['Cirugía especializada', 'Cardiología', 'Oncología', 'Imagenología', 'Laboratorio'],
    responseTime: '15 minutos',
    certifications: ['AAHA', 'AVMA'],
    specialties: ['Cirugía cardiovascular', 'Oncología']
  },
  {
    id: 'vet-7',
    name: 'Clínica Veterinaria Integral',
    type: 'veterinary' as const,
    location: 'Calle Hidalgo 789, Centro Histórico',
    city: 'Guadalajara',
    pricePerNight: 450,
    rating: 4.6,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clínica veterinaria familiar con más de 20 años de experiencia. Ofrecemos servicios integrales de medicina preventiva y curativa.',
    services: ['Consulta general', 'Vacunación', 'Esterilización', 'Radiografías', 'Análisis clínicos'],
    responseTime: '30 minutos',
    certifications: ['CVMJ'],
    specialties: ['Medicina preventiva', 'Pequeñas especies']
  },
  {
    id: 'vet-8',
    name: 'Centro Veterinario Especializado',
    type: 'veterinary' as const,
    location: 'Blvd. Kukulcán Km 14, Zona Hotelera',
    city: 'Cancún',
    pricePerNight: 950,
    rating: 4.8,
    reviewCount: 134,
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Centro veterinario moderno especializado en medicina de animales exóticos y mascotas tradicionales. Instalaciones de lujo con personal bilingüe.',
    services: ['Medicina exótica', 'Hospitalización', 'Grooming', 'Fisioterapia', 'Nutrición'],
    responseTime: '10 minutos',
    certifications: ['AEMVE', 'CVMQR'],
    specialties: ['Animales exóticos', 'Fisioterapia veterinaria']
  },
  {
    id: 'vet-9',
    name: 'Hospital Veterinario del Norte',
    type: 'veterinary' as const,
    location: 'Av. Universidad 321, San Nicolás',
    city: 'Monterrey',
    pricePerNight: 600,
    rating: 4.7,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hospital veterinario regional con equipo médico especializado y tecnología avanzada. Referente en el norte del país para casos complejos.',
    services: ['Neurología', 'Oftalmología', 'Dermatología', 'Endoscopia', 'Terapia intensiva'],
    responseTime: '20 minutos',
    certifications: ['CVMNL', 'AAHA'],
    specialties: ['Neurología veterinaria', 'Oftalmología']
  },
  {
    id: 'vet-10',
    name: 'Clínica Veterinaria Familiar Puebla',
    type: 'veterinary' as const,
    location: 'Av. Juárez 567, Centro',
    city: 'Puebla',
    pricePerNight: 380,
    rating: 4.5,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clínica veterinaria de tradición familiar que brinda atención personalizada y cálida. Especializada en medicina preventiva y cuidados básicos.',
    services: ['Consulta general', 'Vacunación', 'Desparasitación', 'Cirugía menor', 'Urgencias'],
    responseTime: '25 minutos',
    certifications: ['CVMP'],
    specialties: ['Medicina preventiva', 'Atención familiar']
  },
  {
    id: 'vet-11',
    name: 'Centro de Especialidades Veterinarias',
    type: 'veterinary' as const,
    location: 'Calzada del Valle 890, Del Valle',
    city: 'Ciudad de México',
    pricePerNight: 1200,
    rating: 4.9,
    reviewCount: 203,
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Centro de alta especialidad veterinaria con las últimas tecnologías en diagnóstico y tratamiento. Referencia nacional en medicina veterinaria.',
    services: ['Resonancia magnética', 'Tomografía', 'Quimioterapia', 'Cirugía robótica', 'Trasplantes'],
    responseTime: '5 minutos',
    certifications: ['AAHA', 'AVMA', 'ECVS'],
    specialties: ['Cirugía robótica', 'Medicina nuclear']
  }
];

export const cities = [
  'Ciudad de México',
  'Guadalajara',
  'Monterrey',
  'Puebla',
  'Tijuana',
  'León',
  'Zapopan',
  'Juárez',
  'Mérida',
  'San Luis Potosí'
];
