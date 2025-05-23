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
    if (!Array.isArray(schedules)) {
      console.error("schedules is not an array:", schedules);
      return;
    }

    const sortedSchedules = [...schedules].sort((a, b) => {
      const timeA = new Date(a.time ?? 0).getTime();
      const timeB = new Date(b.time ?? 0).getTime();
      return sorted ? timeB - timeA : timeA - timeB;
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
      ) : error || !schedules || schedules.length === 0 ? (
        <p className="text-center text-xl text-stone-700">
          🗓️ Nothing planned today
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schedules.map((item, index) => (
            <div
              key={item._id}
              className={`
              bg-white p-6 rounded-lg shadow-xl border transform
              ${index % 2 === 0 ? "rotate-1" : "-rotate-2"}
              hover:rotate-0 transition duration-300 ease-in-out
            `}
              >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-semibold text-orange-800">{item.name}</h3>
                  {item.time && (
                    <p className="text-sm text-gray-600">
                      🕒{" "}
                      {new Date(item.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mt-1">
                  <button
                    title="Toggle Status"
                    className="text-green-600 hover:bg-green-50 p-1 rounded-full transition"
                    onClick={() => ToggleStatus(item._id, item.status)}
                  >
                    <CheckSquare size={18} />
                  </button>
                  <button
                    title="Delete Event"
                    className="text-red-600 hover:bg-red-50 p-1 rounded-full transition"
                    onClick={() => RemoveEvent(item._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p>{item.status ? "✅ Completed" : "❌ Incomplete"}</p>
                {item.location && <p>📍 {item.location}</p>}
                {item.price && <p>💲 ${item.price.toFixed(2)}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
