import { ProductSpec } from "@/types/product";

// A lab data sheet on paper: hairline rules, parameter names in muted ink,
// values in mono ink. No fills, no zebra.
export function SpecTable({
  specs,
  parameterLabel = "Parameter",
  valueLabel = "Value",
}: {
  specs: ProductSpec[];
  parameterLabel?: string;
  valueLabel?: string;
}) {
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-[#15181C]/70">
          <th className="w-[38%] pb-3 pr-6 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-[#5C6166] [:lang(ko)_&]:text-xs [:lang(ko)_&]:tracking-[0.08em] [:lang(zh)_&]:text-xs [:lang(zh)_&]:tracking-[0.08em]">
            {parameterLabel}
          </th>
          <th className="pb-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-[#5C6166] [:lang(ko)_&]:text-xs [:lang(ko)_&]:tracking-[0.08em] [:lang(zh)_&]:text-xs [:lang(zh)_&]:tracking-[0.08em]">
            {valueLabel}
          </th>
        </tr>
      </thead>
      <tbody>
        {specs.map((spec) => (
          <tr key={spec.label} className="border-b border-[#15181C]/12">
            <td className="py-4 pr-6 align-top text-sm leading-relaxed text-[#5C6166] sm:text-[0.9375rem]">
              {spec.label}
            </td>
            <td className="py-4 align-top font-mono text-sm leading-relaxed text-[var(--ink-paper)] sm:text-[0.9375rem]">
              {spec.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
