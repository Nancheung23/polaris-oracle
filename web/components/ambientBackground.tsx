export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-amber-50" />
      <div className="absolute -top-20 -left-20 h-120 w-120 rounded-full bg-indigo-200/50 blur-3xl motion-safe:animate-[float-a_16s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 right-0 h-110 w-110 rounded-full bg-amber-200/40 blur-3xl motion-safe:animate-[float-b_18s_ease-in-out_infinite]" />
      <div className="absolute top-1/2 left-1/2 h-95 w-95 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-100/30 blur-3xl motion-safe:animate-[float-c_20s_ease-in-out_infinite]" />
    </div>
  );
}
