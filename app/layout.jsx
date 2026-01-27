export const metadata = {
  title: "Pastebin Lite",
  description: "Minimal Pastebin-like service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
