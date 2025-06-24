"use client";

import { useContext, useState } from 'react';
import { CalendarContext } from './CalendarContext';
import AppointmentForm from '@/components/ui/form/AppointmentForm';

export interface Appointment {
  id: number;
  day: string;
  time: string;
  patientId: number;
  doctorId: number;
  treatmentId: number;
}

interface AppointmentBlockProps {
  id: number;
  patient: string;
  doctor: string;
  treatment: string;
}

export default function AppointmentBlock({ id, patient, doctor, treatment }: AppointmentBlockProps) {
  const context = useContext(CalendarContext);
  const [isEditing, setIsEditing] = useState(false);

  if (!context) {
    console.error('CalendarContext is not provided. Check CalendarProvider.');
    return null;
  }

  const { setAppointments, appointments } = context as {
    setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
    appointments: Appointment[] | undefined;
  };

  console.log('Appointments in AppointmentBlock:', appointments); // Debug

  const handleDelete = () => {
    console.log('Attempting to delete appointment with id:', id);
    if (appointments && Array.isArray(appointments)) {
      setAppointments(prev => prev.filter((app: Appointment) => app.id !== id));
    } else {
      console.error('Appointments is not an array or is undefined');
    }
  };

  const handleEdit = () => {
    console.log('Edit clicked for id:', id);
    const appointmentToEdit = appointments?.find((app: Appointment) => app.id === id);
    console.log('Appointment to edit:', appointmentToEdit); // Debug
    if (appointmentToEdit) {
      setIsEditing(true);
      console.log('Setting isEditing to true for id:', id);
    } else {
      console.error('Appointment not found for id:', id);
    }
  };

  const initialAppointment = appointments?.find((app: Appointment) => app.id === id);
  console.log('Initial Appointment:', initialAppointment); // Debug

  return (
    <div className="appointment-block absolute top-0 left-0 w-full h-full flex items-center justify-between p-1 text-sm">
      <span>{patient} - {doctor} - {treatment}</span>
      <div>
        <button className="ml-2 text-blue-500 mr-2" onClick={handleEdit}>
          Edit
        </button>
        <button className="ml-2 text-red-500" onClick={handleDelete}>
          X
        </button>
      </div>
      <AppointmentForm
        className="mt-4"
        initialAppointment={initialAppointment} // Remove || null to test type
        onAddAppointment={() => {}}
        onEditAppointment={(editedAppointment: Appointment) => {
          if (appointments && Array.isArray(appointments)) {
            setAppointments(prev =>
              prev.map((app: Appointment) =>
                app.id === editedAppointment.id ? editedAppointment : app
              )
            );
          } else {
            console.error('Appointments is not an array or is undefined');
          }
          setIsEditing(false);
        }}
        onClose={() => setIsEditing(false)}
        open={isEditing}
      />
    </div>
  );
}