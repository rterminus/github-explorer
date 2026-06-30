const anchors = [
  { label: "GitHub", link: "https://github.com/rterminus/" },
  { label: "Codeberg", link: "https://codeberg.com/rterminus/" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/renanspontes/" },
  { label: "GitHub API Docs", link: "https://docs.github.com/en/rest" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-bg border-border-subtle w-full border-t">
      <div className="mx-auto flex h-20 w-full max-w-3xl flex-row items-center justify-between px-6 lg:px-0">
        <span className="text-text-muted text-sm">
          © 2026, rterminus. Built for developers.
        </span>
        <div className="text-text-muted flex gap-4">
          {anchors.map((a) => (
            <a href={a.link} className="hover:text-primary transition-colors">
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
