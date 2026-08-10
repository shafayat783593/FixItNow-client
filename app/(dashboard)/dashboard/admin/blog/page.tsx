import Link from "next/link";
import { Newspaper, Plus } from "lucide-react";
import { UniversalSearchBar } from "@/components/shared/UniversalSearchBar";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/app/(public)/_components/pagenation";
import { getAllBlogPostsAdminAction } from "@/lib/api/blogAdmin";
import { BlogPostsTable } from "../../_components/admin/block/BlogPostsTable";


interface BlogAdminSearchParams {
  searchItem?: string;
  page?: string;
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<BlogAdminSearchParams>;
}) {
  const resolved = await searchParams;
  const { data: posts, meta } = await getAllBlogPostsAdminAction({
    ...resolved,
    limit: 10,
  });

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin</p>
            <h1
              className="mt-1 text-2xl font-bold text-foreground"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Blog management
            </h1>
          </div>
          <Button asChild>
            <Link href="/dashboard/admin/blog/new">
              <Plus className="mr-1.5 h-4 w-4" /> New post
            </Link>
          </Button>
        </div>

        <div className="mt-6">
          <UniversalSearchBar />
        </div>

        {posts.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
            <Newspaper className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">No blog posts yet.</p>
          </div>
        ) : (
          <div className="mt-6">
            <BlogPostsTable posts={posts} />
          </div>
        )}

        <Pagination meta={meta} />
      </div>
    </main>
  );
}