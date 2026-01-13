import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { ServerSettingsProvider } from "@/hooks/useServerSettings";
import Index from "./pages/Index";
import HowToPlay from "./pages/HowToPlay";
import LaMod from "./pages/LaMod";
import Shop from "./pages/Shop";
import Tutorial from "./pages/Tutorial";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ServerSettingsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/come-giocare" element={<HowToPlay />} />
              <Route path="/la-mod" element={<LaMod />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/skins" element={<Shop />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ServerSettingsProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
