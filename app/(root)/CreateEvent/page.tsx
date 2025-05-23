"use client";

import { APIEVENT_URI } from "@/utils/env";
import { useState } from "react";
import { CalendarDays, MapPin, DollarSign, Type } from "lucide-react";

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const event = {
      name,
      time: new Date(time),
      location: location || undefined,
      price: price ? parseFloat(price) : undefined,
    };

    try {
      const response = await fetch(`${APIEVENT_URI}/api/addevent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Event created!");
        console.log("Created:", result);
      } else {
        alert("Failed to create event.");
      }
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Error creating event");
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-white min-h-screen flex items-center justify-center px-4 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-10 space-y-6 border border-orange-100"
      >
        <h2 className="text-4xl font-extrabold text-center text-stone-800 mb-4">
          Create New Event
        </h2>
        <hr className="w-20 h-1 mx-auto bg-black rounded border-0 mb-4" />

        <div className="relative">
          <Type className="absolute left-3 top-3.5 text-orange-400" size={20} />
          <input
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="relative">
          <CalendarDays
            className="absolute left-3 top-3.5 text-orange-400"
            size={20}
          />
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="relative">
          <MapPin
            className="absolute left-3 top-3.5 text-orange-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="relative">
          <DollarSign
            className="absolute left-3 top-3.5 text-orange-400"
            size={20}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price (optional)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
