import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className="m-auto flex h-screen max-w-2xl flex-col">
        <Header />
        <main className="h-full w-full py-3">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </>
  );
};

export default Layout;
