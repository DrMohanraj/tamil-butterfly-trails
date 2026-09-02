import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { ArticleCard, CardSkeleton, EmptyState } from "@/components/content-cards";
import { articlesQuery } from "@/lib/content";

export const Route = createFileRoute("/articles/")({
  head: () => ({
    meta: [
      { title: "கட்டுரைகள் — பட்டாம்பூச்சி" },
      {
        name: "description",
        content:
          "பட்டாம்பூச்சி இனங்கள், புகைப்படக் கலை, பாதுகாப்பு குறித்த ஆழமான தமிழ்க் கட்டுரைகள்.",
      },
      { property: "og:title", content: "கட்டுரைகள் — பட்டாம்பூச்சி" },
      {
        property: "og:description",
        content: "பட்டாம்பூச்சிகள் குறித்த ஆழமான தமிழ்க் கட்டுரைகள்.",
      },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const { data, isLoading } = useQuery(articlesQuery());

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
        கட்டுரைகள்
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        இனங்கள், வாழ்விடம், புகைப்படக் கலை, பாதுகாப்பு — விரிவான வாசிப்பு.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && <CardSkeleton count={3} />}
        {data?.map((article) => <ArticleCard key={article.id} article={article} />)}
      </div>

      {!isLoading && (data ?? []).length === 0 && (
        <div className="mt-10">
          <EmptyState text="கட்டுரைகள் எதுவும் இல்லை." />
        </div>
      )}
    </div>
  );
}
