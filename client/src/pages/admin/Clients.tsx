import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Phone,
  Mail,
  MessageCircle,
  DollarSign,
  CalendarDays,
} from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";

export default function AdminClients() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    instagram: "",
    notes: "",
  });

  const utils = trpc.useUtils();
  const clients = trpc.admin.clients.list.useQuery();
  const createClient = trpc.admin.clients.create.useMutation({
    onSuccess: () => {
      utils.admin.clients.list.invalidate();
      setShowForm(false);
      setForm({ name: "", phone: "", email: "", instagram: "", notes: "" });
      toast.success("Client created");
    },
  });
  const updateClient = trpc.admin.clients.update.useMutation({
    onSuccess: () => {
      utils.admin.clients.list.invalidate();
      setSelectedClient(null);
      toast.success("Client updated");
    },
  });

  const clientBookings = trpc.admin.clients.bookings.useQuery(
    { clientName: selectedClient?.name || "" },
    { enabled: !!selectedClient }
  );

  const filteredClients = useMemo(() => {
    if (!clients.data) return [];
    if (!search) return clients.data;
    const s = search.toLowerCase();
    return clients.data.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.phone.includes(s) ||
        (c.email && c.email.toLowerCase().includes(s))
    );
  }, [clients.data, search]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold tracking-wider uppercase">
          Clients
        </h1>
        <Button
          onClick={() => setShowForm(true)}
          size="sm"
          className="btn-gold rounded text-xs"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-border"
        />
      </div>

      {/* Client List */}
      {clients.isLoading ? (
        <div className="text-muted-foreground text-sm p-4">Loading...</div>
      ) : filteredClients.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center text-muted-foreground">
            No clients found
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filteredClients.map((client) => (
            <Card
              key={client.id}
              className="bg-card border-border hover:border-border/80 transition-colors cursor-pointer"
              onClick={() => {
                setSelectedClient(client);
                setForm({
                  name: client.name,
                  phone: client.phone,
                  email: client.email || "",
                  instagram: client.instagram || "",
                  notes: client.notes || "",
                });
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm">{client.name}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <a
                        href={`tel:${client.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <Phone className="w-3 h-3" />
                        {client.phone}
                      </a>
                      {client.email && (
                        <a
                          href={`mailto:${client.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          <Mail className="w-3 h-3" />
                        </a>
                      )}
                      {client.instagram && (
                        <a
                          href={`https://instagram.com/${client.instagram.replace("@", "")}`}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          @{client.instagram.replace("@", "")}
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <DollarSign className="w-3 h-3" />
                        ${Number(client.totalSpend || 0).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarDays className="w-3 h-3" />
                        {client.totalBookings || 0} bookings
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <a
                      href={`tel:${client.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href={`sms:${client.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Client Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold tracking-wider uppercase">
              New Client
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
            <Input
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="bg-background border-border"
            />
            <Button
              onClick={() => {
                if (!form.name || !form.phone) {
                  toast.error("Name and phone are required");
                  return;
                }
                createClient.mutate(form);
              }}
              className="w-full btn-gold rounded"
              disabled={createClient.isPending}
            >
              {createClient.isPending ? "Creating..." : "Create Client"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Client Detail Dialog */}
      <Dialog
        open={!!selectedClient}
        onOpenChange={(open) => !open && setSelectedClient(null)}
      >
        <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold tracking-wider uppercase">
              {selectedClient?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Contact Actions */}
            <div className="flex gap-2">
              <a
                href={`tel:${selectedClient?.phone}`}
                className="flex-1 flex items-center justify-center gap-2 p-3 rounded bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <a
                href={`sms:${selectedClient?.phone}`}
                className="flex-1 flex items-center justify-center gap-2 p-3 rounded bg-green-500/10 text-green-400 text-sm font-medium hover:bg-green-500/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Text
              </a>
            </div>

            {/* Edit Fields */}
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
              <Input
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="bg-background border-border"
              />
              <Button
                onClick={() => {
                  if (!selectedClient) return;
                  updateClient.mutate({
                    id: selectedClient.id,
                    ...form,
                  });
                }}
                className="w-full btn-gold rounded"
                disabled={updateClient.isPending}
              >
                {updateClient.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>

            {/* Booking History */}
            <div>
              <h3 className="font-display text-sm font-bold tracking-wider uppercase mb-2">
                Booking History
              </h3>
              {clientBookings.isLoading ? (
                <p className="text-xs text-muted-foreground">Loading...</p>
              ) : clientBookings.data?.length === 0 ? (
                <p className="text-xs text-muted-foreground">No bookings yet</p>
              ) : (
                <div className="space-y-2">
                  {clientBookings.data?.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 rounded bg-muted/20 border border-border"
                    >
                      <p className="text-sm font-medium">{b.car}</p>
                      <p className="text-xs text-muted-foreground">
                        {b.pickupDate} → {b.returnDate}
                      </p>
                      <p className="text-xs text-primary mt-1">
                        ${Number(b.clientCharge).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
