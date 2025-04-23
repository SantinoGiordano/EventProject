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
    <div className="min-h-screen bg-[url('/cardboard-texture.jpg')] bg-cover bg-center p-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-stone-800 drop-shadow">
        📌 Today’s Schedule
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schedules.map((item, index) => (
          <div
            key={item._id}
            className={`bg-yellow-100 border border-yellow-300 p-6 rounded-lg shadow-xl transform ${
              index % 2 === 0 ? 'rotate-1' : '-rotate-2'
            } hover:rotate-0 transition duration-300 ease-in-out`}
            style={{
              backgroundImage: "url('/paper-texture.png')",
              backgroundSize: 'cover',
              backgroundBlendMode: 'multiply',
            }}
          >
            <h3 className="text-xl font-bold text-stone-900 mb-2">{item.name}</h3>
            <p><strong>🕒 Time:</strong> {new Date(item.time).toLocaleTimeString()}</p>
            <p><strong>Status:</strong> {item.status ? '✅ Active' : '❌ Inactive'}</p>
            {item.location && <p><strong>📍 Location:</strong> {item.location}</p>}
            {item.price && <p><strong>💲 Price:</strong> ${item.price.toFixed(2)}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
