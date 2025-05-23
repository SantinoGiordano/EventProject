"use client";

import React, { useEffect, useState } from "react";
import { Schedule } from "@/app/types/schedule";
import { CheckSquare, Trash2 } from "lucide-react";
import { APIEVENT_URI } from "@/utils/env";
import SortButton from "@/app/components/SortButton";
import Link from "next/link";

const Drawer = () => {
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
    <div className="h-full overflow-y-auto">
      <div className="sm:hidden mb-6">
        <h3 className="text-lg font-semibold text-orange-600 mb-3">
          Quick Links
        </h3>
        <ul className="space-y-2">
          <li>
            <Link href="/" passHref>
              <span className="flex items-center p-2 rounded-lg hover:bg-orange-50 transition-all duration-200 group">
                <span className="w-7 h-7 flex items-center justify-center mr-2 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-all duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-orange-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </span>
                <span className="font-medium text-gray-800 group-hover:text-orange-600 transition-colors duration-200 text-sm">
                  Home
                </span>
              </span>
            </Link>
          </li>
          <li>
            <Link href="/CreateEvent" passHref>
              <span className="flex items-center p-2 rounded-lg hover:bg-orange-50 transition-all duration-200 group">
                <span className="w-7 h-7 flex items-center justify-center mr-2 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-all duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-orange-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="font-medium text-gray-800 group-hover:text-orange-600 transition-colors duration-200 text-sm">
                  Create Event
                </span>
              </span>
            </Link>
          </li>
          <li>
            <Link href="/Planner" passHref>
              <span className="flex items-center p-2 rounded-lg hover:bg-orange-50 transition-all duration-200 group">
                <span className="w-7 h-7 flex items-center justify-center mr-2 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-all duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-orange-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="font-medium text-gray-800 group-hover:text-orange-600 transition-colors duration-200 text-sm">
                  Planner
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-orange-700">
            Today&apos;s Schedule
          </h2>
          <SortButton onClick={sortSchedules} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <span className="loading loading-spinner loading-lg text-orange-500"></span>
          </div>
        ) : error || !schedules || schedules.length === 0 ? (
          <p className="text-center text-stone-600 py-4">
            🗓️ Nothing planned today
          </p>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {schedules.map((item) => (
              <div
                key={item._id}
                className={`bg-white rounded-xl p-4 border-l-4 shadow-sm ${
                  item.status ? "border-green-500" : "border-orange-400"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-orange-800">
                      {item.name}
                    </h3>
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
    </div>
  );
};

export default Drawer;
