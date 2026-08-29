# Actual Size Online Ruler

| 字段 | 内容 |
|------|------|
| 功能 ID | `F-MS-RULER` |
| URL | `/tools/online-ruler` |
| 代码入口 | `src/app/tools/[slug]/page.tsx + tools.ts + OnlineRuler` |
| 状态 | 已上线 |

## 1. 页面目标（用户 Job）

用银行卡校准屏幕，测量实物像素对应物理尺寸。

## 2. URL / 别名 / 重定向

- 规范 URL：`/tools/online-ruler`
- 无别名

## 3. 入口

- 首页 / 分类页 / related 链接 / 搜索

## 4. 首屏与主 CTA

- ToolPage：intro + 主计算区优先
- 主 CTA：调整输入看结果

## 5. 交互逐步说明

1. 打开工具页
2. 校准默认卡宽 324px；测长显示 in/mm；localStorage 持久校准。
3. 阅读 tips / How this estimate works / related

## 6. 展示字段与含义

Calibration PPI；长度 in/mm

## 7. 校验与错误

需 100% 浏览器缩放；换屏需重校准。

## 8. SEO 功能点

featured；WebApplication schema

## 9. 相关页 / 内链

screen-ppi、pixels-to-inches、screen-size

## 10. 验收要点

- [ ] 默认输入有合理结果
- [ ] 边界 0/空不崩溃
- [ ] 与 `F-MS-RULER` 一致
