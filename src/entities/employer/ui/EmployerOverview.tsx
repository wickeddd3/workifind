/**
 * Industry and location as labelled rows.
 *
 * Headingless on purpose: the owner's profile page puts it inside a
 * `ProfileSection` that supplies the title, and the public page's tab supplies
 * its own. A heading baked in here would render twice on one of them.
 */
export function EmployerOverview({
  industry,
  location,
}: {
  industry?: string | null;
  location?: string | null;
}) {
  if (!industry && !location) return null;

  return (
    <dl className="flex flex-col gap-3">
      {industry && (
        <div className="flex gap-4">
          <dt className="w-28 shrink-0 text-sm font-medium text-muted-foreground md:text-md">
            Industry
          </dt>
          <dd className="text-sm text-foreground md:text-md">{industry}</dd>
        </div>
      )}
      {location && (
        <div className="flex gap-4">
          <dt className="w-28 shrink-0 text-sm font-medium text-muted-foreground md:text-md">
            Location
          </dt>
          <dd className="text-sm text-foreground md:text-md">{location}</dd>
        </div>
      )}
    </dl>
  );
}
