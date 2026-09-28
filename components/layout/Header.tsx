"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { isLocale, defaultLocale } from "@/lib/i18n/config";
import { localizedHref, resolveRoute, type PageKey } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";

const logoSrc = "/logo.png?v=logo-20260626";

type CategoryLink = { slug: string; name: string };
type Tone = "night" | "paper" | null;

// Pages that open on a night stage, so the header starts in night ink on first paint.
const NIGHT_FIRST: readonly PageKey[] = [
  "home", "carbon-fiber", "glass-fiber", "carbon-category", "glass-category", "carbon-product", "glass-product",
  "applications", "applications-glass",
];

export function Header({
  dict,
  carbonCategories,
  glassCategories,
}: {
  dict: Dictionary;
  carbonCategories: CategoryLink[];
  glassCategories: CategoryLink[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<"carbon" | "glass" | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<"carbon" | "glass" | null>(null);
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] && isLocale(segments[0]) ? segments[0] : defaultLocale;
  const isHome = pathname === `/${locale}` || pathname === "/";
  const pageKey = segments.length <= 1 ? "home" : resolveRoute(locale, segments.slice(1))?.pageKey;
  const [tone, setTone] = useState<Tone>(pageKey && NIGHT_FIRST.includes(pageKey) ? "night" : null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Ink follows the tone of whatever section is passing under the header.
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const header = headerRef.current;
      const y = Math.max(1, (header?.offsetHeight ?? 80) - 2);
      const hit = document.elementsFromPoint(window.innerWidth / 2, y).find((el) => !header?.contains(el));
      // The footer is always night, but it is not a stage (it must not switch the world on).
      const value = hit?.closest<HTMLElement>("[data-tone]")?.dataset.tone ?? (hit?.closest("footer") ? "night" : undefined);
      setTone(value === "paper" ? "paper" : value === "night" || value === "warm" ? "night" : null);
    };
    const frame = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const showSolidBg = scrolled || (!isHome && tone === null) || mobileOpen;
  const useWhiteText = tone === "night" && !mobileOpen;
  const textColor = useWhiteText ? "text-white/80" : "text-text-secondary";
  const textHover = useWhiteText ? "hover:text-white" : "hover:text-text-primary";
  const logoText = useWhiteText ? "text-white" : "text-[#023465]";
  const logoTone = useWhiteText ? "brightness-0 invert" : "";
  // Dropdowns follow the header's tone: graphite over night, white elsewhere.
  const menu = useWhiteText
    ? {
        panel: "bg-[#0E1116] border border-white/10 p-2 rounded-sm shadow-[0_24px_48px_-24px_rgba(0,0,0,0.8)]",
        item: "text-white/85",
        itemActive: "bg-white/[0.06] text-white",
        itemHover: "hover:bg-white/[0.05]",
        link: "text-white/60 hover:text-white hover:bg-white/[0.05]",
        divider: "border-white/10",
      }
    : {
        panel: "bg-white border border-black/[0.06] p-2 shadow-lg rounded-lg",
        item: "text-text-primary",
        itemActive: "bg-black/[0.03] text-text-primary",
        itemHover: "hover:bg-black/[0.03]",
        link: "text-text-secondary hover:text-text-primary hover:bg-black/[0.03]",
        divider: "border-black/[0.06]",
      };
  const brandTextClass = locale === "zh"
    ? "text-[1.95rem] sm:text-[2.3rem] leading-none font-black tracking-[0.04em]"
    : "text-[1.76rem] sm:text-[2.08rem] leading-none font-[family-name:var(--font-jetbrains-mono)] font-[900] tracking-[0.07em]";

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-no-repeat transition-all duration-500 border-b ${
        mobileOpen
          ? "bg-white border-black/[0.06] shadow-sm"
          : tone === "night"
            ? // One continuous fade (no band edge) that reaches below the bar and
              // eases in with the scroll, so it never cuts across the fibers.
              `bg-transparent border-transparent before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-[calc(100%+72px)] before:bg-[linear-gradient(to_bottom,rgba(8,10,13,0.92)_0%,rgba(8,10,13,0.78)_45%,rgba(8,10,13,0.35)_75%,rgba(8,10,13,0)_100%)] before:transition-opacity before:duration-700 ${
                scrolled ? "before:opacity-100" : "before:opacity-0"
              }`
          : tone === "paper"
            ? scrolled ? "bg-[#EEECE6]/95 border-black/[0.06]" : "bg-transparent border-transparent"
          : showSolidBg
            ? "bg-white/80 backdrop-blur-xl border-black/[0.06] shadow-sm"
            : "bg-transparent border-transparent"
      }`}
    >
      <div className={`container-wide transition-[padding] duration-500 ${showSolidBg ? "py-3" : "py-5"}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={localizedHref("home", locale)} className="flex items-center gap-3.5">
            <Image
              src={logoSrc}
              alt="ZEYUSEN Fiber"
              width={62}
              height={62}
              loading="eager"
              className={`block h-[3.85rem] w-[3.85rem] shrink-0 object-cover scale-[1.08] transition-[filter] duration-500 ${logoTone}`}
            />
            <span className={`${brandTextClass} ${logoText} transition-colors duration-500`}>
              {locale === "zh" ? "泽宇森" : "ZEYUSEN"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink href={localizedHref("home", locale)} textColor={textColor} textHover={textHover}>
              {dict.nav.home}
            </NavLink>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("products")}
              onMouseLeave={() => { setActiveDropdown(null); setActiveSubmenu(null); }}
            >
              <NavTrigger textColor={textColor} textHover={textHover}>
                {dict.nav.products}
              </NavTrigger>
              <div
                className={`absolute top-full left-0 z-10 pt-4 w-52 transition-all duration-200 ${
                  activeDropdown === "products"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <div className={menu.panel}>
                  {/* Carbon — hover reveals right flyout */}
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveSubmenu("carbon")}
                  >
                    <Link
                      href={localizedHref("carbon-fiber", locale)}
                      className={`flex items-center justify-between px-3 py-3 text-sm font-semibold rounded-md transition-colors ${
                        activeSubmenu === "carbon"
                          ? menu.itemActive
                          : `${menu.item} ${menu.itemHover}`
                      }`}
                    >
                      <span>{dict.nav.carbonFiber}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    {activeSubmenu === "carbon" && carbonCategories.length > 0 && (
                      <div className="absolute left-full top-0 pl-1">
                        <div className={`w-56 ${menu.panel}`}>
                          {carbonCategories.map((category) => (
                            <Link
                              key={category.slug}
                              href={localizedHref("carbon-category", locale, { category: category.slug })}
                              className={`block px-3 py-2.5 text-sm rounded-md transition-colors ${menu.link}`}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={`border-t my-1 ${menu.divider}`} />
                  {/* Glass — hover reveals right flyout */}
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveSubmenu("glass")}
                  >
                    <Link
                      href={localizedHref("glass-fiber", locale)}
                      className={`flex items-center justify-between px-3 py-3 text-sm font-semibold rounded-md transition-colors ${
                        activeSubmenu === "glass"
                          ? menu.itemActive
                          : `${menu.item} ${menu.itemHover}`
                      }`}
                    >
                      <span>{dict.nav.glassFiber}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    {activeSubmenu === "glass" && glassCategories.length > 0 && (
                      <div className="absolute left-full top-0 pl-1">
                        <div className={`w-56 ${menu.panel}`}>
                          {glassCategories.map((category) => (
                            <Link
                              key={category.slug}
                              href={localizedHref("glass-category", locale, { category: category.slug })}
                              className={`block px-3 py-2.5 text-sm rounded-md transition-colors ${menu.link}`}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <NavLink href={localizedHref("applications", locale)} textColor={textColor} textHover={textHover}>
              {dict.nav.applications}
            </NavLink>
            <NavLink href={localizedHref("services", locale)} textColor={textColor} textHover={textHover}>
              {dict.nav.services}
            </NavLink>
            <NavLink href={localizedHref("blog-index", locale)} textColor={textColor} textHover={textHover}>
              {dict.nav.blog}
            </NavLink>
            <NavLink href={localizedHref("about", locale)} textColor={textColor} textHover={textHover}>
              {dict.nav.about}
            </NavLink>
          </nav>

          {/* CTA + Language + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <LanguageSwitcher light={useWhiteText} />
            </div>
            <Link
              href={localizedHref("contact", locale)}
              className="hidden sm:inline-flex items-center px-5 py-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium rounded-full transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            >
              {dict.nav.getQuote}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 ${useWhiteText ? "text-white" : "text-text-primary"} transition-colors duration-500`}
              aria-label={dict.nav.menu}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white overflow-y-auto transition-all duration-300 ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-wide">
          <div className="mt-4 border-t border-black/[0.06] py-6 space-y-4">
            <Link href={localizedHref("home", locale)} onClick={closeMobile} className="block text-sm font-medium text-text-primary hover:text-accent-500">
              {dict.nav.home}
            </Link>
            <div>
              <p className="type-caption text-neutral-400 mb-3">{dict.nav.products}</p>
              {/* Carbon accordion */}
              <div className="flex items-center justify-between">
                <Link
                  href={localizedHref("carbon-fiber", locale)}
                  onClick={closeMobile}
                  className="py-2 text-sm font-semibold text-text-primary hover:text-text-secondary transition-colors"
                >
                  {dict.nav.carbonFiber}
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileExpanded(mobileExpanded === "carbon" ? null : "carbon")}
                  className="p-2 -mr-2 text-text-secondary"
                  aria-label={`${dict.nav.carbonFiber} ${dict.nav.products}`}
                  aria-expanded={mobileExpanded === "carbon"}
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "carbon" ? "rotate-180" : ""}`} />
                </button>
              </div>
              {mobileExpanded === "carbon" && (
                <div className="pl-3 pb-2 space-y-1">
                  {carbonCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={localizedHref("carbon-category", locale, { category: category.slug })}
                      onClick={closeMobile}
                      className="block py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
              {/* Glass accordion */}
              <div className="flex items-center justify-between">
                <Link
                  href={localizedHref("glass-fiber", locale)}
                  onClick={closeMobile}
                  className="py-2 text-sm font-semibold text-text-primary hover:text-text-secondary transition-colors"
                >
                  {dict.nav.glassFiber}
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileExpanded(mobileExpanded === "glass" ? null : "glass")}
                  className="p-2 -mr-2 text-text-secondary"
                  aria-label={`${dict.nav.glassFiber} ${dict.nav.products}`}
                  aria-expanded={mobileExpanded === "glass"}
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "glass" ? "rotate-180" : ""}`} />
                </button>
              </div>
              {mobileExpanded === "glass" && (
                <div className="pl-3 pb-2 space-y-1">
                  {glassCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={localizedHref("glass-category", locale, { category: category.slug })}
                      onClick={closeMobile}
                      className="block py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-black/[0.06] pt-4 space-y-3">
              <Link href={localizedHref("applications", locale)} onClick={closeMobile} className="block text-sm font-medium text-text-secondary hover:text-text-primary">
                {dict.nav.applications}
              </Link>
              <Link href={localizedHref("services", locale)} onClick={closeMobile} className="block text-sm font-medium text-text-secondary hover:text-text-primary">
                {dict.nav.services}
              </Link>
              <Link href={localizedHref("blog-index", locale)} onClick={closeMobile} className="block text-sm font-medium text-text-secondary hover:text-text-primary">
                {dict.nav.blog}
              </Link>
              <Link href={localizedHref("about", locale)} onClick={closeMobile} className="block text-sm font-medium text-text-secondary hover:text-text-primary">
                {dict.nav.about}
              </Link>
            </div>
            <div className="border-t border-black/[0.06] pt-4">
              <p className="type-caption text-neutral-400 mb-2">{dict.nav.language}</p>
              <LanguageSwitcher />
            </div>
            <Link
              href={localizedHref("contact", locale)}
              onClick={closeMobile}
              className="block w-full text-center px-5 py-3 bg-accent-500 text-white text-sm font-medium rounded-full"
            >
              {dict.nav.getQuote}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  textColor = "text-text-secondary",
  textHover = "hover:text-text-primary",
}: {
  href: string;
  children: React.ReactNode;
  textColor?: string;
  textHover?: string;
}) {
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-1 text-base font-semibold ${textColor} ${textHover} transition-colors duration-500 after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:origin-left hover:after:scale-x-100`}
    >
      {children}
    </Link>
  );
}

function NavTrigger({
  children,
  textColor = "text-text-secondary",
  textHover = "hover:text-text-primary",
}: {
  children: React.ReactNode;
  textColor?: string;
  textHover?: string;
}) {
  return (
    <button
      type="button"
      className={`flex items-center gap-1 text-base font-semibold ${textColor} ${textHover} transition-colors duration-500`}
      aria-haspopup="menu"
      aria-expanded="false"
    >
      {children}
      <ChevronDown className="w-3.5 h-3.5" />
    </button>
  );
}
