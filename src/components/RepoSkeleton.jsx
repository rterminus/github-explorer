export default function RepoSkeleton() {
  const skeletonBg = { backgroundColor: "#353437" };

  const skeletonCards = [1, 2, 3, 4];

  return (
    <div className="flex w-full animate-pulse flex-col gap-6">
      <h2 className="text-primary text-3xl font-extrabold">Top Repositories</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {skeletonCards.map((item) => (
          <div
            key={item}
            className="bg-surface-card border-border-subtle flex h-40 w-full flex-col items-baseline justify-between rounded-xl border p-6"
          >
            <div className="flex w-full flex-col gap-3">
              <div style={skeletonBg} className="h-6 w-1/2 rounded-md" />
              <div style={skeletonBg} className="h-4 w-full rounded-md" />
              <div style={skeletonBg} className="h-4 w-3/4 rounded-md" />
            </div>
            <div className="mt-auto flex w-full gap-2 pt-4">
              <div style={skeletonBg} className="h-6 w-16 rounded-lg" />
              <div style={skeletonBg} className="h-6 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
