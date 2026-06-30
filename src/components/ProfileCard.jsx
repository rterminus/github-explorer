export default function ProfileCard() {
  const stats = [
    { label: "Followers", value: "1.2k" },
    { label: "Stars", value: "200" },
    { label: "Contributions Last Year", value: "600" },
  ];
  return (
    <div className="bg-surface-card border-border-subtle mx-auto flex w-full flex-col items-stretch gap-10 rounded-xl border p-8">
      <div className="flex flex-row gap-8">
        <img
          src="https://github.com/github.png"
          alt=""
          className="h-40 w-40 rounded-full"
        />
        <div className="flex flex-col items-start justify-center gap-4">
          <h2 className="text-text-primary text-2xl font-bold">
            Linus Torvalds
          </h2>
          <span className="text-primary">@linus</span>
          <p className="text-text-secondary">Linux Creator</p>
        </div>
      </div>
      <div className="bg-surface-input border-border-subtle divide-border-subtle grid grid-cols-3 divide-x rounded-2xl border py-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-evenly gap-1"
          >
            <span className="text-primary-fixed font-mono text-xl">
              {stat.value}
            </span>
            <span className="text-text-muted text-sm">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
