import { CalendarProvider } from "@/components/ui/calendar/CalendarContext";
import "./globals.css"; // Corrected path relative to layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CalendarProvider>{children}</CalendarProvider>
      </body>
    </html>
  );
}
