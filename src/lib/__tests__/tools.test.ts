import { describe, expect, it } from "vitest";

import { categoryDefinitions, formatResult, getTool, tools } from "../tools";

describe("tool registry", () => {
  it("keeps slugs unique", () => {
    expect(new Set(tools.map((tool) => tool.slug)).size).toBe(tools.length);
  });

  it("resolves every related tool", () => {
    const slugs = new Set(tools.map((tool) => tool.slug));
    expect(tools.flatMap((tool) => tool.related).every((slug) => slugs.has(slug))).toBe(true);
  });

  it("maps every tool category to one unique category page", () => {
    expect(new Set(categoryDefinitions.map((category) => category.slug)).size).toBe(categoryDefinitions.length);
    const categoryNames = new Set(categoryDefinitions.map((category) => category.name));
    expect(tools.every((tool) => categoryNames.has(tool.category))).toBe(true);
  });

  it("calculates a 12 by 10 room", () => {
    expect(getTool("area-calculator")?.calculate({ length: 12, width: 10 })).toBe(120);
  });

  it("formats whole item counts", () => {
    expect(formatResult(14.2, "tiles")).toBe("15");
  });
});
