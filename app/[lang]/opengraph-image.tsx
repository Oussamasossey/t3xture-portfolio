import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
// Language-neutral on purpose: brand + stack only, so one image is correct for EN / FR / Darija.
export const alt = `${siteConfig.realName} — aka ${siteConfig.name}`;

export default async function OpenGraphImage() {
  const symbol = await readFile(
    join(process.cwd(), "assets/T3xture-Brand/Symbol/Dark/T3xture_Symbol_Dark_256px.png"),
  );
  const symbolSrc = `data:image/png;base64,${symbol.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#ffffff",
          backgroundColor: "#0b0b12",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(139,92,246,0.45), transparent 45%), radial-gradient(circle at 85% 80%, rgba(34,211,238,0.35), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={symbolSrc} width={64} height={64} alt="" />
          <div style={{ fontSize: 28, opacity: 0.75 }}>{siteConfig.url}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              marginTop: 18,
              color: "#a5b4fc",
              fontWeight: 500,
            }}
          >
            {siteConfig.realName} — aka {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span>React</span>
          <span>·</span>
          <span>Next.js</span>
          <span>·</span>
          <span>TypeScript</span>
        </div>
      </div>
    ),
    size,
  );
}
