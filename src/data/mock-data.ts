
import type { Batch, UserRole, DashboardOverviewCardData, FileAttachment } from '@/types';
import { Package, Thermometer, AlertTriangle, CheckCircle2, Truck, MapPin, Factory, Warehouse, Store, ShieldCheck, UserCircle } from 'lucide-react';

export const mockRoles: UserRole[] = ["Admin", "Manufacturer", "Distributor", "Retailer", "Inspector", "Customer"];

export const mockBatches: Batch[] = [
  {
    id: 'BATCH001',
    productName: 'PharmaX Vaccine',
    origin: 'Factory A, Berlin',
    destination: 'Central Pharmacy, Munich',
    currentLocationGps: '50.1109,8.6821', // Frankfurt
    temperatureLimitCelsius: 5,
    status: 'In Transit',
    creationDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    qrCodeUrl: 'https://placehold.co/150x150.png/E0E0E0/B0B0B0?text=QR+BATCH001',
    attachments: [
      { name: 'Invoice_001.pdf', url: '#', type: 'invoice' },
      { name: 'Product_Image.jpg', url: 'https://placehold.co/300x200.png/E0E0E0/B0B0B0?text=Product_Image', type: 'image' }
    ],
    checkpoints: [
      { id: 'CP001', locationName: 'Factory A Loading Dock', gpsCoordinates: '52.5200,13.4050', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 60*60*1000).toISOString(), temperatureCelsius: 3, handlerRole: 'Manufacturer' },
      { id: 'CP002', locationName: 'Distributor Hub Leipzig', gpsCoordinates: '51.3397,12.3731', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), temperatureCelsius: 4, notes: 'Transferred to refrigerated truck.', handlerRole: 'Distributor' },
    ],
    temperatureLogs: [
      { timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 50*60*1000).toISOString(), temperatureCelsius: 3.2, locationGps: '52.5200,13.4050' },
      { timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 10*60*1000).toISOString(), temperatureCelsius: 4.1, locationGps: '51.3397,12.3731' },
      { timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), temperatureCelsius: 4.5, locationGps: '50.1109,8.6821' },
    ],
  },
  {
    id: 'BATCH002',
    productName: 'MediChill Gel',
    origin: 'Lab B, Hamburg',
    destination: 'Retailer X, Cologne',
    currentLocationGps: '53.5511,9.9937', // Hamburg
    temperatureLimitCelsius: 8,
    status: 'Registered',
    creationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    qrCodeUrl: 'https://placehold.co/150x150.png/E0E0E0/B0B0B0?text=QR+BATCH002',
    attachments: [],
    checkpoints: [
       { id: 'CP003', locationName: 'Lab B Storage', gpsCoordinates: '53.5511,9.9937', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 60*60*1000).toISOString(), temperatureCelsius: 6, handlerRole: 'Manufacturer' },
    ],
    temperatureLogs: [
      { timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 70*60*1000).toISOString(), temperatureCelsius: 6.5 },
    ],
  },
  {
    id: 'BATCH003',
    productName: 'Sensitive Reagents',
    origin: 'Research Institute, Stuttgart',
    destination: 'Hospital Y, Berlin',
    currentLocationGps: '52.5200,13.4050', // Berlin
    temperatureLimitCelsius: 2,
    status: 'Delivered',
    creationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    qrCodeUrl: 'https://placehold.co/150x150.png/E0E0E0/B0B0B0?text=QR+BATCH003',
    attachments: [],
    checkpoints: [
      { id: 'CP004', locationName: 'Research Institute', gpsCoordinates: '48.7758,9.1829', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), temperatureCelsius: 1.5, handlerRole: 'Manufacturer' },
      { id: 'CP005', locationName: 'Logistics Partner Hub', gpsCoordinates: '50.1109,8.6821', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), temperatureCelsius: 1.8, handlerRole: 'Distributor' },
      { id: 'CP006', locationName: 'Hospital Y Receiving', gpsCoordinates: '52.5200,13.4050', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), temperatureCelsius: 1.9, notes: 'Delivered and stored.', handlerRole: 'Retailer' },
    ],
    temperatureLogs: [
       { timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), temperatureCelsius: 1.5 },
       { timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), temperatureCelsius: 1.8 },
       { timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), temperatureCelsius: 1.9 },
    ],
  },
];

// This function is no longer used by verify-batch page, but might be useful for other tests or direct access.
export const getMockBatchById = (id: string): Batch | undefined => mockBatches.find(b => b.id === id);

export const mockDashboardCards: (role: UserRole, currentBatches: Batch[]) => DashboardOverviewCardData[] = (role, currentBatches) => {
  const baseCards = [
    { title: 'Total Batches', value: currentBatches.length, icon: Package, trend: 'Dynamic data', bgColorClass: 'bg-blue-100 dark:bg-blue-900', textColorClass: 'text-blue-600 dark:text-blue-300' },
    { title: 'Deliveries In Transit', value: currentBatches.filter(b => b.status === 'In Transit').length, icon: Truck, trend: 'Dynamic data', bgColorClass: 'bg-yellow-100 dark:bg-yellow-900', textColorClass: 'text-yellow-600 dark:text-yellow-300' },
    { title: 'Completed Deliveries', value: currentBatches.filter(b => b.status === 'Delivered').length, icon: CheckCircle2, trend: 'Dynamic data', bgColorClass: 'bg-green-100 dark:bg-green-900', textColorClass: 'text-green-600 dark:text-green-300' },
    // Active Alerts count can be made dynamic if alert system is also integrated with batch data
    { title: 'Active Alerts', value: currentBatches.filter(b => b.status === 'Issue').length, icon: AlertTriangle, trend: 'Based on "Issue" status', bgColorClass: 'bg-red-100 dark:bg-red-900', textColorClass: 'text-red-600 dark:text-red-300' },
  ];

  if (role === 'Admin') {
    return [
      ...baseCards,
      { title: 'Registered Users', value: 25, icon: UserCircle, trend: '+3 new users (static)', bgColorClass: 'bg-indigo-100 dark:bg-indigo-900', textColorClass: 'text-indigo-600 dark:text-indigo-300' },
      { title: 'Smart Contract Txs', value: 152, icon: ShieldCheck, trend: 'Avg. 5/day (static)', bgColorClass: 'bg-purple-100 dark:bg-purple-900', textColorClass: 'text-purple-600 dark:text-purple-300' },
    ];
  }
  if (role === 'Manufacturer') {
     return [
      { title: 'Batches Created', value: currentBatches.filter(b => b.checkpoints[0]?.handlerRole === 'Manufacturer').length, icon: Factory, trend: 'Dynamic data', bgColorClass: 'bg-sky-100 dark:bg-sky-900', textColorClass: 'text-sky-600 dark:text-sky-300' },
      ...baseCards.slice(1,3) // In Transit, Completed
    ];
  }
   if (role === 'Distributor') {
     return [
      { title: 'Batches Handled', value: currentBatches.filter(b => b.checkpoints.some(c => c.handlerRole === 'Distributor')).length, icon: Warehouse, trend: 'Dynamic data', bgColorClass: 'bg-teal-100 dark:bg-teal-900', textColorClass: 'text-teal-600 dark:text-teal-300' },
      ...baseCards.slice(1,3)
    ];
  }
  if (role === 'Retailer') {
     return [
      { title: 'Batches Received', value: currentBatches.filter(b => b.status === 'Delivered' && b.checkpoints.some(c => c.handlerRole === 'Retailer')).length, icon: Store, trend: 'Dynamic data', bgColorClass: 'bg-lime-100 dark:bg-lime-900', textColorClass: 'text-lime-600 dark:text-lime-300' },
      ...baseCards.slice(1,2) // In transit
    ];
  }
  // For Inspector and Customer, a simplified view
  return baseCards.slice(0,2); // Total Batches, Deliveries In Transit
};

export const checkpointIcons: Record<UserRole, React.ElementType> = {
  Admin: ShieldCheck,
  Manufacturer: Factory,
  Distributor: Warehouse,
  Retailer: Store,
  Inspector: ShieldCheck,
  Customer: MapPin,
};

export const getIconForRole = (role?: UserRole) => {
  if (role && checkpointIcons[role]) {
    return checkpointIcons[role];
  }
  return MapPin;
};

export const getIconForStatus = (status: Batch['status']) => {
  switch (status) {
    case 'Registered':
      return Factory;
    case 'In Transit':
      return Truck;
    case 'CheckpointReached':
      return MapPin;
    case 'Delivered':
      return CheckCircle2;
    case 'Issue':
      return AlertTriangle;
    default:
      return Package;
  }
};
