import { supabase } from "@/integrations/supabase/client";

export interface UserStats {
  completed_bookings: number;
  average_rating: number | null;
  registered_pets: number;
  adoption_requests: number;
}

export const getUserStats = async (): Promise<UserStats> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      completed_bookings: 0,
      average_rating: null,
      registered_pets: 0,
      adoption_requests: 0,
    };
  }

  // Obtener reservas completadas y valoración promedio
  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("status, rating")
    .eq("user_id", user.id)
    .eq("status", "completed");

  if (bookingsError) {
    console.error("Error fetching bookings stats:", bookingsError);
  }

  const completedBookings = bookings?.length || 0;
  const ratings =
    bookings?.map((b) => b.rating).filter((r) => r !== null) || [];
  const averageRating =
    ratings.length > 0
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : null;

  // Obtener mascotas registradas
  const { count: petsCount, error: petsError } = await supabase
    .from("pets")
    .select("id", { count: "exact", head: true })
    .eq("owner_id", user.id)
    .eq("pet_category", "personal");

  if (petsError) {
    console.error("Error fetching pets count:", petsError);
  }

  // Obtener solicitudes de adopción
  const { count: adoptionCount, error: adoptionError } = await supabase
    .from("adoption_requests")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (adoptionError) {
    console.error("Error fetching adoption requests count:", adoptionError);
  }

  return {
    completed_bookings: completedBookings,
    average_rating: averageRating,
    registered_pets: petsCount || 0,
    adoption_requests: adoptionCount || 0,
  };
};
