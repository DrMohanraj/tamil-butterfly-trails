import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Search } from "lucide-react";

import logo from "@/assets/logo.png.asset.json";

const nav = [
  { to: "/", label: "முகப்பு" },
  { to: "/photos", label: "புகைப்படங்கள்" },
  { to: "/notes", label: "சிறு குறிப்புகள்" },
  { to: "/articles", label: "கட்டுரைகள்" },
  { to: "/about", label: "பற்றி" },
  { to: "/contact", label: "தொடர்பு" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <img
            src={logo.url}
            alt="பட்டாம்பூச்சி இணையதளச் சின்னம்"
            width={40}
            height={40}
            className="h-9 w-9 shrink-0"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-tight font-semibold text-primary">
              பட்டாம்பூச்சி
            </span>
            <span className="block truncate text-[11px] tracking-wide text-muted-foreground">
              இயற்கையின் வண்ணங்கள்
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="relative py-1 text-sm text-foreground/75 transition-colors hover:text-primary data-[status=active]:text-primary data-[status=active]:after:absolute data-[status=active]:after:-bottom-0.5 data-[status=active]:after:left-0 data-[status=active]:after:h-0.5 data-[status=active]:after:w-full data-[status=active]:after:rounded-full data-[status=active]:after:bg-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/photos"
            aria-label="தேடல்"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 lg:flex"
          >
            <Search className="h-4 w-4" />
          </Link>
          <button
            type="button"
            aria-label="பட்டி"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background px-5 pb-5 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border/50 py-3 text-base text-foreground/80 last:border-0 data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
