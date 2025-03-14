"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 定义 Post 接口
interface Post {
  id: number;
  title: string;
  content: string;
  created_at?: string;
  category?: string; // 添加分类字段
}

// 模拟文章数据
const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Next.js 14 新特性详解',
    content: 'Next.js 14 带来了许多令人兴奋的新特性，包括改进的服务器组件、更快的构建时间和更好的开发体验。本文将详细介绍这些新特性，并展示如何在你的项目中充分利用它们...',
    created_at: '2025-03-12T15:30:00Z',
    category: '前端开发'
  },
  {
    id: 2,
    title: '如何使用 React 和 Next.js 构建现代网站',
    content: 'React 是一个用于构建用户界面的 JavaScript 库，而 Next.js 是一个基于 React 的框架，它提供了许多开箱即用的功能，如服务器端渲染、静态站点生成、路由等。本文将介绍如何使用 React 和 Next.js 构建现代网站...',
    created_at: '2025-03-10T10:00:00Z',
    category: '前端开发'
  },
  {
    id: 3,
    title: 'TypeScript 入门指南',
    content: 'TypeScript 是 JavaScript 的超集，它添加了静态类型和其他功能，使开发大型应用程序变得更加容易。本文将介绍 TypeScript 的基本概念和用法，帮助你快速入门...',
    created_at: '2025-03-05T14:30:00Z',
    category: '编程语言'
  },
  {
    id: 4,
    title: '使用 Tailwind CSS 快速构建美观的用户界面',
    content: 'Tailwind CSS 是一个功能类优先的 CSS 框架，它提供了大量的工具类，使你可以快速构建自定义用户界面，而无需编写自定义 CSS。本文将介绍 Tailwind CSS 的基本用法和优势...',
    created_at: '2025-02-28T09:15:00Z',
    category: 'CSS'
  },
  {
    id: 5,
    title: 'Flask 与 Next.js 构建全栈应用',
    content: '将 Flask 作为后端 API，Next.js 作为前端框架，可以构建出功能强大、性能优异的全栈应用。本文将介绍如何设置项目结构、处理跨域请求、实现数据交互等关键步骤...',
    created_at: '2025-02-25T11:20:00Z',
    category: '全栈开发'
  },
  {
    id: 6,
    title: 'JavaScript 异步编程详解',
    content: '异步编程是 JavaScript 中的重要概念，理解 Promise、async/await 和事件循环对于编写高效的 JavaScript 代码至关重要。本文将深入探讨这些概念，并提供实用的代码示例...',
    created_at: '2025-02-20T16:45:00Z',
    category: '编程语言'
  },
  {
    id: 7,
    title: 'CSS Grid 布局完全指南',
    content: 'CSS Grid 是一种强大的二维布局系统，它使得创建复杂的网页布局变得简单。本文将从基础到高级，全面介绍 CSS Grid 的用法和技巧，帮助你掌握这一强大的布局工具...',
    created_at: '2025-02-15T13:10:00Z',
    category: 'CSS'
  },
  {
    id: 8,
    title: 'MongoDB 数据库入门与实践',
    content: 'MongoDB 是一种流行的 NoSQL 数据库，它的灵活性和可扩展性使其成为现代 Web 应用的理想选择。本文将介绍 MongoDB 的基本概念、安装配置、CRUD 操作以及与 Node.js 的集成...',
    created_at: '2025-02-10T09:30:00Z',
    category: '数据库'
  },
  {
    id: 9,
    title: 'Node.js 性能优化策略',
    content: '随着应用规模的增长，Node.js 应用的性能优化变得尤为重要。本文将分享一系列实用的性能优化策略，包括代码优化、内存管理、集群部署和监控工具的使用...',
    created_at: '2025-02-05T14:20:00Z',
    category: '后端开发'
  },
  {
    id: 10,
    title: 'Git 工作流与团队协作最佳实践',
    content: '在团队开发中，合理的 Git 工作流对于提高效率和减少冲突至关重要。本文将介绍几种常见的 Git 工作流模型，以及团队协作的最佳实践和常见问题的解决方案...',
    created_at: '2025-01-30T10:45:00Z',
    category: '开发工具'
  },
  {
    id: 11,
    title: 'React Hooks 深入理解与实践',
    content: 'React Hooks 是 React 16.8 引入的新特性，它使得在函数组件中使用状态和其他 React 特性成为可能。本文将深入探讨 useState、useEffect、useContext 等常用 Hooks 的原理和使用场景...',
    created_at: '2025-01-25T16:30:00Z',
    category: '前端开发'
  },
  {
    id: 12,
    title: 'Docker 容器化应用部署指南',
    content: 'Docker 使得应用的打包、分发和部署变得简单高效。本文将介绍 Docker 的基本概念、常用命令、Dockerfile 编写以及多容器应用的编排与部署...',
    created_at: '2025-01-20T11:15:00Z',
    category: 'DevOps'
  }
];

// 定义分类颜色映射
const categoryColors: Record<string, string> = {
  '前端开发': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  '编程语言': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'CSS': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  '后端开发': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  '数据库': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  '全栈开发': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  'DevOps': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  '开发工具': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  '其他': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
          // 添加分类信息到文章数据
          const postsWithCategories = (data.posts || []).map((post: Post) => ({
            ...post,
            category: post.category || getCategoryFromTitle(post.title)
          }));
          setPosts(postsWithCategories);
          setLoading(false);
          setLastUpdated(new Date());
        }
      })
      .catch(err => {
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
        setPosts(mockPosts);
        setLoading(false);
        setLastUpdated(new Date());
      }
    }, 2000); // 减少超时时间到 2 秒
    
    // 清理函数
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  };

  // 从标题推断分类
  const getCategoryFromTitle = (title: string): string => {
    if (title.includes('React') || title.includes('Next.js') || title.includes('前端')) {
      return '前端开发';
    } else if (title.includes('TypeScript') || title.includes('JavaScript')) {
      return '编程语言';
    } else if (title.includes('CSS') || title.includes('Tailwind')) {
      return 'CSS';
    } else if (title.includes('Node') || title.includes('后端')) {
      return '后端开发';
    } else if (title.includes('数据库') || title.includes('SQL')) {
      return '数据库';
    } else {
      return '其他';
    }
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

  // 获取所有分类
  const getAllCategories = () => {
    const categories = posts.map(post => post.category || '其他');
    return Array.from(new Set(categories));
  };

  // 过滤文章
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // 获取精选文章（最新的3篇）
  const featuredPosts = [...filteredPosts].sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return dateB - dateA;
  }).slice(0, 3);

  // 获取其余文章
  const remainingPosts = [...filteredPosts].sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return dateB - dateA;
  }).slice(3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 英雄区域 */}
      <section className="relative overflow-hidden rounded-lg mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 rounded-lg">
          <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-2xl">
              探索编程世界，分享技术见解
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
              从前端到后端，从基础概念到高级技巧，这里记录我的编程旅程和技术思考。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#latest-posts" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
              >
                浏览文章
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link 
                href="/about" 
                className="bg-transparent text-white border border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
              >
                关于我
              </Link>
            </div>
          </div>
          
          {/* 装饰元素 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* 搜索和分类筛选 */}
      <section className="mb-12" id="latest-posts">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">最新文章</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              探索我的技术见解和编程心得
            </p>
          </div>
          
          {/* 搜索栏 */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <button 
              onClick={() => setSearchTerm('')}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ${!searchTerm && 'hidden'}`}
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* 分类过滤器 */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null 
                ? 'bg-blue-500 text-white dark:bg-blue-600' 
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            全部
          </button>
          {getAllCategories().map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-blue-500 text-white dark:bg-blue-600' 
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="space-y-8">
          {/* 骨架屏加载状态 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                {searchTerm ? '没有找到匹配的文章' : '暂无文章，敬请期待。'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                  className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  清除搜索
                </button>
              )}
            </div>
          ) : (
            <>
              {/* 精选文章 */}
              {featuredPosts.length > 0 && (
                <section className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredPosts.map((post, index) => (
                      <article 
                        key={post.id} 
                        className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full ${
                          index === 0 ? 'md:col-span-3 lg:col-span-2' : ''
                        }`}
                      >
                        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
                          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity"></div>
                          <div className="absolute inset-0 flex flex-col justify-end p-6">
                            {post.category && (
                              <span className={`text-xs px-2 py-1 rounded-full mb-3 inline-block w-fit ${categoryColors[post.category] || categoryColors['其他']}`}>
                                {post.category}
                              </span>
                            )}
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:translate-y-[-5px] transition-transform">
                              {post.title}
                            </h3>
                            <time className="text-sm text-white/80">
                              {formatDate(post.created_at)}
                            </time>
                          </div>
                        </div>
                        
                        <div className="p-6 bg-white dark:bg-gray-800 flex-grow flex flex-col">
                          <p className="text-gray-700 dark:text-gray-300 line-clamp-3 mb-4 flex-grow">
                            {post.content}
                          </p>
                          
                          <Link
                            href={`/blog/${post.id}`}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center self-start mt-auto font-medium"
                          >
                            阅读全文
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
              
              {/* 其余文章 */}
              {remainingPosts.length > 0 && (
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">更多文章</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {remainingPosts.map((post) => (
                      <article key={post.id} className="group bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col h-full">
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex items-center justify-between mb-3">
                            <time className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(post.created_at)}
                            </time>
                            {post.category && (
                              <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[post.category] || categoryColors['其他']}`}>
                                {post.category}
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-700 dark:text-gray-300 line-clamp-3 mb-4 flex-grow">
                            {post.content}
                          </p>
                          
                          <Link
                            href={`/blog/${post.id}`}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center self-start mt-auto"
                          >
                            阅读全文
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      )}

      {/* 刷新按钮和最后更新时间 */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between text-gray-500 dark:text-gray-400">
        <p className="text-sm order-2 sm:order-1">
          最后更新: {lastUpdated.toLocaleString('zh-CN', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        
        <button
          onClick={fetchPosts}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors mb-4 sm:mb-0 order-1 sm:order-2"
        >
          <span>刷新文章</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
