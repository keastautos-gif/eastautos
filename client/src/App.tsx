import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Rentals from "./pages/Rentals";
import BuyCar from "./pages/BuyCar";
import SellTrade from "./pages/SellTrade";
import Chauffeur from "./pages/Chauffeur";
import Photoshoots from "./pages/Photoshoots";
import Contact from "./pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/rentals" component={Rentals} />
      <Route path="/buy" component={BuyCar} />
      <Route path="/sell" component={SellTrade} />
      <Route path="/chauffeur" component={Chauffeur} />
      <Route path="/photoshoots" component={Photoshoots} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
