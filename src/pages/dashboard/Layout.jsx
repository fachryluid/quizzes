import { Card } from "flowbite-react";
import { HiBookmark, HiPlus } from "react-icons/hi";
import { HiCog6Tooth, HiSquares2X2 } from "react-icons/hi2";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    label: 'Dasbor',
    href: '/dashboard',
    icon: <HiSquares2X2 />
  },
  {
    label: 'Buat Soal',
    href: '/dashboard/quiz',
    icon: <HiPlus />
  },
  {
    label: 'Disimpan',
    href: '/dashboard/saved',
    icon: <HiBookmark />
  },
  {
    label: 'Pengaturan',
    href: '/dashboard/settings',
    icon: <HiCog6Tooth />
  },
];

export default function Layout() {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-5 px-5 sm:px-20 py-10">
        <div className="basis-full lg:basis-1/5 flex flex-col h-fit border rounded-xl overflow-hidden">
          {links.map((link, idx) =>
            <NavLink
              key={idx}
              to={link.href}
              end
              className={({ isActive }) =>
                `${idx > 0 ? 'border-t' : ''} ${isActive ? 'bg-gray-100' : 'bg-white'} flex items-center justify-start space-x-3 py-3 px-4`
              }
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          )}
        </div>
        <Card className="basis-full h-fit shadow-none lg:basis-4/5">
          <Outlet />
        </Card>
      </div>
    </>
  );
}