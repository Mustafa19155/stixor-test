"use client";
import axios from "axios";
import React, { useEffect, useState, createContext } from "react";

export const EventsContext = createContext();

function EventsContextProvider({ children }) {
  const [events, setevents] = useState([]);
  const [eventsCopy, seteventsCopy] = useState([]);
  const [loading, setloading] = useState(true);
  const [eventOfMonth, seteventOfMonth] = useState(null);

  const value = {
    events,
    setevents,
    eventsCopy,
    loading,
    setloading,
    eventOfMonth,
    seteventOfMonth,
    seteventsCopy,
  };

  const fetchData = async ({ latitude, longitude }) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
      const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}8&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;

      const response = await fetch(url);
      const data = await response.json();

      return data.results[0].formatted;
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleGetData = async () => {
    try {
      setloading(true);
      const data = await axios.get(`https://api.predicthq.com/v1/events`, {
        params: {
          limit: 100,
        },

        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
      });

      const eventsData = data.data.results;

      seteventOfMonth(
        eventsData.reduce((prev, current) =>
          prev.rank > current.rank ? prev : current
        )
      );

      eventsData.forEach((event) => {
        event.isFavorite = false;
      });

      const eventsWithLocation = await Promise.all(
        eventsData.map(async (event, index) => {
          let location = "";

          location = await fetchData({
            latitude: event.location[1],
            longitude: event.location[0],
          });
          return {
            ...event,
            location: location,
          };
        })
      );

      setevents(eventsWithLocation);
      seteventsCopy(eventsWithLocation);

      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}
export default EventsContextProvider;
