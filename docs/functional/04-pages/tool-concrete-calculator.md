# Concrete Calculator

| 字段 | 内容 |
|------|------|
| 功能 ID | `F-MS-CONCRETE` |
| URL | `/tools/concrete-calculator` |
| 代码入口 | `src/app/tools/[slug]/page.tsx + tools.ts` |
| 状态 | 已上线 |

## 1. 页面目标（用户 Job）

板体积转立方码并加 10% 余量。

## 2. URL / 别名 / 重定向

- 规范 URL：`/tools/concrete-calculator`
- 无别名

## 3. 入口

- 首页 / 分类页 / related 链接 / 搜索

## 4. 首屏与主 CTA

- ToolPage：intro + 主计算区优先
- 主 CTA：调整输入看结果

## 5. 交互逐步说明

1. 打开工具页
2. L/W ft，depth in
3. 阅读 tips / How this estimate works / related

## 6. 展示字段与含义

L×W×(d/12)/27×1.1 yd³

## 7. 校验与错误

同左

## 8. SEO 功能点

featured schema

## 9. 相关页 / 内链

gravel、decking、area

## 10. 验收要点

- [ ] 默认输入有合理结果
- [ ] 边界 0/空不崩溃
- [ ] 与 `F-MS-CONCRETE` 一致
