import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Camera, BookOpen, FileText, Sparkles, Leaf } from "lucide-react";

import hero from "@/assets/hero.jpg.asset.json";
import card1 from "@/assets/card1.jpg.asset.json";
import card2 from "@/assets/card2.jpg.asset.json";
import card3 from "@/assets/card3.jpg.asset.json";
import { SectionHeading } from "@/components/section-heading";
import { articlesQuery, photosQuery, tamilDate } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "பட்டாம்பூச்சி — சிறகுகளில் சிறந்த உலகம்" },
      {
        name: "description",
        content:
          "பட்டாம்பூச்சிகளின் அழகு, பல்வகைமை மற்றும் வாழ்வுலகம் — தமிழில் புகைப்படங்கள், சிறு குறிப்புகள், கட்டுரைகள்.",
      },
      { property: "og:title", content: "பட்டாம்பூச்சி — சிறகுகளில் சிறந்த உலகம்" },
      {
        property: "og:description",
        content: "தமிழ் பட்டாம்பூச்சி புகைப்படம் மற்றும் அறிவுத் தளம்.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    to: "/photos" as const,
    icon: Camera,
    image: card1.url,
    title: "புகைப்படங்கள்",
    text: "அழகான தருணங்களைப் பாருங்கள்",
  },
  {
    to: "/notes" as const,
    icon: BookOpen,
    image: card2.url,
    title: "சிறு குறிப்புகள்",
    text: "பட்டாம்பூச்சிகள் பற்றி அறிந்துகொள்ளுங்கள்",
  },
  {
    to: "/articles" as const,
    icon: FileText,
    image: card3.url,
    title: "கட்டுரைகள்",
    text: "ஆழமான தகவல்களை படியுங்கள்",
  },
];

function Home() {
  const photos = useQuery(photosQuery(3));
  const articles = useQuery(articlesQuery(3));

  return (
    <>
      {/* Hero */}
      <section className="hero-wash relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:py-24">
          <div className="min-w-0">
            <h1 className="font-display text-4xl leading-[1.15] font-bold text-forest-deep sm:text-5xl lg:text-6xl">
              சிறகுகளில்
              <br />
              சிறந்த உலகம்
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              பட்டாம்பூச்சிகளின் அழகு, பல்வகைமை மற்றும் அவற்றின் வாழ்வுலகத்தை
              ஆராய்வோம்.
            </p>
            <Link
              to="/photos"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
            >
              <Leaf className="h-4 w-4" />
              ஆராய்வு தொடங்கு
            </Link>
          </div>

          <div className="relative">
            <img
              src={hero.url}
              alt="வெண்ணிற மலரில் அமர்ந்திருக்கும் பட்டாம்பூச்சி"
              width={1600}
              height={1200}
              className="w-full rounded-[2rem] object-cover shadow-[var(--shadow-card)] lg:rounded-[2.5rem]"
            />
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeading eyebrow="" title="சிறப்பு பகுதி" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="card-lift group relative overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]"
            >
              <img
                src={f.image}
                alt={f.title}
                loading="lazy"
                className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-background text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-cream">{f.title}</h3>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <p className="text-sm text-cream/80">{f.text}</p>
                  <ArrowRight className="h-5 w-5 shrink-0 text-cream transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About + recent */}
      <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow="எங்களை பற்றி" title="இயற்கையை நேசிப்போம் பட்டாம்பூச்சிகளை பாதுகப்போம்" />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              பட்டாம்பூச்சிகள் இயற்கையின் முக்கிய அங்கமாகும். அவற்றின் வாழ்விடம்,
              உணவுப் பழக்கம், பருவநிலை மாற்றங்கள் மற்றும் பாதுகாப்பு குறித்து
              விழிப்புணர்வு ஏற்படுத்துவதே இந்த தளத்தின் நோக்கம்.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-accent"
            >
              மேலும் அறிய
            </Link>
          </div>

          <div className="min-w-0">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
              <h2 className="font-display text-xl font-semibold text-foreground">
                சமீபத்திய பதிவுகள்
              </h2>
              <Link
                to="/photos"
                className="flex shrink-0 items-center gap-1.5 text-sm text-primary"
              >
                அனைத்தையும் பார்க்க <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {photos.isLoading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-52 animate-pulse rounded-2xl bg-muted" />
                ))}
              {photos.data?.map((p) => (
                <article key={p.id} className="min-w-0">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    loading="lazy"
                    className="h-36 w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
                  />
                  <h3 className="mt-3 truncate font-display text-base font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <p className="truncate text-xs text-muted-foreground">{p.caption}</p>
                  <p className="mt-2 text-xs text-muted-foreground/80">
                    {tamilDate(p.taken_on ?? p.created_at)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeading eyebrow="வாசிக்க" title="சமீபத்திய கட்டுரைகள்" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {articles.data?.map((a) => (
            <Link
              key={a.id}
              to="/articles/$slug"
              params={{ slug: a.slug }}
              className="card-lift group overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]"
            >
              {a.cover_url && (
                <img
                  src={a.cover_url}
                  alt={a.title}
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
              )}
              <div className="space-y-2 p-6">
                <p className="text-xs text-muted-foreground">{tamilDate(a.published_at)}</p>
                <h3 className="font-display text-lg font-semibold group-hover:text-primary">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 rounded-[2rem] bg-forest-deep px-8 py-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="flex min-w-0 items-start gap-4">
            <Sparkles className="mt-1 h-6 w-6 shrink-0 text-gold" />
            <p className="font-display text-lg leading-relaxed text-cream">
              இயற்கையின் இந்த அழகை காக்க நாம் அனைவரும் பொறுப்புடன் செயற்படுவோம்.
            </p>
          </div>
          <Link
            to="/contact"
            className="justify-self-start rounded-full bg-cream px-6 py-3 text-sm font-medium text-forest-deep transition-transform hover:-translate-y-0.5 sm:justify-self-end"
          >
            தொடர்பு கொள்ள
          </Link>
        </div>
      </section>
    </>
  );
}
