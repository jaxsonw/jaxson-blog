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
const mockPosts: Record<string, Post> = {
  "2": {
    id: 2,
    title: '如何使用 React 和 Next.js 构建现代网站',
    content: `React 是一个用于构建用户界面的 JavaScript 库，而 Next.js 是一个基于 React 的框架，它提供了许多开箱即用的功能，如服务器端渲染、静态站点生成、路由等。

本文将介绍如何使用 React 和 Next.js 构建现代网站。

## React 的核心概念

React 的核心理念是组件化开发。组件是 React 应用的基础构建块，它们是自包含的、可重用的代码片段，用于渲染 UI 的一部分。

React 使用 JSX，这是一种 JavaScript 的语法扩展，允许你在 JavaScript 中编写类似 HTML 的代码。这使得组件的结构和行为可以在同一个文件中定义，提高了代码的可读性和维护性。

## Next.js 的优势

Next.js 在 React 的基础上提供了许多额外的功能：

1. **服务器端渲染 (SSR)**: 提高首屏加载速度和 SEO 表现
2. **静态站点生成 (SSG)**: 预渲染页面，进一步提升性能
3. **文件系统路由**: 基于文件结构自动生成路由
4. **API 路由**: 在同一项目中构建 API 端点
5. **内置 CSS 和 Sass 支持**: 简化样式管理
6. **代码分割**: 自动优化应用性能

## 构建一个 Next.js 应用

首先，创建一个新的 Next.js 项目：

\`\`\`bash
npx create-next-app my-website
cd my-website
\`\`\`

这将创建一个基本的 Next.js 项目结构。接下来，你可以开始创建页面和组件。

在 Next.js 中，\`pages\` 目录下的每个文件都会自动成为一个路由。例如，\`pages/about.js\` 文件会对应 \`/about\` 路由。

## 部署你的网站

Next.js 应用可以部署到各种平台，如 Vercel、Netlify、AWS 等。最简单的方式是使用 Vercel，它是 Next.js 的创建者开发的平台，专为 Next.js 应用优化。

总结来说，React 和 Next.js 为构建现代、高性能的网站提供了强大的工具和框架。通过组件化开发、服务器端渲染和静态生成等功能，你可以创建出用户体验出色、SEO 友好的网站。`,
    created_at: '2025-03-10T10:00:00Z'
  },
  "3": {
    id: 3,
    title: 'TypeScript 入门指南',
    content: `TypeScript 是 JavaScript 的超集，它添加了静态类型和其他功能，使开发大型应用程序变得更加容易。本文将介绍 TypeScript 的基本概念和用法，帮助你快速入门。

## 为什么选择 TypeScript？

TypeScript 提供了许多 JavaScript 没有的功能，这些功能可以帮助你编写更健壮、更可维护的代码：

1. **静态类型检查**: 在编译时捕获错误，而不是在运行时
2. **更好的 IDE 支持**: 提供代码补全、重构和导航功能
3. **更清晰的代码结构**: 通过接口和类型定义，使代码更易于理解
4. **更好的团队协作**: 类型定义可以作为代码的文档

## TypeScript 基础

### 基本类型

TypeScript 支持 JavaScript 的所有基本类型，并添加了一些额外的类型：

\`\`\`typescript
// 基本类型
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];

// 枚举
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any 类型
let notSure: any = 4;
notSure = "maybe a string";

// Void 类型
function warnUser(): void {
    console.log("This is a warning message");
}
\`\`\`

### 接口

接口是 TypeScript 的一个核心概念，用于定义对象的结构：

\`\`\`typescript
interface User {
    name: string;
    id: number;
    email?: string; // 可选属性
    readonly createdAt: Date; // 只读属性
}

function createUser(user: User): User {
    return user;
}

const newUser = createUser({
    name: "John",
    id: 1,
    createdAt: new Date()
});
\`\`\`

### 类

TypeScript 支持基于类的面向对象编程：

\`\`\`typescript
class Person {
    private name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    greet(): string {
        return \`Hello, my name is \${this.name}\`;
    }
}

const person = new Person("Alice");
console.log(person.greet());
\`\`\`

## 在项目中使用 TypeScript

要在项目中使用 TypeScript，你需要安装 TypeScript 编译器：

\`\`\`bash
npm install -g typescript
\`\`\`

然后，创建一个 \`tsconfig.json\` 文件来配置 TypeScript：

\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
\`\`\`

现在，你可以编写 TypeScript 代码并使用 \`tsc\` 命令编译它：

\`\`\`bash
tsc
\`\`\`

## 结论

TypeScript 是一个强大的工具，可以帮助你编写更健壮、更可维护的 JavaScript 代码。通过静态类型检查和其他功能，它可以提高你的开发效率和代码质量。

随着你对 TypeScript 的深入了解，你会发现它有更多高级功能，如泛型、装饰器、命名空间等，这些功能可以帮助你解决更复杂的编程问题。`,
    created_at: '2025-03-05T14:30:00Z'
  },
  "4": {
    id: 4,
    title: '使用 Tailwind CSS 快速构建美观的用户界面',
    content: `Tailwind CSS 是一个功能类优先的 CSS 框架，它提供了大量的工具类，使你可以快速构建自定义用户界面，而无需编写自定义 CSS。本文将介绍 Tailwind CSS 的基本用法和优势。

## Tailwind CSS 的优势

与传统的 CSS 框架（如 Bootstrap）相比，Tailwind CSS 有以下优势：

1. **高度可定制**: 通过配置文件轻松定制设计系统
2. **无需命名**: 不需要为 CSS 类命名，减少了命名的心智负担
3. **响应式设计**: 内置的响应式修饰符使响应式设计变得简单
4. **黑暗模式**: 内置的黑暗模式支持
5. **更小的生产构建**: 通过 PurgeCSS 移除未使用的 CSS

## 安装 Tailwind CSS

在 Next.js 项目中安装 Tailwind CSS：

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

配置 Tailwind CSS：

\`\`\`javascript
// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

在 CSS 文件中导入 Tailwind CSS：

\`\`\`css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## 使用 Tailwind CSS

Tailwind CSS 的核心理念是使用功能类来构建设计，而不是编写自定义 CSS：

\`\`\`jsx
<div className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
  <div className="flex items-center space-x-2">
    <img className="w-10 h-10 rounded-full" src="/avatar.jpg" alt="User avatar" />
    <div>
      <h2 className="text-lg font-semibold text-gray-900">John Doe</h2>
      <p className="text-sm text-gray-500">Frontend Developer</p>
    </div>
  </div>
  <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
    Follow
  </button>
</div>
\`\`\`

## 响应式设计

Tailwind CSS 提供了响应式修饰符，使你可以轻松创建响应式设计：

\`\`\`jsx
<div className="flex flex-col md:flex-row">
  <div className="w-full md:w-1/2 p-4">
    <h2 className="text-xl md:text-2xl lg:text-3xl">Left Column</h2>
  </div>
  <div className="w-full md:w-1/2 p-4">
    <h2 className="text-xl md:text-2xl lg:text-3xl">Right Column</h2>
  </div>
</div>
\`\`\`

## 黑暗模式

Tailwind CSS 提供了黑暗模式支持：

\`\`\`jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <h1 className="text-2xl font-bold">Hello, world!</h1>
  <p className="text-gray-600 dark:text-gray-300">This is a paragraph.</p>
</div>
\`\`\`

## 组件提取

虽然 Tailwind CSS 鼓励使用功能类，但你仍然可以提取组件以避免重复：

\`\`\`jsx
// 使用 @apply 指令提取组件
.btn {
  @apply px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600;
}

// 或者使用 React 组件
function Button({ children, ...props }) {
  return (
    <button 
      className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" 
      {...props}
    >
      {children}
    </button>
  );
}
\`\`\`

## 结论

Tailwind CSS 是一个强大的 CSS 框架，它可以帮助你快速构建美观、响应式的用户界面。通过使用功能类，你可以减少 CSS 文件的大小，提高开发效率，并创建一致的设计系统。

虽然 Tailwind CSS 的学习曲线可能比传统的 CSS 框架更陡，但一旦你掌握了它的工作方式，你会发现它是一个非常高效的工具。`,
    created_at: '2025-02-28T09:15:00Z'
  }
};

interface BlogProps {
  params: { id: string };
}

export default function BlogPost({ params }: BlogProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 设置一个标志来跟踪组件是否已卸载
    let isMounted = true;
    
    // 从 API 获取文章数据
    fetch(`/api/posts/${params.id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`获取文章失败: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          setPost(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching post:', err);
        if (isMounted) {
          // 如果 API 请求失败，尝试使用模拟数据
          if (mockPosts[params.id]) {
            setPost(mockPosts[params.id]);
            setLoading(false);
          } else {
            setError(`找不到 ID 为 ${params.id} 的文章`);
            setLoading(false);
          }
        }
      });
    
    // 设置一个超时，确保即使 API 请求挂起也能显示内容
    const timer = setTimeout(() => {
      if (isMounted && loading) {
        console.log('API请求超时，使用模拟数据');
        if (mockPosts[params.id]) {
          setPost(mockPosts[params.id]);
        } else {
          setError(`找不到 ID 为 ${params.id} 的文章`);
        }
        setLoading(false);
      }
    }, 3000);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [params.id, loading]);

  // 格式化日期
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 处理文章内容的换行和 Markdown
  const formatContent = (content: string) => {
    // 简单的 Markdown 解析
    // 处理标题
    let formattedContent = content.replace(/## (.*?)$/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>');
    
    // 处理代码块
    formattedContent = formattedContent.replace(/```(.*?)\n([\s\S]*?)```/gm, (match, language, code) => {
      return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4"><code class="language-${language}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
    });
    
    // 处理段落
    const paragraphs = formattedContent.split('\n\n');
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith('<h2') || paragraph.startsWith('<pre')) {
        // 已经处理过的 HTML 元素，直接返回
        return <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />;
      }
      return <p key={index} className="mb-4">{paragraph}</p>;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <main className="flex-grow px-6 py-12 max-w-4xl mx-auto w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mt-8"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <main className="flex-grow px-6 py-12 max-w-4xl mx-auto w-full">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">出错了</h1>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <Link href="/" className="mt-6 inline-block text-blue-600 dark:text-blue-400 hover:underline">
              返回首页
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <main className="flex-grow px-6 py-12 max-w-4xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">找不到文章</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">抱歉，我们无法找到 ID 为 {params.id} 的文章</p>
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              返回首页
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <main className="flex-grow px-6 py-12 max-w-4xl mx-auto w-full">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
          &larr; 返回首页
        </Link>
        
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{post.title}</h1>
            <time className="text-sm text-gray-500 dark:text-gray-400 block mt-2">
              {formatDate(post.created_at)}
            </time>
          </header>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            {formatContent(post.content)}
          </div>
        </article>
      </main>
      
      <footer className="w-full py-8 px-6 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
        <div className="space-y-4">
          <p>{new Date().getFullYear()} &copy; Jaxson Wang. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/jaxsonw" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 dark:hover:text-gray-300">
              GitHub
            </a>
            <Link href="/contact" className="hover:text-gray-700 dark:hover:text-gray-300">
              联系我
            </Link>
            <Link href="/about" className="hover:text-gray-700 dark:hover:text-gray-300">
              关于
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}