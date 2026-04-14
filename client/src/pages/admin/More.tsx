import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  Zap,
  Settings,
  ChevronRight,
  Globe,
} from "lucide-react";
import { useLocation } from "wouter";

const items = [
  {
    icon: TrendingUp,
    label: "Profit Reports",
    description: "Revenue, costs, and profit analysis",
    path: "/admin/reports",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: Zap,
    label: "Automations",
    description: "Recommended workflow automations",
    path: "/admin/automations",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Settings,
    label: "Settings",
    description: "Account and app settings",
    path: "/admin/settings",
    color: "text-muted-foreground",
    bg: "bg-muted/20",
  },
  {
    icon: Globe,
    label: "Back to Website",
    description: "View the public Eastautos site",
    path: "/",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export default function AdminMore() {
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold tracking-wider uppercase">
        More
      </h1>

      <div className="space-y-2">
        {items.map((item) => (
          <Card
            key={item.path}
            className="bg-card border-border hover:border-border/80 transition-colors cursor-pointer"
            onClick={() => setLocation(item.path)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded flex items-center justify-center ${item.bg}`}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
