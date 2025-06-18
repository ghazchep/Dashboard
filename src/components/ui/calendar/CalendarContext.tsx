import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface CalendarContextType {
  someValue: string;
  setSomeValue: (value: string) => void;
}

export const CalendarContext = createContext<CalendarContextType | null>(null); // Export and type it

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [someValue, setSomeValue] = useState("default");

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