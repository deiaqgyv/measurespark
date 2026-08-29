# Screen Size Calculator

| 字段 | 内容 |
|------|------|
| 功能 ID | `F-MS-SCRSIZE` |
| URL | `/tools/screen-size-calculator` |
| 代码入口 | `src/app/tools/[slug]/page.tsx + tools.ts` |
| 状态 | 已上线 |

## 1. 页面目标（用户 Job）

对角线+宽高比 → 屏幕宽度。

## 2. URL / 别名 / 重定向

- 规范 URL：`/tools/screen-size-calculator`
- 无别名

## 3. 入口

- 首页 / 分类页 / related 链接 / 搜索

## 4. 首屏与主 CTA

- ToolPage：intro + 主计算区优先
- 主 CTA：调整输入看结果

## 5. 交互逐步说明

1. 打开工具页
2. diagonal、ratioW/H
3. 阅读 tips / How this estimate works / related

## 6. 展示字段与含义

Width = diag×rw/hypot

## 7. 校验与错误

同左

## 8. SEO 功能点

schema

## 9. 相关页 / 内链

相关

## 10. 验收要点

- [ ] 默认输入有合理结果
- [ ] 边界 0/空不崩溃
- [ ] 与 `F-MS-SCRSIZE` 一致
