import { useEffect, useRef, useState } from "react";

export default function DemoEmbed({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(800);
  useEffect(() => {
    function resize(event: MessageEvent) {
      if (
        event.origin !== window.location.origin ||
        event.source !== ref.current?.contentWindow
      )
        return;
      if (
        event.data?.type !== "vm-demo-height" ||
        typeof event.data.height !== "number" ||
        !Number.isFinite(event.data.height)
      )
        return;
      setHeight(Math.max(200, Math.min(2000, Math.ceil(event.data.height))));
    }
    window.addEventListener("message", resize);
    return () => window.removeEventListener("message", resize);
  }, []);
  return (
    <iframe
      ref={ref}
      className="demo-frame"
      style={{ height }}
      title={`${title} interactive simulation`}
      src={`${import.meta.env.BASE_URL}demos/${slug}/index.html`}
      sandbox="allow-scripts allow-same-origin"
      loading="lazy"
    />
  );
}
