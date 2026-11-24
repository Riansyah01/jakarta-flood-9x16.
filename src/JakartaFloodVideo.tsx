import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const RainLayer: React.FC<{ intensity?: number }> = ({ intensity = 50 }) => {
  const frame = useCurrentFrame();
  const drops = Array.from({ length: intensity }, (_, i) => {
    const x = (i * 197) % 100;
    const speed = 22 + (i % 12);
    const offset = (i * 131) % 1920;
    const y = ((frame * speed + offset) % 2040) - 120;
    return { id: i, x, y, length: 22 + (i % 16) };
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {drops.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.x}%`,
            top: d.y,
            width: 2.5,
            height: d.length,
            backgroundColor: "rgba(147, 197, 253, 0.35)",
            borderRadius: 999,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const WaterLevel: React.FC<{ heightPercent: number; color?: string }> = ({
  heightPercent,
  color = "rgba(14, 165, 233, 0.28)",
}) => {
  const frame = useCurrentFrame();
  const waveShift = Math.sin(frame * 0.08) * 18;

  return (
    <div
      style={{
        position: "absolute",
        left: "-6%",
        right: "-6%",
        bottom: 0,
        height: `${Math.max(0, heightPercent)}%`,
        backgroundColor: color,
        borderTop: "3px solid rgba(125, 211, 252, 0.65)",
        transform: `translateX(${waveShift}px)`,
      }}
    />
  );
};

const SceneOpening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14 } });
  const subtitleOpacity = interpolate(frame, [25, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const waterHeight = interpolate(frame, [0, 210], [6, 24], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #071324 0%, #0F2942 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: "140px 64px 220px 64px",
        color: "#F8FAFC",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <RainLayer intensity={60} />
      <WaterLevel heightPercent={waterHeight} />

      <div
        style={{
          zIndex: 2,
          textAlign: "center",
          transform: `scale(${titleScale})`,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "10px 24px",
            borderRadius: 999,
            backgroundColor: "rgba(56, 189, 248, 0.18)",
            border: "1px solid rgba(56, 189, 248, 0.45)",
            color: "#7DD3FC",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 1,
            marginBottom: 32,
          }}
        >
          EDUKASI KOTA • JAKARTA
        </div>
        <h1
          style={{
            fontSize: 76,
            lineHeight: 1.12,
            margin: 0,
            fontWeight: 800,
          }}
        >
          Banjir Jakarta: Lebih dari Sekadar Hujan
        </h1>
        <p
          style={{
            opacity: subtitleOpacity,
            fontSize: 34,
            color: "#CBD5E1",
            marginTop: 32,
            lineHeight: 1.4,
          }}
        >
          Kenapa genangan cepat muncul dan bagaimana langkah mitigasinya?
        </p>
      </div>
    </AbsoluteFill>
  );
};

const SceneCauses: React.FC = () => {
  const frame = useCurrentFrame();

  const items = [
    {
      label: "Hujan Ekstrem",
      detail: "Intensitas deras melampaui kapasitas saluran eksisting",
      width: 88,
      delay: 10,
      accent: "#38BDF8",
    },
    {
      label: "Penurunan Muka Tanah & Resapan",
      detail: "Ruang terbuka hijau dan daerah resapan kian terbatas",
      width: 82,
      delay: 50,
      accent: "#F59E0B",
    },
    {
      label: "Beban Drainase Hulu–Hilir",
      detail: "Sinkronisasi saluran lokal, sungai, waduk, dan pesisir",
      width: 76,
      delay: 90,
      accent: "#F87171",
    },
  ];

  const waterHeight = interpolate(frame, [0, 270], [24, 34], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #09182B 0%, #112238 100%)",
        padding: "130px 60px 210px 60px",
        color: "#F8FAFC",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <RainLayer intensity={40} />
      <WaterLevel heightPercent={waterHeight} color="rgba(245, 158, 11, 0.14)" />

      <div style={{ zIndex: 2 }}>
        <h2 style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.15, margin: "0 0 16px 0" }}>
          Faktor Pemicu Utama
        </h2>
        <p style={{ fontSize: 30, color: "#94A3B8", margin: "0 0 52px 0", lineHeight: 1.35 }}>
          Gabungan kondisi cuaca, fisik wilayah, dan aliran air
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          {items.map((item) => {
            const progress = interpolate(
              frame,
              [item.delay, item.delay + 45],
              [0, item.width],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const opacity = interpolate(
              frame,
              [item.delay, item.delay + 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            
