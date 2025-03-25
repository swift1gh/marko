import heroBg from "../../assets/images/hero_img2.jpg";

const HeroBackground = () => {
  return (
    <>
      <img
        src={heroBg}
        alt="Students studying in the library"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transform transition-transform duration-10000 hover:scale-100"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/60 to-black/50" />
    </>
  );
};

export default HeroBackground;
