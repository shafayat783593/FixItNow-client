import { Badge } from "@/components/ui/badge";

export function UserRoleBadge({ role }: { role: string }) {
  return (
    <Badge variant="secondary" className="font-medium">
      {role}
    </Badge>
  );
}