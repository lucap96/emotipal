// project-imports
import SimpleLayout from 'layout/SimpleLayout';

// ================================|| SIMPLE LAYOUT ||================================ //

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SimpleLayout>{children}</SimpleLayout>;
}
