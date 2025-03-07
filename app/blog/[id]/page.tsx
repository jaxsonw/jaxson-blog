interface BlogProps {
    params: { id: string };
  }
  
  export default function BlogPost({ params }: BlogProps) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">博客文章 {params.id}</h1>
        <p className="mt-4 text-gray-600">这里是 ID 为 {params.id} 的博客文章详情。</p>
      </main>
    );
  }
  