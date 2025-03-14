"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // 处理搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsOpen(false)
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // 处理快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 检测 Command+K 或 Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      // 按 Escape 关闭搜索
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <>
      <button 
        className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-between text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setIsOpen(true)}
      >
        <span className="inline-flex">
          <Search className="mr-2 h-4 w-4" />
          搜索文章...
        </span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
          {/* 背景遮罩 - 增加不透明度 */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 搜索框 - 使用完全不透明的背景 */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-lg border bg-white dark:bg-gray-800 shadow-2xl animate-in fade-in-0 zoom-in-95">
            <form onSubmit={handleSearch} className="flex items-center border-b border-gray-200 dark:border-gray-700 px-3">
              <Search className="mr-2 h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="搜索文章..."
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </form>
            
            <div className="max-h-[300px] overflow-y-auto p-2">
              {searchQuery.trim() && (
                <div className="p-4 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                  按回车键搜索 &quot;{searchQuery}&quot;
                </div>
              )}
              {!searchQuery.trim() && (
                <div className="p-4 text-center text-sm text-gray-600 dark:text-gray-300">
                  输入关键词开始搜索...
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>按 ESC 关闭</span>
                <span>按 ↵ 搜索</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
