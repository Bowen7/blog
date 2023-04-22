export const code = /* jsx */ `
export default function App() {
  return (
    <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
      <g stroke="black" fill="#85A600">
        <defs>
          <pattern
            id="fill"
            patternUnits="userSpaceOnUse"
            width="10"
            height="10"
          >
            <rect width={10} height={10} stroke="none" />
          </pattern>
        </defs>
        <path
          d="M 0 24 L 64 24"
          fill="none"
          stroke="url(#fill)"
          strokeWidth={4}
        />
        <path d="M 0 48 L 64 48" fill="none" strokeWidth={4} />
      </g>
    </svg>
  );
}
`.trim()
