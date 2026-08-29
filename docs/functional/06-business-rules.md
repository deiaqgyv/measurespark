# 业务规则 — MeasureSpark

## 数值

- `positive`/`safe`：非有限或 ≤0 视为 0
- tiles/rolls/posts：`formatResult` 向上取整展示

## 余量系数（通用工具）

| 工具 | 余量/系数 |
|------|-----------|
| concrete | ×1.1 |
| gravel | ×1.4 吨/码 ×1.1 |
| mulch | ×1.08 |
| wallpaper | 面积×1.15，/56 |
| decking | ×1.1 |
| fence | ceil(L/spacing)+1 |

## 增强工具

详见 `project-calculators.ts`：门 21 ft²、窗 15 ft²；地板/瓷砖 waste%；瓷砖含 grout 模块。

## 文档张力

AGENTS 称 `tools.ts` 为公式真源；paint/flooring/tile **UI 以 project-calculators 为准**。
