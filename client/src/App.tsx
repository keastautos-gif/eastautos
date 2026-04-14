import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Rentals from "./pages/Rentals";
import BuyTradeSell from "./pages/BuyTradeSell";
import Chauffeur from "./pages/Chauffeur";
import Photoshoots from "./pages/Photoshoots";
import Contact from "./pages/Contact";
import VehicleManagement from "./pages/VehicleManagement";
import VehicleDetail from "./pages/VehicleDetail";
import ScrollToTop from "./components/ScrollToTop";
import StickyContactBar from "./components/StickyContactBar";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/rentals"} component={Rentals} />
      <Route path={"/rentals/:slug"} component={VehicleDetail} />
      <Route path={"/buy"} component={BuyTradeSell} />
      <Route path={"/sell"} component={BuyTradeSell} />
      <Route path={"/buy-trade-sell"} component={BuyTradeSell} />
      <Route path={"/chauffeur"} component={Chauffeur} />
      <Route path={"/photoshoots"} component={Photoshoots} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/vehicle-management"} component={VehicleManagement} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
          <StickyContactBar />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
