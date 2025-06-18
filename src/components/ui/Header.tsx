interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return <header className={`p-4 ${className || ''}`}>Header Placeholder</header>;
}