import { EventsContext } from "@/context/eventsContext";
import React, { useContext } from "react";

const Stats = () => {
  const { events } = useContext(EventsContext);
  return (
    <div className="w-full justify-between flex text-center sm:text-start">
      <div className="w-[30%] p-3 sm:p-5 bg-white border border-[#F3F3F3] rounded-2xl sm:pb-12 h-full flex flex-col justify-center sm:justify-start">
        <p className="text-gray2 font-semibold text-sm">All Events</p>
        <p className="text-blue text-3xl font-bold mt-1">{events.length}</p>
      </div>
      <div className="w-[30%] p-3 sm:p-5 bg-white border border-[#F3F3F3] rounded-2xl sm:pb-12 h-full flex flex-col justify-center sm:justify-start">
        <p className="text-gray2 font-semibold text-sm">This Month Events</p>
        <p className="text-blue text-3xl font-bold mt-1">
          {
            events.filter((event) => {
              const date = new Date(event.start);
              return date.getMonth() === new Date().getMonth();
            }).length
          }
        </p>
      </div>
      <div className="w-[30%] p-3 sm:p-5 bg-white border border-[#F3F3F3] rounded-2xl sm:pb-12 h-full flex flex-col justify-center sm:justify-start">
        <p className="text-gray2 font-semibold text-sm">Favorite Events</p>
        <p className="text-blue text-3xl font-bold mt-1">
          {events.filter((eve) => eve.isFavorite).length}
        </p>
      </div>
    </div>
  );
};

export default Stats;
