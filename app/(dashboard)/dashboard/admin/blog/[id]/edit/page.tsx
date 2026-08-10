import { notFound } from "next/navigation";
import { BlogPostForm } from "../../../../_components/admin/block/Blogpostform ";
import { getBlogPostByIdAdminAction } from "@/lib/api/blogAdmin";


export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostByIdAdminAction(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin</p>
        <h1
          className="mt-1 text-2xl font-bold text-foreground"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Edit blog post
        </h1>

        <div className="mt-8">
          <BlogPostForm mode="edit" post={post} />
        </div>
      </div>
    </main>
  );
}