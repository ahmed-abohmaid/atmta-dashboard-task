import { VendorStatus } from "@/@types/vendor";
import { Badge } from "@/components/ui/badge";

interface VendorStatusBadgeProps {
  status: VendorStatus;
}

export function VendorStatusBadge({ status }: VendorStatusBadgeProps) {
  if (status === "active") {
    return (
      <Badge
        variant="outline"
        className="border-primary/30 text-primary bg-primary/10 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
      >
        نشط
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-border/80 text-muted-foreground bg-muted/30 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
    >
      غير نشط
    </Badge>
  );
}
