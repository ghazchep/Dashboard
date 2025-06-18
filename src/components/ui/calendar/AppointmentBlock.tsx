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
  const { setAppointments, appointments } = context;

  const handleDelete = () => {
    console.log('Attempting to delete appointment with id:', id);
    console.log('Current appointments:', appointments);
    setAppointments(prev => {
      const newAppointments = prev.filter((app: Appointment) => app.id !== id);
      console.log('New appointments array after filter:', newAppointments);
      return newAppointments;
    });
  };

  const handleEdit = () => {
    const appointmentToEdit = appointments.find((app: Appointment) => app.id === id);
    if (appointmentToEdit) {
      setIsEditing(true);
    }
  };

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
        initialAppointment={appointments.find((app: Appointment) => app.id === id)}
        onAddAppointment={() => {}}
        onEditAppointment={(editedAppointment: Appointment) => {
          setAppointments(prev => prev.map(app =>
            app.id === editedAppointment.id ? editedAppointment : app
          ));
          setIsEditing(false);
        }}
        onClose={() => setIsEditing(false)}
        open={isEditing}
      />
    </div>
  );
}