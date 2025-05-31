
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

export interface AdoptionRequest {
  id: string;
  petId: string;
  petName: string;
  petImage: string;
  userInfo: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  shelterName: string;
}
