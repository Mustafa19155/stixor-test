"use client";
import React, { useContext, useRef, useState } from "react";
import HeartIcon from "@/assets/images/heart.svg";
import HeartActiveIcon from "@/assets/images/favorite.svg";
import Image from "next/image";
import DetailsModal from "./DetailsModal";
import useClickOutside from "@/hooks/useClickOutside";
import moment from "moment";
import { EventsContext } from "@/context/eventsContext";

const Table = ({ isFavorite }) => {
  const { events } = useContext(EventsContext);
  const [showModal, setshowModal] = useState(false);
  const [event, setevent] = useState(null);

  return (
    <>
      {showModal && <DetailsModal event={event} />}
      <table className="border-separate border-spacing-y-3 w-full mt-3 min-w-[600px]">
        <thead>
          <tr>
            <th className="p-3 border-b font-semibold text-start">#</th>
            <th className="p-3 border-b font-semibold text-start">Name</th>
            <th className="p-3 border-b font-semibold text-start">Time</th>
            <th className="p-3 border-b font-semibold text-start">Date</th>
            <th className="p-3 border-b font-semibold text-start">Location</th>
            <th className="p-3 border-b font-semibold text-start"></th>
          </tr>
        </thead>
        <tbody>
          {isFavorite ? (
            <>
              {events
                .filter((eve) => eve.isFavorite)
                .map((event, index) => (
                  <Row
                    event={event}
                    index={index}
                    setevent={setevent}
                    setshowModal={setshowModal}
                  />
                ))}
            </>
          ) : (
            <>
              {events.map((event, index) => (
                <Row
                  event={event}
                  index={index}
                  setevent={setevent}
                  setshowModal={setshowModal}
                />
              ))}
            </>
          )}
        </tbody>
      </table>
      {isFavorite
        ? events.filter((eve) => eve.isFavorite).length == 0 && (
            <p className="font-semibold text-center">No favorite events</p>
          )
        : events.length == 0 && (
            <p className="font-semibold text-center">No events</p>
          )}
    </>
  );
};

export default Table;

const Row = ({ event, index, setshowModal, setevent }) => {
  const ref = useRef();

  const handleShowModal = () => {
    setevent(event);
    setshowModal(true);
  };

  useClickOutside(ref, () => {
    setshowModal(false);
  });

  const { setevents, seteventsCopy } = useContext(EventsContext);

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
      <tr
        className="bg-white cursor-pointer text-gray2"
        onClick={handleShowModal}
        ref={ref}
      >
        <td className="p-3 max-w-[100px] border-[#F3F3F3] border-t border-b border-l rounded-l-[15px] font-semibold">
          {index < 10 ? "0" : ""}
          {index + 1}
        </td>
        <td className="p-3 max-w-[100px] border-[#F3F3F3] border-t border-b font-medium">
          {event.title}
        </td>
        <td className="p-3 max-w-[100px] border-[#F3F3F3] border-t border-b font-bold">
          {moment(event.start).format("HH:MMA")}
        </td>
        <td className="p-3 max-w-[100px] border-[#F3F3F3] border-t border-b font-bold">
          {moment(event.start).format("ddd D MMM")}
        </td>
        <td className="p-3 max-w-[100px] border-[#F3F3F3] border-t border-b font-medium text-sm">
          {event.location}
        </td>
        <td className="p-3 max-w-[100px] border-[#F3F3F3] border-t border-b border-r rounded-r-[15px]">
          <Image
            src={event.isFavorite ? HeartActiveIcon : HeartIcon}
            className="w-[20px] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleFavorite(event.id);
            }}
          />
        </td>
      </tr>
    </>
  );
};
