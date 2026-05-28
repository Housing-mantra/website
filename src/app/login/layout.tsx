import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Housing Mantra",
  description:
    "Sign in to your Housing Mantra account. Manage bookmarks, view browsing history, and get personalized property recommendations.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
