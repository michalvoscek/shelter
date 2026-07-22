type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

function base(props: IconProps) {
  return {
    width: props.size ?? 24,
    height: props.size ?? 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: props.color ?? "currentColor",
    strokeWidth: props.strokeWidth ?? 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function SlovakFlag({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 2) / 3}
      viewBox="0 0 24 16"
      aria-label="Slovensko"
    >
      <rect width="24" height="16" rx="2" fill="#ffffff" />
      <rect y="5.33" width="24" height="5.33" fill="#0b4ea2" />
      <rect y="10.66" width="24" height="5.34" fill="#ee1c25" />
      <rect x="4" y="3.5" width="7" height="9" rx="2.5" fill="#ee1c25" stroke="#ffffff" strokeWidth="0.8" />
      <path d="M6.5 6.2h1.6M7.3 5.4v3.4" stroke="#ffffff" strokeWidth="0.9" />
      <path d="M5.6 9.6c.6.8 2.8.8 3.4 0" fill="none" stroke="#0b4ea2" strokeWidth="0.9" />
    </svg>
  );
}

export function CzechFlag({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 2) / 3}
      viewBox="0 0 24 16"
      aria-label="Česko"
    >
      <rect width="24" height="16" rx="2" fill="#ffffff" />
      <rect y="8" width="24" height="8" fill="#d7141a" />
      <path d="M0 0h12L0 16z" fill="#11457e" />
    </svg>
  );
}
