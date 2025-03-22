import { FiStar } from "react-icons/fi";
import HeroSection from "../components/home/HeroSection";
import FlashSales from "../components/home/FlashSales";
import StudentFeatures from "../components/home/StudentFeatures";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Newsletter from "../components/home/Newsletter";
import ProductCategories from "../components/home/ProductCategories";
import StudyAndWork from "../components/home/StudyAndWork";

const HomePage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "MacBook Pro M1",
      description: "Perfect for students and professionals",
      price: 999.99,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1452&q=80",
      rating: 5,
      reviews: 128,
      vendor: "TechStore",
      discount: "10% OFF",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      description: "Noise-cancelling for focused study sessions",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 4,
      reviews: 89,
      vendor: "AudioPro",
    },
    {
      id: 3,
      name: "Scientific Calculator",
      description: "Advanced features for engineering students",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1587145820266-a5951ee6a620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 4,
      reviews: 45,
      vendor: "MathTools",
    },
    {
      id: 4,
      name: "Study Desk Lamp",
      description: "Adjustable brightness for late-night study sessions",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 5,
      reviews: 67,
      vendor: "HomeEssentials",
    },
  ];

  const featuredEvents = [
    {
      id: 1,
      name: "Tech Fest 2025",
      date: "April 15, 2025",
      location: "Campus Auditorium",
      price: "Free",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      name: "Music Night",
      date: "April 20, 2025",
      location: "Main Quad",
      price: "$10",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      name: "Career Fair",
      date: "May 5, 2025",
      location: "Student Center",
      price: "Free",
      image:
        "https://images.unsplash.com/photo-1584697964154-3c1b5f3d7c8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div>
      <HeroSection />
      <ProductCategories />
      <FlashSales />
      <StudentFeatures />
      <StudyAndWork />
      <FeaturedProducts products={featuredProducts} />
      <Newsletter />

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Why Choose Marko?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Student Discounts
            </h3>
            <p className="text-gray-500">
              Special prices for students with valid ID
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Quality Guarantee
            </h3>
            <p className="text-gray-500">
              All products verified for quality and authenticity
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-500">
              Quick delivery to your dorm or apartment
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Campus Events */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Upcoming Campus Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md rounded-lg overflow-hidden">
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
        <div className="text-center mt-8">
          <a
            href="/events"
            className="text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded text-lg">
            View All Events
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
