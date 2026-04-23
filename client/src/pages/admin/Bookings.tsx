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
import { Plus, Search, X, DollarSign } from "lucide-react";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

const BOOKING_STATUSES = ["upcoming", "active", "completed", "cancelled"] as const;

const statusColors: Record<string, string> = {
  upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const emptyForm = {
  clientName: "",
  car: "",
  pickupDate: "",
  returnDate: "",
  clientCharge: "",
  supplierCost: "",
  supplierName: "",
  status: "upcoming",
  notes: "",
};

export default function AdminBookings() {
  const [location] = useLocation();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(
    new URLSearchParams(location.split("?")[1] || "").get("action") === "new"
  );
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  const utils = trpc.useUtils();
  const bookings = trpc.admin.bookings.list.useQuery(
    filterStatus !== "all" ? { status: filterStatus } : undefined
  );
  const createBooking = trpc.admin.bookings.create.useMutation({
    onSuccess: () => {
      utils.admin.bookings.list.invalidate();
      utils.admin.dashboard.invalidate();
      setShowForm(false);
      setForm(emptyForm);
      toast.success("Booking created");
    },
  });
  const updateBooking = trpc.admin.bookings.update.useMutation({
    onSuccess: () => {
      utils.admin.bookings.list.invalidate();
      utils.admin.dashboard.invalidate();
      setEditingBooking(null);
      toast.success("Booking updated");
    },
  });
  const deleteBooking = trpc.admin.bookings.delete.useMutation({
    onSuccess: () => {
      utils.admin.bookings.list.invalidate();
      utils.admin.dashboard.invalidate();
      toast.success("Booking deleted");
    },
  });

  const profit = useMemo(() => {
    const charge = parseFloat(form.clientCharge) || 0;
    const cost = parseFloat(form.supplierCost) || 0;
    return charge - cost;
  }, [form.clientCharge, form.supplierCost]);

  const handleSubmit = () => {
    if (!form.clientName || !form.car || !form.pickupDate || !form.returnDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    createBooking.mutate({
      ...form,
      clientCharge: form.clientCharge || "0",
      supplierCost: form.supplierCost || "0",
    });
  };

  const filteredBookings = useMemo(() => {
    if (!bookings.data) return [];
    if (!search) return bookings.data;
    const s = search.toLowerCase();
    return bookings.data.filter(
      (b) =>
        b.clientName.toLowerCase().includes(s) ||
        b.car.toLowerCase().includes(s)
    );
  }, [bookings.data, search]);

  const FormFields = () => (
    <div className="space-y-3">
      <Input
        placeholder="Client Name *"
        value={form.clientName}
        onChange={(e) => setForm({ ...form, clientName: e.target.value })}
        className="bg-background border-border"
      />
      <Input
        placeholder="Car (e.g. Lamborghini Urus) *"
        value={form.car}
        onChange={(e) => setForm({ ...form, car: e.target.value })}
        className="bg-background border-border"
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] text-muted-foreground mb-1 block">
            Pickup Date *
          </label>
          <Input
            type="date"
            value={form.pickupDate}
            onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
            className="bg-background border-border"
          />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground mb-1 block">
            Return Date *
          </label>
          <Input
            type="date"
            value={form.returnDate}
            onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
            className="bg-background border-border"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="Client Charge ($)"
          type="number"
          value={form.clientCharge}
          onChange={(e) => setForm({ ...form, clientCharge: e.target.value })}
          className="bg-background border-border"
        />
        <Input
          placeholder="Supplier Cost ($)"
          type="number"
          value={form.supplierCost}
          onChange={(e) => setForm({ ...form, supplierCost: e.target.value })}
          className="bg-background border-border"
        />
      </div>
      {/* Auto-calculated profit */}
      <div className="flex items-center gap-2 p-3 rounded bg-muted/30 border border-border">
        <DollarSign className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">Profit:</span>
        <span
          className={`text-sm font-bold ${profit >= 0 ? "text-green-400" : "text-red-400"}`}
        >
          ${profit.toLocaleString()}
        </span>
      </div>
      <Input
        placeholder="Supplier Name"
        value={form.supplierName}
        onChange={(e) => setForm({ ...form, supplierName: e.target.value })}
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
          {BOOKING_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="bg-background border-border"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold tracking-wider uppercase">
          Bookings
        </h1>
        <Button
          onClick={() => {
            setForm(emptyForm);
            setShowForm(true);
          }}
          size="sm"
          className="btn-gold rounded text-xs"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Booking
        </Button>
      </div>

      {/* Status Filter */}
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
        {BOOKING_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filterStatus === s
                ? statusColors[s]
                : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/50"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by client or car..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-border"
        />
      </div>

      {/* Booking List */}
      {bookings.isLoading ? (
        <div className="text-muted-foreground text-sm p-4">Loading...</div>
      ) : filteredBookings.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center text-muted-foreground">
            No bookings found
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filteredBookings.map((booking) => (
            <Card
              key={booking.id}
              className="bg-card border-border hover:border-border/80 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate">
                        {booking.clientName}
                      </p>
                      <Badge
                        className={`text-[10px] shrink-0 ${statusColors[booking.status]}`}
                        variant="secondary"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-primary font-medium">
                      {booking.car}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {booking.pickupDate} → {booking.returnDate}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-muted-foreground">
                        Charge:{" "}
                        <span className="text-foreground">
                          ${Number(booking.clientCharge).toLocaleString()}
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Cost:{" "}
                        <span className="text-foreground">
                          ${Number(booking.supplierCost).toLocaleString()}
                        </span>
                      </span>
                      <span className="text-xs font-medium text-green-400">
                        Profit: ${Number(booking.profit).toLocaleString()}
                      </span>
                    </div>
                    {booking.supplierName && (
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Supplier: {booking.supplierName}
                      </p>
                    )}
                    {booking.notes && (
                      <p className="text-[10px] text-muted-foreground mt-1 italic">
                        {booking.notes}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setEditingBooking(booking);
                      setForm({
                        clientName: booking.clientName,
                        car: booking.car,
                        pickupDate: booking.pickupDate,
                        returnDate: booking.returnDate,
                        clientCharge: String(booking.clientCharge),
                        supplierCost: String(booking.supplierCost),
                        supplierName: booking.supplierName || "",
                        status: booking.status,
                        notes: booking.notes || "",
                      });
                    }}
                    className="text-[10px] px-2 py-1 rounded bg-muted/50 text-muted-foreground hover:bg-muted transition-colors shrink-0"
                  >
                    Edit
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Booking Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold tracking-wider uppercase">
              New Booking
            </DialogTitle>
          </DialogHeader>
          <FormFields />
          <Button
            onClick={handleSubmit}
            className="w-full btn-gold rounded"
            disabled={createBooking.isPending}
          >
            {createBooking.isPending ? "Creating..." : "Create Booking"}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Edit Booking Dialog */}
      <Dialog
        open={!!editingBooking}
        onOpenChange={(open) => !open && setEditingBooking(null)}
      >
        <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold tracking-wider uppercase">
              Edit Booking
            </DialogTitle>
          </DialogHeader>
          <FormFields />
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (!editingBooking) return;
                updateBooking.mutate({
                  id: editingBooking.id,
                  ...form,
                  clientCharge: form.clientCharge || "0",
                  supplierCost: form.supplierCost || "0",
                });
              }}
              className="flex-1 btn-gold rounded"
              disabled={updateBooking.isPending}
            >
              {updateBooking.isPending ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (editingBooking && confirm("Delete this booking?")) {
                  deleteBooking.mutate({ id: editingBooking.id });
                  setEditingBooking(null);
                }
              }}
              size="sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
