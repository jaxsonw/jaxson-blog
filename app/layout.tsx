import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { NavMenu } from "@/components/nav-menu";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jaxson Wang | 创新与技术分享",
  description: "欢迎来到Jaxson Wang，一个充满创意的前端开发者，欢迎来到我的博客。",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 导航栏 */}
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <NavMenu />
          </header>
          
          <main className="flex-1">{children}</main>
          
          {/* 页脚 */}
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <div className="md:flex-1"></div>
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-center">
                &copy; {new Date().getFullYear()} Jaxson Wang. 保留所有权利。
              </p>
              <div className="flex items-center gap-4 md:flex-1 md:justify-end">
                <Link href="/admin" className="text-sm text-muted-foreground hover:underline">
                  管理
                </Link>
                <a
                  href="https://github.com/jaxsonw"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
