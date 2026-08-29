# Pixels to Inches

| 字段 | 内容 |
|------|------|
| 功能 ID | `F-MS-PXIN` |
| URL | `/tools/pixels-to-inches` |
| 代码入口 | `src/app/tools/[slug]/page.tsx + tools.ts` |
| 状态 | 已上线 |

## 1. 页面目标（用户 Job）

像素长度 ÷ PPI → 英寸。

## 2. URL / 别名 / 重定向

- 规范 URL：`/tools/pixels-to-inches`
- 无别名

## 3. 入口

- 首页 / 分类页 / related 链接 / 搜索

## 4. 首屏与主 CTA

- ToolPage：intro + 主计算区优先
- 主 CTA：调整输入看结果

## 5. 交互逐步说明

1. 打开工具页
2. 输入 pixels、ppi
3. 阅读 tips / How this estimate works / related

## 6. 展示字段与含义

Inches = px/ppi

## 7. 校验与错误

同左

## 8. SEO 功能点

schema

## 9. 相关页 / 内链

相关屏幕工具

## 10. 验收要点

- [ ] 默认输入有合理结果
- [ ] 边界 0/空不崩溃
- [ ] 与 `F-MS-PXIN` 一致
