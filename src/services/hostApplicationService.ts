
import { supabase } from '@/integrations/supabase/client';

export interface HostApplication {
  name: string;
  email: string;
  type: string;
  city: string;
  address: string;
  description: string;
  experience: string;
  accepted_pets: string[];
  services: string[];
  price_per_night: number;
  photos: string[];
}

export const submitHostApplication = async (applicationData: HostApplication) => {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      throw new Error('Error al obtener usuario: ' + userError.message);
    }

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    // Insert application to database
    const { data, error } = await supabase
      .from('host_applications')
      .insert({
        user_id: user.id,
        ...applicationData,
      })
      .select()
      .single();

    if (error) {
      throw new Error('Error al guardar la solicitud: ' + error.message);
    }

    // Send registration email
    const emailResponse = await supabase.functions.invoke('send-host-registration-email', {
      body: {
        name: applicationData.name,
        email: applicationData.email,
        type: applicationData.type,
        city: applicationData.city,
      },
    });

    if (emailResponse.error) {
      console.error('Error sending email:', emailResponse.error);
      // Don't throw error for email failure, just log it
    }

    return data;
  } catch (error) {
    console.error('Error submitting host application:', error);
    throw error;
  }
};
