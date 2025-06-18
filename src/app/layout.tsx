import '../globals.css';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 flex flex-col min-h-screen">
        <Header className="bg-white shadow-md p-4" />
        <div className="flex flex-1">
          <Sidebar className="w-64 bg-gray-100 p-4" />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}