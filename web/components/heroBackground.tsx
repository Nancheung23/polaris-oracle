export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-indigo-100 via-violet-50 to-amber-100" />

      <div className="absolute -top-10 -left-10 h-175 w-175 rounded-full bg-indigo-300/60 blur-3xl motion-safe:animate-[float-a_14s_ease-in-out_infinite]" />
      <div className="absolute top-1/4 -right-20 h-190 w-190 rounded-full bg-amber-300/50 blur-3xl motion-safe:animate-[float-b_16s_ease-in-out_infinite]" />
      <div className="absolute -bottom-40 left-1/4 h-155 w-155 rounded-full bg-rose-200/55 blur-3xl motion-safe:animate-[float-c_18s_ease-in-out_infinite]" />
      <div className="absolute top-1/2 left-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300/45 blur-3xl motion-safe:animate-[float-d_20s_ease-in-out_infinite]" />

      <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle,#111827_1px,transparent_1px)] bg-size-[48px_48px] motion-safe:animate-[twinkle_6s_ease-in-out_infinite]" />

      <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle,#111827_1px,transparent_1px)] bg-size-[48px_48px] motion-safe:animate-[twinkle_6s_ease-in-out_infinite]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-white" />
    </div>
  );
}
