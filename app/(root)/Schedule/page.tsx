import { Schedule } from '@/app/types/schedule';
import { useEffect, useState } from 'react';


const ScheduleList = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/schedule')
      .then((res) => res.json())
      .then((data) => setSchedules(data))
      .catch((err) => console.error('Error fetching schedule:', err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Schedule</h2>
      {schedules.map((item) => (
        <div key={item._id} className="border p-3 mb-3 rounded shadow">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p><strong>Time:</strong> {new Date(item.time).toLocaleString()}</p>
          <p><strong>Status:</strong> {item.status ? 'Active' : 'Inactive'}</p>
          {item.location && <p><strong>Location:</strong> {item.location}</p>}
          {item.price && <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>}
        </div>
      ))}
    </div>
  );
};

export default ScheduleList;
