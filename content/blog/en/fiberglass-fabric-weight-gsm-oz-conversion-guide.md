---
title: "Fiberglass Fabric Weight Guide: GSM, oz/yd², and Conversion"
description: "How to read fiberglass fabric weight in GSM and oz/yd², convert between the two units, and understand what areal weight does and does not specify in an RFQ."
slug: "fiberglass-fabric-weight-gsm-oz-conversion-guide"
date: "2026-07-16"
dateModified: "2026-07-16"
tags: ["fiberglass fabric weight", "GSM", "oz/yd2", "areal weight", "fabric specification", "fiberglass cloth"]
image: "/images/blog/fiberglass-fabric-weight-gsm-cover.webp"
---

# Fiberglass Fabric Weight Guide: GSM, oz/yd², and Conversion

Fabric weight is the mass of reinforcement per unit of area. It is written as grams per square meter (GSM, or g/m²) in metric specifications and as ounces per square yard (oz/yd²) in US specifications. The two describe the same property in different units.

Weight is one of the most quoted numbers in a fiberglass purchase, and also one of the most over-interpreted. It fixes areal mass. It does not, by itself, define weave, fiber type, thickness, strength, or finish. This guide shows how to convert between units and how to keep weight in its correct place inside a complete specification.

## Quick Conversion Reference

The exact relationship is **1 oz/yd² = 33.906 g/m²** (and 1 g/m² = 0.0295 oz/yd²).

| oz/yd² | GSM (g/m²) | GSM | oz/yd² |
|---:|---:|---:|---:|
| 2 | 67.8 | 100 | 2.95 |
| 4 | 135.6 | 200 | 5.90 |
| 6 | 203.4 | 300 | 8.85 |
| 8 | 271.2 | 400 | 11.80 |
| 10 | 339.1 | 600 | 17.70 |

To convert manually: multiply oz/yd² by 33.906 to get GSM, or multiply GSM by 0.0295 to get oz/yd². Rounded catalog figures (for example "6 oz" cloth listed at 200 g/m²) are approximations, so confirm the nominal value and tolerance on the supplier data sheet rather than relying on a rounded label.

## Why the Two Units Coexist

Metric datasheets, ISO-aligned technical drawings, and most non-US suppliers use GSM. US marine, repair, and hobby channels often use oz/yd². A global RFQ frequently mixes both, so a buyer comparing a "300 GSM" biaxial from one mill against a "6 oz" cloth from another is comparing roughly the same areal mass — but only after conversion, and only on weight.

Areal weight (mass per unit area) is also different from linear or "yield" measures such as ounces per linear yard, which depend on roll width. When a figure is given, confirm it is per unit **area**, not per linear length.

## What Fabric Weight Does Specify

- **Areal mass:** the amount of glass per square meter, which drives how many plies reach a target laminate thickness and fiber content.
- **A comparison anchor:** within the same construction and fiber, a heavier fabric generally builds thickness faster per ply.
- **Handling scale:** very light tissues and very heavy woven rovings behave differently in cutting, wet-out, and drape.

## What Fabric Weight Does Not Specify

### Weave and construction

A 200 GSM plain weave, a 200 GSM twill, and a 200 GSM unidirectional can share the same weight and behave very differently. State the construction separately. See the [unidirectional vs woven fiberglass guide](/blog/unidirectional-vs-woven-fiberglass-guide) when the construction is still open.

### Thickness

Dry-fabric weight does not fix cured laminate thickness. Thickness depends on fiber volume fraction, compaction, resin, process, and measurement method. Do not convert a GSM value directly into a ply thickness.

### Fiber type and grade

E-glass, ECR-glass, S-glass, and basalt can be produced at the same areal weight with different properties. Weight is not a fiber identifier. For a cross-material comparison, see [basalt fiber vs fiberglass](/blog/basalt-fiber-vs-fiberglass-selection-guide).

### Strength and stiffness

Two fabrics at equal weight can differ in mechanical performance because of fiber, weave, and how the reinforcement is oriented relative to the load. Weight is an input to a laminate, not a performance rating.

## How Weight Fits a Complete Specification

Treat weight as one field among several. A comparable RFQ line reads more like this:

| Field | Example | Why it matters |
|---|---|---|
| Fiber type / grade | E-glass, ECR, S-glass, basalt | Weight alone is not a fiber |
| Construction | plain, twill, woven roving, UD, biaxial | Same weight, different behavior |
| Nominal areal weight | 300 g/m² (8.85 oz/yd²) | State both units to avoid mix-ups |
| Weight tolerance | ±5% or project value | Controls lot-to-lot consistency |
| Usable width | mm and inches | Cutting plan and yield |
| Sizing / resin basis | epoxy, vinyl ester, polyester | Wet-out and adhesion |
| Test / documentation | data sheet, CoA | Objective acceptance |

When both units and a tolerance appear on the line, two suppliers can be compared on the same basis. A rounded label with no tolerance cannot be audited against a delivery.

## Measuring and Verifying Weight

Areal weight is verified by cutting a known area, conditioning it, and weighing it. ASTM D3776, *Standard Test Methods for Mass Per Unit Area (Weight) of Fabric*, is the widely referenced textile method; suppliers may also cite an equivalent ISO or in-house method. For acceptance, agree on:

1. The test method and specimen area.
2. The nominal value **and** tolerance.
3. Whether conditioning (moisture, sizing loss on ignition) is included.

A single coupon weight is a spot check, not a roll-level guarantee. For structural work, confirm how the supplier reports and controls weight across a lot.

## Common Conversion Mistakes

- **Rounding as if exact:** "6 oz = 200 GSM" is convenient but rounded; the exact value is 203.4 g/m².
- **Mixing area and length:** oz/yd² (area) is not oz per linear yard (depends on width).
- **Treating weight as thickness:** cured thickness is a laminate result, not a fabric constant.
- **Assuming weight ranks strength:** orientation and construction can outweigh raw mass.

## FAQ

### How do I convert oz/yd² to GSM?

Multiply the oz/yd² value by 33.906. For example, 6 oz/yd² × 33.906 = 203.4 g/m². To go the other way, multiply GSM by 0.0295: 300 g/m² × 0.0295 = 8.85 oz/yd². Catalog labels are often rounded, so use the supplier's nominal figure and tolerance for a real specification.

### Does a heavier fabric mean a stronger laminate?

Not by itself. A higher areal weight builds thickness faster per ply, but laminate strength and stiffness depend on fiber type, weave or stitch construction, fiber orientation relative to the load, fiber volume fraction, and the resin system. Two fabrics of equal weight can perform very differently, so weight should be specified alongside those fields rather than treated as a performance rating.

### Is oz/yd² the same as ounces per linear yard?

No. Ounces per square yard is an areal weight (mass per unit area) and is directly convertible to GSM. Ounces per linear yard depends on the roll width, so it is not interchangeable with GSM. Always confirm whether a weight figure is per unit area before converting or comparing it.

## Next Step

Once weight, construction, fiber, width, and tolerance are defined, move the line into the [composite reinforcement RFQ checklist](/blog/composite-reinforcement-rfq-checklist) and review the full field list in the [carbon fiber fabric specification guide](/blog/carbon-fiber-fabric-specification-guide). ZeYuSen Fiber's [woven roving](/glass-fiber/fiberglass-cloth/woven-roving) and [plain-weave cloth](/glass-fiber/fiberglass-cloth/plain-weave) pages list the constructions the weights above typically describe. [Send the requirements](/contact) with both units stated for a comparable quotation.

## Source and Evidence Boundary

- Unit conversion is exact arithmetic: 1 oz/yd² = 33.906 g/m² (1 oz = 28.3495 g; 1 yd² = 0.83613 m²).
- Test method reference: ASTM D3776, *Standard Test Methods for Mass Per Unit Area (Weight) of Fabric*, checked 2026-07-16.
- Product availability statements are limited to the current ZeYuSen Fiber catalog.
- This guide does not claim that a given weight guarantees strength, thickness, processing behavior, or search results.
