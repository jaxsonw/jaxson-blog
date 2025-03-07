import Link from "next/link";

const posts = [
  { id: "1", title: "AI 发展趋势" },
  { id: "2", title: "如何使用 Next.js 搭建博客" },
];

export default function Blog() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">博客文章</h1>
      <ul className="mt-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
