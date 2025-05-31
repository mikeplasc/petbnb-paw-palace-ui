
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Adoption from "./pages/Adoption";
import AdoptionStories from "./pages/AdoptionStories";
import Auth from "./pages/Auth";
import { AuthProvider } from "@/contexts/AuthContext";
import BecomeHost from "./pages/BecomeHost";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Favorites from "./pages/Favorites";
import Hosts from "./pages/Hosts";
import Index from "./pages/Index";
import LostPets from "./pages/LostPets";
import MyAdoptions from "./pages/MyAdoptions";
import MyBookings from "./pages/MyBookings";
import MyPets from "./pages/MyPets";
import MyVeterinaries from "./pages/MyVeterinaries";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import PetTracking from "./pages/PetTracking";
import Profile from "./pages/Profile";
import ProtectedRoute from "@/components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import SearchResults from "./pages/SearchResults";
import Settings from "./pages/Settings";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Veterinaries from "./pages/Veterinaries";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CurrencyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <Index />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/hosts"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <Hosts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/become-host"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <BecomeHost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/veterinaries"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <Veterinaries />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/adoption"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <Adoption />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/adoption/stories"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <AdoptionStories />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/adoption/my-requests"
                  element={
                    <ProtectedRoute>
                      <MyAdoptions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/pet-tracking"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <PetTracking />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lost-pets"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <LostPets />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <SearchResults />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-bookings"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <MyBookings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-pets"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <MyPets />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-veterinaries"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <MyVeterinaries />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </CurrencyProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
