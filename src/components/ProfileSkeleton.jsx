export default function ProfileSkeleton() {
  const placeholders = [0, 1, 2];

  return (
    <div className="bg-surface-card border-border-subtle mx-auto flex w-full flex-col items-stretch gap-10 rounded-xl border p-8 animate-pulse">
      <div className="flex flex-row gap-8">
        <div className="h-40 w-40 rounded-full bg-surface-container-high" />
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="h-7 w-48 rounded-md bg-surface-container-high" />
          <div className="h-4 w-24 rounded-md bg-surface-container-high" />
          <div className="h-4 w-32 rounded-md bg-surface-container-high" />
        </div>
      </div>
      <div className="bg-surface-input border-border-subtle divide-border-subtle grid grid-cols-3 divide-x rounded-2xl border py-6">
        {placeholders.map((index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-evenly gap-2"
          >
            <div className="h-6 w-12 rounded-md bg-surface-container-high" />
            <div className="h-3 w-20 rounded-md bg-surface-container-high" />
          </div>
        ))}
      </div>
    </div>
  );
}
