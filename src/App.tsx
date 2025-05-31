
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
import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

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
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <Index />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/hosts"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <Hosts />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/become-host"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <BecomeHost />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/veterinaries"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <Veterinaries />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/adoption"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <Adoption />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/adoption/stories"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <AdoptionStories />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/adoption/my-requests"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <MyAdoptions />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/pet-tracking"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <PetTracking />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lost-pets"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <LostPets />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <SearchResults />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <Profile />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-bookings"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <MyBookings />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-pets"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <MyPets />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-veterinaries"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <MyVeterinaries />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <Favorites />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                          <AppSidebar />
                          <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                              <SidebarTrigger className="-ml-1" />
                            </header>
                            <Settings />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
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
