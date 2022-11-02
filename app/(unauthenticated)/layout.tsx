export default function UnauthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {children}
    </section>
  );
}
