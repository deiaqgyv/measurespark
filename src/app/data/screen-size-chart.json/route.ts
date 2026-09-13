import { screenSizeDataset } from "@/lib/screen-size-data";

export function GET() {
  return Response.json(screenSizeDataset, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
