'use client'
import axios from "axios";
import { useEffect, useState } from "react";

interface Event {
  id: number; // Adjust the type based on your API response
  eventName: string;
  visibility: string;
  category: string;
  startDate: string;
  endDate: string;
  eventType: string;
  minSeats: number;
}

export default function Product() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/events");
        console.log(response.data.events);
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="row">
      <div className="col-sm-6">
        {events.map((event) => (
          <div className="card" key={event.id}>
            <div className="card-body">
              <h5 className="card-title">{event.eventName}</h5>
              <p className="card-text">Visibility: {event.visibility}</p>
              <p className="card-text">Category: {event.category}</p>
              <p className="card-text">Start Date: {event.startDate}</p>
              <p className="card-text">End Date: {event.endDate}</p>
              <p className="card-text">Event Type: {event.eventType}</p>
              <p className="card-text">Minimum Seats: {event.minSeats}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
