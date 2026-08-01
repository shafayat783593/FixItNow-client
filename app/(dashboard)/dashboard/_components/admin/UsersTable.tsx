import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UserRoleBadge } from "./UserRoleBadge";

import { BanToggleButton } from "./BanToggleButton";
import { IUser } from "@/lib/api/admin.api";
import { UserStatusBadge } from "./UserStatusBadge";

export function UsersTable({ users }: { users: IUser[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Joined</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="font-medium text-foreground">{u.name}</TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">{u.email}</TableCell>
              <TableCell>
                <UserRoleBadge role={u.role} />
              </TableCell>
              <TableCell>
                <UserStatusBadge status={u.status} />
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {new Date(u.createdAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
              </TableCell>
              <TableCell className="text-right">
                <BanToggleButton userId={u.id} name={u.name} status={u.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}