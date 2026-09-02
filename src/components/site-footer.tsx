import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Send, Heart } from "lucide-react";

import logo from "@/assets/logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1.4fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src={logo.url}
                alt="பட்டாம்பூச்சி சின்னம்"
                width={40}
                height={40}
                loading="lazy"
                className="h-9 w-9"
              />
              <span>
                <span className="block font-display text-xl font-semibold text-primary">
                  பட்டாம்பூச்சி
                </span>
                <span className="block text-[11px] text-muted-foreground">
                  இயற்கையின் வண்ணங்கள்
                </span>
              </span>
            </div>
            <div className="mt-5 flex gap-2.5">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-primary shadow-[var(--shadow-soft)]"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">வழிகாட்டி</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary">
                  முகப்பு
                </Link>
              </li>
              <li>
                <Link to="/photos" className="hover:text-primary">
                  புகைப்படங்கள்
                </Link>
              </li>
              <li>
                <Link to="/notes" className="hover:text-primary">
                  சிறு குறிப்புகள்
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-primary">
                  கட்டுரைகள்
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">உதவி</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary">
                  பற்றி
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  தொடர்பு
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-primary">
                  உள்ளடக்க நிர்வாகம்
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              புதிய தகவல்களைப் பெறுங்கள்
            </h3>
            <form
              className="mt-4 flex items-center gap-2 rounded-full bg-background p-1.5 pl-4 shadow-[var(--shadow-soft)]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="உங்கள் மின்னஞ்சல்"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label="சேர்"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} பட்டாம்பூச்சி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.</p>
          <p className="flex items-center gap-1.5">
            தமிழில் உருவாக்கப்பட்டது <Heart className="h-3.5 w-3.5 fill-destructive text-destructive" />
          </p>
        </div>
      </div>
    </footer>
  );
}
