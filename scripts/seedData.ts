
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
    
    // Then attempt to seed the adoption stories (will be skipped if table doesn't exist)
    console.log('Seeding adoption stories...');
    const stories = await seedAdoptionStories();
    if (stories.length > 0) {
      console.log(`Successfully seeded ${stories.length} adoption stories`);
    } else {
      console.log('Adoption stories seeding skipped - using mock data');
    }
    
    console.log('Data seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
