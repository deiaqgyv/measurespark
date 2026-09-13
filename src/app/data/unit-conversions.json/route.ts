import { unitConversionDataset } from "@/lib/unit-conversion-data";

export function GET() {
  return Response.json(unitConversionDataset, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
