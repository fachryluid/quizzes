import { getUser } from "@/services/userService";
import { Button } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const user = getUser();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset scroll on component unmount or when isOpen changes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="w-full h-16 flex items-center justify-between px-5 sm:px-20 shadow relative">
        <NavLink to="/">
          <h1 className="text-2xl font-medium">Quizzes</h1>
        </NavLink>

        {/* Hamburger Icon */}
        <button
          className="text-black focus:outline-none sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>

        <ul
          className={`${isOpen ? "block" : "hidden"
            } absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white px-5 space-y-5 border-t border-b z-20 py-5 sm:py-0 sm:z-0 sm:border-0 sm:space-y-0 sm:px-0 sm:static sm:flex sm:space-x-10 sm:items-center sm:w-fit sm:h-auto`}
        >
          <li>
            <Link to="/about" className="font-medium hover:text-yellow-400">
              Tentang
            </Link>
          </li>
          <li>
            <Link to="/contributors" className="font-medium hover:text-yellow-400">
              Kontributor
            </Link>
          </li>
          <li>
            {user ?
              <Button onClick={() => navigate('/dashboard')} color="dark" size="sm" className="w-full sm:w-auto font-medium">
                Dasbor
              </Button>
              :
              <Button onClick={() => navigate('/login')} color="dark" size="sm" className="w-full sm:w-auto font-medium">
                Login
              </Button>
            }
          </li>
        </ul>
      </nav>
    </>
  );
}