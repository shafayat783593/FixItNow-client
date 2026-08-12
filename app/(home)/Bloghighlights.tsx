import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/api/blog";
import { BlogCard } from "../(public)/_components/blog/Blogcard";

export default async function BlogHighlights() {
  const { data: posts } = await getAllBlogPosts({ limit: 3, sortBy: "createdAt", sortOrder: "desc" });

  if (!posts.length) return null;

  return (
    <section className="relative bg-background py-10 sm:py-18">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/70 px-3 py-1">
              <BookOpen size={13} className="text-accent" />
          
            </div>
            <h2
              className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Latest from our blog
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent-foreground"
          >
            View all articles
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
