interface TimeSlotProps {
  time: string;
  className?: string;
}

export default function TimeSlot({ time, className }: TimeSlotProps) {
  return <div className={className}>{time}</div>;
}