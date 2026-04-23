import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MessageSquare,
  CalendarCheck,
  Car,
  BarChart3,
  Zap,
  ExternalLink,
} from "lucide-react";

const automations = [
  {
    title: "Follow-Up Reminders",
    description:
      "Automatically remind yourself to follow up with leads that haven't been contacted within 24 hours. Set up a daily check that flags stale leads.",
    icon: Clock,
    tools: ["Twilio", "Make.com", "Zapier"],
    status: "recommended",
    details:
      "Trigger: Lead status stays 'New' for 24h. Action: Send SMS reminder to your phone + optional email to lead.",
  },
  {
    title: "Booking Confirmations",
    description:
      "Send automatic confirmation messages to clients when a booking is created, including pickup details, car info, and your contact number.",
    icon: CalendarCheck,
    tools: ["Twilio SMS", "Make.com"],
    status: "recommended",
    details:
      "Trigger: New booking created. Action: Send SMS to client with booking details. Template: 'Your [car] is confirmed for [date]. Pickup at [location].'",
  },
  {
    title: "Pre-Pickup Reminders",
    description:
      "Send clients a reminder 24 hours before their pickup date with final details and any preparation instructions.",
    icon: Car,
    tools: ["Twilio SMS", "Zapier"],
    status: "recommended",
    details:
      "Trigger: 24h before pickupDate. Action: SMS to client. Include: pickup time, location, what to bring (ID, deposit).",
  },
  {
    title: "Post-Rental Follow-Up",
    description:
      "Automatically reach out to clients 1 day after their return date to thank them, ask for a review, and offer future deals.",
    icon: MessageSquare,
    tools: ["Twilio SMS", "Make.com"],
    status: "suggested",
    details:
      "Trigger: 1 day after returnDate. Action: Send thank-you SMS + request Google/Instagram review. Optional: offer 10% off next rental.",
  },
  {
    title: "Weekly Summary Report",
    description:
      "Receive a weekly digest every Monday morning with key metrics: new leads, bookings, revenue, and profit for the past week.",
    icon: BarChart3,
    tools: ["Make.com", "Zapier"],
    status: "suggested",
    details:
      "Trigger: Every Monday 9am. Action: Query dashboard stats, format summary, send via SMS or email.",
  },
];

const toolLinks: Record<string, string> = {
  Twilio: "https://twilio.com",
  "Twilio SMS": "https://twilio.com/sms",
  "Make.com": "https://make.com",
  Zapier: "https://zapier.com",
};

export default function AdminAutomations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-wider uppercase">
          Automations
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Recommended automations to streamline your operations. Set these up
          with the suggested tools to save time and never miss a follow-up.
        </p>
      </div>

      {/* Integration Tools */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-sm font-bold tracking-wider uppercase flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Suggested Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="https://twilio.com"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 p-3 rounded bg-muted/20 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm">
                T
              </div>
              <div>
                <p className="text-sm font-medium">Twilio</p>
                <p className="text-[10px] text-muted-foreground">
                  SMS & Voice (already integrated)
                </p>
              </div>
            </a>
            <a
              href="https://make.com"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 p-3 rounded bg-muted/20 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">
                M
              </div>
              <div>
                <p className="text-sm font-medium">Make.com</p>
                <p className="text-[10px] text-muted-foreground">
                  Visual workflow automation
                </p>
              </div>
            </a>
            <a
              href="https://zapier.com"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 p-3 rounded bg-muted/20 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">
                Z
              </div>
              <div>
                <p className="text-sm font-medium">Zapier</p>
                <p className="text-[10px] text-muted-foreground">
                  Connect apps & automate
                </p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Automation Cards */}
      <div className="space-y-3">
        {automations.map((auto) => (
          <Card key={auto.title} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <auto.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-sm font-bold tracking-wider uppercase">
                      {auto.title}
                    </h3>
                    <Badge
                      className={`text-[10px] ${
                        auto.status === "recommended"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                      variant="secondary"
                    >
                      {auto.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {auto.description}
                  </p>
                  <div className="p-2 rounded bg-muted/20 border border-border mb-2">
                    <p className="text-[10px] text-muted-foreground">
                      {auto.details}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-muted-foreground">
                      Tools:
                    </span>
                    {auto.tools.map((tool) => (
                      <a
                        key={tool}
                        href={toolLinks[tool] || "#"}
                        target="_blank"
                        rel="noopener"
                        className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-muted/30 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {tool}
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
