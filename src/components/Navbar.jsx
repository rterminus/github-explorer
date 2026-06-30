import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-surface-bg border-border-subtle w-full border-b">
      <div className="mx-auto flex h-20 w-full max-w-3xl flex-row items-center justify-between px-6 lg:px-0">
        <h1 className="text-primary font-mono text-2xl font-bold tracking-wider">
          GITEXPLORER
        </h1>
        <div className="relative w-full max-w-md">
          <Search className="text-text-muted absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
          <input
            className="bg-surface-input text-text-primary border-border-subtle focus:border-primary focus:ring-primary w-full rounded-md border px-4 py-2 pl-10 font-bold transition-colors focus:ring-1 focus:outline-none"
            type="text"
            placeholder="Search GitHub username..."
          />
        </div>
      </div>
    </header>
  );
}
