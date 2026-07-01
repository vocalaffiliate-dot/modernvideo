import Link from "next/link";

/** A single tag rendered as a link into the browse/filter view. */
export function TagChip({ tag }: { tag: string }) {
  return (
    <Link href={`/browse?tag=${encodeURIComponent(tag)}`} className="chip">
      <span aria-hidden className="text-accent-deep">#</span>
      {tag}
    </Link>
  );
}
