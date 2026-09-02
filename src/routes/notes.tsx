import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { CardSkeleton, EmptyState, NoteCard } from "@/components/content-cards";
import { notesQuery } from "@/lib/content";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "சிறு குறிப்புகள் — பட்டாம்பூச்சி" },
      {
        name: "description",
        content: "பட்டாம்பூச்சிகள் பற்றிய சுவாரஸ்யமான சிறு தகவல்கள் தமிழில்.",
      },
      { property: "og:title", content: "சிறு குறிப்புகள் — பட்டாம்பூச்சி" },
      {
        property: "og:description",
        content: "பட்டாம்பூச்சிகள் பற்றிய குறுகிய அறிவியல் குறிப்புகள்.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const { data, isLoading } = useQuery(notesQuery());

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
        சிறு குறிப்புகள்
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        ஒரு நிமிடத்தில் படிக்கக்கூடிய, ஆனால் நீண்ட நாள் நினைவில் நிற்கும் தகவல்கள்.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && <CardSkeleton count={3} />}
        {data?.map((note) => <NoteCard key={note.id} note={note} />)}
      </div>

      {!isLoading && (data ?? []).length === 0 && (
        <div className="mt-10">
          <EmptyState text="குறிப்புகள் எதுவும் இல்லை." />
        </div>
      )}
    </div>
  );
}
