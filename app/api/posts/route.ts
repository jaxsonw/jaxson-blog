import { NextResponse } from 'next/server';

// Flask 后端 API URL
const FLASK_API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://localhost:5001';

// 备用模拟数据，仅在无法连接到 Flask 后端时使用
const mockPosts = [
  {
    id: 1,
    title: "如何使用 React 和 Next.js 构建现代网站",
    content: "React 是一个用于构建用户界面的 JavaScript 库，而 Next.js 是一个基于 React 的框架，它提供了许多开箱即用的功能，如服务器端渲染、静态站点生成、路由等。本文将介绍如何使用 React 和 Next.js 构建现代网站...\n\n在当今快速发展的网络世界中，用户对网站的期望越来越高。他们希望网站能够快速加载、响应迅速，并提供流畅的用户体验。React 和 Next.js 的组合可以帮助开发者满足这些期望。\n\nReact 的组件化设计使得代码更易于维护和重用，而 Next.js 则通过提供服务器端渲染和静态站点生成等功能，解决了传统单页应用的一些问题，如首次加载速度慢和搜索引擎优化困难等。",
    created_at: "2025-03-10T10:00:00Z"
  },
  {
    id: 2,
    title: "TypeScript 入门指南",
    content: "TypeScript 是 JavaScript 的超集，它添加了静态类型和其他功能，使开发大型应用程序变得更加容易。本文将介绍 TypeScript 的基本概念和用法，帮助你快速入门...\n\nTypeScript 由微软开发，它是 JavaScript 的超集，这意味着所有有效的 JavaScript 代码也是有效的 TypeScript 代码。TypeScript 添加了静态类型检查，这可以帮助开发者在编译时而不是运行时捕获错误。\n\n使用 TypeScript 的主要优势包括：更好的开发工具支持（如自动完成和重构工具）、更易于维护的代码，以及更好的团队协作。对于大型项目或团队协作，TypeScript 可以显著提高开发效率和代码质量。",
    created_at: "2025-03-05T14:30:00Z"
  },
  {
    id: 3,
    title: "使用 Tailwind CSS 快速构建美观的用户界面",
    content: "Tailwind CSS 是一个功能类优先的 CSS 框架，它提供了大量的工具类，使你可以快速构建自定义用户界面，而无需编写自定义 CSS。本文将介绍 Tailwind CSS 的基本用法和优势...\n\nTailwind CSS 与传统的 CSS 框架（如 Bootstrap）不同，它不提供预设的组件，而是提供了大量的原子类，你可以直接在 HTML 中使用这些类来构建界面。这种方法使得你可以更加灵活地设计界面，而不必受到框架预设组件的限制。\n\n使用 Tailwind CSS 的主要优势包括：更快的开发速度、更小的 CSS 文件大小（因为你只包含你使用的类）、以及更一致的设计系统。对于需要快速构建原型或自定义界面的项目，Tailwind CSS 是一个非常好的选择。",
    created_at: "2025-02-28T09:15:00Z"
  }
];

export async function GET() {
  try {
    // 尝试从 Flask 后端获取数据
    const response = await fetch(`${FLASK_API_URL}/api/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // 增加超时时间，给后端更多响应时间
      signal: AbortSignal.timeout(5000), // 5 秒超时
    });
    
    if (!response.ok) {
      console.log(`无法从后端获取数据: ${response.status}`);
      return NextResponse.json({ posts: mockPosts }, { status: 200 });
    }
    
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('获取文章列表失败:', error);
    // 使用模拟数据作为后备
    return NextResponse.json({ posts: mockPosts }, { status: 200 });
  }
}
