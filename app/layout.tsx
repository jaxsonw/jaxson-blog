import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jaxson Wang | 编程与技术分享",
  description: "我是Jaxson Wang,一个热爱编程的前端开发者，欢迎来到我的博客。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 flex flex-col`}>
        {/* 导航栏 */}
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="text-xl font-bold">Jaxson Wang | 编程与技术分享</div>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:underline">
                首页
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:underline">
                博客
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                关于
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                联系
              </a>
            </li>
          </ul>
        </nav>
        <main className="container mx-auto p-4 flex-grow">{children}</main>
        
        {/* 页脚 */}
        <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>&copy; {new Date().getFullYear()} Jaxson Wang. 保留所有权利。</p>
              <p className="text-sm mt-2">使用 Next.js 和 Flask 构建</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
