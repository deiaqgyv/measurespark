import { ppiReferenceDataset } from "@/lib/ppi-reference-data";

export function GET() {
  return Response.json(ppiReferenceDataset, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
