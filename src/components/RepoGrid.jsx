export default function RepoGrid() {
  const repos = [
    {
      name: "Vector",
      description: "Custom C++ vector Library",
      language: "C++",
      stars: "12",
    },
    {
      name: "Vector",
      description: "Custom C++ vector Library",
      language: "C++",
      stars: "12",
    },
    {
      name: "Vector",
      description: "Custom C++ vector Library",
      language: "C++",
      stars: "12",
    },
    {
      name: "Vector",
      description: "Custom C++ vector Library",
      language: "C++",
      stars: "12",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-primary text-3xl font-extrabold">Top Repositories</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {repos.map((repo, index) => (
          <div
            key={index}
            className="hover:border-primary-container bg-surface-card border-border-subtle flex h-full flex-col items-baseline gap-2 rounded-xl border p-6 transition-colors"
          >
            <h3 className="text-surface-tint font-bold">{repo.name}</h3>
            <p className="text-text-secondary">{repo.description}</p>
            <div className="mt-auto flex gap-2 pt-4">
              <div className="bg-surface-container rounded-lg px-4 py-2 font-bold">
                {repo.language}
              </div>
              <div className="bg-surface-container rounded-lg px-4 py-2 font-bold">
                {repo.stars} stars
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
