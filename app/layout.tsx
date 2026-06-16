// Root layout is intentionally minimal: <html>/<body> live in app/[lang]/layout.tsx
// so the lang attribute and locale chrome are set per-locale. The root path "/"
// is redirected to "/en" by proxy.ts, so this passthrough is rarely rendered.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
