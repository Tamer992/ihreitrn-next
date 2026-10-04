import { kugelSvg } from "@/szene/kugelbild";

export const dynamic = "force-static";

export function GET() {
  return new Response(kugelSvg(), {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
}
