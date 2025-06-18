import { createContext, useContext, useState, ReactNode } from "react";

const CalendarContext = createContext<any>(null);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [someValue, setSomeValue] = useState(() => {
    // Only use localStorage in the browser
    if (typeof window !== "undefined") {
      return localStorage.getItem("key") || "default";
    }
    return "default"; // Fallback for server-side
  });

  return (
    <CalendarContext.Provider value={{ someValue, setSomeValue }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}