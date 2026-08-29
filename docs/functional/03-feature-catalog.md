# 功能总表 — MeasureSpark

| 功能 ID | 名称 | 入口 | 优先级 | 状态 | 备注 |
|---------|------|------|--------|------|------|
| `F-MS-HOME` | 首页 | `/` | P0 | 已上线 |  |
| `F-MS-CAT-SCREEN` | 分类：屏幕测量 | `/categories/screen-measurement-tools` | P0 | 已上线 |  |
| `F-MS-CAT-HOME` | 分类：家装 | `/categories/home-project-calculators` | P0 | 已上线 |  |
| `F-MS-CAT-CONV` | 分类：换算 | `/categories/measurement-conversion-calculators` | P0 | 已上线 |  |
| `F-MS-RULER` | 实尺寸在线尺 | `/tools/online-ruler` | P0 | 已上线 |  |
| `F-MS-PPI` | 屏幕 PPI | `/tools/screen-ppi-calculator` | P0 | 已上线 |  |
| `F-MS-PXIN` | 像素转英寸 | `/tools/pixels-to-inches` | P0 | 已上线 |  |
| `F-MS-SCRSIZE` | 屏幕尺寸 | `/tools/screen-size-calculator` | P0 | 已上线 |  |
| `F-MS-CONCRETE` | 混凝土 | `/tools/concrete-calculator` | P0 | 已上线 |  |
| `F-MS-GRAVEL` | 碎石 | `/tools/gravel-calculator` | P1 | 已上线 |  |
| `F-MS-MULCH` | 覆盖物 | `/tools/mulch-calculator` | P1 | 已上线 |  |
| `F-MS-TILE` | 瓷砖（增强） | `/tools/tile-calculator` | P0 | 已上线 |  |
| `F-MS-FLOOR` | 地板（增强） | `/tools/flooring-calculator` | P0 | 已上线 |  |
| `F-MS-PAINT` | 涂料（增强） | `/tools/paint-calculator` | P0 | 已上线 |  |
| `F-MS-WALL` | 墙纸 | `/tools/wallpaper-calculator` | P1 | 已上线 |  |
| `F-MS-DECK` | 甲板 | `/tools/decking-calculator` | P1 | 已上线 |  |
| `F-MS-FENCE` | 围栏立柱 | `/tools/fence-calculator` | P1 | 已上线 |  |
| `F-MS-AREA` | 矩形面积 | `/tools/area-calculator` | P1 | 已上线 |  |
| `F-MS-VOL` | 矩形体积 | `/tools/volume-calculator` | P1 | 已上线 |  |
| `F-MS-ABOUT` | About | `/about` | P2 | 已上线 |  |
| `F-MS-PRIVACY` | Privacy | `/privacy` | P2 | 已上线 |  |
| `F-MS-LLMS` | llms.txt | `/llms.txt` | P1 | 已上线 |  |
| `F-MS-ADSLOT` | 广告位占位 | `AdSlot 组件` | P2 | 未挂载 | 仅组件与样式预留 |

## 计算实现分流

| 类型 | 组件 | 公式真源 |
|------|------|----------|
| 在线尺 | `OnlineRuler` | `ruler.ts` + localStorage 校准 |
| 通用表单工具 | `CalculatorForm` | `tools.ts` `calculate` |
| paint/flooring/tile | `ProjectCalculator` | `project-calculators.ts` |
