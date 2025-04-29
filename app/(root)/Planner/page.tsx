"use client";

import React, { useEffect, useState } from "react";
import { Schedule } from "@/app/types/schedule";
import { CheckSquare, Trash2 } from "lucide-react";
import { APIEVENT_URI } from "@/utils/env";
import SortButton from "@/app/components/SortButton";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // For tracking if the items are sorted
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch(`${APIEVENT_URI}/api/schedule`);
        if (!res.ok) throw new Error("Failed to fetch schedule");
        const data = await res.json();
        setSchedules(data);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const sortSchedules = () => {
    const sortedSchedules = [...schedules].sort((a, b) => {
      const timeA = new Date(a.time ?? 0).getTime();
      const timeB = new Date(b.time ?? 0).getTime();
      return sorted ? timeB - timeA : timeA - timeB; // toggle order
    });

    setSchedules(sortedSchedules);
    setSorted(!sorted);
  };

  const RemoveEvent = async (id: string) => {
    try {
      const res = await fetch(`${APIEVENT_URI}/api/removeevent`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (!res.ok) throw new Error("Failed to delete");

      setSchedules((prev) => prev.filter((schedule) => schedule._id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete the event.");
    }
  };

  const ToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`${APIEVENT_URI}/api/updatestatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, status: !currentStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setSchedules((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: !currentStatus } : item
        )
      );
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  return (
    <div className="pt-22 min-h-screen bg-[url('/cardboard.jpg')] bg-fixed bg-cover bg-center p-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold text-white drop-shadow">
          Today’s Schedule
        </h2>
        <SortButton onClick={sortSchedules} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-xl text-black"></span>
        </div>
      ) : error || !schedules || schedules.length === 0 ? ( // ✅ FIXED HERE
        <p className="text-center text-xl text-stone-700">
          🗓️ Nothing planned today
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schedules.map((item, index) => {
            const getCardColor = (type: string) => {
              const lowerType = type.toLowerCase();

              if (lowerType === "business") {
                return "bg-blue-100 border-blue-300";
              } else if (lowerType === "personal") {
                return "bg-green-100 border-green-300";
              } else if (lowerType === "friends") {
                return "bg-orange-100 border-orange-300";
              } else if (lowerType === "other") {
                return "bg-red-100 border-red-300";
              } else {
                return "bg-white border-stone-300";
              }
            };

            return (
              <div
                key={item._id}
                className={`${getCardColor(
                  item.type
                )} p-6 rounded-lg shadow-xl border transform ${
                  index % 2 === 0 ? "rotate-1" : "-rotate-2"
                } hover:rotate-0 transition duration-300 ease-in-out`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {item.name}{" "}
                    <span className="text-sm font-medium text-stone-500">
                      {item.type}
                    </span>
                  </h3>

                  <div className="flex gap-2">
                    <button
                      className="text-green-600 hover:text-green-800 transition"
                      onClick={() => ToggleStatus(item._id, item.status)}
                    >
                      <CheckSquare size={20} />
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => RemoveEvent(item._id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {item.time && (
                  <p>
                    <strong>🕒 Time:</strong>{" "}
                    {new Date(item.time).toLocaleString()}
                  </p>
                )}

                <p>
                  <strong>Status:</strong>{" "}
                  {item.status ? "✅ Completed" : "❌ Incomplete"}
                </p>

                {item.location && (
                  <p>
                    <strong>📍 Location:</strong> {item.location}
                  </p>
                )}
                {item.price && (
                  <p>
                    <strong>💲 Price:</strong> ${item.price.toFixed(2)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
