export interface Host {
  id: string;
  name: string;
  type: 'family' | 'individual' | 'veterinary';
  location: string;
  city: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  images: string[];
  description: string;
  services: string[];
  acceptedPets: string[];
  certifications?: string[];
  availability: boolean;
  experience: string;
  responseTime: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  specialNeeds: string[];
  sociability: 'low' | 'medium' | 'high';
  image: string;
  ownerId: string;
}

export interface Review {
  id: string;
  hostId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  petName: string;
}

export interface Booking {
  id: string;
  hostId: string;
  petId: string;
  startDate: string;
  endDate: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  totalPrice: number;
}

export const mockHosts: Host[] = [
  {
    id: '1',
    name: 'Casa de María Elena',
    type: 'family',
    location: 'Roma Norte, CDMX',
    city: 'Ciudad de México',
    rating: 4.9,
    reviewCount: 127,
    pricePerNight: 350,
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04'],
    description: 'Familia amorosa con amplio jardín y más de 10 años cuidando mascotas. Tenemos dos perros propios que son muy sociables.',
    services: ['Paseos diarios', 'Alimentación personalizada', 'Juegos', 'Fotos diarias', 'Administración de medicamentos'],
    acceptedPets: ['Perros', 'Gatos'],
    availability: true,
    experience: '10+ años',
    responseTime: '2 horas'
  },
  {
    id: '2',
    name: 'Clínica Veterinaria San Ángel',
    type: 'veterinary',
    location: 'San Ángel, CDMX',
    city: 'Ciudad de México',
    rating: 4.8,
    reviewCount: 89,
    pricePerNight: 650,
    images: ['https://images.unsplash.com/photo-1485833077593-4278bba3f11f'],
    description: 'Clínica veterinaria certificada con servicio de hospedaje 24/7. Personal médico especializado.',
    services: ['Monitoreo médico 24/7', 'Administración de medicamentos', 'Emergencias', 'Consultas incluidas'],
    acceptedPets: ['Perros', 'Gatos', 'Aves', 'Conejos'],
    certifications: ['SENASICA', 'Colegio de Médicos Veterinarios'],
    availability: true,
    experience: '15+ años',
    responseTime: '30 minutos'
  },
  {
    id: '3',
    name: 'Roberto y Luna',
    type: 'individual',
    location: 'Providencia, Guadalajara',
    city: 'Guadalajara',
    rating: 4.7,
    reviewCount: 56,
    pricePerNight: 280,
    images: ['https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'],
    description: 'Cuidador individual con mucha experiencia. Vivo solo con mi perra Luna, muy tranquila y sociable.',
    services: ['Paseos matutinos', 'Compañía constante', 'Entrenamiento básico', 'Fotos diarias'],
    acceptedPets: ['Perros pequeños y medianos'],
    availability: true,
    experience: '5+ años',
    responseTime: '1 hora'
  },
  {
    id: '4',
    name: 'Familia Hernández',
    type: 'family',
    location: 'Satelite, Estado de México',
    city: 'Estado de México',
    rating: 4.6,
    reviewCount: 73,
    pricePerNight: 300,
    images: ['https://images.unsplash.com/photo-1452378174528-3090a4bba7b2'],
    description: 'Familia con dos hijos adolescentes que adoran las mascotas. Casa con patio grande y muchos juguetes.',
    services: ['Juegos con niños', 'Paseos en grupo', 'Actividades recreativas', 'Cuidado nocturno'],
    acceptedPets: ['Perros', 'Gatos', 'Conejos'],
    availability: true,
    experience: '7+ años',
    responseTime: '3 horas'
  },
  {
    id: '5',
    name: 'Ana Sofía Pet Care',
    type: 'individual',
    location: 'Del Valle, CDMX',
    city: 'Ciudad de México',
    rating: 4.8,
    reviewCount: 94,
    pricePerNight: 400,
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04'],
    description: 'Veterinaria retirada que ofrece cuidado especializado. Departamento amplio con área de juegos.',
    services: ['Cuidado médico', 'Administración de medicamentos', 'Fisioterapia', 'Grooming básico'],
    acceptedPets: ['Perros', 'Gatos'],
    availability: true,
    experience: '20+ años',
    responseTime: '1 hora'
  },
  {
    id: '6',
    name: 'Centro Veterinario Polanco',
    type: 'veterinary',
    location: 'Polanco, CDMX',
    city: 'Ciudad de México',
    rating: 4.9,
    reviewCount: 156,
    pricePerNight: 780,
    images: ['https://images.unsplash.com/photo-1485833077593-4278bba3f11f'],
    description: 'Centro veterinario de lujo con instalaciones de última generación. Servicio premium 24/7.',
    services: ['Hospital completo', 'UCI veterinaria', 'Cirugías', 'Laboratorio', 'Rayos X'],
    acceptedPets: ['Perros', 'Gatos', 'Aves', 'Conejos', 'Otros'],
    certifications: ['SENASICA', 'Certificación Internacional', 'ISO 9001'],
    availability: true,
    experience: '25+ años',
    responseTime: '15 minutos'
  },
  {
    id: '7',
    name: 'Casa Zapopan Pet Lodge',
    type: 'family',
    location: 'Zapopan, Guadalajara',
    city: 'Guadalajara',
    rating: 4.5,
    reviewCount: 41,
    pricePerNight: 250,
    images: ['https://images.unsplash.com/photo-1452378174528-3090a4bba7b2'],
    description: 'Familia joven con casa grande y patio. Experiencia cuidando mascotas de familiares y amigos.',
    services: ['Paseos diarios', 'Juegos', 'Cuidado nocturno', 'Alimentación'],
    acceptedPets: ['Perros', 'Gatos'],
    availability: true,
    experience: '3+ años',
    responseTime: '4 horas'
  },
  {
    id: '8',
    name: 'Dr. Carlos Mendoza - Veterinario a domicilio',
    type: 'individual',
    location: 'Lindavista, CDMX',
    city: 'Ciudad de México',
    rating: 4.7,
    reviewCount: 68,
    pricePerNight: 500,
    images: ['https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'],
    description: 'Veterinario con consulta móvil. Ofrece cuidado especializado en su hogar adaptado para mascotas.',
    services: ['Consultas veterinarias', 'Vacunación', 'Administración de medicamentos', 'Emergencias'],
    acceptedPets: ['Perros', 'Gatos', 'Aves'],
    certifications: ['Cédula profesional veterinaria', 'Especialidad en medicina interna'],
    availability: true,
    experience: '12+ años',
    responseTime: '2 horas'
  },
  {
    id: '9',
    name: 'Pet Paradise Monterrey',
    type: 'family',
    location: 'San Pedro, Monterrey',
    city: 'Monterrey',
    rating: 4.6,
    reviewCount: 82,
    pricePerNight: 320,
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04'],
    description: 'Familia con amplia experiencia en cuidado de mascotas. Casa con jardín y área de juegos.',
    services: ['Paseos', 'Entrenamiento', 'Socialización', 'Grooming básico'],
    acceptedPets: ['Perros', 'Gatos'],
    availability: true,
    experience: '8+ años',
    responseTime: '2 horas'
  },
  {
    id: '10',
    name: 'Clínica Veterinaria Guadalajara Centro',
    type: 'veterinary',
    location: 'Centro Histórico, Guadalajara',
    city: 'Guadalajara',
    rating: 4.4,
    reviewCount: 37,
    pricePerNight: 580,
    images: ['https://images.unsplash.com/photo-1485833077593-4278bba3f11f'],
    description: 'Clínica veterinaria establecida con más de 30 años de experiencia. Instalaciones renovadas.',
    services: ['Hospitalización', 'Cirugías menores', 'Laboratorio', 'Radiografías'],
    acceptedPets: ['Perros', 'Gatos', 'Aves', 'Conejos'],
    certifications: ['SENASICA', 'Registro sanitario'],
    availability: true,
    experience: '30+ años',
    responseTime: '1 hora'
  }
];

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Max',
    species: 'Perro',
    breed: 'Golden Retriever',
    age: 3,
    weight: 28,
    specialNeeds: ['Medicamento para artritis'],
    sociability: 'high',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
    ownerId: 'user1'
  },
  {
    id: '2',
    name: 'Mimi',
    species: 'Gato',
    breed: 'Siamés',
    age: 2,
    weight: 4,
    specialNeeds: [],
    sociability: 'medium',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    ownerId: 'user1'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    hostId: '1',
    userName: 'Carlos M.',
    rating: 5,
    comment: 'Excelente cuidado para mi perro Bruno. María Elena es muy cariñosa y profesional. Recibí fotos todos los días.',
    date: '2024-03-15',
    petName: 'Bruno'
  },
  {
    id: '2',
    hostId: '1',
    userName: 'Ana L.',
    rating: 5,
    comment: 'Mi gata Luna se sintió como en casa. El jardín es perfecto para que los animales jueguen y se relajen.',
    date: '2024-03-10',
    petName: 'Luna'
  },
  {
    id: '3',
    hostId: '2',
    userName: 'Roberto S.',
    rating: 5,
    comment: 'Perfecto para mascotas con necesidades médicas especiales. Personal muy preparado y atención 24/7.',
    date: '2024-03-08',
    petName: 'Rocky'
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    hostId: '1',
    petId: '1',
    startDate: '2024-04-15',
    endDate: '2024-04-20',
    status: 'confirmed',
    totalPrice: 1750
  },
  {
    id: '2',
    hostId: '2',
    petId: '2',
    startDate: '2024-03-28',
    endDate: '2024-03-30',
    status: 'completed',
    totalPrice: 1300
  }
];

export const cities = [
  'Ciudad de México',
  'Guadalajara',
  'Monterrey',
  'Puebla',
  'Tijuana',
  'León',
  'Juárez',
  'Torreón',
  'Querétaro',
  'San Luis Potosí'
];

export const petTypes = [
  'Perros',
  'Gatos', 
  'Aves',
  'Conejos',
  'Peces',
  'Hámsters',
  'Otros'
];
