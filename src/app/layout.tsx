"use client";

import "./globals.css";
import styles from "./page.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fff" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
