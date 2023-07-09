import "@/globals.css";

import type { Metadata } from "next";
import { Raleway } from "next/font/google";

//TODO: Make sure what those mean
export const metadata: Metadata = {
  metadataBase: new URL("https://seungwonan.com"),
  title: {
    default: "Seungwon An (Harry)",
    template: "%s | Seungwon An (Harry)",
  },
  description: "Sohpomore student majoring CS",
  openGraph: {
    title: "Seungwon An",
    description: "Sohpomore student majoring CS.",
    url: "https://seungwonan.com",
    siteName: "Seungwon An (Harry)",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const raleway = Raleway({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={`antialiased w-4/5 mb-40 flex flex-col mx-auto mt-8 lg:w-1/2 ${raleway.className}`}
      >
        <main className="flex-auto min-w-0 mt-6 flex flex-col md:px-0">
          {children}
        </main>
      </body>
    </html>
  );
}
