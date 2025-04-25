"use client";

import { APIEVENT_URI } from "@/utils/env";
import { useState } from "react";

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState(false);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const event = {
      name,
      time: new Date(time),
      status,
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
    <div className="bg-orange-50 min-h-screen flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-stone-800">Create Event</h2>

        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="number"
          step="0.01"
          placeholder="Price (optional)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            className="w-5 h-5 text-orange-500 focus:ring-orange-400"
          />
          <label className="text-stone-700 text-base">Mark as completed</label>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
