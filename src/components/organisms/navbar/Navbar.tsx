import image from "@/constants/fail-handler/image";
import { NavbarProps } from "@/types/props";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { GiHamburgerMenu } from "react-icons/gi";
import { Drawer } from "antd";
import { useState } from "react";

function Navbar({ logo = image.noImage }: NavbarProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <nav className="sticky md:static top-0 left-0 shadow-md sm:shadow-none bg-white z-20 flex items-center justify-between pb-5 md:mb-10 px-5 pt-5">
      <button className="md:hidden" onClick={showDrawer}>
        <GiHamburgerMenu />
      </button>
      <Drawer
        placement="left"
        onClose={onClose}
        open={open}
        className="relative"
      >
        <div className="flex flex-col gap-3">
          <Link
            className={twMerge(
              `hover:text-[#035F12]`,
              pathname === "/" && "font-semibold text-[#9FC510]"
            )}
            to={"/"}
          >
            Isi Data Bansos
          </Link>
          <Link
            className={twMerge(
              `hover:text-[#035F12]`,
              pathname === "/preview" && "font-semibold text-[#9FC510]"
            )}
            to={"/preview"}
          >
            Lihat Data
          </Link>
        </div>
        <p className="fixed bottom-5 ">2023 &copy; Kementerian Kesehatan</p>
      </Drawer>
      <img
        className="w-[10rem] md:w-[8rem] object-contain"
        src={logo}
        alt="nav-logo"
      />
      <div className="hidden md:flex items-center space-x-5">
        <Link
          className={twMerge(
            pathname === "/" && `underline-offset-4 underline`
          )}
          to={"/"}
        >
          Isi Data Bansos
        </Link>
        <Link
          className={twMerge(
            pathname === "/preview" && `underline-offset-4 underline`
          )}
          to={"/preview"}
        >
          Lihat Data
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
