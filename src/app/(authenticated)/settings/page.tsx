
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="Settings"
        description="Manage your application preferences and configurations."
      />
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Cog className="h-6 w-6 text-primary" />
            Application Settings
          </CardTitle>
          <CardDescription>
            This page is a placeholder for future settings options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Settings related to user profile, notifications, theme, API keys, and other application-specific configurations will be available here.
          </p>
          {/* Example Setting Sections (placeholders) */}
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">User Profile</h3>
              <p className="text-sm text-muted-foreground">Update your personal information and password.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Notification Preferences</h3>
              <p className="text-sm text-muted-foreground">Configure how you receive alerts (e.g., email, SMS).</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Theme & Appearance</h3>
              <p className="text-sm text-muted-foreground">Customize the look and feel of the application.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
