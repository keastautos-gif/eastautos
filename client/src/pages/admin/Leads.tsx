import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Search, Phone, Mail, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

const STATUSES = [
  "new",
  "contacted",
  "negotiating",
  "confirmed",
  "completed",
  "lost",
] as const;

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  negotiating: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  lost: "bg-red-500/20 text-red-400 border-red-500/30",
  archived: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const statusLabels: Record<string, string> = {
  new: "New Lead",
  contacted: "Contacted",
  negotiating: "Negotiating",
  confirmed: "Confirmed",
  completed: "Completed",
  lost: "Lost",
  archived: "Archived",
};

export default function AdminLeads() {
  const [location] = useLocation();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showForm, setShowForm] = useState(
    new URLSearchParams(location.split("?")[1] || "").get("action") === "new"
  );
  const [editingLead, setEditingLead] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    instagram: "",
    inquiryType: "rental",
    vehicleInterest: "",
    additionalInfo: "",
    budget: "",
    dateNeeded: "",
    source: "",
    status: "new",
  });

  const utils = trpc.useUtils();
  const leads = trpc.admin.leads.list.useQuery(
    filterStatus !== "all" ? { status: filterStatus, search: search || undefined } : { search: search || undefined }
  );
  const createLead = trpc.admin.leads.create.useMutation({
    onSuccess: () => {
      utils.admin.leads.list.invalidate();
      utils.admin.dashboard.invalidate();
      setShowForm(false);
      resetForm();
      toast.success("Lead created");
    },
  });
  const updateStatus = trpc.admin.leads.updateStatus.useMutation({
    onSuccess: () => {
      utils.admin.leads.list.invalidate();
      utils.admin.dashboard.invalidate();
      toast.success("Status updated");
    },
  });
  const updateLead = trpc.admin.leads.update.useMutation({
    onSuccess: () => {
      utils.admin.leads.list.invalidate();
      setEditingLead(null);
      toast.success("Lead updated");
    },
  });
  const deleteLead = trpc.admin.leads.delete.useMutation({
    onSuccess: () => {
      utils.admin.leads.list.invalidate();
      utils.admin.dashboard.invalidate();
      toast.success("Lead deleted");
    },
  });

  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      instagram: "",
      inquiryType: "rental",
      vehicleInterest: "",
      additionalInfo: "",
      budget: "",
      dateNeeded: "",
      source: "",
      status: "new",
    });
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone) {
      toast.error("Name and phone are required");
      return;
    }
    createLead.mutate(form);
  };

  const handleStatusChange = (
    leadId: number,
    currentStatus: string,
    newStatus: string
  ) => {
    updateStatus.mutate({
      id: leadId,
      fromStatus: currentStatus,
      toStatus: newStatus,
    });
  };

  const getNextStatus = (current: string): string | null => {
    const idx = STATUSES.indexOf(current as any);
    if (idx >= 0 && idx < STATUSES.length - 1) return STATUSES[idx + 1];
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold tracking-wider uppercase">
          Leads
        </h1>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          size="sm"
          className="btn-gold rounded text-xs"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Lead
        </Button>
      </div>

      {/* Status Pipeline */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        <button
          onClick={() => setFilterStatus("all")}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            filterStatus === "all"
              ? "bg-primary/20 text-primary border-primary/30"
              : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/50"
          }`}
        >
          All
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filterStatus === s
                ? statusColors[s]
                : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/50"
            }`}
          >
            {statusLabels[s]}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-border"
        />
      </div>

      {/* Lead List */}
      {leads.isLoading ? (
        <div className="text-muted-foreground text-sm p-4">Loading...</div>
      ) : leads.data?.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center text-muted-foreground">
            No leads found
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {leads.data?.map((lead) => {
            const next = getNextStatus(lead.status);
            return (
              <Card
                key={lead.id}
                className="bg-card border-border hover:border-border/80 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm truncate">
                          {lead.name}
                        </p>
                        <Badge
                          className={`text-[10px] shrink-0 ${statusColors[lead.status]}`}
                          variant="secondary"
                        >
                          {statusLabels[lead.status] || lead.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {lead.inquiryType}
                        {lead.vehicleInterest && ` · ${lead.vehicleInterest}`}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </a>
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                          >
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </a>
                        )}
                      </div>
                      {lead.budget && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Budget: {lead.budget}
                        </p>
                      )}
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {new Date(lead.createdAt).toLocaleDateString()}
                        {lead.source && ` · via ${lead.source}`}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      {next && (
                        <button
                          onClick={() =>
                            handleStatusChange(lead.id, lead.status, next)
                          }
                          className="flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <ChevronRight className="w-3 h-3" />
                          {statusLabels[next]}
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setEditingLead(lead);
                          setForm({
                            name: lead.name,
                            phone: lead.phone,
                            email: lead.email || "",
                            instagram: lead.instagram || "",
                            inquiryType: lead.inquiryType,
                            vehicleInterest: lead.vehicleInterest || "",
                            additionalInfo: lead.additionalInfo || "",
                            budget: lead.budget || "",
                            dateNeeded: lead.dateNeeded || "",
                            source: lead.source || "",
                            status: lead.status,
                          });
                        }}
                        className="text-[10px] px-2 py-1 rounded bg-muted/50 text-muted-foreground hover:bg-muted transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Lead Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold tracking-wider uppercase">
              New Lead
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-background border-border"
            />
            <Input
              placeholder="Phone *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-background border-border"
            />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-background border-border"
            />
            <Input
              placeholder="Instagram"
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              className="bg-background border-border"
            />
            <Select
              value={form.inquiryType}
              onValueChange={(v) => setForm({ ...form, inquiryType: v })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Inquiry Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rental">Rental</SelectItem>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="trade-in">Trade-In</SelectItem>
                <SelectItem value="chauffeur">Chauffeur</SelectItem>
                <SelectItem value="photoshoot">Photoshoot</SelectItem>
                <SelectItem value="vehicle-management">Vehicle Management</SelectItem>
                <SelectItem value="contact">General Contact</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Vehicle Interest"
              value={form.vehicleInterest}
              onChange={(e) =>
                setForm({ ...form, vehicleInterest: e.target.value })
              }
              className="bg-background border-border"
            />
            <Input
              placeholder="Budget"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="bg-background border-border"
            />
            <Input
              placeholder="Date Needed"
              value={form.dateNeeded}
              onChange={(e) => setForm({ ...form, dateNeeded: e.target.value })}
              className="bg-background border-border"
            />
            <Select
              value={form.source || "website"}
              onValueChange={(v) => setForm({ ...form, source: v })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="walk-in">Walk-In</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Additional Info"
              value={form.additionalInfo}
              onChange={(e) =>
                setForm({ ...form, additionalInfo: e.target.value })
              }
              className="bg-background border-border"
            />
            <Button
              onClick={handleSubmit}
              className="w-full btn-gold rounded"
              disabled={createLead.isPending}
            >
              {createLead.isPending ? "Creating..." : "Create Lead"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Lead Dialog */}
      <Dialog
        open={!!editingLead}
        onOpenChange={(open) => !open && setEditingLead(null)}
      >
        <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold tracking-wider uppercase">
              Edit Lead
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-background border-border"
            />
            <Input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-background border-border"
            />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-background border-border"
            />
            <Input
              placeholder="Instagram"
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              className="bg-background border-border"
            />
            <Select
              value={form.status}
              onValueChange={(v) => setForm({ ...form, status: v })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {statusLabels[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Vehicle Interest"
              value={form.vehicleInterest}
              onChange={(e) =>
                setForm({ ...form, vehicleInterest: e.target.value })
              }
              className="bg-background border-border"
            />
            <Input
              placeholder="Budget"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="bg-background border-border"
            />
            <Input
              placeholder="Additional Info"
              value={form.additionalInfo}
              onChange={(e) =>
                setForm({ ...form, additionalInfo: e.target.value })
              }
              className="bg-background border-border"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (!editingLead) return;
                  updateLead.mutate({
                    id: editingLead.id,
                    ...form,
                  });
                }}
                className="flex-1 btn-gold rounded"
                disabled={updateLead.isPending}
              >
                {updateLead.isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (
                    editingLead &&
                    confirm("Delete this lead?")
                  ) {
                    deleteLead.mutate({ id: editingLead.id });
                    setEditingLead(null);
                  }
                }}
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
