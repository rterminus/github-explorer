import { Search, Loader2 } from "lucide-react";

export default function SearchBar({
  onSearch,
  isLoading,
  wrapperClass,
  inputClass,
}) {
  const handleKeyDown = (event) => {
    if (event.key !== "Enter") return;

    const typedText = event.target.value;

    onSearch(typedText);
  };

  return (
    <div className={`relative w-full ${wrapperClass || ""}`}>
      {isLoading ? (
        <Loader2 className="text-text-muted absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 animate-spin" />
      ) : (
        <Search className="text-text-muted absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
      )}
      <input
        className={`bg-surface-input text-text-primary border-border-subtle focus:border-primary focus:ring-primary w-full rounded-md border px-4 py-2 pl-10 font-bold transition-colors focus:ring-1 focus:outline-none ${inputClass || ""}`}
        type="text"
        placeholder={isLoading ? "Searching..." : "Search GitHub username..."}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
    </div>
  );
}
