export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
