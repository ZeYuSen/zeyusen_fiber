import Image from "next/image";

export function AuthorSignature() {
  return (
    <div className="mt-12 flex items-start gap-4 rounded-xl border border-neutral-100 bg-neutral-50 p-5">
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-neutral-200">
        <Image
          src="/logo.png"
          alt="ZeYuSen Fiber"
          width={48}
          height={48}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
          Author
        </p>
        <p className="text-sm font-semibold text-neutral-900">
          ZeYuSen Fiber Technical Team
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
          Specializing in carbon fiber and glass fiber composite materials for aerospace, wind energy, construction, and advanced manufacturing. Our engineering team brings decades of combined experience in composite material selection, process optimization, and quality assurance.
        </p>
      </div>
    </div>
  );
}
