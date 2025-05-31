
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
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
    <CurrencyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/hosts" element={<Hosts />} />
              <Route path="/become-host" element={<BecomeHost />} />
              <Route path="/veterinaries" element={<Veterinaries />} />
              <Route path="/adoption" element={<Adoption />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/my-pets" element={<MyPets />} />
              <Route path="/my-veterinaries" element={<MyVeterinaries />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </CurrencyProvider>
  </QueryClientProvider>
);

export default App;
