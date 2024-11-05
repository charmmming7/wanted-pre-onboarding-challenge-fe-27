import { Outlet } from 'react-router-dom';

const Layout = ({ children }: any) => {
  return (
    <div className="m-auto flex h-screen max-w-2xl flex-col p-6 text-center">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
