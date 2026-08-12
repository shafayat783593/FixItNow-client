"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { IBlogPost } from "@/lib/api/blog";
import { createBlogPostAction, updateBlogPostAction } from "@/lib/api/blogAdmin";
import { blogPostSchema } from "@/lib/validations/block";
import { SingleImageUploader } from "@/hooks/Singleimageuploader";

interface BlogPostFormProps {
  mode: "create" | "edit";
  post?: IBlogPost;
}

export function BlogPostForm({ mode, post }: BlogPostFormProps) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [published, setPublished] = useState(post?.published ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const parsed = blogPostSchema.safeParse({ title, excerpt, content, coverImage, published });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...parsed.data,
        coverImage: parsed.data.coverImage || undefined,
      };

      const res = isEdit
        ? await updateBlogPostAction(post!.id, payload)
        : await createBlogPostAction(payload);

      if (res?.success === false) {
        toast.error(res.message ?? "Could not save post.");
        return;
      }

      toast.success(isEdit ? "Post updated" : "Post created");
      router.push("/dashboard/admin/blog");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Title
        </label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. 5 signs your AC needs servicing" />
        {errors.title && <p className="mt-1 text-[12px] text-destructive">{errors.title}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Cover image (optional)
        </label>
        <SingleImageUploader
          value={coverImage}
          onChange={(url) => setCoverImage(url)}
          folder="blog"
        />
        {errors.coverImage && <p className="mt-1 text-[12px] text-destructive">{errors.coverImage}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Excerpt
        </label>
        <Textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="A one to two sentence summary shown on the listing card"
        />
        {errors.excerpt && <p className="mt-1 text-[12px] text-destructive">{errors.excerpt}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Content
        </label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={14}
          placeholder="Write the full article here..."
        />
        {errors.content && <p className="mt-1 text-[12px] text-destructive">{errors.content}</p>}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Published</p>
          <p className="text-[12px] text-muted-foreground">
            Draft posts are hidden from the public blog.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={published}
          onClick={() => setPublished((p) => !p)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
            published ? "bg-accent" : "bg-muted"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              published ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? "Save changes" : "Create post"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/admin/blog")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}