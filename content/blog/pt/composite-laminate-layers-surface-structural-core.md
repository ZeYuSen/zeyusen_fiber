---
title: "Camadas do laminado composto: superfície, estrutural e núcleo"
description: "Como um laminado composto combina reforços de superfície, estruturais e de núcleo em uma pilha funcional, e o que especificar por camada ao solicitar uma cotação."
slug: "composite-laminate-layers-surface-structural-core"
date: "2026-07-16"
dateModified: "2026-07-16"
tags: ["laminado composto", "esquema de laminação", "véu de superfície", "reforço estrutural", "material de núcleo", "sequência de camadas"]
image: "/images/blog/composite-laminate-layers-cover.webp"
---

# Camadas do laminado composto: superfície, estrutural e núcleo

Um composto acabado raramente é feito de um único tecido. É uma pilha de camadas de reforço, cada uma cumprindo uma função diferente: uma camada fina de superfície para o acabamento, camadas estruturais para a carga e, às vezes, um núcleo para rigidez e espessura. Entender como essas funções se combinam ajuda o comprador a especificar corretamente cada camada em vez de pedir um único "tecido" e esperar que a peça funcione.

Este guia descreve as camadas funcionais comuns em um laminado e o que definir para cada uma em uma RFQ. É um auxílio de planejamento; a sequência de laminação real, a fração volumétrica de fibra e a validação pertencem à sua engenharia e ao seu processo.

## As três funções principais

A maioria dos laminados por laminação manual ou infusão pode ser lida como três zonas funcionais, mesmo quando usam muitas camadas.

| Função | Reforço típico | O que contribui |
|---|---|---|
| Superfície | véu de superfície, tecido leve | Acabamento liso, camada rica em resina, controle de marcação |
| Estrutural | roving tecido, biaxial/multiaxial, UD, manta de fibras cortadas | Suporte de carga, construção de espessura, orientação |
| Núcleo | espuma, balsa, colmeia de PP, manta espessa | Rigidez à flexão com baixo peso |

Uma determinada peça pode usar uma, duas ou as três funções. As camadas são escolhidas em conjunto, não isoladamente, porque cada uma afeta a impregnação, a espessura e a qualidade da superfície.

## Camada de superfície: acabamento e marcação

O reforço mais externo geralmente é um **véu ou manta de superfície** leve. Sua função é cosmética e protetora, não estrutural:

- Cria uma superfície rica em resina que reproduz o acabamento do molde.
- Reduz a "marcação" (print-through), em que o padrão do tecido estrutural pesado aparece na superfície.
- Pode melhorar a resistência à corrosão ou ao clima na face exposta.

Por ser fina, a camada de superfície contribui pouco para a resistência. Especifique-a por peso e fibra, e combine seu sizing com a resina. Consulte o [guia de véu de superfície em fibra de vidro](/blog/fiberglass-surface-tissue-for-composite-finish) para saber como os véus controlam o acabamento.

## Camadas estruturais: carga e orientação

As camadas estruturais suportam a carga e constroem a maior parte da espessura. É aqui que a construção do tecido e a orientação da fibra mais importam:

- **Roving tecido e tecidos pesados** constroem espessura eficientemente em duas direções.
- **Tecidos biaxiais e multiaxiais costurados** posicionam as fibras em ângulos escolhidos (0/90, ±45) com menos ondulação do que os tecidos entrelaçados.
- **Unidirecional (UD)** concentra as fibras ao longo de um caminho de carga.
- **Manta de fibras cortadas** adiciona uma camada isotrópica e interlaminar em laminações de poliéster/éster vinílica.

A escolha depende de onde a carga atua. Compare construções no [guia de fibra de vidro unidirecional versus tecida](/blog/unidirectional-vs-woven-fiberglass-guide) e no [guia de manta de fibras cortadas versus roving tecido](/blog/fiberglass-chopped-strand-mat-vs-woven-roving). Cada camada estrutural ainda precisa de seu próprio peso, construção e orientação na especificação.

## Camada de núcleo: rigidez sem peso

Um **núcleo** separa as peles estruturais de modo que o laminado resista muito melhor à flexão para seu peso — o princípio sanduíche. Os núcleos incluem espuma, balsa, colmeia e mantas especiais espessas. Para o comprador, o núcleo introduz seus próprios campos: tipo, espessura, densidade e como as peles se colam a ele. Um núcleo muda toda a construção, portanto deve ser planejado junto com as camadas estruturais, não adicionado depois.

## Lendo um esquema de laminação simples

Um esquema de laminação lista as camadas em ordem, da superfície do molde para dentro. Uma pele de casco de poliéster básica pode se ler assim:

```text
1. Gelcoat (não é um reforço)
2. Véu de superfície ~30 g/m2   — acabamento, controle de marcação
3. Manta de fibras cortadas 300 g/m2   — camada de ligação sobre o véu
4. Roving tecido 600 g/m2      — estrutural
5. Manta de fibras cortadas 300 g/m2   — ligação entre camadas
6. Roving tecido 600 g/m2      — estrutural
```

Cada linha é um item comprável com seu próprio peso, construção e sizing ou aglutinante compatível com a resina. O esquema também implica uma sequência de construção e um sistema de resina, ambos afetando quais reforços são compatíveis. Confirme a compatibilidade de aglutinante/resina usando o [guia de sizing de reforço e compatibilidade com a resina](/blog/reinforcement-sizing-resin-compatibility-guide) antes de finalizar.

## O que especificar por camada

Para cada camada da pilha, defina:

- **Função** (superfície / estrutural / núcleo) para deixar a intenção clara.
- **Fibra e grau** (E-glass, ECR, S-glass, carbono, basalto).
- **Construção** (véu, manta de fibras cortadas, roving tecido, biaxial, UD ou tipo de núcleo).
- **Peso nominal e tolerância**, em GSM e oz/yd² quando útil — consulte o [guia de peso do tecido](/blog/fiberglass-fabric-weight-gsm-oz-conversion-guide).
- **Orientação** para tecidos direcionais.
- **Sizing / aglutinante** combinado com o sistema de resina.
- **Largura e dados do rolo** para o plano de corte.

Uma pilha especificada dessa forma pode ser cotada camada por camada e comparada de forma justa entre fornecedores.

## FAQ

### Por que não usar um único tecido pesado em vez de várias camadas?

Porque as camadas cumprem funções diferentes. Um véu de superfície fino controla o acabamento e a marcação, os tecidos estruturais suportam a carga e definem a orientação da fibra, e um núcleo adiciona rigidez à flexão com baixo peso. Um único tecido pesado não consegue oferecer boa superfície, orientação ajustada e rigidez sanduíche ao mesmo tempo. Construir a pilha a partir de camadas escolhidas por propósito dá controle sobre acabamento, direção de resistência, espessura e peso que um único tecido não consegue igualar.

### O que é um esquema de laminação?

Um esquema de laminação é uma lista ordenada das camadas de reforço em uma peça, escrita da superfície do molde para dentro, com a fibra, construção, peso e orientação de cada camada. Ele define tanto o que comprar quanto a sequência de laminação. Como o esquema também implica um sistema de resina e uma ordem de construção, é o documento onde o peso por camada, a orientação e a compatibilidade de sizing/aglutinante se reúnem.

### Como o núcleo se encaixa na contagem de camadas?

O núcleo fica entre as peles estruturais e fornece rigidez à flexão com baixo peso, seguindo o princípio sanduíche. É especificado separadamente por tipo, espessura e densidade, e muda como as peles são laminadas e coladas a ele. Planeje o núcleo junto com as camadas estruturais em vez de adicioná-lo depois, porque ele afeta toda a construção e as escolhas de resina/adesivo.

## Próximo Passo

Transforme seu plano de camadas em uma solicitação comparável com o [checklist de RFQ para reforços de compósitos](/blog/composite-reinforcement-rfq-checklist), e confirme o peso e a compatibilidade de cada camada com o [guia de peso do tecido](/blog/fiberglass-fabric-weight-gsm-oz-conversion-guide) e o [guia de sizing e compatibilidade com a resina](/blog/reinforcement-sizing-resin-compatibility-guide). A ZeYuSen Fiber fornece reforços de [véu de superfície](/glass-fiber/tissue-mat/surface-tissue), [roving tecido](/glass-fiber/fiberglass-cloth/woven-roving) e [multiaxial](/glass-fiber/fiberglass-cloth/multiaxial) que cumprem essas funções; uma pilha específica deve ser validada em seu processo. [Envie seu esquema de laminação](/contact) para uma cotação camada por camada.

## Fonte e limite das evidências

- As funções das camadas e o princípio sanduíche são conceitos gerais de engenharia de compostos apresentados para orientação do comprador, não declarações de desempenho específicas de peça.
- A compatibilidade de aglutinante/resina segue o [guia de sizing e compatibilidade com a resina](/blog/reinforcement-sizing-resin-compatibility-guide) e sua fonte citada.
- As declarações de disponibilidade de produto se limitam ao catálogo atual da ZeYuSen Fiber.
- Este guia não afirma resistência, rigidez ou economia de peso específicas para nenhum laminado; isso depende do projeto, dos materiais e do processo validado.
