export function AdSlot({ label = "Advertisement" }: { label?: string }) {
  return (
    <aside className="ad-slot" aria-label={label}>
      <span>{label}</span>
    </aside>
  );
}
