
export type UserRole = "Admin" | "Manufacturer" | "Distributor" | "Retailer" | "Inspector" | "Customer";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface Batch {
  id: string;
  productName: string;
  origin: string;
  destination: string;
  currentLocationGps: string; // "lat,lng"
  temperatureLimitCelsius: number;
  status: "Registered" | "In Transit" | "CheckpointReached" | "Delivered" | "Issue";
  creationDate: string;
  qrCodeUrl?: string; // URL to a QR code image
  attachments?: FileAttachment[];
  checkpoints: Checkpoint[];
  temperatureLogs: TemperatureLog[];
}

export interface FileAttachment {
  name: string;
  url: string; // URL to the stored file
  type: "bill" | "invoice" | "image" | "other";
}

export interface Checkpoint {
  id: string;
  locationName: string;
  gpsCoordinates: string; // "lat,lng"
  timestamp: string;
  temperatureCelsius?: number;
  notes?: string;
  handlerRole: UserRole; // Role of the user/entity that updated this checkpoint
}

export interface TemperatureLog {
  timestamp: string;
  temperatureCelsius: number;
  locationGps?: string; // "lat,lng"
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles?: UserRole[]; // Optional: restrict nav item to specific roles
  disabled?: boolean;
  external?: boolean;
  label?: string;
  description?: string;
  items?: NavItem[]; // For sub-menus
}

export interface DashboardOverviewCardData {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string; // e.g., "+5% from last month"
  bgColorClass?: string; // Tailwind background color class
  textColorClass?: string; // Tailwind text color class
}

export interface AiRiskPrediction {
  isRisky: boolean;
  riskFactors: string;
  suggestedActions: string;
}
