import React from "react";
import Logo from "@/assets/images/logo-white.png";
import Image from "next/image";
import XIcon from "@/assets/images/x.svg";
import Link from "next/link";

const SmallSidebar = ({ showSidebar, setshowSidebar }) => {
  const handleHide = () => {
    setshowSidebar(false);
  };
  return (
    <div
      className={`duration-200 fixed h-[100vh] w-[100vw] top-0 bg-purple z-30 text-white px-8 pt-4 block lg:hidden ${
        showSidebar ? "right-0" : "-right-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <Image src={Logo} className="w-[35px]" />
        <Image src={XIcon} onClick={handleHide} />
      </div>
      <div className="flex flex-col gap-5 mt-8">
        <Link
          className="border-b border-white text-center pb-2"
          href={"/"}
          onClick={handleHide}
        >
          Dashboard
        </Link>
        <Link
          className="border-b border-white text-center pb-2"
          href={"/favorites"}
          onClick={handleHide}
        >
          Favorites
        </Link>
      </div>
    </div>
  );
};

export default SmallSidebar;
