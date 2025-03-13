"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

// 定义 Post 接口
interface Post {
  id: number;
  title: string;
  content: string;
  created_at?: string;
}

// 模拟文章数据
const mockPosts: Post[] = [
  {
    id: 2,
    title: '如何使用 React 和 Next.js 构建现代网站',
    content: 'React 是一个用于构建用户界面的 JavaScript 库，而 Next.js 是一个基于 React 的框架，它提供了许多开箱即用的功能，如服务器端渲染、静态站点生成、路由等。本文将介绍如何使用 React 和 Next.js 构建现代网站...',
    created_at: '2025-03-10T10:00:00Z'
  },
  {
    id: 3,
    title: 'TypeScript 入门指南',
    content: 'TypeScript 是 JavaScript 的超集，它添加了静态类型和其他功能，使开发大型应用程序变得更加容易。本文将介绍 TypeScript 的基本概念和用法，帮助你快速入门...',
    created_at: '2025-03-05T14:30:00Z'
  },
  {
    id: 4,
    title: '使用 Tailwind CSS 快速构建美观的用户界面',
    content: 'Tailwind CSS 是一个功能类优先的 CSS 框架，它提供了大量的工具类，使你可以快速构建自定义用户界面，而无需编写自定义 CSS。本文将介绍 Tailwind CSS 的基本用法和优势...',
    created_at: '2025-02-28T09:15:00Z'
  }
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [clickCount, setClickCount] = useState(0);

  // 检查系统主题偏好和本地存储的偏好
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 首先检查localStorage中是否有保存的主题偏好
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        // 如果有保存的主题偏好，使用它
        const isDark = savedTheme === 'dark';
        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
      } else {
        // 如果没有保存的主题偏好，检查系统偏好
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
      }
    }
  }, []);

  // 获取文章数据的函数
  const fetchPosts = () => {
    setLoading(true);
    
    // 设置一个标志来跟踪组件是否已卸载
    let isMounted = true;
    
    // 尝试从API获取数据
    fetch('/api/posts', {
      // 添加缓存控制头，防止浏览器缓存
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          console.log('API返回数据:', data);
          setPosts(data.posts || []);
          setLoading(false);
          setLastUpdated(new Date());
        }
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        if (isMounted) {
          // 如果API请求失败，使用模拟数据
          setPosts(mockPosts);
          setLoading(false);
          setLastUpdated(new Date());
        }
      });
      
    // 设置一个超时，确保即使API请求挂起也能显示内容
    const timer = setTimeout(() => {
      if (isMounted && loading) {
        console.log('超时，使用模拟数据');
        setPosts(mockPosts);
        setLoading(false);
        setLastUpdated(new Date());
      }
    }, 3000); // 增加超时时间到 3 秒
    
    // 清理函数
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  };

  // 初始加载数据
  useEffect(() => {
    fetchPosts();
    
    // 每60秒自动刷新一次数据
    const intervalId = setInterval(() => {
      fetchPosts();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  // 格式化时间函数
  const formatDate = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900">
      <header className="py-16 px-6 text-center relative w-full bg-white dark:bg-gray-800 shadow-sm">
        <div className="absolute right-0 top-0 flex">
          <button 
            onClick={fetchPosts}
            className="p-2 mr-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            aria-label="刷新数据"
          >
            🔄
          </button>
          <button 
            onClick={() => {
              const newDarkMode = !darkMode;
              setDarkMode(newDarkMode);
              document.documentElement.classList.toggle('dark', newDarkMode);
              // 保存主题偏好到localStorage
              localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
            }}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            aria-label="切换主题"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </div>
        <h1 className="text-5xl font-bold tracking-tight">Jaxson的博客</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          你好，我是 Jaxson Wang，一个热爱编程的前端开发者，欢迎来到我的博客。
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          最后更新: {formatDate(lastUpdated.toISOString())}
        </p>
      </header>

      {loading ? (
        <div className="flex-grow px-6 py-12 max-w-6xl mx-auto w-full space-y-6 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          ))}
        </div>
      ) : (
        <main className="flex-grow px-6 py-12 max-w-6xl mx-auto w-full space-y-12">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              暂无文章，敬请期待。
            </p>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="space-y-4">
                  <div>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(post.created_at)}
                    </time>
                    <h2 className="text-2xl font-semibold mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                    {post.content}
                  </p>
                  <div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center"
                    >
                      阅读更多
                      <span className="ml-1">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </main>
      )}

      <footer className="w-full py-8 px-6 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
        <div className="space-y-4">
          <p>{new Date().getFullYear()} © Jaxson Wang. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/jaxsonw" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 dark:hover:text-gray-300">
              GitHub
            </a>
            <Link 
              href="/contact" 
              className="hover:text-gray-700 dark:hover:text-gray-300 text-gray-500 dark:text-gray-400"
            >
              联系我
            </Link>
            <Link href="/about" className="hover:text-gray-700 dark:hover:text-gray-300">
              关于
            </Link>
            <Link 
              href="/admin" 
              className="text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"
            >
              管理
            </Link>
          </div>
          <p className="text-sm">
            最后更新: {lastUpdated.toLocaleString('zh-CN', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </footer>
    </div>
  );
}
