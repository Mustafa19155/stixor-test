import React, { useContext, useEffect, useState } from "react";
import Person from "@/assets/images/person.png";
import AwardIcon from "@/assets/images/best-of-month.svg";
import Image from "next/image";
import LocationIcon from "@/assets/images/location.svg";
import moment from "moment";
import { EventsContext } from "@/context/eventsContext";

const EventOfMonth = () => {
  const { eventOfMonth } = useContext(EventsContext);

  return (
    <div className="bg-purple p-3 rounded-2xl shadow-2xl w-[393px] lg:w-auto self-center lg:self-auto max-w-[95vw]">
      <div className="flex items-center justify-between text-white">
        <p className="text-4xl font-bold mb-2">
          Event of
          <br /> the month
        </p>
        <Image src={AwardIcon} />
      </div>
      <div className="bg-white p-3 rounded-2xl flex justify-between">
        <div className="flex flex-col gap-2 w-[75%]">
          <p className="text-purple font-bold text-2xl">{eventOfMonth.title}</p>
          <p className="text-sm text-gray2">
            Category:
            <span className="font-semibold"> {eventOfMonth.category}</span>
          </p>
          <div className="flex items-center gap-1">
            <Image src={LocationIcon} />
            <p className="text-xs">{eventOfMonth.location}</p>
          </div>
        </div>
        <div className="flex flex-col justify-end items-end text-gray3 text-xs w-[25%]">
          {/* <div className="flex">
            <Image src={data.image} className="rounded-full" />
            <Image src={data.image} className="rounded-full" />
            <Image src={data.image} className="rounded-full" />
          </div> */}
          <p className="mt-2">
            {moment(eventOfMonth.start).format("ddd D MMM YYYY")}
          </p>
          <p>{moment(eventOfMonth.start).format("HH:MM a")}</p>
        </div>
      </div>
    </div>
  );
};

export default EventOfMonth;
