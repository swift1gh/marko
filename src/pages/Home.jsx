import HeroSection from "../components/home/HeroSection";
import FlashSales from "../components/home/FlashSales";
import StudentFeatures from "../components/home/StudentFeatures";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Newsletter from "../components/home/Newsletter";

const Home = () => {
  const flashSales = [
    {
      id: 1,
      title: "Back to School Bundle",
      category: "Electronics",
      discount: "30% OFF",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      endTime: "2024-02-15",
    },
    {
      id: 2,
      title: "Study Materials Sale",
      category: "Books",
      discount: "50% OFF",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      endTime: "2024-02-20",
    },
  ];

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

  return (
    <div>
      <HeroSection />
      <FlashSales sales={flashSales} />
      <StudentFeatures />
      <FeaturedProducts products={featuredProducts} />
      <Newsletter />
    </div>
  );
};

export default Home;
