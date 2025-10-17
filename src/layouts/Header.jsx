import React from "react";
import NavBar from "./NavBar";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { googleLogout } from "@react-oauth/google";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("googleUser"));

  return (
    <>
      <header className="backdrop-blur-sm bg-white/80 shadow-md sticky top-0 z-50">
        <nav className="flex items-center justify-between py-1  lg:px-8">
          {/* Logo & App Name */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Company Logo" className="h-12 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="text-black font-semibold text-lg hover:text-sky-600 transition-colors">
                NPDF TOOLKIT
              </span>
              <span
                className="text-blue-400 text-sm underline hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation(); // prevent navigating home
                  window.open("https://github.com/npdevind", "_blank");
                }}
              >
                BY NPDEV
              </span>
            </div>
          </div>

          {/* Main Navigation (hidden on mobile) */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <NavBar />
          </div>

          {/* Auth Buttons */}
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <img
                      src={user?.picture}
                      alt="user"
                      className="rounded-full w-9 "
                    />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-sky-900 p-2  text-white w-40 mt-4 shadow-2xl"
                  align="end"
                >
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      googleLogout();
                      localStorage.removeItem("googleUser");
                      navigate("/");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <Link
                to="/login"
                className="px-3 py-1 font-semibold text-black rounded hover:text-sky-900 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="#"
                className="px-3 py-1 font-semibold text-white bg-sky-900 rounded hover:bg-sky-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
