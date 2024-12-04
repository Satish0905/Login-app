"use client"
import axios from "axios";
import { useEffect, useState } from "react";

interface Event {
  id: number;
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
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formValues, setFormValues] = useState({
    eventName: "",
    visibility: "",
    category: "",
    startDate: "",
    endDate: "",
    eventType: "",
    minSeats: 0,
  });

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/events");
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Handle delete action
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/deleteevent`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Handle edit action - open the edit form with pre-filled values
  const handleEdit = (event: Event) => {
    setIsEditing(true);
    setSelectedEvent(event);
    setFormValues({
      eventName: event.eventName,
      visibility: event.visibility,
      category: event.category,
      startDate: event.startDate,
      endDate: event.endDate,
      eventType: event.eventType,
      minSeats: event.minSeats,
    });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle form submission to update the event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    try {
      await axios.put(`http://localhost:8000/updateevent`, formValues);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id ? { ...event, ...formValues } : event
        )
      );
      setIsEditing(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

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

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-warning ml-2"
                onClick={() => handleEdit(event)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}

        {isEditing && selectedEvent && (
          <div className="mt-4">
            <h3>Edit Event</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Event Name</label>
                <input
                  type="text"
                  name="eventName"
                  value={formValues.eventName}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Visibility</label>
                <input
                  type="text"
                  name="visibility"
                  value={formValues.visibility}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formValues.category}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formValues.startDate}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formValues.endDate}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Event Type</label>
                <input
                  type="text"
                  name="eventType"
                  value={formValues.eventType}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Minimum Seats</label>
                <input
                  type="number"
                  name="minSeats"
                  value={formValues.minSeats}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary mt-3 ml-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
