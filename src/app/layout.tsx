import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cabaret des Chatons",
  description:
    "Spectacle hyperréaliste mettant en scène de petits chatons angora blancs sur une scène chatoyante, chorégraphie enjouée et ambiance musicale swing.",
  metadataBase: new URL("https://agentic-fb31e215.vercel.app"),
  openGraph: {
    title: "Cabaret des Chatons · Revue Lumineuse",
    description:
      "Plongez dans une revue haute en couleurs avec des chatons angora synchronisés, une lumière chaleureuse et une ambiance musicale entraînante.",
    type: "website",
    url: "https://agentic-fb31e215.vercel.app",
    images: [
      {
        url: "/opengraph-stage.svg",
        width: 1200,
        height: 630,
        alt: "Chatons angora blancs dansant sur une scène éclairée",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabaret des Chatons",
    description:
      "Mini revue féline : chatons angora, accessoires dorés et rythme swing irrésistible.",
    images: ["/opengraph-stage.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
