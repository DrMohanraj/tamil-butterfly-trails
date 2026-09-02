import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "தொடர்பு — பட்டாம்பூச்சி" },
      {
        name: "description",
        content:
          "உங்கள் பட்டாம்பூச்சி புகைப்படங்களையும் கேள்விகளையும் எங்களுடன் பகிரலாம்.",
      },
      { property: "og:title", content: "தொடர்பு — பட்டாம்பூச்சி" },
      {
        property: "og:description",
        content: "பட்டாம்பூச்சி தளத்துடன் தொடர்பு கொள்ளுங்கள்.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
        தொடர்பு கொள்ள
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        உங்கள் புகைப்படங்கள், கேள்விகள், கருத்துகள் — அனைத்தையும் வரவேற்கிறோம்.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.7fr]">
        <form
          className="rounded-3xl bg-card p-7 shadow-[var(--shadow-soft)]"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("நன்றி! உங்கள் செய்தி பெறப்பட்டது.");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="text-muted-foreground">பெயர்</span>
              <input
                required
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 outline-none focus:border-primary"
              />
            </label>
            <label className="text-sm">
              <span className="text-muted-foreground">மின்னஞ்சல்</span>
              <input
                type="email"
                required
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 outline-none focus:border-primary"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm">
            <span className="text-muted-foreground">செய்தி</span>
            <textarea
              required
              rows={6}
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 outline-none focus:border-primary"
            />
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            <Send className="h-4 w-4" />
            {sent ? "மீண்டும் அனுப்பு" : "அனுப்பு"}
          </button>
        </form>

        <div className="space-y-4">
          <div className="rounded-3xl bg-secondary p-6">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-display text-base font-semibold">மின்னஞ்சல்</h2>
            <p className="mt-1 text-sm text-muted-foreground">hello@pattampoochi.ta</p>
          </div>
          <div className="rounded-3xl bg-secondary p-6">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-display text-base font-semibold">இடம்</h2>
            <p className="mt-1 text-sm text-muted-foreground">தமிழ்நாடு, இந்தியா</p>
          </div>
        </div>
      </div>
    </div>
  );
}
