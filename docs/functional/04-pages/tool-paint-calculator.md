# Paint Calculator（增强）

| 字段 | 内容 |
|------|------|
| 功能 ID | `F-MS-PAINT` |
| URL | `/tools/paint-calculator` |
| 代码入口 | `src/app/tools/[slug]/page.tsx + tools.ts + project-calculators.ts` |
| 状态 | 已上线 |

## 1. 页面目标（用户 Job）

墙面涂料加仑与成本；可选天花板。

## 2. URL / 别名 / 重定向

- 规范 URL：`/tools/paint-calculator`
- 无别名

## 3. 入口

- 首页 / 分类页 / related 链接 / 搜索

## 4. 首屏与主 CTA

- ToolPage：intro + 主计算区优先
- 主 CTA：调整输入看结果

## 5. 交互逐步说明

1. 打开工具页
2. L/W/H、门窗、涂层、覆盖率、单价、includeCeiling
3. 阅读 tips / How this estimate works / related

## 6. 展示字段与含义

exactGallons / gallonsToBuy / cost；墙=2(L+W)H−门×21−窗×15

## 7. 校验与错误

非正按 0；有 ProjectGuide

## 8. SEO 功能点

featured；注意 tools.ts 简化公式≠UI

## 9. 相关页 / 内链

wallpaper、flooring、area

## 10. 验收要点

- [ ] 默认输入有合理结果
- [ ] 边界 0/空不崩溃
- [ ] 与 `F-MS-PAINT` 一致
