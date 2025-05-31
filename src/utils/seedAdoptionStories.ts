
import { supabase } from '@/integrations/supabase/client';

export const seedAdoptionStories = async () => {
  // Since the adoption_stories table doesn't exist yet, we'll just return mock data
  // This function can be implemented once the adoption_stories table is created in the database
  
  console.log('Adoption stories seeding skipped - table does not exist yet');
  console.log('Using mock data from adoptionStoryService instead');
  
  // Return empty array to indicate no stories were seeded from database
  return [];
};
