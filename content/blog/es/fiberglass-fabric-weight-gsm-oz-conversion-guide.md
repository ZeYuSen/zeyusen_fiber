---
title: "Guía de peso de tejido de fibra de vidrio: GSM, oz/yd² y conversión"
description: "Cómo leer el peso del tejido de fibra de vidrio en GSM y oz/yd², convertir entre ambas unidades, y entender qué especifica y qué no especifica el peso superficial en una RFQ."
slug: "fiberglass-fabric-weight-gsm-oz-conversion-guide"
date: "2026-07-16"
dateModified: "2026-07-16"
tags: ["peso de tejido de fibra de vidrio", "GSM", "oz/yd2", "peso superficial", "especificación de tejido", "tela de fibra de vidrio"]
image: "/images/blog/fiberglass-fabric-weight-gsm-cover.webp"
---

# Guía de peso de tejido de fibra de vidrio: GSM, oz/yd² y conversión

El peso del tejido es la masa de refuerzo por unidad de superficie. Se expresa en gramos por metro cuadrado (GSM, o g/m²) en especificaciones métricas y en onzas por yarda cuadrada (oz/yd²) en especificaciones estadounidenses. Ambas describen la misma propiedad en unidades distintas.

El peso es una de las cifras más citadas en una compra de fibra de vidrio, y también una de las más sobreinterpretadas. Fija la masa superficial. Por sí solo no define el ligamento, el tipo de fibra, el espesor, la resistencia ni el acabado. Esta guía muestra cómo convertir entre unidades y cómo mantener el peso en su lugar correcto dentro de una especificación completa.

## Referencia rápida de conversión

La relación exacta es **1 oz/yd² = 33.906 g/m²** (y 1 g/m² = 0.0295 oz/yd²).

| oz/yd² | GSM (g/m²) | GSM | oz/yd² |
|---:|---:|---:|---:|
| 2 | 67.8 | 100 | 2.95 |
| 4 | 135.6 | 200 | 5.90 |
| 6 | 203.4 | 300 | 8.85 |
| 8 | 271.2 | 400 | 11.80 |
| 10 | 339.1 | 600 | 17.70 |

Para convertir manualmente: multiplique oz/yd² por 33.906 para obtener GSM, o multiplique GSM por 0.0295 para obtener oz/yd². Las cifras redondeadas de catálogo (por ejemplo, un tejido "6 oz" listado como 200 g/m²) son aproximaciones, así que confirme el valor nominal y la tolerancia en la ficha técnica del proveedor en lugar de confiar en una etiqueta redondeada.

## Por qué coexisten las dos unidades

Las fichas técnicas métricas, los planos técnicos alineados con ISO y la mayoría de los proveedores fuera de EE. UU. usan GSM. Los canales estadounidenses de náutica, reparación y afición suelen usar oz/yd². Una RFQ global mezcla frecuentemente ambas unidades, así que un comprador que compare un biaxial "300 GSM" de un fabricante con un tejido "6 oz" de otro está comparando una masa superficial aproximadamente igual, pero solo después de convertir, y solo en cuanto al peso.

El peso superficial (masa por unidad de área) también es distinto de las medidas lineales o de "rendimiento", como las onzas por yarda lineal, que dependen del ancho del rollo. Cuando se dé una cifra, confirme que es por unidad de **área**, no por longitud lineal.

## Qué especifica el peso del tejido

- **Masa superficial:** la cantidad de vidrio por metro cuadrado, que determina cuántas capas se necesitan para alcanzar un espesor y un contenido de fibra objetivo en el laminado.
- **Un punto de comparación:** dentro de la misma construcción y fibra, un tejido más pesado suele generar espesor más rápido por capa.
- **Escala de manipulación:** los velos muy ligeros y los tejidos roving muy pesados se comportan de forma distinta al cortar, impregnar y drapear.

## Qué no especifica el peso del tejido

### Ligamento y construcción

Un tafetán de 200 GSM, una sarga de 200 GSM y un unidireccional de 200 GSM pueden compartir el mismo peso y comportarse de forma muy distinta. Indique la construcción por separado. Consulte la [guía de fibra de vidrio unidireccional frente a tejida](/blog/unidirectional-vs-woven-fiberglass-guide) cuando la construcción todavía esté abierta.

### Espesor

El peso del tejido seco no fija el espesor del laminado curado. El espesor depende de la fracción volumétrica de fibra, la compactación, la resina, el proceso y el método de medición. No convierta directamente un valor GSM en el espesor de una capa.

### Tipo y grado de fibra

El E-glass, el ECR-glass, el S-glass y el basalto pueden producirse con el mismo peso superficial y propiedades distintas. El peso no es un identificador de fibra. Para una comparación entre materiales, consulte [fibra de basalto frente a fibra de vidrio](/blog/basalt-fiber-vs-fiberglass-selection-guide).

### Resistencia y rigidez

Dos tejidos de igual peso pueden diferir en prestaciones mecánicas por la fibra, el ligamento y cómo se orienta el refuerzo respecto a la carga. El peso es un dato de entrada para un laminado, no una calificación de prestaciones.

## Cómo encaja el peso en una especificación completa

Trate el peso como un campo más entre varios. Una línea de RFQ comparable se lee más bien así:

| Campo | Ejemplo | Por qué importa |
|---|---|---|
| Tipo / grado de fibra | E-glass, ECR, S-glass, basalto | El peso por sí solo no es una fibra |
| Construcción | tafetán, sarga, tejido roving, UD, biaxial | Mismo peso, comportamiento distinto |
| Peso superficial nominal | 300 g/m² (8.85 oz/yd²) | Indique ambas unidades para evitar confusiones |
| Tolerancia de peso | ±5% o el valor del proyecto | Controla la consistencia entre lotes |
| Ancho útil | mm y pulgadas | Plan de corte y rendimiento |
| Base de ensimaje / resina | epoxi, viniléster, poliéster | Impregnación y adhesión |
| Ensayo / documentación | ficha técnica, CoA | Aceptación objetiva |

Cuando aparecen ambas unidades y una tolerancia en la línea, dos proveedores pueden compararse sobre la misma base. Una etiqueta redondeada sin tolerancia no puede auditarse frente a una entrega.

## Medición y verificación del peso

El peso superficial se verifica cortando un área conocida, acondicionándola y pesándola. La norma ASTM D3776, *Standard Test Methods for Mass Per Unit Area (Weight) of Fabric*, es el método textil ampliamente referenciado; los proveedores también pueden citar un método ISO equivalente o interno. Para la aceptación, acuerde:

1. El método de ensayo y el área de la probeta.
2. El valor nominal **y** la tolerancia.
3. Si se incluye el acondicionamiento (humedad, pérdida de ensimaje por ignición).

El peso de una única probeta es una comprobación puntual, no una garantía a nivel de rollo. Para trabajo estructural, confirme cómo el proveedor reporta y controla el peso a lo largo de un lote.

## Errores comunes de conversión

- **Redondear como si fuera exacto:** "6 oz = 200 GSM" es cómodo pero redondeado; el valor exacto es 203.4 g/m².
- **Mezclar área y longitud:** oz/yd² (área) no es lo mismo que oz por yarda lineal (depende del ancho).
- **Tratar el peso como espesor:** el espesor curado es un resultado del laminado, no una constante del tejido.
- **Suponer que el peso ordena la resistencia:** la orientación y la construcción pueden pesar más que la masa bruta.

## FAQ

### ¿Cómo convierto oz/yd² a GSM?

Multiplique el valor en oz/yd² por 33.906. Por ejemplo, 6 oz/yd² × 33.906 = 203.4 g/m². Para ir en sentido inverso, multiplique GSM por 0.0295: 300 g/m² × 0.0295 = 8.85 oz/yd². Las etiquetas de catálogo suelen estar redondeadas, así que use la cifra nominal y la tolerancia del proveedor para una especificación real.

### ¿Un tejido más pesado significa un laminado más resistente?

No por sí solo. Un peso superficial mayor genera espesor más rápido por capa, pero la resistencia y la rigidez del laminado dependen del tipo de fibra, la construcción del ligamento o cosido, la orientación de la fibra respecto a la carga, la fracción volumétrica de fibra y el sistema de resina. Dos tejidos de igual peso pueden comportarse de forma muy distinta, así que el peso debe especificarse junto con esos campos y no tratarse como una calificación de prestaciones.

### ¿Es lo mismo oz/yd² que onzas por yarda lineal?

No. Las onzas por yarda cuadrada son un peso superficial (masa por unidad de área) y se convierten directamente a GSM. Las onzas por yarda lineal dependen del ancho del rollo, por lo que no son intercambiables con GSM. Confirme siempre si una cifra de peso es por unidad de área antes de convertirla o compararla.

## Siguiente Paso

Una vez definidos el peso, la construcción, la fibra, el ancho y la tolerancia, traslade la línea a la [lista de verificación RFQ de refuerzos de composites](/blog/composite-reinforcement-rfq-checklist) y revise la lista completa de campos en la [guía de especificación de tejido de fibra de carbono](/blog/carbon-fiber-fabric-specification-guide). Las páginas de [tejido roving](/glass-fiber/fiberglass-cloth/woven-roving) y [tela de tafetán](/glass-fiber/fiberglass-cloth/plain-weave) de ZeYuSen Fiber enumeran las construcciones que los pesos anteriores suelen describir. [Envíe los requisitos](/contact) con ambas unidades indicadas para una cotización comparable.

## Fuente y límite de la evidencia

- La conversión de unidades es aritmética exacta: 1 oz/yd² = 33.906 g/m² (1 oz = 28.3495 g; 1 yd² = 0.83613 m²).
- Referencia del método de ensayo: ASTM D3776, *Standard Test Methods for Mass Per Unit Area (Weight) of Fabric*, consultada el 16 de julio de 2026.
- Las declaraciones de disponibilidad se limitan al catálogo actual de ZeYuSen Fiber.
- Esta guía no afirma que un peso determinado garantice resistencia, espesor, comportamiento de proceso ni resultados de búsqueda.
</content>
