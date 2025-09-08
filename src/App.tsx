import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import GameLayout from "./pages/GameLayout";
import SocialMediaGame from "./pages/SocialMediaGame";
import FallacyGame from "./pages/FallacyGame";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game" element={<GameLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="social-media" element={<SocialMediaGame />} />
            <Route path="fallacies" element={<FallacyGame />} />
            <Route path="learn" element={<Learn />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route index element={<Dashboard />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
