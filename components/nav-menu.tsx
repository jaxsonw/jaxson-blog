"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { SearchBar } from "./search"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"

export function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  // 关闭菜单当点击外部
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest(".mobile-menu-container")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMenuOpen])

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 左侧品牌和导航链接 */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="font-bold text-xl text-foreground hover:text-foreground/80 transition-colors">
              Jaxson
            </Link>
            
            {/* 桌面导航链接 */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors">
                首页
              </Link>
              <Link href="/blog" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors">
                博客
              </Link>
              
              {/* 分类下拉菜单 */}
              <div className="relative">
                <button
                  className="flex items-center text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  分类
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-md bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-200 dark:border-gray-700">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link href="/blog?category=技术" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                        技术文章
                      </Link>
                      <Link href="/blog?category=教程" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                        教程指南
                      </Link>
                      <Link href="/blog?category=前端" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                        前端开发
                      </Link>
                      <Link href="/blog?category=后端" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                        后端开发
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/about" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors">
                关于
              </Link>
              <Link href="/contact" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors">
                联系
              </Link>
            </div>
          </div>
          
          {/* 右侧搜索和主题切换 */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            
            {/* 主题切换按钮 */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            
            {/* 移动端菜单按钮 */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">打开主菜单</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden mobile-menu-container border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background">
            <Link href="/" className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground">
              首页
            </Link>
            <Link href="/blog" className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground">
              博客
            </Link>
            
            {/* 移动端分类下拉 */}
            <button
              className="flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              分类
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="pl-4 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 mt-1">
                <Link href="/blog?category=技术" className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-700">
                  技术文章
                </Link>
                <Link href="/blog?category=教程" className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-700">
                  教程指南
                </Link>
                <Link href="/blog?category=前端" className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-700">
                  前端开发
                </Link>
                <Link href="/blog?category=后端" className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-700">
                  后端开发
                </Link>
              </div>
            )}
            
            <Link href="/about" className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground">
              关于
            </Link>
            <Link href="/contact" className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground">
              联系
            </Link>
            
            {/* 移动端搜索 */}
            <div className="px-3 py-2">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
