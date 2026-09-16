import { materialAllowanceDataset } from "@/lib/material-allowance-data";

export function GET() {
  return Response.json(materialAllowanceDataset, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
