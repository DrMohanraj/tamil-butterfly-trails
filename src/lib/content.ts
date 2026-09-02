import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Photo = {
  id: string;
  title: string;
  caption: string | null;
  species: string | null;
  location: string | null;
  taken_on: string | null;
  image_url: string;
  published: boolean;
  created_at: string;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_url: string | null;
  published: boolean;
  published_at: string;
};

export const photosQuery = (limit?: number) =>
  queryOptions({
    queryKey: ["photos", limit ?? "all"],
    queryFn: async (): Promise<Photo[]> => {
      let q = supabase
        .from("photos")
        .select("*")
        .order("taken_on", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Photo[];
    },
  });

export const notesQuery = (limit?: number) =>
  queryOptions({
    queryKey: ["notes", limit ?? "all"],
    queryFn: async (): Promise<Note[]> => {
      let q = supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Note[];
    },
  });

export const articlesQuery = (limit?: number) =>
  queryOptions({
    queryKey: ["articles", limit ?? "all"],
    queryFn: async (): Promise<Article[]> => {
      let q = supabase
        .from("articles")
        .select("*")
        .order("published_at", { ascending: false });
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Article[];
    },
  });

export const articleQuery = (slug: string) =>
  queryOptions({
    queryKey: ["article", slug],
    queryFn: async (): Promise<Article | null> => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return (data as Article) ?? null;
    },
  });

export function tamilDate(value: string | null | undefined) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("ta-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
