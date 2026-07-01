import SearchBar from "./SearchBar.jsx";

export default function Navbar({ onSearch, isLoading }) {
  return (
    <header className="bg-surface-bg border-border-subtle w-full border-b">
      <div className="mx-auto flex h-20 w-full max-w-3xl flex-row items-center justify-between px-6 lg:px-0">
        <h1 className="text-primary font-mono text-xl font-bold tracking-wider md:text-2xl">
          GITEXPLORER
        </h1>
        <SearchBar
          onSearch={onSearch}
          isLoading={isLoading}
          wrapperClass="max-w-48 md:max-w-md"
          inputClass="text-base"
        />
      </div>
    </header>
  );
}
