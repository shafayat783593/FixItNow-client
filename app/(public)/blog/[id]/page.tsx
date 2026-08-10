import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/api/blog";
import { BlogCard } from "../../_components/blog/Blogcard";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

const readingTime = (content: string) => {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { data: relatedRaw } = await getAllBlogPosts({ limit: 4 });
  const related = relatedRaw.filter((p) => p.slug !== post.slug).slice(0, 3);

  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-background py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} />
          <span>Back to Journal</span>
        </Link>

        {post.coverImage && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-3xl border border-border sm:h-96">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {/* Key info / meta section */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              {date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User size={14} />
              {post.author?.name ?? "FixItNow Team"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              {readingTime(post.content)} min read
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">{post.title}</h1>

          <p className="mt-4 text-base font-medium leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          {/* Overview / body content */}
          <div className="mt-6 border-t border-border pt-6">
            <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">
              {post.content}
            </p>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-foreground">Related Articles</h2>
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}