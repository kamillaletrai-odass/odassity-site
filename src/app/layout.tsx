import type { Metadata } from "next";
import { Open_Sans, Figtree, Caveat } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("odassity-theme") || "system";
    var resolved = stored;
    if (stored === "system") {
      resolved = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    document.documentElement.setAttribute("data-theme", resolved);
  } catch (e) {}
})();
`;

const openSans = Open_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://odassity.com"),
  title: {
    default: "Odassity | Stories on Identity & Internet Culture",
    template: "%s | Odassity",
  },
  description:
    "Odassity is a digital magazine of stories on identity, psychology, and online culture, for thinking clearly in a noisy world.",
  openGraph: {
    title: "Odassity | Stories on Identity & Internet Culture",
    description:
      "Odassity is a digital magazine of stories on identity, psychology, and online culture, for thinking clearly in a noisy world.",
    url: "https://odassity.com",
    siteName: "Odassity",
    images: ["/hero/dragonfly.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Odassity | Stories on Identity & Internet Culture",
    description:
      "Odassity is a digital magazine of stories on identity, psychology, and online culture, for thinking clearly in a noisy world.",
    images: ["/hero/dragonfly.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${openSans.variable} ${figtree.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-paper font-body">
        <ThemeProvider>
          <Nav />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
