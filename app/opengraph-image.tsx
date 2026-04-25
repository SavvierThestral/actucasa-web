import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ACTuCasa — Construcción Modular en Steel Framing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#060c14",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            backgroundColor: "#044f97",
          }}
        />

        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "2px",
              backgroundColor: "#044f97",
            }}
          />
          <span
            style={{
              fontSize: "13px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Construcción en Seco · Argentina
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "74px",
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.0,
            marginBottom: "24px",
          }}
        >
          Construcción modular
          <br />
          <span style={{ color: "#044f97", fontStyle: "italic" }}>
            en Steel Frame.
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.5,
            maxWidth: "680px",
          }}
        >
          Módulos habitacionales y oficinas fabricados en taller.
          Buenos Aires y Gran Buenos Aires.
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            top: "72px",
            right: "80px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.06em",
          }}
        >
          actucasa.com.ar
        </div>
      </div>
    ),
    { ...size }
  );
}
