export function DeliverableSkeleton() {
  return (
    <div className="w-full min-h-[120px] p-4 flex flex-col justify-between border rounded-lg bg-card relative">
      <div className="flex items-start text-left space-x-4 w-full">
        {/* Icon skeleton */}
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-muted animate-pulse" />

        <div className="flex flex-col flex-grow pr-8">
          {/* Title skeleton */}
          <div className="h-6 w-3/4 bg-muted rounded animate-pulse mb-2" />

          {/* Description skeleton - two lines */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Status badge skeleton */}
      <div className="absolute bottom-4 right-4">
        <div className="h-5 w-20 bg-muted rounded-full animate-pulse" />
      </div>
    </div>
  );
}
