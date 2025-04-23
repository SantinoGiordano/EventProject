'use client'

import { Schedule } from '@/app/types/schedule';
import { useEffect, useState } from 'react';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/schedule');
        if (!res.ok) throw new Error('Failed to fetch schedule');
        const data = await res.json();
        setSchedules(data);
      } catch (err) {
        console.error('Error fetching schedule:', err);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">🗓️ Daily Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map((item, index) => (
          <div
            key={item._id}
            className={`bg-yellow-200 p-5 shadow-lg rounded-lg transform ${
              index % 2 === 0 ? 'rotate-1' : '-rotate-2'
            } hover:rotate-0 transition duration-300 ease-in-out`}
          >
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-sm mb-1"><strong>🕒 Time:</strong> {new Date(item.time).toLocaleTimeString()}</p>
            <p className="text-sm mb-1"><strong>Status:</strong> {item.status ? '✅ Active' : '❌ Inactive'}</p>
            {item.location && (
              <p className="text-sm mb-1"><strong>📍 Location:</strong> {item.location}</p>
            )}
            {item.price && (
              <p className="text-sm"><strong>💲 Price:</strong> ${item.price.toFixed(2)}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
