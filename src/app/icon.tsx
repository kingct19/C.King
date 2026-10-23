import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: 15,
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2.2"
            y="2.2"
            width="27.6"
            height="27.6"
            rx="5.5"
            stroke="#ffffff"
            strokeWidth="3.2"
          />
          <path
            d="M 19.6 2.8 L 14.2 17.5 C 9.8 21.8 9.8 25.8 14.2 29.2"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 2.8 11.2 C 6.5 13.5 10.5 17.6 14.2 18.2 C 18.5 18.8 24.5 18.0 29.2 15.2"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
