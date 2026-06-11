const capabilities = [
  {
    number: "01",
    title: "Custom Engineering",
    description: "Tailored fiber solutions from 10g/m² to 1200g/m², any specification.",
  },
  {
    number: "02",
    title: "Global Logistics",
    description: "Dual production bases, 240km from Shanghai Port. Exporting to 50+ countries.",
  },
  {
    number: "03",
    title: "Quality Certified",
    description: "ISO 9001, 14001, 45001 certified. 15+ patents in composite materials.",
  },
];

export function WhyPartnerNew() {
  return (
    <section className="bg-neutral-50 section-padding">
      <div className="container-wide">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-24">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            Precision at
            <br />
            every scale.
          </h2>
          <p className="text-neutral-500 leading-relaxed self-end">
            With 15+ years of manufacturing expertise and partnerships with
            leading research institutions, we deliver composite materials that
            meet the most demanding specifications — on time, every time.
          </p>
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              className="bg-neutral-50 p-8 sm:p-10"
            >
              <span className="font-mono text-xs text-neutral-400 block mb-4">
                {cap.number}
              </span>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                {cap.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
