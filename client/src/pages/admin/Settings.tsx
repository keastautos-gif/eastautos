import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User, Shield } from "lucide-react";
import { useCallback } from "react";
import { TRPCClientError } from "@trpc/client";

export default function AdminSettings() {
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

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold tracking-wider uppercase">
        Settings
      </h1>

      {/* Account Info */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-sm font-bold tracking-wider uppercase flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="text-sm font-medium">{user?.name || "—"}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium">{user?.email || "—"}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Role</span>
            <span className="flex items-center gap-1 text-sm font-medium text-primary">
              <Shield className="w-3 h-3" />
              {user?.role || "—"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <Button
            variant="destructive"
            onClick={logout}
            className="w-full"
            disabled={logoutMutation.isPending}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {logoutMutation.isPending ? "Signing Out..." : "Sign Out"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
