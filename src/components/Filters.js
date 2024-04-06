"use client";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import FilterIcon from "@/assets/images/filter.svg";
import TriangleIcon from "@/assets/images/triangle.svg";
import useClickOutside from "@/hooks/useClickOutside";
import { EventsContext } from "@/context/eventsContext";

const Filters = () => {
  const [showFilters, setshowFilters] = useState(false);
  const filterRef = useRef();
  const [categories, setcategories] = useState([]);
  const [activeCategory, setactiveCategory] = useState("");
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);

  const { events, setevents, eventsCopy } = useContext(EventsContext);

  useClickOutside(filterRef, () => {
    setshowFilters(false);
  });

  useEffect(() => {
    const categories = eventsCopy.map((event) => event.category);
    setcategories([...new Set(categories)]);
  }, [events]);

  useEffect(() => {
    if (activeCategory) {
      setevents(
        eventsCopy.filter((event) => event.category === activeCategory)
      );
    } else {
      setevents(eventsCopy);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (startDate) {
      setevents(
        eventsCopy.filter(
          (event) => new Date(event.start) >= new Date(startDate)
        )
      );
    } else {
      setevents(eventsCopy);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setevents(
        eventsCopy.filter((event) => new Date(event.start) <= new Date(endDate))
      );
    } else {
      setevents(eventsCopy);
    }
  }, [endDate]);

  return (
    <div className="relative" ref={filterRef}>
      <div
        className="bg-white border-gray w-fit p-2 rounded-md shadow-lg cursor-pointer"
        onClick={() => setshowFilters(true)}
      >
        <Image src={FilterIcon} className="w-[22px]" />
      </div>
      {showFilters && (
        <div className="absolute z-10 bg-white p-5 rounded-lg shadow-lg right-0 mt-5 flex flex-col gap-2">
          <Image
            src={TriangleIcon}
            className="absolute z-10 w-[40px] h-[40px] right-1 -top-5"
          />
          <div className="flex flex-col gap-2">
            <p className="text-gray2">Category</p>
            <select
              className="bg-[#EDEDED] text-gray2 px-3 py-1 rounded-lg w-fit outline-none"
              onChange={(e) => setactiveCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray2">Date & Time</p>
            <div className="flex sm:flex-row flex-col items-center gap-10">
              <div>
                <p className="text-gray3">From</p>
                <input
                  type="datetime-local"
                  className="bg-[#EDEDED] text-gray2 px-3 py-1 rounded-lg w-fit outline-none"
                  onChange={(e) => {
                    setstartDate(e.target.value);
                  }}
                />
              </div>
              <div>
                <p className="text-gray3">To</p>
                <input
                  type="datetime-local"
                  className="bg-[#EDEDED] text-gray2 px-3 py-1 rounded-lg w-fit outline-none"
                  onChange={(e) => {
                    setendDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
