import React from "react";
import events from "../data/events";

const EventsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Campus Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {event.name}
              </h3>
              <p className="text-gray-500">{event.date}</p>
              <p className="text-gray-500">{event.location}</p>
              <p className="text-purple-600 font-bold">{event.price}</p>
              <a
                href={`/events/${event.id}`}
                className="mt-4 inline-block text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
