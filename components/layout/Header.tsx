"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { isLocale, defaultLocale } from "@/lib/i18n/config";
import { localizedHref } from "@/lib/i18n/routes";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";

const logoSrc = "/logo.png?v=logo-20260626";

export function Header({ dict }: { dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] && isLocale(segments[0]) ? segments[0] : defaultLocale;
  const isHome = pathname === `/${locale}` || pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const showSolidBg = scrolled || !isHome || mobileOpen;
  const useWhiteText = isHome && !scrolled && !mobileOpen;
  const textColor = useWhiteText ? "text-white/80" : "text-text-secondary";
  const textHover = useWhiteText ? "hover:text-white" : "hover:text-text-primary";
  const logoText = useWhiteText ? "text-white" : "text-[#023465]";
  const logoTone = useWhiteText ? "brightness-0 invert" : "";
  const brandTextClass = locale === "zh"
    ? "text-[1.95rem] sm:text-[2.3rem] leading-none font-black tracking-[0.04em]"
    : "text-[1.76rem] sm:text-[2.08rem] leading-none font-[family-name:var(--font-jetbrains-mono)] font-[900] tracking-[0.07em]";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        mobileOpen
          ? "bg-white border-black/[0.06] py-3 shadow-sm"
          : showSolidBg
            ? "bg-white/80 backdrop-blur-xl border-black/[0.06] py-3 shadow-sm"
            : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={localizedHref("home", locale)} className="flex items-center gap-3.5">
            <Image
              src={logoSrc}
              alt="ZEYUSEN Fiber"
              width={62}
              height={62}
              priority
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
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavTrigger textColor={textColor} textHover={textHover}>
                {dict.nav.products}
              </NavTrigger>
              <div
                className={`absolute top-full left-0 pt-4 w-64 transition-all duration-200 ${
                  activeDropdown === "products"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-white border border-black/[0.06] p-3 shadow-lg rounded-lg">
                  <Link
                    href={localizedHref("carbon-fiber", locale)}
                    className="flex items-center justify-between px-3 py-3 text-sm font-semibold text-carbon-accent hover:bg-black/[0.03] transition-colors"
                  >
                    <span>{dict.nav.carbonFiber}</span>
                    <ChevronDown className="-rotate-90 w-3.5 h-3.5" />
                  </Link>
                  <div className="border-t border-black/[0.06] my-1" />
                  <Link
                    href={localizedHref("glass-fiber", locale)}
                    className="flex items-center justify-between px-3 py-3 text-sm font-semibold text-glass-accent hover:bg-black/[0.03] transition-colors"
                  >
                    <span>{dict.nav.glassFiber}</span>
                    <ChevronDown className="-rotate-90 w-3.5 h-3.5" />
                  </Link>
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
              <Link
                href={localizedHref("carbon-fiber", locale)}
                onClick={closeMobile}
                className="block py-2 text-sm font-semibold text-carbon-accent hover:text-text-primary transition-colors"
              >
                {dict.nav.carbonFiber}
              </Link>
              <Link
                href={localizedHref("glass-fiber", locale)}
                onClick={closeMobile}
                className="block py-2 text-sm font-semibold text-glass-accent hover:text-text-primary transition-colors"
              >
                {dict.nav.glassFiber}
              </Link>
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
      className={`flex items-center gap-1 text-base font-semibold ${textColor} ${textHover} transition-colors duration-500`}
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
