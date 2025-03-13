import { NextResponse } from 'next/server';

// Flask 后端 API URL
const FLASK_API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://localhost:5001';
console.log('Using Flask API URL for post details:', FLASK_API_URL);

// 备用模拟数据，仅在无法连接到 Flask 后端时使用
const mockPosts = [
  {
    id: 1,
    title: "Next.js 14 新特性详解",
    content: "Next.js 14 带来了许多令人兴奋的新特性，包括改进的服务器组件、更快的构建时间和更好的开发体验。本文将详细介绍这些新特性，并展示如何在你的项目中充分利用它们...\n\n在 Next.js 14 中，服务器组件得到了进一步优化，使得应用程序的首次加载性能更好。此外，构建时间也有了显著改善，特别是对于大型项目。新的开发工具和调试功能也使得开发过程更加顺畅。\n\n本文将深入探讨这些新特性，并提供实际的代码示例，帮助你在自己的项目中充分利用 Next.js 14 的强大功能。无论你是 Next.js 的新手还是有经验的开发者，这些新特性都将帮助你构建更好的 Web 应用程序。",
    created_at: "2025-03-12T15:30:00Z",
    category: "前端开发"
  },
  {
    id: 2,
    title: "如何使用 React 和 Next.js 构建现代网站",
    content: "React 是一个用于构建用户界面的 JavaScript 库，而 Next.js 是一个基于 React 的框架，它提供了许多开箱即用的功能，如服务器端渲染、静态站点生成、路由等。本文将介绍如何使用 React 和 Next.js 构建现代网站...\n\n在当今快速发展的网络世界中，用户对网站的期望越来越高。他们希望网站能够快速加载、响应迅速，并提供流畅的用户体验。React 和 Next.js 的组合可以帮助开发者满足这些期望。\n\nReact 的组件化设计使得代码更易于维护和重用，而 Next.js 则通过提供服务器端渲染和静态站点生成等功能，解决了传统单页应用的一些问题，如首次加载速度慢和搜索引擎优化困难等。",
    created_at: "2025-03-10T10:00:00Z",
    category: "前端开发"
  },
  {
    id: 3,
    title: "TypeScript 入门指南",
    content: "TypeScript 是 JavaScript 的超集，它添加了静态类型和其他功能，使开发大型应用程序变得更加容易。本文将介绍 TypeScript 的基本概念和用法，帮助你快速入门...\n\nTypeScript 由微软开发，它是 JavaScript 的超集，这意味着所有有效的 JavaScript 代码也是有效的 TypeScript 代码。TypeScript 添加了静态类型检查，这可以帮助开发者在编译时而不是运行时捕获错误。\n\n使用 TypeScript 的主要优势包括：更好的开发工具支持（如自动完成和重构工具）、更易于维护的代码，以及更好的团队协作。对于大型项目或团队协作，TypeScript 可以显著提高开发效率和代码质量。",
    created_at: "2025-03-05T14:30:00Z",
    category: "编程语言"
  },
  {
    id: 4,
    title: "使用 Tailwind CSS 快速构建美观的用户界面",
    content: "Tailwind CSS 是一个功能类优先的 CSS 框架，它提供了大量的工具类，使你可以快速构建自定义用户界面，而无需编写自定义 CSS。本文将介绍 Tailwind CSS 的基本用法和优势...\n\nTailwind CSS 与传统的 CSS 框架（如 Bootstrap）不同，它不提供预设的组件，而是提供了大量的原子类，你可以直接在 HTML 中使用这些类来构建界面。这种方法使得你可以更加灵活地设计界面，而不必受到框架预设组件的限制。\n\n使用 Tailwind CSS 的主要优势包括：更快的开发速度、更小的 CSS 文件大小（因为你只包含你使用的类）、以及更一致的设计系统。对于需要快速构建原型或自定义界面的项目，Tailwind CSS 是一个非常好的选择。",
    created_at: "2025-02-28T09:15:00Z",
    category: "CSS"
  },
  {
    id: 5,
    title: "Flask 与 Next.js 构建全栈应用",
    content: "将 Flask 作为后端 API，Next.js 作为前端框架，可以构建出功能强大、性能优异的全栈应用。本文将介绍如何设置项目结构、处理跨域请求、实现数据交互等关键步骤...\n\n全栈开发需要同时掌握前端和后端技术。使用 Flask 作为后端 API 提供者，Next.js 作为前端框架，可以充分发挥两者的优势，构建出既有良好用户体验又有强大功能的 Web 应用。\n\n本文将详细介绍如何设置项目结构，包括如何组织前端和后端代码，如何处理跨域请求，以及如何实现前后端数据交互。此外，还将讨论部署策略，帮助你将应用部署到生产环境。",
    created_at: "2025-02-25T11:20:00Z",
    category: "全栈开发"
  },
  {
    id: 6,
    title: "JavaScript 异步编程详解",
    content: "异步编程是 JavaScript 中的重要概念，理解 Promise、async/await 和事件循环对于编写高效的 JavaScript 代码至关重要。本文将深入探讨这些概念，并提供实用的代码示例...\n\nJavaScript 是单线程的，但它可以通过异步编程处理并发操作。理解异步编程对于构建响应迅速的 Web 应用至关重要。\n\n本文将深入探讨 JavaScript 中的异步编程概念，包括回调函数、Promise、async/await 以及事件循环。通过实际的代码示例，你将学习如何有效地使用这些工具来处理异步操作，如网络请求、文件操作和定时器。",
    created_at: "2025-02-20T16:45:00Z",
    category: "编程语言"
  },
  {
    id: 7,
    title: "CSS Grid 布局完全指南",
    content: "CSS Grid 是一种强大的二维布局系统，它使得创建复杂的网页布局变得简单。本文将从基础到高级，全面介绍 CSS Grid 的用法和技巧，帮助你掌握这一强大的布局工具...\n\nCSS Grid 布局是一种二维布局系统，它允许你同时控制行和列，使得创建复杂的网页布局变得更加简单和直观。\n\n本文将从基础概念开始，介绍 CSS Grid 的核心属性和值，然后逐步深入到更高级的用法和技巧。你将学习如何创建响应式网格布局，如何处理网格项的对齐和定位，以及如何结合其他 CSS 技术创建更复杂的布局。",
    created_at: "2025-02-15T13:10:00Z",
    category: "CSS"
  },
  {
    id: 8,
    title: "MongoDB 数据库入门与实践",
    content: "MongoDB 是一种流行的 NoSQL 数据库，它的灵活性和可扩展性使其成为现代 Web 应用的理想选择。本文将介绍 MongoDB 的基本概念、安装配置、CRUD 操作以及与 Node.js 的集成...\n\nMongoDB 是一种文档型数据库，它以 JSON 格式存储数据，使得数据结构更加灵活，非常适合存储半结构化或非结构化的数据。\n\n本文将介绍 MongoDB 的基本概念，如文档、集合和数据库，然后讲解如何安装和配置 MongoDB。接着，你将学习如何执行基本的 CRUD（创建、读取、更新、删除）操作，以及如何使用 MongoDB 的高级功能，如索引、聚合和事务。最后，我们将讨论如何将 MongoDB 与 Node.js 集成，构建完整的 Web 应用。",
    created_at: "2025-02-10T09:30:00Z",
    category: "数据库"
  },
  {
    id: 9,
    title: "Node.js 性能优化策略",
    content: "随着应用规模的增长，Node.js 应用的性能优化变得尤为重要。本文将分享一系列实用的性能优化策略，包括代码优化、内存管理、集群部署和监控工具的使用...\n\nNode.js 以其高性能和非阻塞 I/O 模型而闻名，但随着应用规模的增长，性能问题可能会逐渐显现。优化 Node.js 应用的性能需要综合考虑多个方面。\n\n本文将分享一系列实用的性能优化策略，包括代码层面的优化（如使用异步操作、避免阻塞主线程）、内存管理（如处理内存泄漏、优化垃圾回收）、集群部署（利用多核 CPU）以及监控工具的使用（如 New Relic、PM2）。通过这些策略，你可以显著提升 Node.js 应用的性能和可靠性。",
    created_at: "2025-02-05T14:20:00Z",
    category: "后端开发"
  },
  {
    id: 10,
    title: "Git 工作流与团队协作最佳实践",
    content: "在团队开发中，合理的 Git 工作流对于提高效率和减少冲突至关重要。本文将介绍几种常见的 Git 工作流模型，以及团队协作的最佳实践和常见问题的解决方案...\n\nGit 是现代软件开发中不可或缺的版本控制工具，而合理的 Git 工作流则是团队协作的基础。\n\n本文将介绍几种常见的 Git 工作流模型，如 Git Flow、GitHub Flow 和 GitLab Flow，分析它们的优缺点和适用场景。然后，我们将讨论团队协作的最佳实践，包括如何编写有意义的提交信息、如何进行代码审查、如何处理合并冲突等。最后，我们将分享一些常见问题的解决方案和工具推荐。",
    created_at: "2025-01-30T10:45:00Z",
    category: "开发工具"
  },
  {
    id: 11,
    title: "React Hooks 深入理解与实践",
    content: "React Hooks 是 React 16.8 引入的新特性，它使得在函数组件中使用状态和其他 React 特性成为可能。本文将深入探讨 useState、useEffect、useContext 等常用 Hooks 的原理和使用场景...\n\nReact Hooks 的引入彻底改变了 React 组件的编写方式，使得函数组件可以拥有与类组件相同的能力，同时代码更加简洁和易于理解。\n\n本文将深入探讨 React Hooks 的工作原理，详细介绍 useState、useEffect、useContext、useReducer、useMemo、useCallback 等常用 Hooks 的用法和使用场景。通过实际的代码示例，你将学习如何使用 Hooks 管理组件状态、处理副作用、优化性能，以及如何创建自定义 Hooks 来复用逻辑。",
    created_at: "2025-01-25T16:30:00Z",
    category: "前端开发"
  },
  {
    id: 12,
    title: "Docker 容器化应用部署指南",
    content: "Docker 使得应用的打包、分发和部署变得简单高效。本文将介绍 Docker 的基本概念、常用命令、Dockerfile 编写以及多容器应用的编排与部署...\n\nDocker 通过容器化技术，解决了「在我的机器上能运行」的问题，使得应用可以在任何环境中一致地运行。\n\n本文将介绍 Docker 的基本概念，如镜像、容器和仓库，然后讲解常用的 Docker 命令和 Dockerfile 的编写方法。接着，你将学习如何使用 Docker Compose 编排多容器应用，以及如何将 Docker 应用部署到生产环境。最后，我们将讨论 Docker 的最佳实践和常见问题的解决方案。",
    created_at: "2025-01-20T11:15:00Z",
    category: "DevOps"
  }
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // 尝试从 Flask 后端获取数据
    try {
      const response = await fetch(`${FLASK_API_URL}/api/posts/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // 增加超时时间，给后端更多响应时间
        signal: AbortSignal.timeout(10000), // 10 秒超时
      });
      
      if (!response.ok) {
        console.error(`无法从后端获取文章详情: ${response.status}`);
        throw new Error(`Flask API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } catch (flaskError) {
      console.error('Error fetching post from Flask backend:', flaskError);
      console.log('Falling back to mock data');
      
      // 如果无法从 Flask 获取数据，使用模拟数据
      const post = mockPosts.find(p => p.id === id);
      
      if (!post) {
        return NextResponse.json(
          { error: '文章未找到' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(post, { status: 200 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: '获取文章详情失败' },
      { status: 500 }
    );
  }
}
