import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Jaxson的博客</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          我是 Jaxson Wang，一个热爱编程的前端开发者，欢迎来到我的博客。
        </p>
      </header>

      <main>
        <div className="space-y-12">
          {/* 示例博客文章 */}
          <article className="group">
            <div className="space-y-4">
              <div>
                <time className="text-sm text-gray-500">March 5, 2025</time>
                <h2 className="text-2xl font-semibold mt-1 group-hover:text-blue-600 transition-colors">
                  <Link href="/about">Welcome to My New Blog</Link>
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                This is my new blog where I'll be sharing my thoughts on technology,
                programming, and life. I'm excited to start this journey and share
                my experiences with you.
              </p>
              <div>
                <Link
                  href="/blog"
                  className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 inline-flex items-center"
                >
                  Read more
                  <span className="inline-block ml-0.5">→</span>
                </Link>
              </div>
            </div>
          </article>

          {/* 可以添加更多文章 */}
        </div>
      </main>

      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-400">
          {new Date().getFullYear()} Jaxson Wang. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
