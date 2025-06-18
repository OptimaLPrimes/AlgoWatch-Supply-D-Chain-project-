
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Search, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockRoles } from "@/data/mock-data";

// Mock user data for demonstration
const mockUsers = [
  { id: "USR001", name: "Alice Admin", email: "alice@example.com", role: "Admin", status: "Active", joinedDate: "2023-01-15" },
  { id: "USR002", name: "Bob Manufacturer", email: "bob@example.com", role: "Manufacturer", status: "Active", joinedDate: "2023-02-20" },
  { id: "USR003", name: "Charlie Distributor", email: "charlie@example.com", role: "Distributor", status: "Pending", joinedDate: "2023-03-10" },
  { id: "USR004", name: "Diana Retailer", email: "diana@example.com", role: "Retailer", status: "Inactive", joinedDate: "2023-04-05" },
];


export default function AdminUserManagementPage() {
  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="User Management"
        description="Administer user accounts, roles, and permissions."
      >
         <Button>
            <UserPlus /> Add New User
          </Button>
      </PageHeader>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Manage Users
          </CardTitle>
          <CardDescription>
            View, edit, and manage all user accounts in the system.
          </CardDescription>
           <div className="flex flex-col sm:flex-row items-center gap-2 pt-4">
            <div className="relative w-full sm:w-auto flex-grow">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users (Name, Email, Role)..."
                className="pl-8 w-full"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "default" : user.status === "Pending" ? "secondary" : "destructive"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joinedDate}</TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="sm"><Edit3 /> Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
