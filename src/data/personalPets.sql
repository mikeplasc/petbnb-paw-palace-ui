
-- Add 2 personal pets to the authenticated user's list
-- Note: Replace 'your-user-id-here' with actual user ID when authentication is implemented
INSERT INTO public.pets (name, breed, age, size, gender, type, description, image, location, vaccinated, sterilized, urgent, owner_id, pet_category) VALUES
('Firulais', 'Labrador', '3 años', 'Grande', 'Macho', 'Perro', 'Mi perro labrador muy juguetón y cariñoso. Le encanta nadar y jugar en el parque.', 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop', 'Madrid, España', true, true, false, 'your-user-id-here', 'personal'),
('Whiskers', 'Persa', '2 años', 'Mediano', 'Hembra', 'Gato', 'Mi gata persa muy tranquila y elegante. Le gusta dormir en lugares soleados y que la acaricien.', 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=300&fit=crop', 'Madrid, España', true, true, false, 'your-user-id-here', 'personal');
