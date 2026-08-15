# Vibio SEO 产物检查

- 生成时间：2026-08-15T00:58:30+00:00
- 模式：remote
- 证据模式：`http_source`
- 浏览器 DOM provenance 已验证：否（客户端信号未经 JavaScript 渲染验证；导入文件没有绑定可验证的浏览器采集证据）
- 基准 URL：https://www.zysfiber.com/
- 已解析页面：49
- sitemap URL：420
- 发现：严重阻断 0 / 高 0 / 中 0 / 低 0 / 信息 1

## 结论边界

- 本工具验证当前输入产物，不证明 Google 已抓取、已索引、选择了相同 canonical 或将获得排名。
- 不生成健康分，不使用固定 title/description 字符数、CTR、排名或流量增幅门槛。
- Schema 语法存在或修复只说明机器可读线索，不保证富结果、排名或生成式 AI 展示。
- evidence_mode=http_source：内置有界 HTTP 抓取器只读取响应源码，不执行 JavaScript；客户端生成或改写的 metadata、正文、canonical 与链接均未经验证。
- 线上模式是有限范围、单一用户代理的即时采样，不等同于 Googlebot 完整抓取或浏览器渲染。
- 达到 --max-pages=50，仍有 226 个已发现 URL 未抓取。
- sitemap 同源 URL 已作为抓取种子（上限 50 条，计入 --max-pages 预算）。

## 发现

### 1. [信息] WebSite 类型出现在 49 个范围内页面。

- 代码：`structured-data.website-multi-page`
- 类别：structured-data
- 置信度：medium
- URL：`https://www.zysfiber.com/en`；`https://www.zysfiber.com/en/about`；`https://www.zysfiber.com/en/applications`；`https://www.zysfiber.com/en/applications/glass`；`https://www.zysfiber.com/en/blog`；`https://www.zysfiber.com/en/blog/basalt-fiber-mat-industrial-composites`；`https://www.zysfiber.com/en/blog/basalt-fiber-vs-fiberglass-selection-guide`；`https://www.zysfiber.com/en/blog/carbon-fiber-cloth-twill-plain-weave-guide`；`https://www.zysfiber.com/en/blog/carbon-fiber-fabric-specification-guide`；`https://www.zysfiber.com/en/blog/carbon-fiber-raw-materials-yarn-powder-chopped`；`https://www.zysfiber.com/en/blog/carbon-fiber-surface-mat-selection-guide`；`https://www.zysfiber.com/en/blog/carbon-fiber-tow-size-3k-6k-12k-guide`；`https://www.zysfiber.com/en/blog/carbon-fiber-vs-fiberglass-selection-guide`；`https://www.zysfiber.com/en/blog/carbon-glass-hybrid-fabric-benefits`；`https://www.zysfiber.com/en/blog/composite-laminate-layers-surface-structural-core`；`https://www.zysfiber.com/en/blog/composite-reinforcement-rfq-checklist`；`https://www.zysfiber.com/en/blog/fiberglass-chopped-strand-mat-vs-woven-roving`；`https://www.zysfiber.com/en/blog/fiberglass-fabric-weight-gsm-oz-conversion-guide`；`https://www.zysfiber.com/en/blog/fiberglass-surface-tissue-for-composite-finish`；`https://www.zysfiber.com/en/blog/multiaxial-fiberglass-fabric-for-composites`
- 影响边界：Google 的站点名称 WebSite 标记应位于首页；其他 Schema 用途需结合完整对象判断。
- 复验：解析对象所有者，确保首页输出准确站点实体，并避免模板重复注入。

## 覆盖摘要

- noindex 页面：0
- 范围内无入链页面：0
- 从根页面可达：0
- 已观察最大点击深度：未知
