import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { CardSkeleton, EmptyState, PhotoCard } from "@/components/content-cards";
import { photosQuery } from "@/lib/content";

export const Route = createFileRoute("/photos")({
  head: () => ({
    meta: [
      { title: "புகைப்படங்கள் — பட்டாம்பூச்சி" },
      {
        name: "description",
        content:
          "தமிழ்நாட்டின் பட்டாம்பூச்சி இனங்களின் புகைப்படத் தொகுப்பு — இனம், இடம், நாள் விவரங்களுடன்.",
      },
      { property: "og:title", content: "புகைப்படங்கள் — பட்டாம்பூச்சி" },
      {
        property: "og:description",
        content: "பட்டாம்பூச்சி புகைப்படத் தொகுப்பு.",
      },
    ],
  }),
  component: PhotosPage,
});

function PhotosPage() {
  const { data, isLoading } = useQuery(photosQuery());
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return data ?? [];
    return (data ?? []).filter((p) =>
      [p.title, p.caption, p.species, p.location]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(term)),
    );
  }, [data, q]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            புகைப்படத் தொகுப்பு
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            ஒவ்வொரு படமும் ஒரு தருணத்தின் நினைவு — இனம், இடம், நாள் விவரங்களுடன்.
          </p>
        </div>
        <label className="flex items-center gap-2 rounded-full bg-card px-4 py-2.5 shadow-[var(--shadow-soft)]">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="இனம் அல்லது இடம் தேடுங்கள்"
            className="w-52 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && <CardSkeleton count={6} />}
        {filtered.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>

      {!isLoading && filtered.length === 0 && (
        <div className="mt-10">
          <EmptyState text="புகைப்படங்கள் எதுவும் இல்லை." />
        </div>
      )}
    </div>
  );
}
