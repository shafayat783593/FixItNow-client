import { BlogPostForm } from "../../../_components/admin/block/Blogpostform ";

export default function NewBlogPostPage() {
  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin</p>
        <h1
          className="mt-1 text-2xl font-bold text-foreground"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          New blog post
        </h1>

        <div className="mt-8">
          <BlogPostForm mode="create" />
        </div>
      </div>
    </main>
  );
}