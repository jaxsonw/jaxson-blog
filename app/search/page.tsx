import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "搜索结果 | Jaxson的博客",
  description: "搜索Jaxson博客中的文章",
}

async function getSearchResults(query: string) {
  try {
    // 这里应该是实际的API调用，目前使用模拟数据
    // const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/api/search?q=${query}`)
    // if (!res.ok) return []
    // return await res.json()
    
    // 模拟数据，实际应用中应替换为真实API调用
    return [
      {
        id: "1",
        title: "Tailwind CSS 入门与实践指南",
        description: "Tailwind CSS 是一个功能类优先的 CSS 框架，它提供了一系列工具，你可以快速构建自定义用户界面，本文将介绍 Tailwind CSS 的基本用法和实际应用...",
        date: "2025-02-15T21:10:00",
        category: "前端开发",
        readingTime: "5 分钟"
      },
      {
        id: "2",
        title: "Next.js 与 Flask 构建全栈应用",
        description: "将 Flask 作为后端 API，Next.js 作为前端框架，可以构建出功能丰富、性能优异的全栈应用程序，本文将介绍如何搭建这样的开发环境...",
        date: "2025-02-20T17:30:00",
        category: "全栈开发",
        readingTime: "8 分钟"
      }
    ].filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) || 
      post.description.toLowerCase().includes(query.toLowerCase())
    )
  } catch (error) {
    console.error("搜索失败:", error)
    return []
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""
  
  if (!query) {
    notFound()
  }

  const results = await getSearchResults(query)

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            搜索结果
          </h1>
          <p className="text-xl text-muted-foreground">
            搜索 &quot;{query}&quot; 的结果，共找到 {results.length} 篇文章
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {results.length > 0 ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {results.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>•</span>
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="text-2xl font-bold">
                <Link href={`/blog/${post.id}`}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h2>
              <p className="line-clamp-3 text-muted-foreground">
                {post.description}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-center text-lg text-muted-foreground">
            没有找到与 &quot;{query}&quot; 相关的文章
          </p>
          <Link
            href="/"
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            返回首页
          </Link>
        </div>
      )}
    </div>
  )
}
