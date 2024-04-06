import React, { useContext } from "react";
import Image from "next/image";
import HeartIcon from "@/assets/images/heart.svg";
import HeartActiveIcon from "@/assets/images/favorite.svg";
import moment from "moment";
import { EventsContext } from "@/context/eventsContext";

const UpcomingEvents = () => {
  const { setevents, events, seteventsCopy } = useContext(EventsContext);

  const handleFavorite = (id) => {
    setevents((prev) =>
      prev.map((event) => {
        if (event.id === id) {
          return {
            ...event,
            isFavorite: !event.isFavorite,
          };
        }
        return event;
      })
    );
    seteventsCopy((prev) =>
      prev.map((event) => {
        if (event.id === id) {
          return {
            ...event,
            isFavorite: !event.isFavorite,
          };
        }
        return event;
      })
    );
  };

  return (
    <>
      <div className="relative">
        <div className="absolute lg:hidden h-[40%] w-full bg-gradient-to-t from-[#fff] bottom-0"></div>
        <div className="bg-white p-3 rounded-xl overflow-scroll max-h-[65vh] h-[250px] lg:h-auto">
          <p className="text-2xl mb-5">Upcoming Events</p>
          {events.filter((event) => new Date(event.start) > new Date())
            .length == 0 && (
            <p className="font-semibold text-center">No upcoming events</p>
          )}
          <div className="flex flex-wrap lg:flex-col gap-[3%]">
            {events
              .filter((event) => new Date(event.start) > new Date())
              .map((event, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border border-[#F3F3F3] p-2 rounded-xl w-[47%] lg:w-full mb-[3%]"
                >
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-xs">
                      {moment(event.start).format("ddd D MMM, HH:MMA")}
                    </p>
                  </div>
                  <Image
                    onClick={() => {
                      handleFavorite(event.id);
                    }}
                    src={event.isFavorite ? HeartActiveIcon : HeartIcon}
                    className="w-[20px] cursor-pointer"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingEvents;
