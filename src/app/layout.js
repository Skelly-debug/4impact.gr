import "./globals.css";

export const metadata = {
  title: "4Impact",
  description: "test",
  icons: { icon: "/favicon.ico" },
};

import SessionProvider from "../components/SessionProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="gr">
      <body className="font-sans">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
