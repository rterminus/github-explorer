export default function RepoGrid({ repos }) {
  if (!repos || repos.length === 0) return null;

  return (
    <div
      className="animate-fade-in-up flex flex-col gap-6"
      style={{ animationDelay: "150ms" }}
    >
      <h2 className="text-primary text-3xl font-extrabold">Top Repositories</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="hover:border-primary-container bg-surface-card border-border-subtle flex h-full flex-col items-baseline gap-2 rounded-xl border p-6 transition-colors"
          >
            <h3 className="text-surface-tint font-bold">{repo.name}</h3>
            <p className="text-text-secondary line-clamp-2 text-sm">
              {repo.description || "No description provided."}
            </p>
            <div className="mt-auto flex gap-2 pt-4">
              {repo.language && (
                <div className="bg-surface-container rounded-lg px-4 py-2 font-bold">
                  {repo.language}
                </div>
              )}
              <div className="bg-surface-container rounded-lg px-4 py-2 font-bold">
                ⭐️ {repo.stargazers_count?.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
