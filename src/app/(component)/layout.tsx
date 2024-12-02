// project-imports
import ComponentLayout from 'layout/ComponentLayout';

// ==============================|| COMPONENT - LAYOUT ||============================== //

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ComponentLayout>{children}</ComponentLayout>;
}
