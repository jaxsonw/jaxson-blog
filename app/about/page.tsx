"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function About() {
  const [activeTab, setActiveTab] = useState('about');
  
  const skills = [
    { name: 'React', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Python', level: 70 },
    { name: 'AI & 机器学习', level: 65 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-4xl mx-auto py-12 px-6">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            <span className="mr-1">←</span> 返回首页
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:shrink-0 p-6 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="text-center">
                <div className="w-48 h-48 rounded-full bg-white dark:bg-gray-700 mx-auto mb-4 overflow-hidden relative">
                  {/* 头像图片 */}
                  <Image 
                    src="/images/WechatIMG1618.jpg" 
                    alt="Jaxson Wang" 
                    fill
                    sizes="(max-width: 768px) 100vw, 192px"
                    className="object-cover"
                    priority
                    // 如果图片加载失败，显示占位符
                    onError={(e) => {
                      // 类型转换为HTMLImageElement
                      const target = e.target as HTMLImageElement;
                      // 显示占位符
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-300';
                        placeholder.innerText = 'JW';
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-white">Jaxson Wang</h2>
                <p className="text-blue-100 mt-1">前端开发工程师 & AI 爱好者</p>
              </div>
            </div>
            
            <div className="p-8 md:p-10 flex-1">
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`pb-4 px-1 ${
                      activeTab === 'about'
                        ? 'border-b-2 border-blue-500 font-medium text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    关于我
                  </button>
                  <button
                    onClick={() => setActiveTab('experience')}
                    className={`pb-4 px-1 ${
                      activeTab === 'experience'
                        ? 'border-b-2 border-blue-500 font-medium text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    经历
                  </button>
                  <button
                    onClick={() => setActiveTab('skills')}
                    className={`pb-4 px-1 ${
                      activeTab === 'skills'
                        ? 'border-b-2 border-blue-500 font-medium text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    技能
                  </button>
                </nav>
              </div>
              
              {activeTab === 'about' && (
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">关于我的博客</h1>
                  <p>
                    欢迎来到我的个人博客！我是 Jaxson Wang，一名热爱技术和创新的前端开发工程师。
                  </p>
                  <p>
                    这个博客是我分享技术见解、学习心得和行业动态的平台。我专注于 Web 开发、人工智能和新兴技术领域，
                    希望通过我的文章帮助更多的开发者解决问题，提升技能。
                  </p>
                  <p>
                    在这里，你可以找到关于 React、Next.js、TypeScript 等前端技术的深度教程，
                    以及 AI 和机器学习在 Web 开发中的应用案例。我也会分享我在项目开发过程中遇到的挑战和解决方案，
                    以及对技术趋势的思考和见解。
                  </p>
                  <p>
                    感谢你的访问！如果你有任何问题或建议，欢迎通过"联系我"页面与我交流。
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">我的博客特色</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <h4 className="font-medium text-blue-700 dark:text-blue-300">深度技术文章</h4>
                        <p className="mt-1 text-sm">提供详细的教程和最佳实践，帮助你掌握前沿技术</p>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                        <h4 className="font-medium text-purple-700 dark:text-purple-300">AI 与前端结合</h4>
                        <p className="mt-1 text-sm">探索人工智能在现代 Web 开发中的创新应用</p>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <h4 className="font-medium text-green-700 dark:text-green-300">项目实战分享</h4>
                        <p className="mt-1 text-sm">从实际项目中提炼经验，分享开发过程中的挑战与解决方案</p>
                      </div>
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                        <h4 className="font-medium text-yellow-700 dark:text-yellow-300">技术趋势分析</h4>
                        <p className="mt-1 text-sm">关注行业动态，分析技术发展趋势，助你把握未来方向</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'experience' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">我的经历</h2>
                  
                  <div className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                    <div className="mb-1">
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">2023 - 至今</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">高级前端开发工程师</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">科技创新公司</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      负责公司核心产品的前端架构设计和开发，使用 React、Next.js 和 TypeScript 构建高性能、可扩展的 Web 应用。
                      引入了现代化的开发流程和工具，提升了团队的开发效率和代码质量。
                    </p>
                  </div>
                  
                  <div className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                    <div className="mb-1">
                      <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">2020 - 2023</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">前端开发工程师</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">互联网科技公司</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      参与多个大型 Web 应用的开发，负责用户界面设计和实现。
                      使用 Vue.js 和 React 开发响应式网站，优化前端性能，提升用户体验。
                    </p>
                  </div>
                  
                  <div className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-green-500"></div>
                    <div className="mb-1">
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">2018 - 2020</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Web 开发实习生</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">初创科技公司</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      参与公司官网和内部管理系统的开发，学习并实践前端开发技术和最佳实践。
                      通过实际项目积累了丰富的开发经验。
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'skills' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">技术技能</h2>
                  
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.name} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                          <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">其他专长</h3>
                    <div className="flex flex-wrap gap-2">
                      {['UI/UX 设计', '响应式设计', 'SEO 优化', '性能优化', 'Git 版本控制', 'CI/CD', '敏捷开发', '技术文档'].map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}