import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Trash2, LogOut, Plus } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { articlesQuery, notesQuery, photosQuery, tamilDate } from "@/lib/content";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "உள்ளடக்க நிர்வாகம் — பட்டாம்பூச்சி" },
      {
        name: "description",
        content: "புகைப்படங்கள், குறிப்புகள், கட்டுரைகளைச் சேர்க்கும் நிர்வாகப் பக்கம்.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "உள்ளடக்க நிர்வாகம் — பட்டாம்பூச்சி" },
      { property: "og:description", content: "நிர்வாகப் பக்கம்." },
    ],
  }),
  component: AdminPage,
});

const input =
  "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary";
const labelCls = "block text-sm text-muted-foreground";
const btn =
  "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60";

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(Boolean(data)));
  }, [session]);

  if (!ready) {
    return <div className="mx-auto max-w-md px-5 py-24 text-center text-sm text-muted-foreground">ஏற்றுகிறது…</div>;
  }

  if (!session) return <SignIn />;

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-bold">உள்ளடக்க நிர்வாகம்</h1>
          <p className="truncate text-sm text-muted-foreground">{session.user.email}</p>
        </div>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            toast.success("வெளியேறிவிட்டீர்கள்");
          }}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-input px-4 py-2 text-sm"
        >
          <LogOut className="h-4 w-4" /> வெளியேறு
        </button>
      </div>

      {isAdmin === false && (
        <p className="mt-8 rounded-2xl bg-secondary p-5 text-sm text-muted-foreground">
          இந்தக் கணக்குக்கு நிர்வாக அனுமதி இல்லை. உங்கள் பயனர் கணக்கிற்கு
          <span className="font-medium text-foreground"> admin </span>
          பங்கு வழங்கப்பட்ட பிறகு உள்ளடக்கம் சேர்க்கலாம்.
        </p>
      )}

      {isAdmin && (
        <div className="mt-10 space-y-12">
          <PhotoAdmin />
          <NoteAdmin />
          <ArticleAdmin />
        </div>
      )}
    </div>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <h1 className="font-display text-2xl font-bold">நிர்வாக உள்நுழைவு</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        உள்ளடக்கம் சேர்க்க உள்நுழையவும்.
      </p>
      <form
        className="mt-8 space-y-4 rounded-3xl bg-card p-7 shadow-[var(--shadow-soft)]"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const fn =
            mode === "in"
              ? supabase.auth.signInWithPassword({ email, password })
              : supabase.auth.signUp({
                  email,
                  password,
                  options: { emailRedirectTo: `${window.location.origin}/admin` },
                });
          const { error } = await fn;
          setBusy(false);
          if (error) toast.error(error.message);
          else toast.success(mode === "in" ? "வரவேற்கிறோம்!" : "கணக்கு உருவாக்கப்பட்டது");
        }}
      >
        <label className={labelCls}>
          மின்னஞ்சல்
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input}
          />
        </label>
        <label className={labelCls}>
          கடவுச்சொல்
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={input}
          />
        </label>
        <button type="submit" disabled={busy} className={btn}>
          {mode === "in" ? "உள்நுழை" : "பதிவு செய்"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          className="block text-xs text-primary"
        >
          {mode === "in" ? "புதிய கணக்கு உருவாக்க" : "ஏற்கனவே கணக்கு உள்ளது"}
        </button>
      </form>
    </div>
  );
}

function useInvalidate() {
  const qc = useQueryClient();
  return (key: string) => qc.invalidateQueries({ queryKey: [key] });
}

function PhotoAdmin() {
  const { data } = useQuery(photosQuery());
  const invalidate = useInvalidate();
  const [form, setForm] = useState({
    title: "",
    caption: "",
    species: "",
    location: "",
    taken_on: "",
    image_url: "",
  });

  return (
    <section>
      <h2 className="font-display text-xl font-semibold">புகைப்படம் சேர்</h2>
      <form
        className="mt-4 grid gap-4 rounded-3xl bg-card p-6 shadow-[var(--shadow-soft)] sm:grid-cols-2"
        onSubmit={async (e) => {
          e.preventDefault();
          const { error } = await supabase.from("photos").insert({
            title: form.title,
            caption: form.caption || null,
            species: form.species || null,
            location: form.location || null,
            taken_on: form.taken_on || null,
            image_url: form.image_url,
          });
          if (error) return toast.error(error.message);
          toast.success("புகைப்படம் சேர்க்கப்பட்டது");
          setForm({ title: "", caption: "", species: "", location: "", taken_on: "", image_url: "" });
          invalidate("photos");
        }}
      >
        <label className={labelCls}>
          தலைப்பு
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={input} />
        </label>
        <label className={labelCls}>
          படத்தின் இணைப்பு (URL)
          <input required value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className={input} />
        </label>
        <label className={labelCls}>
          விளக்கம்
          <input value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className={input} />
        </label>
        <label className={labelCls}>
          இனம்
          <input value={form.species} onChange={(e) => setForm({ ...form, species: e.target.value })} className={input} />
        </label>
        <label className={labelCls}>
          இடம்
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={input} />
        </label>
        <label className={labelCls}>
          எடுத்த நாள்
          <input type="date" value={form.taken_on} onChange={(e) => setForm({ ...form, taken_on: e.target.value })} className={input} />
        </label>
        <div className="sm:col-span-2">
          <button type="submit" className={btn}>
            <Plus className="h-4 w-4" /> சேர்
          </button>
        </div>
      </form>

      <ul className="mt-5 space-y-2">
        {data?.map((p) => (
          <li key={p.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{p.title}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {p.species} · {tamilDate(p.taken_on)}
              </span>
            </span>
            <DeleteButton table="photos" id={p.id} onDone={() => invalidate("photos")} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function NoteAdmin() {
  const { data } = useQuery(notesQuery());
  const invalidate = useInvalidate();
  const [form, setForm] = useState({ title: "", body: "", image_url: "" });

  return (
    <section>
      <h2 className="font-display text-xl font-semibold">சிறு குறிப்பு சேர்</h2>
      <form
        className="mt-4 grid gap-4 rounded-3xl bg-card p-6 shadow-[var(--shadow-soft)]"
        onSubmit={async (e) => {
          e.preventDefault();
          const { error } = await supabase.from("notes").insert({
            title: form.title,
            body: form.body,
            image_url: form.image_url || null,
          });
          if (error) return toast.error(error.message);
          toast.success("குறிப்பு சேர்க்கப்பட்டது");
          setForm({ title: "", body: "", image_url: "" });
          invalidate("notes");
        }}
      >
        <label className={labelCls}>
          தலைப்பு
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={input} />
        </label>
        <label className={labelCls}>
          குறிப்பு
          <textarea required rows={4} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className={input} />
        </label>
        <label className={labelCls}>
          படத்தின் இணைப்பு (விருப்பம்)
          <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className={input} />
        </label>
        <div>
          <button type="submit" className={btn}>
            <Plus className="h-4 w-4" /> சேர்
          </button>
        </div>
      </form>

      <ul className="mt-5 space-y-2">
        {data?.map((n) => (
          <li key={n.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
            <span className="min-w-0 truncate text-sm font-medium">{n.title}</span>
            <DeleteButton table="notes" id={n.id} onDone={() => invalidate("notes")} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ArticleAdmin() {
  const { data } = useQuery(articlesQuery());
  const invalidate = useInvalidate();
  const [form, setForm] = useState({
    slug: "",
    title: "",
    excerpt: "",
    cover_url: "",
    content: "",
  });

  return (
    <section>
      <h2 className="font-display text-xl font-semibold">கட்டுரை சேர்</h2>
      <form
        className="mt-4 grid gap-4 rounded-3xl bg-card p-6 shadow-[var(--shadow-soft)]"
        onSubmit={async (e) => {
          e.preventDefault();
          const { error } = await supabase.from("articles").insert({
            slug: form.slug,
            title: form.title,
            excerpt: form.excerpt || null,
            cover_url: form.cover_url || null,
            content: form.content,
          });
          if (error) return toast.error(error.message);
          toast.success("கட்டுரை சேர்க்கப்பட்டது");
          setForm({ slug: "", title: "", excerpt: "", cover_url: "", content: "" });
          invalidate("articles");
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelCls}>
            தலைப்பு
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={input} />
          </label>
          <label className={labelCls}>
            முகவரி (slug, ஆங்கிலத்தில்)
            <input
              required
              pattern="[a-z0-9\-]+"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className={input}
            />
          </label>
        </div>
        <label className={labelCls}>
          சுருக்கம்
          <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={input} />
        </label>
        <label className={labelCls}>
          அட்டைப் படம் (URL)
          <input value={form.cover_url} onChange={(e) => setForm({ ...form, cover_url: e.target.value })} className={input} />
        </label>
        <label className={labelCls}>
          உள்ளடக்கம் (பத்திகளை ஒரு வெற்று வரியால் பிரிக்கவும்)
          <textarea required rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={input} />
        </label>
        <div>
          <button type="submit" className={btn}>
            <Plus className="h-4 w-4" /> வெளியிடு
          </button>
        </div>
      </form>

      <ul className="mt-5 space-y-2">
        {data?.map((a) => (
          <li key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
            <span className="min-w-0 truncate text-sm font-medium">{a.title}</span>
            <DeleteButton table="articles" id={a.id} onDone={() => invalidate("articles")} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function DeleteButton({
  table,
  id,
  onDone,
}: {
  table: "photos" | "notes" | "articles";
  id: string;
  onDone: () => void;
}) {
  return (
    <button
      type="button"
      aria-label="நீக்கு"
      onClick={async () => {
        const { error } = await supabase.from(table).delete().eq("id", id);
        if (error) return toast.error(error.message);
        toast.success("நீக்கப்பட்டது");
        onDone();
      }}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-destructive"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
