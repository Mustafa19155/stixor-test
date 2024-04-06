import React from "react";
import LocationIcon from "@/assets/images/location.svg";
import Image from "next/image";
import moment from "moment";

const DetailsModal = ({ event }) => {
  return (
    <div className="fixed z-20 top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white rounded-lg w-[850px] max-w-[90vw]">
        <div className="p-5 border-[#C6CBD3] border-b flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold">{event.title}</p>
            <p className="text-gray2 font-semibold text-xl hidden sm:block">
              {moment(event.start).format("ddd D MMM YYYY, HH:MMA")}
            </p>
          </div>
          <p className="text-gray4">
            Category: <span className="font-semibold">{event.category}</span>
          </p>
          <p className="text-gray2 font-semibold text-sm block sm:hidden">
            {moment(event.start).format("ddd D MMM YYYY, HH:MMA")}
          </p>

          <p className="text-lg">Description</p>
          <p className="text-gray2">{event.description}</p>
        </div>
        <div className="flex items-center justify-center gap-2 p-5">
          <Image src={LocationIcon} alt="Location Icon" className="w-[25px]" />
          <p className="text-xl text-gray2">{event.location}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
