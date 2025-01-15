// /app/admin/dashboard/layout.tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Admin specific layout (header/footer for admin can go here) */}
      <header>Admin Header (optional)</header>
      <main>{children}</main>
      {/* Optional Admin footer */}
      <footer>Admin Footer (optional)</footer>
    </div>
  );
}
