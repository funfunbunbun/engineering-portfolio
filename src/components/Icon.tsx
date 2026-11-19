type IconName = "linkedin" | "youtube" | "expand" | "close" | "play" | "pause" | "reset";

export default function Icon({ name }: { name: IconName }) {
  if (name === "linkedin") return (
    <svg viewBox="0 0 24 24" className="ui-icon social-logo linkedin-logo" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
      <circle cx="7.4" cy="7.3" r="1.5" fill="white" />
      <path d="M6 10h2.8v8H6zm5 0h2.7v1.1c.6-.9 1.5-1.3 2.5-1.3 2.5 0 3 1.6 3 3.8V18h-2.8v-4c0-1-.1-1.9-1.3-1.9s-1.4 1-1.4 1.9v4H11z" fill="white" />
    </svg>
  );
  if (name === "youtube") return (
    <svg viewBox="0 0 24 24" className="ui-icon social-logo youtube-logo" aria-hidden="true" focusable="false">
      <rect x="1" y="4" width="22" height="16" rx="5" fill="currentColor" />
      <path d="m10 8 6 4-6 4z" fill="white" />
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" className="ui-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === "expand" && <path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" />}
      {name === "close" && <path d="m6 6 12 12M6 18 18 6" />}
      {name === "play" && <path d="m8 5 11 7-11 7z" />}
      {name === "pause" && <path d="M8 5v14M16 5v14" />}
      {name === "reset" && <path d="M3 11a9 9 0 1 1 2.6 7.4M3 4v7h7" />}
    </svg>
  );
}
