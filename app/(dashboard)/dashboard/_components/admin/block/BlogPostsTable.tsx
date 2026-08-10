import Link from "next/link";
import { Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBlogPost } from "@/lib/api/blog";
import { DeleteBlogPostButton } from "./Deleteblogpostbutton ";

export function BlogPostsTable({ posts }: { posts: IBlogPost[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Title</TableHead>
            <TableHead className="hidden sm:table-cell">Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="max-w-[220px] truncate font-medium text-foreground">
                {post.title}
              </TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">
                {post.author?.name ?? "—"}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    post.published
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {new Date(post.createdAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/dashboard/admin/blog/${post.id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[12px] font-semibold text-foreground transition hover:bg-muted"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Link>
                  <DeleteBlogPostButton id={post.id} title={post.title} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}