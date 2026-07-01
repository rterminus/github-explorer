export default function ErrorScreen({ searchQuery }) {
  return (
    <div className="bg-surface-card border-border-subtle flex flex-col items-center justify-center gap-4 rounded-xl border py-20 text-center">
      <span className="text-text-muted material-symbols-outlined text-5xl">
        Error!
      </span>
      <h2 className="text-text-primary text-2xl font-bold">User not found</h2>
      <p className="text-text-secondary">
        We couldn't find anyone with the username{" "}
        <span className="text-primary text-lg">@{searchQuery}</span>.
      </p>
    </div>
  );
}
