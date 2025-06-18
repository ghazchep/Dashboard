'use client';

import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import TimeSlot from './TimeSlot';
import AppointmentBlock from './AppointmentBlock';
import AppointmentForm from '@/components/ui/form/AppointmentForm';
import { Button } from '@/components/ui/button';
import { patients, doctors, treatments } from '@/lib/data/dummyData';
import { CalendarProvider, Appointment } from './CalendarContext';

export default function Calendar() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const times = Array.from({ length: 20 }, (_, i) => {
    const start = DateTime.fromObject({ hour: 8, minute: 0 });
    const interval = { minutes: i * 30 };
    const time = start.plus(interval);
    const timeStr = time.toFormat('HH:mm');
    const endTime = DateTime.fromFormat('18:00', 'HH:mm');
    return time <= endTime ? timeStr : null;
  }).filter(time => time !== null);

  const initialAppointments = [
    { id: 1, day: 'Sat', time: '9:00', patientId: 0, doctorId: 0, treatmentId: 0 },
    { id: 2, day: 'Thu', time: '10:30', patientId: 1, doctorId: 1, treatmentId: 1 },
  ];
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const getAppointmentDetails = (appointment: Appointment) => {
    const patient = patients[appointment.patientId] || { name: 'Unknown Patient' };
    const doctor = doctors[appointment.doctorId] || { name: 'Unknown Doctor' };
    const treatment = treatments[appointment.treatmentId] || { name: 'Unknown Treatment' };
    return {
      id: appointment.id,
      patient: patient.name,
      doctor: doctor.name,
      treatment: treatment.name,
    };
  };

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <CalendarProvider value={{ appointments, setAppointments }}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Weekly Calendar</h2>
        <div className="grid grid-cols-8 gap-px bg-gray-200 rounded">
          <div className="font-bold bg-gray-100 p-2">Time</div>
          {days.map(day => (
            <div key={day} className="font-bold bg-gray-100 p-2">
              {day}
            </div>
          ))}
          {times.flatMap(time =>
            days.map(day => {
              const appointment = appointments.find((a: Appointment) => a.day === day && a.time === time);
              return (
                <div key={`${day}-${time}`} className="relative h-12 bg-white border border-gray-200">
                  {time === times[0] && (
                    <TimeSlot time={time} className="absolute top-0 left-0 p-1 text-sm" />
                  )}
                  {appointment && (
                    <AppointmentBlock {...getAppointmentDetails(appointment)} />
                  )}
                </div>
              );
            })
          )}
        </div>
        <AppointmentForm
          className="mt-4"
          open={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
          onAddAppointment={(newAppointment: Appointment) => {
            setAppointments(prev => [...prev, newAppointment]);
            setIsAddFormOpen(false); // Close form after adding
          }}
          onEditAppointment={() => {}}
        />
        <Button
          className="mt-4 bg-indigo-600 text-white"
          onClick={() => setIsAddFormOpen(true)}
        >
          Add Appointment
        </Button>
      </div>
    </CalendarProvider>
  );
}