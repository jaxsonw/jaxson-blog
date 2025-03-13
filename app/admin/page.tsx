'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // 获取API URL
  const apiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://localhost:5001';
  console.log('Using API URL:', apiUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!title.trim() || !content.trim()) {
      setError('标题和内容不能为空');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      setMessage('');

      // 发送POST请求创建新文章
      const response = await fetch(`${apiUrl}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '提交文章失败');
      }

      // 成功提交
      setMessage('文章发布成功！');
      setTitle('');
      setContent('');
      
      // 3秒后刷新页面
      setTimeout(() => {
        router.refresh();
      }, 3000);
    } catch (err: any) {
      setError(err.message || '提交文章时发生错误');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">管理后台 - 发布新文章</h1>
      
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          返回首页
        </Link>
      </div>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            文章标题
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="输入文章标题"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            文章内容
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={15}
            placeholder="输入文章内容（支持Markdown格式）"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? '发布中...' : '发布文章'}
          </button>
        </div>
      </form>

      <div className="text-sm text-gray-500 mt-8">
        <p>提示：</p>
        <ul className="list-disc pl-5 mt-2">
          <li>文章内容支持Markdown格式</li>
          <li>发布后的文章将立即显示在博客首页</li>
        </ul>
      </div>
    </div>
  );
}
