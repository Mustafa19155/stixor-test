"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import SearchIcon from "@/assets/images/search.svg";
import NavToggleIcon from "@/assets/images/nav-toggle.svg";
import SmallSidebar from "./SmallSidebar";
import { EventsContext } from "@/context/eventsContext";

const Navbar = () => {
  const [showSidebar, setshowSidebar] = useState(false);
  const handleToggle = () => {
    setshowSidebar(true);
  };
  const [search, setsearch] = useState("");

  const { setevents, eventsCopy } = useContext(EventsContext);

  useEffect(() => {
    const filteredEvents = eventsCopy.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );
    setevents(filteredEvents);
  }, [search]);

  return (
    <div className="bg-white p-3 flex items-center justify-between lg:justify-start">
      <SmallSidebar setshowSidebar={setshowSidebar} showSidebar={showSidebar} />
      <div className="w-[10%] min-w-[35px]">
        <Image src={Logo} className="min-w-[35px]" />
      </div>
      <div className="bg-primary flex items-center gap-2 p-3 rounded-full w-[60%] lg:w-[50%]">
        <Image src={SearchIcon} />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className="bg-transparent outline-none min-w-0 w-full"
        />
      </div>
      <button onClick={handleToggle} className="block lg:hidden w-[10%]">
        <Image src={NavToggleIcon} />
      </button>
    </div>
  );
};

export default Navbar;
