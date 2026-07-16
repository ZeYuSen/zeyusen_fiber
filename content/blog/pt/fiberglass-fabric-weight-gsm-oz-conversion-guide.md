---
title: "Guia de peso do tecido de fibra de vidro: GSM, oz/yd² e conversão"
description: "Como ler o peso do tecido de fibra de vidro em GSM e oz/yd², converter entre as duas unidades e entender o que o peso areal especifica e não especifica em uma RFQ."
slug: "fiberglass-fabric-weight-gsm-oz-conversion-guide"
date: "2026-07-16"
dateModified: "2026-07-16"
tags: ["peso do tecido de fibra de vidro", "GSM", "oz/yd2", "peso areal", "especificação de tecido", "tecido de fibra de vidro"]
image: "/images/blog/fiberglass-fabric-weight-gsm-cover.webp"
---

# Guia de peso do tecido de fibra de vidro: GSM, oz/yd² e conversão

Peso do tecido é a massa de reforço por unidade de área. É expresso em gramas por metro quadrado (GSM, ou g/m²) em especificações métricas e em onças por jarda quadrada (oz/yd²) em especificações americanas. As duas unidades descrevem a mesma propriedade em unidades diferentes.

Peso é um dos números mais citados em uma compra de fibra de vidro, e também um dos mais interpretados além do que realmente informa. Ele fixa a massa areal. Não define, por si só, o ligamento, o tipo de fibra, a espessura, a resistência ou o acabamento. Este guia mostra como converter entre as unidades e como manter o peso em seu lugar correto dentro de uma especificação completa.

## Referência rápida de conversão

A relação exata é **1 oz/yd² = 33.906 g/m²** (e 1 g/m² = 0.0295 oz/yd²).

| oz/yd² | GSM (g/m²) | GSM | oz/yd² |
|---:|---:|---:|---:|
| 2 | 67.8 | 100 | 2.95 |
| 4 | 135.6 | 200 | 5.90 |
| 6 | 203.4 | 300 | 8.85 |
| 8 | 271.2 | 400 | 11.80 |
| 10 | 339.1 | 600 | 17.70 |

Para converter manualmente: multiplique oz/yd² por 33.906 para obter GSM, ou multiplique GSM por 0.0295 para obter oz/yd². Valores de catálogo arredondados (por exemplo, um tecido "6 oz" listado como 200 g/m²) são aproximações, portanto confirme o valor nominal e a tolerância na ficha técnica do fornecedor em vez de confiar em um rótulo arredondado.

## Por que as duas unidades coexistem

Fichas técnicas métricas, desenhos técnicos alinhados à ISO e a maioria dos fornecedores fora dos EUA usam GSM. Os setores náutico, de reparo e de hobby nos EUA costumam usar oz/yd². Uma RFQ global frequentemente mistura ambas, portanto um comprador que compara um biaxial "300 GSM" de um fabricante com um tecido "6 oz" de outro está comparando aproximadamente a mesma massa areal — mas apenas após a conversão, e apenas quanto ao peso.

O peso areal (massa por unidade de área) também é diferente de medidas lineares ou de "rendimento", como onças por jarda linear, que dependem da largura do rolo. Quando um valor é informado, confirme que ele é por unidade de **área**, não por comprimento linear.

## O que o peso do tecido especifica

- **Massa areal:** a quantidade de vidro por metro quadrado, que determina quantas camadas são necessárias para atingir uma espessura de laminado e um teor de fibra desejados.
- **Uma referência de comparação:** dentro da mesma construção e fibra, um tecido mais pesado geralmente constrói espessura mais rápido por camada.
- **Escala de manuseio:** véus muito leves e rovings tecidos muito pesados se comportam de forma diferente no corte, na impregnação e na conformabilidade.

## O que o peso do tecido não especifica

### Ligamento e construção

Um tafetá de 200 GSM, uma sarja de 200 GSM e um unidirecional de 200 GSM podem compartilhar o mesmo peso e se comportar de forma muito diferente. Declare a construção separadamente. Consulte o [guia de fibra de vidro unidirecional versus tecida](/blog/unidirectional-vs-woven-fiberglass-guide) quando a construção ainda estiver em aberto.

### Espessura

O peso do tecido seco não fixa a espessura do laminado curado. A espessura depende da fração volumétrica de fibra, da compactação, da resina, do processo e do método de medição. Não converta diretamente um valor de GSM em espessura por camada.

### Tipo e grau da fibra

E-glass, ECR-glass, S-glass e basalto podem ser produzidos com a mesma massa areal e propriedades diferentes. O peso não é um identificador de fibra. Para uma comparação entre materiais, consulte [fibra de basalto versus fibra de vidro](/blog/basalt-fiber-vs-fiberglass-selection-guide).

### Resistência e rigidez

Dois tecidos com o mesmo peso podem diferir em desempenho mecânico por causa da fibra, do ligamento e de como o reforço está orientado em relação à carga. O peso é um dado de entrada para um laminado, não uma classificação de desempenho.

## Como o peso se encaixa em uma especificação completa

Trate o peso como um campo entre vários. Uma linha de RFQ comparável se lê mais assim:

| Campo | Exemplo | Por que importa |
|---|---|---|
| Tipo / grau da fibra | E-glass, ECR, S-glass, basalto | O peso isolado não é uma fibra |
| Construção | tafetá, sarja, roving tecido, UD, biaxial | Mesmo peso, comportamento diferente |
| Peso areal nominal | 300 g/m² (8.85 oz/yd²) | Informe as duas unidades para evitar confusão |
| Tolerância de peso | ±5% ou valor do projeto | Controla a consistência entre lotes |
| Largura útil | mm e polegadas | Plano de corte e rendimento |
| Sizing / base de resina | epóxi, éster vinílica, poliéster | Impregnação e adesão |
| Ensaio / documentação | ficha técnica, CoA | Aceitação objetiva |

Quando as duas unidades e uma tolerância aparecem na linha, dois fornecedores podem ser comparados na mesma base. Um rótulo arredondado sem tolerância não pode ser auditado contra uma entrega.

## Medindo e verificando o peso

O peso areal é verificado cortando uma área conhecida, condicionando-a e pesando-a. A norma ASTM D3776, *Standard Test Methods for Mass Per Unit Area (Weight) of Fabric*, é o método têxtil amplamente referenciado; os fornecedores também podem citar um método ISO equivalente ou interno. Para a aceitação, combine:

1. O método de ensaio e a área do corpo de prova.
2. O valor nominal **e** a tolerância.
3. Se o condicionamento (umidade, perda de sizing por ignição) está incluído.

Um único cupom pesado é uma verificação pontual, não uma garantia ao nível do rolo. Para trabalho estrutural, confirme como o fornecedor relata e controla o peso ao longo de um lote.

## Erros comuns de conversão

- **Arredondar como se fosse exato:** "6 oz = 200 GSM" é conveniente, mas arredondado; o valor exato é 203.4 g/m².
- **Misturar área e comprimento:** oz/yd² (área) não é oz por jarda linear (depende da largura).
- **Tratar peso como espessura:** a espessura curada é um resultado do laminado, não uma constante do tecido.
- **Supor que peso indica resistência:** orientação e construção podem superar a massa bruta.

## FAQ

### Como converto oz/yd² para GSM?

Multiplique o valor em oz/yd² por 33.906. Por exemplo, 6 oz/yd² × 33.906 = 203.4 g/m². Para o caminho inverso, multiplique GSM por 0.0295: 300 g/m² × 0.0295 = 8.85 oz/yd². Os rótulos de catálogo costumam ser arredondados, então use o valor nominal e a tolerância do fornecedor para uma especificação real.

### Um tecido mais pesado significa um laminado mais resistente?

Não por si só. Um peso areal maior constrói espessura mais rápido por camada, mas a resistência e a rigidez do laminado dependem do tipo de fibra, da construção do ligamento ou costura, da orientação da fibra em relação à carga, da fração volumétrica de fibra e do sistema de resina. Dois tecidos de mesmo peso podem ter desempenhos muito diferentes, então o peso deve ser especificado junto com esses campos, e não tratado como uma classificação de desempenho.

### oz/yd² é o mesmo que onças por jarda linear?

Não. Onças por jarda quadrada é um peso areal (massa por unidade de área) e é diretamente convertível para GSM. Onças por jarda linear depende da largura do rolo, portanto não é intercambiável com GSM. Confirme sempre se um valor de peso é por unidade de área antes de convertê-lo ou compará-lo.

## Próximo Passo

Depois de definidos peso, construção, fibra, largura e tolerância, leve a linha para o [checklist de RFQ para reforços de compósitos](/blog/composite-reinforcement-rfq-checklist) e revise a lista completa de campos no [guia de especificação de tecido de fibra de carbono](/blog/carbon-fiber-fabric-specification-guide). As páginas de [roving tecido](/glass-fiber/fiberglass-cloth/woven-roving) e [tecido em tafetá](/glass-fiber/fiberglass-cloth/plain-weave) da ZeYuSen Fiber listam as construções que os pesos acima costumam descrever. [Envie os requisitos](/contact) com as duas unidades informadas para uma cotação comparável.

## Fonte e limite das evidências

- A conversão de unidades é aritmética exata: 1 oz/yd² = 33.906 g/m² (1 oz = 28.3495 g; 1 yd² = 0.83613 m²).
- Referência de método de ensaio: ASTM D3776, *Standard Test Methods for Mass Per Unit Area (Weight) of Fabric*, consultada em 16 de julho de 2026.
- As declarações de disponibilidade de produto se limitam ao catálogo atual da ZeYuSen Fiber.
- Este guia não afirma que um determinado peso garanta resistência, espessura, comportamento de processamento ou resultados de busca.
