import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-teal-400">
      <body>{children}</body>
    </html>
  );
}
