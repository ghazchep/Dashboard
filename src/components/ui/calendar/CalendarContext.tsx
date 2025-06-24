"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Appointment } from "./AppointmentBlock";
export type { Appointment } from "./AppointmentBlock";

interface CalendarContextType {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

export const CalendarContext = createContext<CalendarContextType | null>(null);

// Export CalendarProvider as a named export
export function CalendarProvider({ children, value }: { children: React.ReactNode, value?: { appointments: Appointment[], setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>> } }) {
  const [internalAppointments, setInternalAppointments] = useState<Appointment[]>([
    { id: 1, day: "Mon", time: "10:00", patientId: 1, doctorId: 1, treatmentId: 1 },
  ]);
  const appointments = value?.appointments ?? internalAppointments;
  const setAppointments = value?.setAppointments ?? setInternalAppointments;

  return (
    <CalendarContext.Provider value={{ appointments, setAppointments }}>
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