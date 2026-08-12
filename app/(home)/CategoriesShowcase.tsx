import Link from "next/link";
import {
  Wrench,
  Zap,
  Droplets,
  Paintbrush,
  Hammer,
  Sparkles,
  Wind,
  Bug,
  Leaf,
  Home,
  type LucideIcon,
} from "lucide-react";
import { getAllCategoriesAction } from "@/lib/api/admin.api";

interface ICategory {
  id: string;
  name: string;
  description?: string | null;
}

const ICON_RULES: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["electric"], icon: Zap },
  { keywords: ["plumb", "water", "pipe"], icon: Droplets },
  { keywords: ["paint"], icon: Paintbrush },
  { keywords: ["clean"], icon: Sparkles },
  { keywords: ["carpen", "wood", "furniture"], icon: Hammer },
  { keywords: ["ac", "air", "hvac", "cooling"], icon: Wind },
  { keywords: ["pest"], icon: Bug },
  { keywords: ["garden", "lawn", "landscap"], icon: Leaf },
  { keywords: ["home", "house"], icon: Home },
];

const iconFor = (name: string): LucideIcon => {
  const lower = name.toLowerCase();
  const match = ICON_RULES.find((rule) => rule.keywords.some((k) => lower.includes(k)));
  return match?.icon ?? Wrench;
};

export default async function CategoriesShowcase() {
  const categories: ICategory[] = (await getAllCategoriesAction({ limit: 8 })) ?? [];
  if (!categories.length) return null;

  return (
    <section className="relative overflow-hidden bg-background py-10 sm:py-18">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/70 px-3 py-1">
           
          </div>
          <h2
            className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            What do you need fixed today?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Every category is staffed by vetted, background-checked professionals.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = iconFor(cat.name);
            return (
              <Link
                key={cat.id}
                href={`/services?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon size={22} />
                </div>
                <span className="text-sm font-bold text-foreground">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
