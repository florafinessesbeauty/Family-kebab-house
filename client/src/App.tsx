import { Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GlobalVoiceControl from "@/components/global-voice-control";
import BasketDrawer from "@/components/basket-drawer";
import ChefsRecommendationPopup from "@/components/chefs-recommendation-popup";
import { BasketProvider } from "@/hooks/use-basket";
import { useLocation } from "react-router-dom";

// Import your page components (adjust the paths and capitalization as needed)
import Home from "@/pages/home";
import Menu from "@/pages/menu";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import NutritionalInfo from "@/pages/nutritional-info";
import MealBuilderPage from "@/pages/meal-builder-page";
import NotFound from "@/pages/not-found";

function App() {
  const location = useLocation();

  const handleAIRecommendationsClick = () => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      window.location.href = '/#ai-recommendations';
    } else {
      // If on home page, scroll to AI recommendations
      const aiSection = document.getElementById('ai-recommendations');
      if (aiSection) {
        aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BasketProvider>
          <div className="min-h-screen flex flex-col">
            <Header onAIRecommendationsClick={handleAIRecommendationsClick} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/nutritional-info" element={<NutritionalInfo />} />
                <Route path="/meal-builder" element={<MealBuilderPage />} />
                {/* Catch-all route for any unmatched paths */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <BasketDrawer />
          <ChefsRecommendationPopup />
          <GlobalVoiceControl />
          <Toaster />
        </BasketProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
