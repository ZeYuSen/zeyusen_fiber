"use client";

import { Award, Globe, Factory, FileBadge } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { getHomeContent } from "@/lib/i18n/home-content";

const statIcons = [Award, Globe, Factory, FileBadge];

export function StatsBar() {
  const stats = getHomeContent(useLocale()).stats;
  return (
    <section className="bg-neutral-900 py-20 sm:py-24">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => {
            const Icon = statIcons[i] ?? Award;
            return (
              <div
                key={stat.label}
                className={`text-center px-4 py-8 lg:py-2 ${
                  i < stats.length - 1 ? "lg:border-r border-white/10" : ""
                } ${i < 2 ? "border-b lg:border-b-0 border-white/10" : ""}`}
              >
                <Icon className="w-6 h-6 text-cyan-400 mx-auto mb-4" />
                <span className="text-3xl sm:text-4xl font-semibold text-white block">
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="text-xs uppercase tracking-wider text-neutral-400 block mt-2">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
