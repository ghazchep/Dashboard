import { ReactNode } from "react";
import { CalendarProvider } from "@/components/ui/calendar/CalendarContext";
import "../globals.css";

export const metadata = {
  title: "Dashboard",
  description: "Weekly calendar dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CalendarProvider>{children}</CalendarProvider>
      </body>
    </html>
  );
}