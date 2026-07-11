interface IconBrandProps {
  width?: number;
  height?: number;
  className?: string;
}

// The workifind "W" brand mark. Mirrors the app favicon (src/app/icon.svg)
// so the tab icon and in-app logo stay visually consistent.
export default function IconBrand({
  width = 32,
  height = 32,
  className = "",
}: IconBrandProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="#4338ca" />
      <path
        d="M6.5 10 L10.5 22.5 L16 13.5 L21.5 22.5 L25.5 10"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
