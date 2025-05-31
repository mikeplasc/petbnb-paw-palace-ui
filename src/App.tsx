
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import BecomeHost from "./pages/BecomeHost";
import Veterinaries from "./pages/Veterinaries";
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import MyPets from "./pages/MyPets";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/become-host" element={<BecomeHost />} />
            <Route path="/veterinaries" element={<Veterinaries />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/my-pets" element={<MyPets />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
