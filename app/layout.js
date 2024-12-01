import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Memo Mate</title>
      </head>
      <body>
        {children}
      </body>
    </html >
  );
}
