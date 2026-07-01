import SearchBar from "./SearchBar";

export default function HomeScreen({ onSearch, isLoading }) {
  return (
    <div className="animate-fade-in-up flex flex-1 flex-col items-center justify-center px-6 text-center">
      <h1 className="text-primary text-3xl font-extrabold md:text-5xl">
        GitHub Explorer
      </h1>
      <p className="text-text-muted mt-4 max-w-lg text-base md:text-lg">
        Search for any GitHub user to explore their repositories and statistics.
      </p>
      <SearchBar
        onSearch={onSearch}
        isLoading={isLoading}
        wrapperClass="w-full max-w-2xl mt-8"
        inputClass="py-3 text-base pl-10 md:py-4 md:text-lg md:pl-12"
      />
    </div>
  );
}
