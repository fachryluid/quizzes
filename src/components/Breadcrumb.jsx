import { NavLink } from "react-router-dom";

export default function Breadcrumb({ breadcrumbs }) {
  return (
    <nav className="flex items-center flex-wrap space-x-2 text-gray-700 text-sm">
      {breadcrumbs.map((breadcrumb, idx) => (
        <span key={idx} className="space-x-2">
          {breadcrumb.href ? (
            <NavLink to={breadcrumb.href} className="underline text-blue-500">
              {breadcrumb.label}
            </NavLink>
          ) : (
            <span>{breadcrumb.label}</span>
          )}
          {idx < breadcrumbs.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}