import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, User } from "lucide-react";
import { IBlogPost } from "@/lib/api/blog";

export function BlogCard({ post }: { post: IBlogPost }) {
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl">
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <span className="text-xs font-semibold">No image</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} />
              {date}
            </span>
            <span className="inline-flex items-center gap-1">
              <User size={12} />
              {post.author?.name ?? "FixItNow Team"}
            </span>
          </div>

          <h3 className="mt-3 line-clamp-2 text-lg font-bold text-foreground transition-colors group-hover:text-accent">
            {post.title}
          </h3>

          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
          >
            <span>Read Article</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
