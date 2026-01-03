import React, { useEffect } from "react";
import NavBar from "./NavBar";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { googleLogout } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("googleUser"));

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/20">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo & App Name */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
            <img
              src={logo}
              alt="Company Logo"
              className="relative h-10 w-auto"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-foreground font-bold text-xl tracking-tight group-hover:text-primary transition-colors">
              NPDF Toolkit
            </span>
          </div>
        </div>

        {/* Main Navigation (hidden on mobile) */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <NavBar />
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative rounded-full ring-2 ring-primary/20 hover:ring-primary/50 transition-all">
                  <Avatar>
                    <img
                      src={user?.picture}
                      alt="user"
                      className="rounded-full w-9 h-9 object-cover"
                    />
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-popover text-popover-foreground p-1 rounded-lg shadow-xl border border-border min-w-[150px] mt-2 animate-in fade-in zoom-in-95"
                align="end"
              >
                <DropdownMenuItem
                  className="cursor-pointer px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground outline-none transition-colors"
                  onClick={() => {
                    googleLogout();
                    localStorage.removeItem("googleUser");
                    navigate("/");
                  }}
                >
                  Logout
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground outline-none transition-colors"
                  onClick={() => {
                    const isDark =
                      document.documentElement.classList.contains("dark");

                    if (isDark) {
                      document.documentElement.classList.remove("dark");
                      localStorage.setItem("theme", "light");
                    } else {
                      document.documentElement.classList.add("dark");
                      localStorage.setItem("theme", "dark");
                    }
                  }}
                >
                  {document.documentElement.classList.contains("dark") ? (
                    <SunIcon className="w-5 h-5" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary hover:bg-primary/10"
                >
                  Log in
                </Button>
              </Link>
              <Link to="#">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
