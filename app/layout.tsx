import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico, Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-cairo',
})

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "جامعة الرواد - التسجيل الإلكتروني",
  description: "سجل الآن في جامعة الرواد واستفد من نظام الساعات المعتمدة المرن",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${cairo.variable} antialiased`}
        style={{fontFamily: 'var(--font-cairo), sans-serif'}}
      >
        {children}
      </body>
    </html>
  );
}
