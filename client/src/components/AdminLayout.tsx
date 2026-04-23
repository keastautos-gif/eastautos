import { trpc } from "@/lib/trpc";
import { useIsMobile } from "@/hooks/useMobile";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  UserCircle,
  MoreHorizontal,
  TrendingUp,
  Zap,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "./ui/button";
import { TRPCClientError } from "@trpc/client";

const mainTabs = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Leads", path: "/admin/leads" },
  { icon: CalendarDays, label: "Bookings", path: "/admin/bookings" },
  { icon: UserCircle, label: "Clients", path: "/admin/clients" },
  { icon: MoreHorizontal, label: "More", path: "/admin/more" },
];

const moreTabs = [
  { icon: TrendingUp, label: "Profit Reports", path: "/admin/reports" },
  { icon: Zap, label: "Automations", path: "/admin/automations" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

function getLoginUrlSafe(): string {
  try {
    const oauthPortalUrl = (import.meta as any).env?.VITE_OAUTH_PORTAL_URL;
    const appId = (import.meta as any).env?.VITE_APP_ID;
    if (!oauthPortalUrl || !appId) return "/api/oauth/callback";
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const state = btoa(redirectUri);
    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");
    return url.toString();
  } catch {
    return "/api/oauth/callback";
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const utils = trpc.useUtils();
  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
    },
  });

  const user = meQuery.data ?? null;
  const loading = meQuery.isLoading || logoutMutation.isPending;

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error: unknown) {
      if (error instanceof TRPCClientError && error.data?.code === "UNAUTHORIZED") {
        return;
      }
    } finally {
      utils.auth.me.setData(undefined, null);
      await utils.auth.me.invalidate();
    }
  }, [logoutMutation, utils]);

  const [location, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full">
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-display text-2xl font-bold tracking-wider text-gold uppercase">
              Eastautos Admin
            </h1>
            <p className="text-sm text-muted-foreground text-center">
              Sign in to access the operations dashboard.
            </p>
          </div>
          <Button
            onClick={() => {
              window.location.href = getLoginUrlSafe();
            }}
            className="w-full btn-gold rounded"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4 p-8">
          <h1 className="font-display text-xl font-bold text-destructive uppercase">
            Access Denied
          </h1>
          <p className="text-muted-foreground text-sm text-center">
            You do not have admin permissions.
          </p>
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="mt-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Website
          </Button>
        </div>
      </div>
    );
  }

  const isActive = (path: string) => {
    if (path === "/admin") return location === "/admin";
    if (path === "/admin/more") {
      return moreTabs.some((t) => location === t.path) || location === "/admin/more";
    }
    return location.startsWith(path);
  };

  // Desktop sidebar layout
  if (!isMobile) {
    return (
      <div className="min-h-screen bg-background flex">
        {/* Desktop Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full bg-[#0a0a0a] border-r border-border z-40 transition-all duration-200 ${
            sidebarOpen ? "w-56" : "w-16"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="h-14 flex items-center justify-between px-3 border-b border-border">
              {sidebarOpen && (
                <span className="font-display text-sm font-bold tracking-wider text-gold uppercase truncate">
                  Eastautos
                </span>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded hover:bg-muted transition-colors"
              >
                {sidebarOpen ? (
                  <X className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Menu className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>

            <nav className="flex-1 py-2 space-y-1 px-2">
              {[...mainTabs.filter((t) => t.path !== "/admin/more"), ...moreTabs].map(
                (tab) => (
                  <button
                    key={tab.path}
                    onClick={() => setLocation(tab.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
                      isActive(tab.path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <tab.icon className="w-4 h-4 shrink-0" />
                    {sidebarOpen && <span className="truncate">{tab.label}</span>}
                  </button>
                )
              )}
            </nav>

            <div className="p-2 border-t border-border">
              <button
                onClick={() => setLocation("/")}
                className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span>Back to Site</span>}
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span>Sign Out</span>}
              </button>
            </div>
          </div>
        </aside>

        <main
          className={`flex-1 transition-all duration-200 ${
            sidebarOpen ? "ml-56" : "ml-16"
          }`}
        >
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    );
  }

  // Mobile layout with bottom tab bar
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 h-12 flex items-center justify-between">
        <span className="font-display text-sm font-bold tracking-wider text-gold uppercase">
          Eastautos
        </span>
        <button
          onClick={logout}
          className="p-2 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-20">{children}</main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-border">
        <div className="flex items-center justify-around h-16 pb-safe">
          {mainTabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => setLocation(tab.path)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                isActive(tab.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
