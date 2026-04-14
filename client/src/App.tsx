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
import VehicleManagement from "./pages/VehicleManagement";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLeads from "./pages/admin/Leads";
import AdminBookings from "./pages/admin/Bookings";
import AdminClients from "./pages/admin/Clients";
import AdminReports from "./pages/admin/Reports";
import AdminAutomations from "./pages/admin/Automations";
import AdminMore from "./pages/admin/More";
import AdminSettings from "./pages/admin/Settings";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path={"/"} component={Home} />
      <Route path={"/rentals"} component={Rentals} />
      <Route path={"/buy"} component={BuyCar} />
      <Route path={"/sell"} component={SellTrade} />
      <Route path={"/chauffeur"} component={Chauffeur} />
      <Route path={"/photoshoots"} component={Photoshoots} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/vehicle-management"} component={VehicleManagement} />

      {/* Admin routes */}
      <Route path="/admin">
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </Route>
      <Route path="/admin/leads">
        <AdminLayout>
          <AdminLeads />
        </AdminLayout>
      </Route>
      <Route path="/admin/bookings">
        <AdminLayout>
          <AdminBookings />
        </AdminLayout>
      </Route>
      <Route path="/admin/clients">
        <AdminLayout>
          <AdminClients />
        </AdminLayout>
      </Route>
      <Route path="/admin/reports">
        <AdminLayout>
          <AdminReports />
        </AdminLayout>
      </Route>
      <Route path="/admin/automations">
        <AdminLayout>
          <AdminAutomations />
        </AdminLayout>
      </Route>
      <Route path="/admin/more">
        <AdminLayout>
          <AdminMore />
        </AdminLayout>
      </Route>
      <Route path="/admin/settings">
        <AdminLayout>
          <AdminSettings />
        </AdminLayout>
      </Route>

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
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
