export function VideoEmbed({ src, title }: { src: string; title?: string }) {
  const isYouTube = /youtube\.com|youtu\.be/.test(src);
  const isVimeo = /vimeo\.com/.test(src);

  if (isYouTube) {
    const videoId = src.match(/(?:v=|\/)([\w-]{11})/)?.[1] || src.split("/").pop();
    return (
      <figure className="my-8 overflow-hidden rounded-2xl border border-neutral-100">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {title && <figcaption className="px-4 py-3 text-xs text-neutral-400">{title}</figcaption>}
      </figure>
    );
  }

  if (isVimeo) {
    const videoId = src.split("/").pop();
    return (
      <figure className="my-8 overflow-hidden rounded-2xl border border-neutral-100">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://player.vimeo.com/video/${videoId}`}
            title={title || "Vimeo video"}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        {title && <figcaption className="px-4 py-3 text-xs text-neutral-400">{title}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-neutral-100">
      <video controls className="w-full" title={title}>
        <source src={src} />
      </video>
      {title && <figcaption className="px-4 py-3 text-xs text-neutral-400">{title}</figcaption>}
    </figure>
  );
}
