const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Countries Exported" },
  { value: 80, suffix: "M", label: "Sqm Annual Output" },
  { value: 13, suffix: "+", label: "Patents Granted" },
];

export function StatsBar() {
  return (
    <section className="bg-neutral-50 py-24 sm:py-32">
      <div className="container-wide">
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-8 lg:py-0 ${
                  i < stats.length - 1 ? "lg:border-r border-neutral-200" : ""
                } ${i < 2 ? "border-b lg:border-b-0 border-neutral-200" : ""}`}
              >
                <span
                  className="text-3xl sm:text-4xl font-semibold text-neutral-900 block"
                >
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-xs uppercase tracking-wider text-neutral-500 block mt-3">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
