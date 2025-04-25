"use client";

import { Schedule } from "@/app/types/schedule";
import { useEffect, useState } from "react";
import { CheckSquare, Trash2 } from "lucide-react";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/schedule");
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

  const RemoveEvent = async (id: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/removeevent", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (!res.ok) throw new Error("Failed to delete");

      // Update the local state
      setSchedules((prev) => prev.filter((schedule) => schedule._id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete the event.");
    }
  };

  return (
    <div className="pt-22 min-h-screen bg-[url('/cardboard.jpg')] bg-fixed bg-cover bg-center p-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-white drop-shadow">
        📌 Today’s Schedule
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-xl text-black"></span>
        </div>
      ) : error || schedules.length === 0 ? (
        <p className="text-center text-xl text-stone-700">
          🗓️ Nothing planned today
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schedules.map((item, index) => (
            <div
              key={item._id}
              className={`bg-yellow-100 border border-yellow-300 p-6 rounded-lg shadow-xl transform ${
                index % 2 === 0 ? "rotate-1" : "-rotate-2"
              } hover:rotate-0 transition duration-300 ease-in-out`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  {item.name}
                </h3>
                <div className="flex gap-2">
                  <button className="text-green-600 hover:text-green-800 transition">
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
                {item.status ? "✅ Active" : "❌ Inactive"}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
