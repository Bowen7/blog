export const code = /* jsx */ `
export default function App() {
  return (
    <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
      <g
        stroke="black"
        fill="#85A600"
        style={{
          "--fill-color": "#85A600"
        }}
      >
        <path
          d="M 0 24 L 64 24"
          fill="none"
          stroke="var(--fill-color)"
          strokeWidth={4}
        />
        <path d="M 0 48 L 64 48" fill="none" strokeWidth={4} />
      </g>
    </svg>
  );
}

`.trim()
