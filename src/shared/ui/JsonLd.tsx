// Renders a schema.org JSON-LD script. The `<` escape prevents any string
// value (e.g. a job description) from prematurely closing the script tag.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
