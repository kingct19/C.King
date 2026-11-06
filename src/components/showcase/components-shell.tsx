export function ComponentsShell({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="components"
      className="relative flex min-h-dvh w-full flex-col gap-y-4 overflow-x-clip border-x bg-background pt-[env(safe-area-inset-top)] xl:overflow-x-visible"
    >
      {children}
    </main>
  );
}
