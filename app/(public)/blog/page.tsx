import React, { Suspense } from "react";
import { BookOpen, Sparkles } from "lucide-react";

import { UniversalSearchBar } from "../../../components/shared/UniversalSearchBar";
import { Pagination } from "../_components/pagenation";

import { getAllBlogPosts } from "@/lib/api/blog";
import { BlogGridSkeleton } from "../_components/blog/Blogskeleton";
import { BlogCard } from "../_components/blog/Blogcard";

export default async function BlogPage({ searchParams,}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const page = query?.page ? Number(query.page) : 1;
  const searchItem = typeof query?.searchItem === "string" ? query.searchItem : undefined;

  const res = await getAllBlogPosts({ searchItem, page, limit: 9 });

  const posts = res?.data || [];
  const meta = res?.meta || { page, limit: 9, total: posts.length, totalPages: 1 };

  return (
    <main className="min-h-screen bg-background py-10 sm:py-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 shadow-sm">
            <BookOpen size={15} className="text-amber-700" />
            <span
              className="text-xs font-bold uppercase tracking-wider text-amber-800"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              FixItNow Journal
            </span>
          </div>

          <h1
            className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Tips, Guides & Updates
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Home maintenance advice, platform updates, and stories from our verified technicians.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <UniversalSearchBar placeholder="Search articles..." />
        </div>

        <div className="mt-3 flex items-center justify-center px-2 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-500" />
            <span>
              Showing <strong className="text-foreground">{posts.length}</strong> of{" "}
              <strong className="text-foreground">{meta.total || posts.length}</strong> articles
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Suspense fallback={<BlogGridSkeleton/>}>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <BookOpen size={24} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">No articles yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Check back soon — we&apos;re working on our first posts.
                </p>
              </div>
            )}
          </Suspense>

          <Pagination meta={meta} />
        </div>
      </div>
    </main>
  );
}
