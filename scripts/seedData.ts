import { seedSamplePets } from '../src/utils/seedPets';
import { seedAdoptionStories } from '../src/utils/seedAdoptionStories';
import { supabase } from '../src/integrations/supabase/client';

const seedData = async () => {
  try {
    console.log('Starting to seed data...');

    // Check if we're already authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('No authenticated session found. Please log in to the application first.');
    }
    
    // First seed the pets
    console.log('Seeding pets...');
    const pets = await seedSamplePets();
    console.log(`Successfully seeded ${pets.length} pets`);
    
    // Then seed the adoption stories
    console.log('Seeding adoption stories...');
    const stories = await seedAdoptionStories();
    console.log(`Successfully seeded ${stories.length} adoption stories`);
    
    console.log('Data seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 