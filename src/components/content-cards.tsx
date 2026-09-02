import { Link } from "@tanstack/react-router";
import { MapPin, CalendarDays } from "lucide-react";

import { tamilDate, type Article, type Note, type Photo } from "@/lib/content";

export function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <figure className="card-lift group overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={photo.image_url}
          alt={photo.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <figcaption className="space-y-1.5 p-5">
        <h3 className="font-display text-lg font-semibold text-foreground">{photo.title}</h3>
        {photo.caption && (
          <p className="text-sm text-muted-foreground">{photo.caption}</p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
          {photo.species && <span className="italic">{photo.species}</span>}
          {photo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {photo.location}
            </span>
          )}
          {photo.taken_on && (
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {tamilDate(photo.taken_on)}
            </span>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

export function NoteCard({ note }: { note: Note }) {
  return (
    <article className="card-lift overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
      {note.image_url && (
        <img
          src={note.image_url}
          alt={note.title}
          loading="lazy"
          className="h-48 w-full object-cover"
        />
      )}
      <div className="space-y-2 p-6">
        <h3 className="font-display text-lg font-semibold text-foreground">{note.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{note.body}</p>
        <p className="pt-1 text-xs text-muted-foreground/80">{tamilDate(note.created_at)}</p>
      </div>
    </article>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: article.slug }}
      className="card-lift group block overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]"
    >
      {article.cover_url && (
        <div className="h-52 overflow-hidden">
          <img
            src={article.cover_url}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
      <div className="space-y-2 p-6">
        <p className="text-xs text-muted-foreground">{tamilDate(article.published_at)}</p>
        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
        )}
      </div>
    </Link>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-80 animate-pulse rounded-3xl bg-muted" />
      ))}
    </>
  );
}
