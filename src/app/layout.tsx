import type { Metadata, Viewport } from "next";
import { Open_Sans, Figtree, Caveat } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import PageTransition from "@/components/PageTransition";
import CookieConsent from "@/components/CookieConsent";
import { CookieConsentProvider } from "@/components/CookieConsentProvider";
import "./globals.css";

const THEME_INIT_SCRIPT = `
(function () {
  try {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    var stored = localStorage.getItem("odassity-theme") || "system";
    var resolved = stored;
    if (stored === "system") {
      resolved = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    document.documentElement.setAttribute("data-theme", resolved);
    var link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.setAttribute("data-managed-favicon", "true");
    link.href = resolved === "dark" ? "/icon-dark-mode.png" : "/icon-light-mode.png";
    document.head.appendChild(link);
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://odassity.com"),
  title: {
    default: "Odassity | A digital hangout",
    template: "%s | Odassity",
  },
  description:
    "Odassity is a digital magazine of stories on identity, psychology, and online culture, for thinking clearly in a noisy world.",
  openGraph: {
    title: "Odassity | A digital hangout",
    description:
      "Odassity is a digital magazine of stories on identity, psychology, and online culture, for thinking clearly in a noisy world.",
    url: "https://odassity.com",
    siteName: "Odassity",
    images: ["/hero/dragonfly.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Odassity | A digital hangout",
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
        <CookieConsentProvider>
          <CookieConsent />
          <ThemeProvider>
            <Nav />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <ThemeToggle />
          </ThemeProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
