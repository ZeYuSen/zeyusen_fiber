---
title: "Capas del laminado de composite: superficie, estructural y núcleo"
description: "Cómo combina un laminado de composite refuerzos de superficie, estructurales y de núcleo en un conjunto funcional, y qué especificar por capa al solicitar una cotización."
slug: "composite-laminate-layers-surface-structural-core"
date: "2026-07-16"
dateModified: "2026-07-16"
tags: ["laminado de composite", "esquema de laminado", "velo superficial", "refuerzo estructural", "material de núcleo", "secuencia de capas"]
image: "/images/blog/composite-laminate-layers-cover.webp"
---

# Capas del laminado de composite: superficie, estructural y núcleo

Un composite terminado rara vez es un solo tejido. Es una pila de capas de refuerzo, cada una con una función distinta: una capa superficial fina para el acabado, capas estructurales para la carga y, a veces, un núcleo para rigidez y espesor. Entender cómo se combinan estas funciones ayuda al comprador a especificar cada capa correctamente en lugar de pedir un solo "tejido" y esperar que la pieza rinda.

Esta guía describe las capas funcionales habituales en un laminado y qué definir para cada una en una RFQ. Es una ayuda de planificación; la secuencia de laminado real, la fracción de fibra y la validación corresponden a su ingeniería y proceso.

## Las tres funciones

La mayoría de los laminados de laminación manual e infusión pueden leerse como tres zonas funcionales, incluso cuando usan muchas capas.

| Función | Refuerzo típico | Qué aporta |
|---|---|---|
| Superficie | velo/tissue superficial, tejido ligero | Acabado liso, capa rica en resina, control de la transparencia de fibras |
| Estructural | tejido roving, biaxial/multiaxial, UD, CSM | Soporte de carga, generación de espesor, orientación |
| Núcleo | espuma, balsa, colmena de PP, mat grueso | Rigidez a flexión con poco peso |

Una pieza dada puede usar una, dos o las tres. Las capas se eligen en conjunto, no de forma aislada, porque cada una afecta la impregnación, el espesor y la calidad superficial.

## Capa superficial: acabado y transparencia de fibras

El refuerzo más externo suele ser un **velo o tissue superficial** ligero. Su función es cosmética y protectora más que estructural:

- Crea una superficie rica en resina que reproduce el acabado del molde.
- Reduce la "transparencia de fibras", donde el patrón del tejido estructural pesado se marca en la superficie.
- Puede mejorar la resistencia a la corrosión o la intemperie en la cara expuesta.

Por ser fina, la capa superficial aporta poco a la resistencia. Especifíquela por peso y fibra, y haga coincidir su ensimaje con la resina. Consulte la [guía de velo superficial de fibra de vidrio](/blog/fiberglass-surface-tissue-for-composite-finish) para saber cómo los velos controlan el acabado.

## Capas estructurales: carga y orientación

Las capas estructurales soportan la carga y generan la mayor parte del espesor. Aquí es donde más importan la construcción del tejido y la orientación de la fibra:

- El **tejido roving y las telas pesadas** generan espesor de forma eficiente en dos direcciones.
- Los **tejidos biaxiales y multiaxiales cosidos** colocan las fibras en ángulos definidos (0/90, ±45) con menos ondulación que los tejidos convencionales.
- El **unidireccional (UD)** concentra fibras a lo largo de una única trayectoria de carga.
- El **mat de hebra cortada** añade una capa isotrópica e interlaminar en laminados de poliéster/viniléster.

La elección depende de dónde actúa la carga. Compare construcciones en la [guía de fibra de vidrio unidireccional frente a tejida](/blog/unidirectional-vs-woven-fiberglass-guide) y en la [guía de mat de hebra cortada frente a tejido roving](/blog/fiberglass-chopped-strand-mat-vs-woven-roving). Cada capa estructural sigue necesitando su propio peso, construcción y orientación en la especificación.

## Capa de núcleo: rigidez sin peso

Un **núcleo** separa las pieles estructurales para que el laminado resista la flexión mucho mejor en relación con su peso: el principio de sándwich. Los núcleos incluyen espuma, balsa, colmena y mats especiales gruesos. Para un comprador, el núcleo introduce sus propios campos: tipo, espesor, densidad y cómo se adhieren las pieles a él. Un núcleo cambia toda la construcción, así que debe planificarse junto con las capas estructurales, no añadirse después.

## Cómo leer un esquema de laminado sencillo

Un esquema de laminado enumera las capas en orden, desde la superficie del molde hacia el interior. Una piel de casco de poliéster básica podría leerse así:

```text
1. Gelcoat (no es un refuerzo)
2. Velo superficial ~30 g/m2   — acabado, control de transparencia de fibras
3. CSM 300 g/m2              — capa de unión sobre el velo
4. Tejido roving 600 g/m2     — estructural
5. CSM 300 g/m2              — unión entre capas
6. Tejido roving 600 g/m2     — estructural
```

Cada línea es un artículo comprable con su propio peso, construcción y ensimaje o aglutinante ajustado a la resina. El esquema también implica una secuencia de construcción y un sistema de resina, ambos determinantes de qué refuerzos son compatibles. Confirme la compatibilidad de aglutinante/resina con la [guía de ensimaje del refuerzo y compatibilidad con la resina](/blog/reinforcement-sizing-resin-compatibility-guide) antes de finalizar.

## Qué especificar por capa

Para cada capa de la pila, defina:

- **Función** (superficie / estructural / núcleo) para que la intención sea clara.
- **Fibra y grado** (E-glass, ECR, S-glass, carbono, basalto).
- **Construcción** (velo, CSM, tejido roving, biaxial, UD o tipo de núcleo).
- **Peso nominal y tolerancia**, en GSM y oz/yd² cuando sea útil; consulte la [guía de peso de tejido](/blog/fiberglass-fabric-weight-gsm-oz-conversion-guide).
- **Orientación** para tejidos direccionales.
- **Ensimaje / aglutinante** ajustado al sistema de resina.
- **Ancho y datos de rollo** para el plan de corte.

Una pila especificada así puede cotizarse capa por capa y compararse de forma justa entre proveedores.

## FAQ

### ¿Por qué no usar un solo tejido pesado en lugar de varias capas?

Porque las capas cumplen funciones distintas. Un velo superficial fino controla el acabado y la transparencia de fibras, los tejidos estructurales soportan la carga y fijan la orientación de la fibra, y un núcleo añade rigidez a flexión con poco peso. Un solo tejido pesado no puede ofrecer a la vez un buen acabado, orientación ajustada y rigidez de sándwich. Construir la pila con capas elegidas por propósito da un control sobre acabado, dirección de resistencia, espesor y peso que un solo tejido no puede igualar.

### ¿Qué es un esquema de laminado?

Un esquema de laminado es una lista ordenada de las capas de refuerzo de una pieza, escrita desde la superficie del molde hacia el interior, con la fibra, construcción, peso y orientación de cada capa. Define tanto qué comprar como la secuencia de laminado. Como el esquema también implica un sistema de resina y un orden de construcción, es el documento donde se reúnen el peso por capa, la orientación y la compatibilidad de ensimaje/aglutinante.

### ¿Cómo encaja el núcleo en el recuento de capas?

El núcleo se sitúa entre las pieles estructurales y aporta rigidez a flexión con poco peso, siguiendo el principio de sándwich. Se especifica por separado según tipo, espesor y densidad, y cambia cómo se laminan y adhieren las pieles. Planifique el núcleo junto con las capas estructurales en lugar de añadirlo después, porque afecta a toda la construcción y a las decisiones de resina/adhesivo.

## Siguiente Paso

Convierta su plan de capas en una solicitud comparable con la [lista de verificación RFQ de refuerzos de composites](/blog/composite-reinforcement-rfq-checklist), y confirme el peso y la compatibilidad de cada capa con la [guía de peso de tejido](/blog/fiberglass-fabric-weight-gsm-oz-conversion-guide) y la [guía de ensimaje y compatibilidad con la resina](/blog/reinforcement-sizing-resin-compatibility-guide). ZeYuSen Fiber suministra refuerzos de [velo superficial](/glass-fiber/tissue-mat/surface-tissue), [tejido roving](/glass-fiber/fiberglass-cloth/woven-roving) y [multiaxial](/glass-fiber/fiberglass-cloth/multiaxial) que cumplen estas funciones; una pila concreta debe validarse en su proceso. [Envíe su esquema de laminado](/contact) para una cotización capa por capa.

## Fuente y límite de la evidencia

- Las funciones de las capas y el principio de sándwich son conceptos generales de ingeniería de composites presentados como orientación para el comprador, no declaraciones de prestaciones específicas de una pieza.
- La compatibilidad de aglutinante/resina sigue la [guía de ensimaje y compatibilidad con la resina](/blog/reinforcement-sizing-resin-compatibility-guide) y su fuente citada.
- Las declaraciones de disponibilidad de producto se limitan al catálogo actual de ZeYuSen Fiber.
- Esta guía no afirma resistencia, rigidez ni ahorro de peso específicos para ningún laminado; eso depende del diseño, los materiales y el proceso validado.
</content>
