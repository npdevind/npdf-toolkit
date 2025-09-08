import React from "react";
import NavBar from "./NavBar";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <>
      <header className="backdrop-blur-[2px] bg-white shadow">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8"
        >
          <div className="flex items-center lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img src={logo} alt="Company Logo" className="h-12 w-auto" />
              <div className="flex flex-col leading-tight">
                <span className="text-black font-semibold text-md">
                  NPDF TOOLKIT
                </span>
                <span className="text-gray-400 text-sm">BY NPDEVIND</span>
              </div>
            </a>
          </div>

          <div className="hidden lg:flex">
            <NavBar />
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-black">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
