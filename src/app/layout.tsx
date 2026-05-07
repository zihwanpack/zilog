import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Header } from "./components/header";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: {
    default: "zilog",
    template: "%s | zilog",
  },
  description: "코드와 생각의 조각들을 문서화합니다.",
  openGraph: {
    title: "zilog",
    description: "코드와 생각의 조각들을 문서화합니다.",
    // url: "https://여러분의-블로그-주소.com",
    siteName: "zilog",
    locale: "ko_KR",
    type: "website",
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
      className={`${jetbrainsMono.variable} ${pretendard.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full min-w-full flex flex-col">
        <ThemeProvider attribute={"class"}>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
