
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
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04'],
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
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04'],
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
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04'],
    description: 'Familia con dos hijos adolescentes que adoran las mascotas. Casa con patio grande y muchos juguetes.',
    services: ['Juegos con niños', 'Paseos en grupo', 'Actividades recreativas', 'Cuidado nocturno'],
    acceptedPets: ['Perros', 'Gatos', 'Conejos'],
    availability: true,
    experience: '7+ años',
    responseTime: '3 horas'
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
