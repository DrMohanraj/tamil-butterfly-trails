import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Leaf, ShieldCheck } from "lucide-react";

import hero from "@/assets/hero.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "எங்களை பற்றி — பட்டாம்பூச்சி" },
      {
        name: "description",
        content:
          "பட்டாம்பூச்சிகளின் அழகையும் அறிவியலையும் தமிழில் ஆவணப்படுத்தும் முயற்சி பற்றிய அறிமுகம்.",
      },
      { property: "og:title", content: "எங்களை பற்றி — பட்டாம்பூச்சி" },
      {
        property: "og:description",
        content: "தமிழில் பட்டாம்பூச்சி ஆவணப்படுத்தல் முயற்சி.",
      },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  {
    icon: Camera,
    title: "ஆவணப்படுத்துதல்",
    text: "ஒவ்வொரு இனத்தையும் புகைப்படத்துடன் தமிழில் பதிவு செய்தல்.",
  },
  {
    icon: Leaf,
    title: "அறிவு பகிர்வு",
    text: "எளிய மொழியில், அறிவியல் அடிப்படையிலான தகவல்கள்.",
  },
  {
    icon: ShieldCheck,
    title: "பாதுகாப்பு",
    text: "வாழ்விடப் பாதுகாப்பு குறித்த விழிப்புணர்வை வளர்த்தல்.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-3xl leading-tight font-bold text-foreground sm:text-4xl">
            இயற்கையை நேசிப்போம், பட்டாம்பூச்சிகளை பாதுகாப்போம்
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            தமிழ்நாட்டின் மலைத்தொடர்கள், வயல்வெளிகள், நகர்ப்புறத் தோட்டங்கள் என
            எங்கும் பட்டாம்பூச்சிகள் வாழ்கின்றன. ஆனால் அவற்றைப் பற்றிய தமிழ்
            ஆவணங்கள் மிகக் குறைவு. அந்தக் குறையை நிரப்பும் நோக்கத்தில்
            உருவானதே இந்தத் தளம்.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            புகைப்படங்கள், சிறு குறிப்புகள், விரிவான கட்டுரைகள் என மூன்று
            வடிவங்களில் தொடர்ந்து உள்ளடக்கம் சேர்க்கப்படுகிறது.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            எங்களுடன் இணையுங்கள்
          </Link>
        </div>
        <img
          src={hero.url}
          alt="மலரில் பட்டாம்பூச்சி"
          loading="lazy"
          className="w-full rounded-[2rem] object-cover shadow-[var(--shadow-card)]"
        />
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-3xl bg-card p-7 shadow-[var(--shadow-soft)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary">
              <p.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-5 font-display text-lg font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
