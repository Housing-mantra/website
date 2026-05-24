import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Housing Mantra",
  description: "Housing Mantra Backend CMS – Manage projects, users and leads.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // No shared Navbar/Footer – the admin has its own sidebar
  return <>{children}</>;
}
