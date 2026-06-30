import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";

export const metadata = {
  title: "4Impact",
  description: "test",
  icons: {
    icon: "/favicon.ico"
  }
};

import SessionProvider from "../components/SessionProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="gr">
      <body className="font-sans">
        <SessionProvider>{children}</SessionProvider>
        <GoogleAnalytics gaId="G-CRJNPG6ZPM" />
      </body>
    </html>
  );
}