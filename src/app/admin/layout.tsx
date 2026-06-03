import Sidebar from '../../components/admin/Sidebar';

export const metadata = { title: 'Admin - Poster' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-900 text-silver">
      <div className="flex">
        <aside className="w-72 hidden md:block border-r border-dark-700 p-6">
          <Sidebar />
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
