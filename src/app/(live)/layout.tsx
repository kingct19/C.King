export default function LiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-live-overlay="" className="dark min-h-screen bg-transparent">
      {children}
    </div>
  );
}
