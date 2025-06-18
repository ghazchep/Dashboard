interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  return <aside className={`h-full ${className || ''}`}>Sidebar Placeholder</aside>;
}