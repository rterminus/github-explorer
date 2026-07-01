const anchors = [
  { label: "GitHub", link: "https://github.com/rterminus/" },
  { label: "Codeberg", link: "https://codeberg.com/rterminus/" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/renanspontes/" },
  { label: "GitHub API Docs", link: "https://docs.github.com/en/rest" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-bg border-border-subtle w-full border-t">
      <div className="mx-auto flex h-auto w-full max-w-3xl flex-col items-center justify-between gap-4 px-6 py-8 md:h-20 md:flex-row md:py-0 lg:px-0">
        <span className="text-text-muted text-sm">
          © 2026, rterminus. Built for developers.
        </span>
        <div className="text-text-muted flex flex-wrap justify-center gap-4 text-sm">
          {anchors.map((a) => (
            <a
              key={a.label}
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
