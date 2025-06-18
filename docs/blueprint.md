# **App Name**: ChainWatch

## Core Features:

- Role-Based Authentication: User authentication and authorization supporting roles like Admin, Manufacturer, Distributor, Retailer, Inspector, and Customer.
- Dashboard Overview: A dashboard displaying batches handled, delivery status, and live alerts for each role.
- Batch Management: Functionality to register new batches with details like ID, product, origin, GPS, temperature limit, and file attachments (bill/invoice/image). Also automatically generates QR codes for each registered batch.
- Batch Verification: Verification page to show the status, map, checkpoints, and temperature log for a scanned or entered batch ID.
- Map Tracking: Map tracker using React Leaflet, displaying a live marker for the delivery vehicle, custom icons for checkpoints, a route with polyline, and real-time GPS/temperature simulation.
- Real-time Cold Chain Alerts: Visual warnings if the temperature exceeds the defined threshold, and simulated IoT temperature sensor data for live updates.
- AI-Driven Risk Prediction: AI tool that analyzes historical batch data to detect risky batches and predict potential temperature breaches.

## Style Guidelines:

- Primary color: Strong Blue (#29ABE2) to communicate trust and reliability.
- Background color: Light grey (#F0F0F0) for a clean and modern look.
- Accent color: Deep Orange (#FF8C00) for highlighting alerts and calls to action.
- Headline font: 'Space Grotesk', sans-serif, for a modern, computerized feel.
- Body font: 'Inter', sans-serif, for neutral, readable text.
- Use clear, easily recognizable icons to represent batch status, checkpoints, and alerts.
- Subtle animations to indicate real-time updates, temperature fluctuations, and delivery vehicle movements.