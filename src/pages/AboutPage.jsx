import { FiUsers, FiTarget, FiHeart, FiShield } from "react-icons/fi";

const AboutPage = () => {
  const values = [
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: "Our Mission",
      description:
        "To create a trusted marketplace where students can easily buy and sell their essentials, making student life more affordable and sustainable.",
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Our Vision",
      description:
        "To become the leading student marketplace platform, fostering a community of responsible and environmentally conscious students.",
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Our Values",
      description:
        "Trust, sustainability, community, and innovation guide everything we do at Marko Marketplace.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      image:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-purple-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
            alt="Team working together"
          />
          <div className="absolute inset-0 bg-purple-800 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Marko Marketplace
          </h1>
          <p className="mt-6 text-xl text-purple-100 max-w-3xl">
            We're on a mission to revolutionize how students buy and sell their
            essentials. Join our community of responsible and environmentally
            conscious students.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white overflow-hidden lg:py-24">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="relative">
            <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Values
            </h2>
          </div>

          <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
            {values.map((value, index) => (
              <div key={index} className="relative">
                <div className="relative flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    {value.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500 text-center">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Meet the people behind Marko Marketplace
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative pb-2/3">
                  <img
                    className="absolute h-full w-full object-cover"
                    src={member.image}
                    alt={member.name}
                  />
                </div>
                <div className="relative px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-purple-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by students worldwide
            </h2>
            <p className="mt-3 text-xl text-purple-100 sm:mt-4">
              Join thousands of students who have made Marko Marketplace their
              go-to platform for buying and selling student essentials.
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-purple-100">
                Active Users
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                50K+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-purple-100">
                Products Listed
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                100K+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-purple-100">
                Successful Transactions
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                1M+
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
