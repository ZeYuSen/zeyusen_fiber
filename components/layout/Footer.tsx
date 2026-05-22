import Link from "next/link";
import Image from "next/image";
import { contactInfo } from "@/lib/contact";

const footerLinks = {
  carbonFiber: [
    { name: "Carbon Fiber Mat", href: "/carbon-fiber/products/carbon-fiber-mat" },
    { name: "Carbon Fiber Cloth", href: "/carbon-fiber/products/carbon-fiber-cloth" },
    { name: "Raw Materials", href: "/carbon-fiber/products/carbon-fiber-raw" },
    { name: "Carbon Applications", href: "/applications" },
    { name: "All Carbon Products", href: "/carbon-fiber/products" },
  ],
  glassFiber: [
    { name: "Tissue Mat", href: "/glass-fiber/products/tissue-mat" },
    { name: "Fiberglass Cloth", href: "/glass-fiber/products/fiberglass-cloth" },
    { name: "Composite Mat", href: "/glass-fiber/products/composite-mat" },
    { name: "Glass Applications", href: "/applications/glass" },
    { name: "All Glass Products", href: "/glass-fiber/products" },
  ],
  company: [
    { name: "Applications", href: "/applications" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-black/[0.06]">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="ZeYuSen Fiber"
                width={28}
                height={28}
                className="block h-7 w-7 object-contain"
              />
              <span className="text-lg font-bold text-text-primary">ZeYuSen</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Leading manufacturer of carbon fiber and glass fiber composite
              materials for global industries.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <SocialLink href="https://wa.me/8618012885770" label="WhatsApp">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </SocialLink>
              <SocialLink href="mailto:zys@jsfiberglass.com" label="Email">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </SocialLink>
              <SocialLink href="tel:+86-18012885770" label="Phone">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </SocialLink>
            </div>
          </div>

          {/* Carbon Fiber */}
          <div>
            <h3 className="type-caption text-carbon-accent mb-4">
              Carbon Fiber
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.carbonFiber.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Glass Fiber */}
          <div>
            <h3 className="type-caption text-glass-accent mb-4">
              Glass Fiber
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.glassFiber.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="type-caption text-text-secondary mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="type-caption mb-1">Email</p>
              <div className="space-y-1">
                {contactInfo.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="block text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-black/[0.06] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} ZeYuSen Fiber. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 bg-neutral-200 hover:bg-neutral-300 text-text-muted hover:text-text-primary transition-colors rounded"
      aria-label={label}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        {children}
      </svg>
    </a>
  );
}