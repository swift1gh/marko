import React from "react";
import { useParams } from "react-router-dom";
import events from "../data/events";

const EventDetailsPage = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return <p className="text-center text-gray-500">Event not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <img
        src={event.image}
        alt={event.name}
        className="w-full h-64 object-cover rounded-lg mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.name}</h1>
      <p className="text-gray-500 mb-2">{event.date}</p>
      <p className="text-gray-500 mb-4">{event.location}</p>
      <p className="text-purple-600 font-bold mb-8">{event.price}</p>
      <p className="text-gray-700">{event.description}</p>
    </div>
  );
};

export default EventDetailsPage;
