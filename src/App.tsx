
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Hosts from "./pages/Hosts";
import BecomeHost from "./pages/BecomeHost";
import Veterinaries from "./pages/Veterinaries";
import Adoption from "./pages/Adoption";
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import MyPets from "./pages/MyPets";
import MyVeterinaries from "./pages/MyVeterinaries";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

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
                <Route path="/" element={
                  <ProtectedRoute>
                    <Navbar />
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/hosts" element={
                  <ProtectedRoute>
                    <Navbar />
                    <Hosts />
                  </ProtectedRoute>
                } />
                <Route path="/become-host" element={
                  <ProtectedRoute>
                    <Navbar />
                    <BecomeHost />
                  </ProtectedRoute>
                } />
                <Route path="/veterinaries" element={
                  <ProtectedRoute>
                    <Navbar />
                    <Veterinaries />
                  </ProtectedRoute>
                } />
                <Route path="/adoption" element={
                  <ProtectedRoute>
                    <Navbar />
                    <Adoption />
                  </ProtectedRoute>
                } />
                <Route path="/search" element={
                  <ProtectedRoute>
                    <Navbar />
                    <SearchResults />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Navbar />
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/my-bookings" element={
                  <ProtectedRoute>
                    <Navbar />
                    <MyBookings />
                  </ProtectedRoute>
                } />
                <Route path="/my-pets" element={
                  <ProtectedRoute>
                    <Navbar />
                    <MyPets />
                  </ProtectedRoute>
                } />
                <Route path="/my-veterinaries" element={
                  <ProtectedRoute>
                    <Navbar />
                    <MyVeterinaries />
                  </ProtectedRoute>
                } />
                <Route path="/favorites" element={
                  <ProtectedRoute>
                    <Navbar />
                    <Favorites />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Navbar />
                    <Settings />
                  </ProtectedRoute>
                } />
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
