import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist. Browse our carbon fiber and glass fiber products or contact us for assistance.",
};

export default function NotFound() {
  return (
    <section className="pt-36 pb-24">
      <div className="max-w-xl mx-auto px-4 text-center">
        <p className="font-mono text-sm text-neutral-400 mb-4">404</p>
        <h1 className="text-3xl font-semibold text-neutral-900">Page Not Found</h1>
        <p className="mt-4 text-neutral-500 leading-relaxed">
          The page you are looking for may have been moved or no longer exists.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold rounded-full transition-colors"
          >
            Back to Home <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 hover:border-neutral-300 text-neutral-700 text-sm font-medium rounded-full transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
