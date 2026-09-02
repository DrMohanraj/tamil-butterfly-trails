import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { articleQuery, tamilDate } from "@/lib/content";

export const Route = createFileRoute("/articles/$slug")({
  head: () => ({
    meta: [
      { title: "கட்டுரை — பட்டாம்பூச்சி" },
      {
        name: "description",
        content: "பட்டாம்பூச்சிகள் குறித்த விரிவான தமிழ்க் கட்டுரை.",
      },
      { property: "og:title", content: "கட்டுரை — பட்டாம்பூச்சி" },
      {
        property: "og:description",
        content: "பட்டாம்பூச்சிகள் குறித்த விரிவான தமிழ்க் கட்டுரை.",
      },
    ],
  }),
  component: ArticleDetail,
});

function ArticleDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery(articleQuery(slug));

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <div className="h-8 w-2/3 animate-pulse rounded-full bg-muted" />
        <div className="mt-8 h-64 animate-pulse rounded-3xl bg-muted" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">கட்டுரை கிடைக்கவில்லை</h1>
        <Link to="/articles" className="mt-6 inline-block text-sm text-primary">
          அனைத்துக் கட்டுரைகளும்
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 lg:px-0">
      <Link
        to="/articles"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> கட்டுரைகள்
      </Link>

      <h1 className="mt-6 font-display text-3xl leading-tight font-bold text-foreground sm:text-4xl">
        {data.title}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">{tamilDate(data.published_at)}</p>

      {data.cover_url && (
        <img
          src={data.cover_url}
          alt={data.title}
          className="mt-8 w-full rounded-3xl object-cover shadow-[var(--shadow-card)]"
        />
      )}

      {data.excerpt && (
        <p className="mt-8 border-l-2 border-primary/40 pl-5 font-display text-lg leading-relaxed text-foreground/85">
          {data.excerpt}
        </p>
      )}

      <div className="mt-8 space-y-5 text-base leading-[1.9] text-foreground/85">
        {data.content.split(/\n{2,}/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
