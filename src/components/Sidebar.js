"use client";
import React from "react";
import Image from "next/image";
import DashboardIcon from "@/assets/images/dashboard.svg";
import HeartIcon from "@/assets/images/heart.svg";
import HeartActiveIcon from "@/assets/images/heart-active.svg";
import DashboardActiveIcon from "@/assets/images/dashboard-active.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="p-2 rounded-full bg-white w-fit hidden lg:block">
      <div className="flex flex-col gap-5">
        <Link href={"/"} className="bg-primary p-2 rounded-full w-fit">
          {pathname == "/" ? (
            <Image src={DashboardActiveIcon} />
          ) : (
            <Image src={DashboardIcon} />
          )}
        </Link>
        <Link href={"/favorites"} className="bg-primary p-2 rounded-full w-fit">
          {pathname == "/favorites" ? (
            <Image src={HeartActiveIcon} />
          ) : (
            <Image src={HeartIcon} />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
