import { Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Adjust the import paths as needed depending on your file names (capitalization matters)
import Home from "@/pages/home";      // or "./pages/Home" if your file is named with a capital H
import Menu from "@/pages/menu";      // or "./pages/Menu"
import About from "@/pages/about";    // or "./pages/About"
import Contact from "@/pages/contact";// or "./pages/Contact"
import NotFound from "@/pages/not-found"; // or "./pages/NotFound"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* Catch-all route for any unmatched paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
