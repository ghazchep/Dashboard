"use client"; // Ensure client-side rendering

import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// Import Appointment from AppointmentBlock where it’s defined
import { Appointment } from '@/components/ui/calendar/AppointmentBlock';
import { patients, doctors, treatments } from '@/lib/data/dummyData';

interface AppointmentFormProps {
  className?: string;
  onAddAppointment: (appointment: Appointment) => void;
  onEditAppointment?: (appointment: Appointment) => void;
  initialAppointment?: Appointment;
  onClose?: () => void;
  open?: boolean;
}

export default function AppointmentForm({ className, onAddAppointment, onEditAppointment, initialAppointment, onClose, open = false }: AppointmentFormProps) {
  const [formData, setFormData] = useState<Appointment>({
    id: Date.now(),
    day: '',
    time: '',
    patientId: -1,
    doctorId: -1,
    treatmentId: -1,
  });

  useEffect(() => {
    if (open && initialAppointment) {
      setFormData(initialAppointment); // Set form data for editing
    } else if (open && !initialAppointment) {
      setFormData({
        id: Date.now(),
        day: '',
        time: '',
        patientId: -1,
        doctorId: -1,
        treatmentId: -1,
      }); // Clear for adding
    }
  }, [open, initialAppointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.day || !formData.time || formData.patientId < 0 || formData.doctorId < 0 || formData.treatmentId < 0) {
      alert('All fields are required');
      return;
    }
    if (initialAppointment && onEditAppointment) {
      onEditAppointment({ ...formData, id: initialAppointment.id });
      if (onClose) onClose();
    } else {
      onAddAppointment(formData);
      if (onClose) onClose(); // Close form after adding new appointment
    }
  };

  return (
    <div className={className}>
      <Dialog open={open} onOpenChange={(open) => { if (!open && onClose) onClose(); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{initialAppointment ? 'Edit Appointment' : 'Add New Appointment'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <select
              className="border p-2 mb-2 w-full"
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              required
            >
              <option value="" disabled>Select Day</option>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select
              className="border p-2 mb-2 w-full"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            >
              <option value="" disabled>Select Time</option>
              {Array.from({ length: 20 }, (_, i) => {
                const start = DateTime.fromObject({ hour: 8, minute: 0 });
                const interval = { minutes: i * 30 };
                const time = start.plus(interval);
                const timeStr = time.toFormat('HH:mm');
                const endTime = DateTime.fromFormat('18:00', 'HH:mm');
                return time <= endTime ? timeStr : null;
              }).filter(time => time !== null).map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <select
              className="border p-2 mb-2 w-full"
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: parseInt(e.target.value) })}
              required
            >
              <option value={-1} disabled>Select Patient</option>
              {patients.map((patient, index) => (
                <option key={patient.id} value={index}>{patient.name}</option>
              ))}
            </select>
            <select
              className="border p-2 mb-2 w-full"
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: parseInt(e.target.value) })}
              required
            >
              <option value={-1} disabled>Select Doctor</option>
              {doctors.map((doctor, index) => (
                <option key={doctor.id} value={index}>{doctor.name}</option>
              ))}
            </select>
            <select
              className="border p-2 mb-2 w-full"
              value={formData.treatmentId}
              onChange={(e) => setFormData({ ...formData, treatmentId: parseInt(e.target.value) })}
              required
            >
              <option value={-1} disabled>Select Treatment</option>
              {treatments.map((treatment, index) => (
                <option key={treatment.id} value={index}>{treatment.name}</option>
              ))}
            </select>
            <div className="flex justify-end">
              <Button type="submit" className="bg-green-500 mr-2">
                {initialAppointment ? 'Save Changes' : 'Save'}
              </Button>
              <Button variant="destructive" onClick={() => { if (onClose) onClose(); }}>Cancel</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}