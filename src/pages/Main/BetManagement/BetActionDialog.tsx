import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";

interface BetActionDialogProps {
  bet: any | null;
  isSettling: boolean;
  isCancelling: boolean;
  isRefunding: boolean;
  onAction: (action: string, winnerUserId?: string) => void;
  onClose: () => void;
}

const getBadgeVariant = (status: string) => {
  if (status === "settled" || status === "matched") return "default";
  if (status === "open") return "secondary";
  return "destructive";
};

const BetActionDialog: React.FC<BetActionDialogProps> = ({
  bet,
  isSettling,
  isCancelling,
  isRefunding,
  onAction,
  onClose,
}) => {
  const [winnerUserId, setWinnerUserId] = useState("");

  const handleAction = (action: string) => {
    onAction(action, winnerUserId);
    setWinnerUserId("");
  };

  return (
    <Dialog
      open={!!bet}
      onOpenChange={() => {
        onClose();
        setWinnerUserId("");
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Override Bet Result</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Managing bet{" "}
            <span className="font-mono text-primary font-bold">
              {bet?.betId}
            </span>
            . Status:{" "}
            <Badge variant={getBadgeVariant(bet?.status)}>{bet?.status}</Badge>
          </p>

          {bet?.status === "matched" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Winner User ID (for settle)
              </label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Enter winner's user ID..."
                value={winnerUserId}
                onChange={(e) => setWinnerUserId(e.target.value)}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {bet?.status === "matched" && (
              <Button
                onClick={() => handleAction("settled")}
                disabled={isSettling}
                className="capitalize"
              >
                {isSettling ? "Settling..." : "Settle"}
              </Button>
            )}
            {bet?.status === "open" && (
              <Button
                variant="outline"
                onClick={() => handleAction("cancelled")}
                disabled={isCancelling}
                className="capitalize"
              >
                {isCancelling ? "Cancelling..." : "Cancel"}
              </Button>
            )}
            {bet?.status === "matched" && (
              <Button
                variant="outline"
                onClick={() => handleAction("refunded")}
                disabled={isRefunding}
                className="capitalize"
              >
                {isRefunding ? "Refunding..." : "Refund"}
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BetActionDialog;
