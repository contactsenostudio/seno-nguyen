import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          background: "#0a0a0a",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="28" height="48" viewBox="0 0 50.5 100" fill="none">
          {/* Orange visible derrière via even-odd */}
          <rect x="27.1" y="6.3" width="19.5" height="44.3" fill="#e05a2b" />
          {/* Pentagone blanc avec trou rectangulaire */}
          <path
            fillRule="evenodd"
            d="M 23.7,0 L 50.5,0 L 50.5,100 L 0,100 L 0,44.7 Z M 27.1,6.3 L 46.6,6.3 L 46.6,50.6 L 27.1,50.6 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
