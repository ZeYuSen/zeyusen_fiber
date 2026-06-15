# 多语言（韩语 / 西班牙语 / 葡萄牙语）实施计划

> 本文件是给执行方（另一个 Claude 窗口）的完整施工说明书。请**逐阶段执行**，每阶段结束后运行该阶段末尾的验证命令，全绿再进入下一阶段。
>
> **强制前提**：本项目使用 `next@16.2.6`（App Router）。这是一个有破坏性改动的 Next.js 版本。动手写任何代码前，先读 `node_modules/next/dist/docs/` 里的相关指南，尤其是：
> - `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`
> - `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`
> - `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md`
> - `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`
>
> **Next 16 关键事实（已核对，勿凭记忆推翻）**：
> 1. `middleware.ts` 已更名为 **`proxy.ts`**（功能不变）。文件放项目根目录，导出 `proxy` 命名函数或 default，以及 `config.matcher`。
> 2. `sitemap.ts` 条目支持 `alternates.languages` 字段，自动输出 `xhtml:link rel="alternate" hreflang=...`。
> 3. `generateMetadata` 的 `alternates.languages` 输出 `<link rel="alternate" hreflang=...>`，`alternates.canonical` 输出 canonical。
> 4. 页面/布局的 `params` 是 **Promise**，必须 `await params`。`PageProps<'/[lang]'>` / `LayoutProps<'/[lang]'>` 是全局类型助手。

---

## 1. 目标与既定决策

给现有英文 B2B 网站（ZeYuSen Fiber，碳纤维/玻璃纤维制造商）新增三种语言：**韩语 `ko`、西班牙语 `es`、葡萄牙语 `pt`**。

用户已拍板的四个架构决策（不要重新讨论，直接按此执行）：

| 决策点 | 选定方案 | 含义 |
|---|---|---|
| 翻译范围 | **全站 AI 翻译**（推荐项） | UI、导航、SEO 元数据、产品数据、8 篇博客全部机器翻译。B2B 术语建议后续人工校对，但本次交付全部语言完整内容。 |
| URL slug | **本地化 slug** | 如 `/es/fibra-de-carbono`、`/ko/탄소섬유`。**不是** `/es/carbon-fiber`。 |
| 默认语言 | **英语改用 `/en` 前缀**（对长期 SEO 最有利） | 四种语言结构统一，全部带前缀。现有无前缀 URL 通过 301 永久重定向到 `/en/*`。 |
| 自动跳转 | **不自动跳转** | 不根据 `Accept-Language` 重定向。提供手动语言切换器。根路径 `/` 302 到 `/en`。 |

### 1.1 为什么是子目录而非子域名（背景，已定）
子目录（`zysfiber.com/es`）继承主域名全部权威值与外链权重；子域名会被 Google 当作独立站点、权重从零积累。本站是"同品牌、同内容翻译"场景，子目录在 SEO 和 GEO（AI 引用）上均占优。**本计划全程使用子目录。**

### 1.2 关于"英语改用 /en 前缀"的 SEO 风险与缓解
现有无前缀 URL（如 `/carbon-fiber`）已积累排名。迁移到 `/en/carbon-fiber` 后：
- **必须**用 **301 永久重定向**把每个旧 URL 指向新 `/en/*` URL（301 传递绝大部分权重）。
- canonical 全部指向新 `/en/*` URL。
- sitemap 只列新 URL。
- Google 重新索引需要数周，期间排名可能短期波动，这是该方案已知且可接受的代价（换取四语言结构统一与长期可维护性）。

---

## 2. 语言与 locale 定义

| locale | 语言 | hreflang | OG locale | `<html lang>` | 路径前缀 |
|---|---|---|---|---|---|
| `en` | English | `en` | `en_US` | `en` | `/en` |
| `ko` | 한국어 | `ko` | `ko_KR` | `ko` | `/ko` |
| `es` | Español | `es` | `es_ES` | `es` | `/es` |
| `pt` | Português | `pt` | `pt_BR` | `pt` | `/pt` |

- **默认 / 回退 locale**：`en`
- **`x-default`** hreflang 指向 `/en`（英文版作为默认）。
- 葡语选用 `pt_BR`（巴西市场体量最大，B2B 出口主力）。如客户后续要欧葡可再分 `pt-PT`。

---

## 3. 最终目录结构（本地化 slug 的核心架构）

⚠️ **关键约束**：用户选了"本地化 slug"，这意味着 **URL 路径段本身要翻译**（`/es/fibra-de-carbono`）。物理文件夹名无法随语言变化，因此**不能**用 `app/[lang]/carbon-fiber/...` 这种物理镜像目录树。

正确架构 = **`app/[lang]/[[...slug]]` catch-all 动态路由 + 中央路由清单（route manifest）**。路由清单负责"本地化路径 ↔ 内部页面标识 + 参数"的双向映射，所有页面解析都过这一层。

```
app/
  layout.tsx                      # 极简根布局：只输出 <html><body>，不含 locale（locale 在 [lang] 层处理）
  [lang]/
    layout.tsx                    # 读 lang→设 <html lang>，渲染 Header/Footer/Chat，注入 JSON-LD
    [[...slug]]/
      page.tsx                    # 唯一入口：解析本地化 slug → 分发到对应"页面渲染器"
    not-found.tsx
  api/                            # 保持不动（不进 [lang]）
    chat/route.ts
    chat/summary/route.ts
    inquiry/route.ts
  sitemap.ts                      # 改造：四语言 × 全路由，带 alternates.languages
  robots.ts                       # 基本不变
  llms.txt/route.ts               # 改造：输出多语言 section（或仅 en，见 阶段7）
  favicon.ico / globals.css       # 不动

proxy.ts                          # 新增（项目根）：/ → /en 跳转；旧无前缀 URL → /en/* 301
```

### 3.1 为什么用 catch-all 而不是物理目录
- 物理目录 `app/[lang]/carbon-fiber/page.tsx` 的文件夹名 `carbon-fiber` 是固定字符串，无法变成 `fibra-de-carbono`。
- catch-all `[[...slug]]` 把整段路径作为数组接收（如 `['fibra-de-carbono', 'productos']`），交给路由清单反查出"这是碳纤维分部页"，再渲染。
- 这样**一套页面渲染逻辑服务四种语言的本地化 URL**，且 `generateStaticParams` 可为所有语言×所有路径预生成静态页（保持当前全静态、SEO 友好的特性）。

### 3.2 页面"渲染器"的组织
现有 `app/**/page.tsx` 里的 JSX 渲染逻辑要抽成**可复用的渲染函数**，按页面类型分组。建议放到 `lib/i18n/renderers/` 或直接复用现有的 `*PageContent.tsx` 组件（项目已有 `CarbonFiberPageContent.tsx` 等模式，沿用这一约定）。`[[...slug]]/page.tsx` 根据路由清单解析出的页面类型，import 并渲染对应组件，把 `locale` 和翻译字典作为 props 传入。

---

## 4. i18n 基础设施层（新建 `lib/i18n/`）

这是整个改造的地基，**必须最先建好并测通**，后面所有阶段都依赖它。

```
lib/i18n/
  config.ts          # locale 常量、类型、默认 locale、hreflang/OG 映射
  routes.ts          # 中央路由清单：本地化 slug ↔ 页面标识 ↔ 参数 的双向映射
  dictionaries.ts    # 字典加载器（server-only，按 locale 动态 import）
  dictionaries/
    en.json          # UI/导航/通用文案字典（英文基准）
    ko.json
    es.json
    pt.json
  index.ts           # 统一导出
```

### 4.1 `config.ts`（先建这个）

定义全部 locale 元数据，作为唯一事实来源。

```ts
// lib/i18n/config.ts
export const locales = ["en", "ko", "es", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// hreflang / OG / <html lang> 映射
export const localeMeta: Record<
  Locale,
  { hreflang: string; ogLocale: string; label: string }
> = {
  en: { hreflang: "en", ogLocale: "en_US", label: "English" },
  ko: { hreflang: "ko", ogLocale: "ko_KR", label: "한국어" },
  es: { hreflang: "es", ogLocale: "es_ES", label: "Español" },
  pt: { hreflang: "pt", ogLocale: "pt_BR", label: "Português" },
};
```

### 4.2 `routes.ts`（架构最关键的文件）

路由清单把"页面"抽象为有稳定 `key` 的条目；每个页面在四种语言下各有一段本地化路径。它要支持：
1. **正向**：给定 `key` + `locale` + 可选参数 → 生成本地化 URL（供 `<Link>`、sitemap、hreflang 使用）。
2. **反向**：给定 `locale` + slug 数组（来自 catch-all）→ 解析出 `key` + 参数（供 `[[...slug]]/page.tsx` 分发）。

**静态页面**（无参数）直接列本地化 slug。示例结构：

```ts
// lib/i18n/routes.ts  —— 仅为结构示例，执行时按全站页面补全
import type { Locale } from "./config";

// 页面类型标识
export type PageKey =
  | "home"
  | "about"
  | "services"
  | "applications"
  | "applications-glass"
  | "contact"
  | "privacy"
  | "terms"
  | "blog-index"
  | "carbon-fiber"            // 碳纤维分部首页
  | "carbon-products"        // 碳纤维产品总览
  | "glass-fiber"
  | "glass-products"
  | "carbon-applications"    // 碳纤维应用总览
  | "glass-applications";

// 静态页面：每个 locale 的本地化路径段（不含语言前缀，不含开头斜杠）
// 空字符串 = 该 locale 下的分部/语言首页
export const staticPaths: Record<PageKey, Record<Locale, string>> = {
  home: { en: "", ko: "", es: "", pt: "" },
  about: { en: "about", ko: "회사소개", es: "sobre-nosotros", pt: "sobre-nos" },
  services: { en: "services", ko: "서비스", es: "servicios", pt: "servicos" },
  contact: { en: "contact", ko: "문의", es: "contacto", pt: "contato" },
  "carbon-fiber": {
    en: "carbon-fiber", ko: "탄소섬유",
    es: "fibra-de-carbono", pt: "fibra-de-carbono",
  },
  "glass-fiber": {
    en: "glass-fiber", ko: "유리섬유",
    es: "fibra-de-vidrio", pt: "fibra-de-vidro",
  },
  // ... 其余页面执行时补全
} as unknown as Record<PageKey, Record<Locale, string>>;
```

**动态页面**（产品、博客、应用详情）的处理原则：
- **slug 本身保持英文/技术 slug 不翻译**（如产品 `surface-mat-10g`、博客 `basalt-fiber-mat-industrial-composites`）。理由：① 这些 slug 是技术标识符，已被搜索引擎索引；② 翻译产品/博客 slug 会指数级放大维护成本和 404 风险；③ 用户的"本地化 slug"诉求主要针对**栏目级路径**（carbon-fiber→fibra-de-carbono），产品叶子节点保留英文 slug 是行业通行做法（如 Shopify、大多数 B2B 站）。
- 但**父路径段要本地化**：西语碳纤维产品详情 = `/es/fibra-de-carbono/productos/<category-slug>/<product-slug>`，其中 `productos` 本地化、后两段保持英文 slug。
- 为此在 `routes.ts` 里给动态路由定义**段模板**，例如：
  ```ts
  export const segmentLabels: Record<string, Record<Locale, string>> = {
    products:     { en: "products",     ko: "제품",   es: "productos",    pt: "produtos" },
    applications: { en: "applications", ko: "응용분야", es: "aplicaciones", pt: "aplicacoes" },
    blog:         { en: "blog",         ko: "블로그",  es: "blog",         pt: "blog" },
  };
  ```

> **执行注意**：`routes.ts` 必须导出两个核心函数，全站统一调用，**严禁在组件里手写拼接 URL**：
> - `localizedHref(key, locale, params?)` → 返回带语言前缀的完整路径（如 `/es/fibra-de-carbono/productos`）。
> - `resolveRoute(locale, slugArray)` → 返回 `{ pageKey, params }` 或 `null`（null 触发 `notFound()`）。
> - 反向解析时注意：同一 locale 下不同页面的本地化 slug 不能冲突；解析顺序为先匹配静态页全路径，再匹配动态路由前缀。

### 4.3 `dictionaries.ts`（UI 文案字典加载器）

严格按官方 i18n 指南的 `server-only` 模式（已读 `internationalization.md`）：

```ts
// lib/i18n/dictionaries.ts
import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ko: () => import("./dictionaries/ko.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>;
```

字典只装**界面级、跨页面复用的文案**：导航菜单、按钮（Get Quote / Send Inquiry / WhatsApp）、Footer、表单 label/占位/校验提示、通用 section 标题（Specifications / Applications / FAQ / Overview / Key Features）、404 文案、面包屑名称等。

**页面正文/产品文案/博客**不进字典——它们随数据走（见阶段 5、6）。

### 4.4 客户端组件如何拿到文案
现有大量 `"use client"` 组件（`Header.tsx`、`Footer.tsx`、`AIChatWidget.tsx`、各 `*PageContent.tsx`）。Server Component 无法直接把函数传进去，但可以**把已解析的字典对象（纯 JSON）和 `locale` 字符串作为 props 传入**。原则：
- 在 `[lang]/layout.tsx`（Server Component）里 `await getDictionary(lang)`，把需要的字典切片 + locale 透传给客户端组件。
- 客户端组件改为接收 `dict` / `locale` props，删除硬编码英文串。
- `usePathname()` 在客户端判断当前 locale 时，从路径第一段取（`/es/...` → `es`）。

---

## 5. 数据层多语言化（产品 / 应用）

现有数据全是英文硬编码对象：
- `data/carbon-fiber/products.ts`（393 行）、`data/glass-fiber/products.ts`（384）、`data/glass-fiber/products2.ts`（301）
- `data/product-content.ts`（1015 行，含 overview 段落 + FAQ）
- `data/applications.ts`（149）
- `types/product.ts` 定义 `ProductCategory` 结构

**需要翻译的字段**（slug / image / 数值规格值**不翻译**）：
- 产品：`name`、`description`、`features[]`、`specs[].label`（如 Weight/Material/Function/Application）、`specs[].value` 中的**描述性文字**（如 "Conductive, Thermal"、"Military, Fuel Cells"——但 "10 g/m²" 这种数值单位不翻）、`applications[]`、分类 `name`/`description`。
- `product-content.ts`：`overview[]` 段落、`faqs[].question`、`faqs[].answer`。
- `applications.ts`：分组名、应用名、描述、`detailHref` 指向的详情文案。

### 5.1 推荐方案：locale 映射文件 + 运行时合并
**不要**把四种语言塞进同一个对象（会让 1000 行文件膨胀到 4000 行、极难维护）。改为：

```
data/
  carbon-fiber/products.ts          # 保留为"结构 + 英文基准"（slug/image/数值/英文文案）
  glass-fiber/products.ts
  glass-fiber/products2.ts
  product-content.ts
  applications.ts
  i18n/                              # 新增：仅存可翻译字段，按 slug 索引
    carbon-fiber.ko.ts
    carbon-fiber.es.ts
    carbon-fiber.pt.ts
    glass-fiber.ko.ts  ...（es/pt）
    product-content.ko.ts ...
    applications.ko.ts ...
```

每个翻译文件按 `slug` 作 key，只列可翻译字段：

```ts
// data/i18n/carbon-fiber.es.ts （结构示例）
export const carbonFiberEs = {
  categories: {
    "carbon-fiber-mat": {
      name: "Estera de Fibra de Carbono",
      description: "Esteras de fibra de carbono de alto rendimiento ...",
    },
  },
  products: {
    "surface-mat-10g": {
      name: "Estera de Superficie de Fibra de Carbono 10g",
      description: "Estera de superficie de fibra de carbono ultrafina ...",
      features: ["Ultraligera a 10g/m²", "Excelente conductividad eléctrica", "..."],
      specLabels: { Weight: "Peso", Material: "Material", Function: "Función", Application: "Aplicación" },
      specValues: { "Conductive, Thermal": "Conductivo, Térmico", "Military, Fuel Cells": "Militar, Celdas de Combustible" },
      applications: ["Militar y Defensa", "Celdas de Combustible", "Aeroespacial"],
    },
  },
};
```

### 5.2 数据访问函数改造
现有 `data/carbon-fiber/index.ts` 导出 `allCarbonFiberCategories`。新增 **locale 感知的 getter**：

```ts
// 伪代码：data/carbon-fiber/index.ts 或新建 lib/data-i18n.ts
export function getCarbonCategories(locale: Locale): ProductCategory[] {
  if (locale === "en") return allCarbonFiberCategories;          // 英文直接返回基准
  const t = loadCarbonTranslations(locale);                       // ko/es/pt
  return allCarbonFiberCategories.map((cat) => mergeCategory(cat, t)); // 合并：保留 slug/image/数值，替换文案
}
```

- 合并函数：保留所有非翻译字段（slug、image、images[]、数值规格），用翻译覆盖文案字段；翻译缺失时**回退英文**（避免空白）。
- 所有页面渲染器和 `generateMetadata` 改为调用 `getXxx(locale)` 而非直接引用 `allXxx`。
- `specs[].value` 的数值部分（"10 g/m²"）不进 `specValues` 映射，原样保留。

### 5.3 类型
`types/product.ts` 结构不变（合并后产出的对象仍符合 `ProductCategory`）。翻译文件用独立的 partial 类型，避免强制每个字段都翻译。

---

## 6. 博客内容多语言化（8 篇 markdown）

现状：`content/blog/*.md`，gray-matter frontmatter（title/description/slug/date/tags/image）+ 正文 markdown + `## FAQ` 段。`data/blog.ts` 用 `fs` 读取目录解析。

### 6.1 目录结构
```
content/blog/
  en/   # 把现有 8 篇 .md 移到这里
    basalt-fiber-mat-industrial-composites.md
    ...
  ko/   # 同名 8 篇韩语翻译
  es/
  pt/
```

### 6.2 `data/blog.ts` 改造
- `blogDirectory` 改为 `content/blog/<locale>`。
- 导出 `getBlogPosts(locale)` / `getBlogPost(locale, slug)`，替换现有 `blogPosts`。
- **slug 不翻译**（保持英文 slug，四语言同 slug）。仅翻译 frontmatter 的 title/description/tags 和正文 + FAQ。
- 翻译缺失某篇时回退英文版（保证不 404）。
- `slugify`、`parseFAQ`、`stripFAQSection` 等纯函数逻辑不变；注意韩/西/葡正文里的 `## FAQ`、`### 问题` 标记**要保留英文 `## FAQ` 锚点**或同步改解析逻辑——**推荐保留结构性 markdown 标记为约定值**，只翻译标题文本，解析器认 `## FAQ`（执行时若译文改了标记则同步改 `parseFAQ`）。

### 6.3 翻译执行方式
8 篇 × 3 语言 = 24 个 markdown 文件。每篇约 150 行。逐篇翻译，保持：
- frontmatter 的 `slug`、`image`、`date` 原样；翻译 `title`、`description`、`tags`。
- 正文 markdown 结构（标题层级、图片、链接）原样，只翻文字。
- 图片 alt 文字翻译。

---

## 7. SEO / GEO 基础设施改造（最关键，决定多语言成败）

现有 SEO 基建已成熟，要在保留它的前提下做 locale 感知改造。

### 7.1 `lib/seo.ts` — `createPageMetadata` 改造
当前签名只接收 `{title, description, path}`。改为 locale 感知，**自动生成 hreflang**：

```ts
// 改造后签名（示例）
export function createPageMetadata({
  locale, title, description, path,   // path = 不含语言前缀的内部 key 或本地化路径
  image, type, alternates,            // alternates: 该页面在所有 locale 下的本地化路径映射
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;                       // 当前 locale 的完整本地化路径（含前缀）
  image?: string;
  type?: "website" | "article";
  alternates: Record<Locale, string>; // 每个 locale 的完整本地化 URL 路径
}): Metadata
```

输出的 `alternates` 必须包含（已核对 `generate-metadata.md` 的 API）：
```ts
alternates: {
  canonical: absoluteUrl(path),               // 当前语言版本指向自己
  languages: {
    "x-default": absoluteUrl(alternates.en),  // x-default 指英文
    en: absoluteUrl(alternates.en),
    ko: absoluteUrl(alternates.ko),
    es: absoluteUrl(alternates.es),
    pt: absoluteUrl(alternates.pt),
  },
},
```
- `openGraph.locale` 用 `localeMeta[locale].ogLocale`（如 `es_ES`）。
- `openGraph.url` 用当前 locale 的完整 URL。
- **每个 locale 的 title/description 必须是真正翻译过的**，不可共用英文。这些译文来自字典或数据层，由各页面渲染器传入。

> hreflang 是多语言 SEO 最易漏也最致命的一项。**每个页面、每种语言**都必须声明全部 4 个语言版本 + `x-default`，且互相指向（双向对称）。

### 7.2 `app/[lang]/layout.tsx` — 动态 `<html lang>`
- 根 `app/layout.tsx` 退化为最简（或移除，把 html/body 提到 `[lang]/layout.tsx`）。**注意**：App Router 要求 `<html>`/`<body>` 在根布局。Next 16 允许把它们放在 `app/[lang]/layout.tsx`（官方 i18n 文档明确示例如此）。执行时按官方文档：把 `<html lang={lang}>` 放 `[lang]/layout.tsx`，根 `app/layout.tsx` 仅做最小透传或删除。
- `generateStaticParams` 在 `[lang]/layout.tsx` 返回 `locales.map(l => ({ lang: l }))`，预生成四语言。
- 字体、Analytics、GA、JSON-LD 注入移到此层。

### 7.3 `app/sitemap.ts` — 四语言 × 全路由 + alternates
已核对 `sitemap.md`：条目支持 `alternates.languages`，自动产出 `xhtml:link`。改造：
- 对每个"页面 key"和每个动态条目，生成 **4 条 URL**（每 locale 一条），每条都带 `alternates.languages`（列出全部 4 语言的本地化 URL）。
- URL 用 `routes.ts` 的 `localizedHref(key, locale, params)` 生成，确保与实际路由一致。
- 动态产品/博客/应用条目同样四语言展开。
- 产物示例：`/en/carbon-fiber`、`/ko/탄소섬유`、`/es/fibra-de-carbono`、`/pt/fibra-de-carbono` 互为 alternates。

```ts
// 每个条目形如：
{
  url: absoluteUrl(localizedHref(key, locale, params)),
  lastModified, changeFrequency, priority,
  alternates: {
    languages: {
      en: absoluteUrl(localizedHref(key, "en", params)),
      ko: absoluteUrl(localizedHref(key, "ko", params)),
      es: absoluteUrl(localizedHref(key, "es", params)),
      pt: absoluteUrl(localizedHref(key, "pt", params)),
    },
  },
}
```

### 7.4 `proxy.ts`（项目根，新增）— 重定向逻辑
已核对 `proxy.md`：导出 `proxy` 函数 + `config.matcher`。**本站不自动按 Accept-Language 跳转**（用户决定）。proxy 只做两件事：

1. **根路径 `/` → `/en`**（302 临时跳转，留出未来改默认语言的余地；也可用 308，按团队偏好，推荐 307/302 临时）。
2. **旧无前缀 URL → `/en/<本地化en路径>` 的 301 永久重定向**（保 SEO 权重）。如 `/carbon-fiber` → `/en/carbon-fiber`、`/about` → `/en/about`。注意旧 slug 与新英文 slug 多数相同（英文 slug 不变），主要是补 `/en` 前缀。

```ts
// proxy.ts 结构示例
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 已带 locale 前缀 → 放行
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // 根路径 → 默认语言
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url, 307);
  }

  // 旧无前缀 URL → /en 永久重定向（保权重）
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url, 301);
}

export const config = {
  // 排除 api、_next、静态资源、sitemap/robots/llms.txt 等
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|images|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
```

> ⚠️ matcher 必须排除 `sitemap.xml`、`robots.txt`、`llms.txt`、`/api/*`、`_next/*`、`/images/*` 和带扩展名的静态文件，否则会把它们也加上 `/en` 前缀导致 404 或重定向循环。执行后**务必实测** `curl -I` 这些路径。

### 7.5 `lib/jsonld.ts` — locale 感知
- `organizationJsonLd()`：`availableLanguage` 更新为 `["English", "Korean", "Spanish", "Portuguese", "Chinese"]`；`url` 用 `/en`（或保持根域，组织实体单一即可）。
- `websiteJsonLd()`：可加 `inLanguage`。WebSite 实体仍只声明一次（在 `[lang]/layout.tsx`），代表整站。
- `breadcrumbJsonLd`、`productJsonLd`、`articleJsonLd`、`faqJsonLd`：接收已翻译的 name/description，URL 用 `localizedHref`。各页面渲染器传入对应 locale 的翻译值。
- `productJsonLd` 可加 `inLanguage` 字段。

### 7.6 `app/robots.ts`
基本不变。`sitemap` 仍指 `/sitemap.xml`（单一 sitemap 含全部语言）。`host` 保持主域。无需按语言拆分。

### 7.7 `app/llms.txt/route.ts` — GEO 关键
- **推荐**：保持单一 `/llms.txt`，但在其中**为每种语言列出对应的本地化 URL**（AI 引擎可据此发现多语言版本）。或最简方案：llms.txt 用英文 + 列出 `/en` 链接（因 AI 爬虫主要消费英文，且 llms.txt 本身是导航性文件）。
- 用 `localizedHref` 生成链接，确保与实际路由一致。
- 至少保证：llms.txt 里的所有链接是有效的带前缀 URL（不能再用旧无前缀路径）。

---

## 8. 组件与页面改造清单

### 8.1 语言切换器（新增组件）
`components/layout/LanguageSwitcher.tsx`（client）：
- 从 `usePathname()` 取当前 locale 和当前页面。
- 切换时**跳到当前页面的对应语言版本**（用 `routes.ts` 反查当前 pageKey + params，再用 `localizedHref` 生成目标 locale URL）——**不要只是把前缀替换**，因为本地化 slug 不同（`/es/fibra-de-carbono` 切英文要变 `/en/carbon-fiber`，不能简单替前缀）。
- 这是本地化 slug 方案下最容易写错的点。切换器必须经过路由清单做"同页跨语言"映射。
- 用真实 `<Link>`（可爬取），不要 JS 强制 `window.location` 跳转。放进 `Header`。

### 8.2 现有组件改造（删除硬编码英文 → 用字典/数据）
按文件列，执行时逐个处理：

| 文件 | 改造内容 |
|---|---|
| `components/layout/Header.tsx` | `carbonProducts`/`glassProducts` 菜单名、"Home/Applications/Services/Blog/About"、"Get Quote"、所有 `<Link href>` 改用 `localizedHref(key, locale)`；菜单项文案来自字典。加 LanguageSwitcher。 |
| `components/layout/Footer.tsx` | 全部链接 + 文案 locale 化。 |
| `components/layout/AIChatWidget.tsx` | UI 文案（占位符、按钮、提示）locale 化。注意：聊天**后端**语言见 8.4。 |
| `components/sections/*.tsx`（Hero/Stats/Industries/WhyPartner/TrustEvidence/CTAFinal/DivisionsSplit 等） | 硬编码英文段落改为接收 props（来自页面渲染器传入的翻译）或字典。这些是首页 section，文案量大，翻译进**首页专属数据/字典**。 |
| `app/**/PageContent.tsx`（carbon/glass/about/contact/services） | 改为接收 `locale` + 翻译文案 props；内部 `<Link>` 用 `localizedHref`。 |
| `components/products/*`（ProductGallery/SpecTable/RelatedProducts） | section 标题（"Key Features"/"Specifications"/"Applications"/"Related Products"）等 UI 串走字典；产品数据走 locale getter。 |
| `components/applications/ApplicationsPageContent.tsx` | 同上。 |
| `components/blog/*` | 博客 UI 串（"Table of Contents"/"FAQ"/日期格式/"Read more"）走字典；正文走 locale 博客数据。日期按 locale 格式化（`Intl.DateTimeFormat(locale)`）。 |
| `components/forms/*`（询盘表单） | label/placeholder/校验提示/成功失败提示全部 locale 化。 |

> **搜索辅助**：执行时用 `grep -rn '>[A-Z][a-z]' components app` 之类粗筛硬编码英文文案，逐一消灭。最终目标：组件里不残留任何用户可见的英文字面量（结构性常量除外）。

### 8.3 页面渲染器分发（`app/[lang]/[[...slug]]/page.tsx`）
唯一页面入口，职责：
1. `const { lang, slug } = await params;`
2. `if (!isLocale(lang)) notFound();`
3. `const resolved = resolveRoute(lang, slug ?? []);`（slug 为 undefined 时是分部首页）
4. `if (!resolved) notFound();`
5. 按 `resolved.pageKey` switch 到对应渲染器组件，传入 `locale` + 解析出的 `params` + 字典/数据。
6. 导出 `generateMetadata`：同样解析路由，调 `createPageMetadata` 产出该 locale 的元数据 + 全语言 hreflang。
7. 导出 `generateStaticParams`：遍历所有 locale × 所有页面（静态页全部 + 动态页全部 slug 组合），返回 `{ lang, slug: string[] }`，预渲染全站静态页。

> `generateStaticParams` 是保持"全静态、SEO 友好"特性的关键。务必覆盖：4 locale × (所有静态页 + 所有产品分类页 + 所有产品详情页 + 所有博客文章 + 所有应用详情页)。

### 8.4 API 路由（`app/api/*`）
不进 `[lang]`，但需感知语言：
- `app/api/chat/route.ts`：`SYSTEM_PROMPT` 是英文。让前端把当前 `locale` 随请求发来，在 prompt 末尾追加指令"Reply in {language}"。或维护 4 份 system prompt 片段。公司事实部分不变。
- `app/api/chat/summary/route.ts`：同理透传 locale。
- `app/api/inquiry/route.ts`：邮件模板/自动回复可按 locale 出多语言版本（可选；最简可保持英文，但表单成功提示在前端 locale 化）。
- 这些路由的安全/限流逻辑**不要动**。

---

## 9. 配置文件改动

| 文件 | 改动 |
|---|---|
| `next.config.ts` | `Content-Language` 头当前写死 `"en"` —— **移除**这个全局头（改由各页面 `<html lang>` 控制），或保留但知其无害。CSP 不动。现有 `redirects()` 里的 `zysfiber.com → www` 不动。**不要**在 next.config 里加 `i18n` 配置块——App Router 不用 Pages Router 的 `i18n` 字段，路由全靠 `[lang]` + proxy。 |
| `vercel.json` | 不需改（头与缓存与语言无关）。 |
| `tsconfig.json` | 不动（`@/*` 别名已够用）。 |
| `.env` / `NEXT_PUBLIC_SITE_URL` | 不动。 |

---

## 10. 分阶段执行顺序（按此顺序，每阶段验证后再继续）

> 每阶段结束跑：`npm run build`（必须通过）。构建过程中 `generateStaticParams` 会暴露大量路由问题。开发时 `npm run dev` 实测页面。

### 阶段 0 — 准备与基线
- 读上文列出的全部 Next 文档。
- `npm run build` 跑通现状，记录基线（确认改造前可构建）。
- 新建 `git` 分支 `feat/i18n`（不要在 main 上改）。
- **验证**：基线构建通过。

### 阶段 1 — i18n 基础设施（无 UI 变化）
- 建 `lib/i18n/config.ts`、`routes.ts`（先只填静态页 + 一两个动态路由打通）、`dictionaries.ts`、`dictionaries/en.json`（先只放英文，作基准）。
- 写 `localizedHref` / `resolveRoute` 并写最小单测或在脚本里手测往返一致性。
- **验证**：`node` 脚本调用 `resolveRoute('es', ['fibra-de-carbono'])` 返回正确 pageKey；`localizedHref` 往返自洽。

### 阶段 2 — 路由骨架（英文先跑通）
- 建 `app/[lang]/layout.tsx`（含 `<html lang>`、`generateStaticParams`、字体/GA/JSON-LD 迁移）。
- 建 `app/[lang]/[[...slug]]/page.tsx` 分发器 + `generateMetadata` + `generateStaticParams`。
- 把现有页面渲染逻辑接进分发器（**仅 `en`**，复用现有组件，先不翻译）。
- 建 `proxy.ts`。根 `app/layout.tsx` 按官方文档调整。
- 旧的 `app/carbon-fiber/`、`app/glass-fiber/`、`app/about/` 等**物理页面目录删除**（逻辑已迁入 `[lang]`）。保留 `api/`、`sitemap.ts`、`robots.ts`、`llms.txt/`、`globals.css`、`favicon.ico`。
- **验证**：
  - `npm run build` 通过，`generateStaticParams` 产出所有 `/en/*` 页面。
  - `npm run dev`，`curl -I localhost:3000/` → 307 到 `/en`。
  - `curl -I localhost:3000/carbon-fiber` → 301 到 `/en/carbon-fiber`。
  - `/en/carbon-fiber`、`/en/carbon-fiber/products/carbon-fiber-mat/surface-mat-10g` 正常渲染。
  - `curl localhost:3000/sitemap.xml`、`/robots.txt`、`/llms.txt` 不被 proxy 干扰、正常返回。

### 阶段 3 — SEO 元数据 + sitemap + hreflang（仍仅英文内容，但四语言 URL 框架就位）
- 改造 `lib/seo.ts`、`lib/jsonld.ts`、`app/sitemap.ts`、`app/robots.ts`、`app/llms.txt`。
- 此时 ko/es/pt 路由可访问（内容暂回退英文），但 hreflang/sitemap/canonical 必须正确。
- **验证**：
  - 查看 `/en/carbon-fiber` 页面源码：含 4 条 hreflang + x-default + canonical 指向自己。
  - `sitemap.xml` 含四语言 URL 且每条带 `xhtml:link` alternates。
  - 用在线 hreflang 校验器或脚本检查双向对称。

### 阶段 4 — UI 字典翻译（界面文案四语言）
- 填 `dictionaries/{ko,es,pt}.json`（导航、按钮、section 标题、表单、Footer、404 等）。
- 改造所有组件删除硬编码英文，接字典 + `locale`。
- 加 `LanguageSwitcher` 进 Header。
- **验证**：
  - `/ko`、`/es`、`/pt` 首页导航/按钮/Footer 显示对应语言。
  - 语言切换器在产品详情页能正确跳到对应语言的本地化 URL（重点测本地化 slug 的跨语言映射）。
  - `<html lang>` 随语言变化。

### 阶段 5 — 产品 / 应用数据翻译
- 建 `data/i18n/*.{ko,es,pt}.ts`，填三语言产品/分类/规格/FAQ/应用翻译。
- 改数据 getter 为 locale 感知 + 英文回退。
- 渲染器与 `generateMetadata` 改用 locale getter。
- **验证**：
  - `/es/fibra-de-carbono/productos/...` 产品名/描述/features/specs/FAQ 为西语。
  - 数值规格（"10 g/m²"）保持不变。
  - `npm run build` 静态生成所有语言产品页。

### 阶段 6 — 博客翻译
- `content/blog/` 重组为 `en/ko/es/pt` 子目录，迁移现有 8 篇到 `en/`。
- 翻译 24 个 markdown 文件。
- 改 `data/blog.ts` 为 locale 感知 + 回退。
- **验证**：`/ko/블로그`（或 `/ko/blog`，按 routes.ts 定义）列表 + 文章正文为韩语；FAQ 结构化数据正常。

### 阶段 7 — API / 聊天 / llms.txt 收尾
- chat/summary 路由透传 locale，回复对应语言。
- llms.txt 多语言链接。
- **验证**：切到西语页面用聊天问问题，AI 用西语回复。

### 阶段 8 — 全站终检
见第 11 节验收清单。

---

## 11. 最终验收清单（全绿才算完成）

**构建与路由**
- [ ] `npm run build` 零错误，`npm run lint` 通过。
- [ ] 四语言所有页面静态生成（检查 build 输出的路由数 = 4 × 英文页面数）。
- [ ] `/` → `/en`（307）；所有旧无前缀 URL → `/en/*`（301）。
- [ ] 不存在的本地化 slug → 404（`notFound`）。

**SEO / hreflang**
- [ ] 每个页面源码含 canonical（指向自身 locale）+ 4 条 hreflang + `x-default`（指 en）。
- [ ] hreflang 双向对称（A 指 B，B 也指 A）。
- [ ] `sitemap.xml` 含全部四语言 URL，每条带 `alternates`。
- [ ] 每种语言的 `<title>`/`<meta description>` 是真正的译文，非英文。
- [ ] `<html lang>` 四语言正确。
- [ ] OG `locale` 正确（en_US/ko_KR/es_ES/pt_BR）。
- [ ] `robots.txt`、`llms.txt`、`sitemap.xml` 不被 proxy 加前缀、可正常访问。

**内容完整性**
- [ ] 组件无残留硬编码英文（除结构常量）。
- [ ] 产品数值规格未被误翻。
- [ ] 翻译缺失项回退英文而非空白/报错。
- [ ] 语言切换器在所有页面类型（首页/分部/产品列表/产品详情/博客/应用）都能正确跨语言跳同一页。

**GEO**
- [ ] JSON-LD（Organization/Product/Article/FAQ/Breadcrumb）在各语言页面输出且字段为对应语言。
- [ ] `availableLanguage` 含新增语言。

---

## 12. 关键风险点（执行时高度警惕）

1. **本地化 slug 的反向解析冲突**：不同页面的本地化 slug 在同一语言下不能撞车；`resolveRoute` 解析顺序要先精确匹配静态全路径，再匹配动态前缀。这是最易出 bug 处。
2. **语言切换器的跨语言映射**：绝不能简单替换 URL 前缀（slug 不同）。必须经路由清单做 pageKey 映射。
3. **proxy matcher 漏排除**：漏了 `sitemap.xml`/`llms.txt`/静态资源会导致重定向循环或 404。改完必 `curl -I` 实测。
4. **`<html>`/`<body>` 位置**：Next 16 App Router 下放 `[lang]/layout.tsx`，根布局相应调整。严格按 `internationalization.md` 官方示例，别凭记忆。
5. **301 旧 URL 重定向必须无遗漏**：列全现有 sitemap 里的每条旧 URL，确保都有对应 301。漏一条就丢一条已索引页的权重。
6. **`generateStaticParams` 覆盖不全**：漏某 locale 或某动态 slug 会导致该页运行时按需渲染或 404。构建后核对路由总数。
7. **客户端组件传字典**：Server→Client 只能传可序列化的纯对象，不能传函数。字典切片要在 Server 层取好再透传。
8. **翻译质量**：B2B 技术术语（如 "chopped strand mat" "pultrusion" "EMI shielding"）机翻易失准。交付后**强烈建议**安排母语/行业人工校对产品名与核心描述，本计划已保证结构正确、回退安全，译文可后续迭代替换而不影响架构。

---

## 13. 不做的事（范围边界）
- 不引入 `next-intl` 等第三方 i18n 库（官方原生 + 自建路由清单已足够，且更可控；引库反而增加与本地化 slug 方案的适配成本）。
- 不在 `next.config.ts` 用 Pages Router 的 `i18n` 字段（App Router 不适用）。
- 不做按 IP/地理位置的自动跳转（用户明确不要自动跳转）。
- 不翻译产品/博客的叶子 slug（仅栏目级路径本地化）。
- 不改动 API 的限流与安全逻辑。

