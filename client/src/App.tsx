import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Gallery from "@/pages/gallery";
import Apply from "@/pages/apply";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import StarterForm from "@/pages/starter-form";
import SmallWorks from "@/pages/small-works";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/apply" component={Apply} />
        <Route path="/contact" component={Contact} />
        <Route path="/starter-form" component={StarterForm} />
        <Route path="/small-works" component={SmallWorks} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    // Hide loading screen once app is mounted
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after animation completes
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 300);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;