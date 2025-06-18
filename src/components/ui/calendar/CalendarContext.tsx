import { createContext, useState, ReactNode } from 'react';

export interface Appointment {
  id: number;
  day: string;
  time: string;
  patientId: number;
  doctorId: number;
  treatmentId: number;
}

interface CalendarContextType {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

export const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children, value }: { children: ReactNode; value: CalendarContextType }) {
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}