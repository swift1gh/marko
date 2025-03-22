import { motion } from "framer-motion";
import {
  FiUsers,
  FiRefreshCw,
  FiShield,
  FiAward,
  FiHeart,
  FiGlobe,
} from "react-icons/fi";

const AboutPage = () => {
  const values = [
    {
      icon: FiUsers,
      title: "Community First",
      description: "Building a strong network of students helping students.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FiRefreshCw,
      title: "Sustainability",
      description:
        "Promoting reuse and responsible consumption among students.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FiShield,
      title: "Trust & Safety",
      description: "Ensuring secure and verified transactions for all users.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: FiAward,
      title: "Quality Assurance",
      description: "Maintaining high standards for all listed products.",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: FiHeart,
      title: "Student Support",
      description: "Dedicated assistance for all your academic needs.",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: FiGlobe,
      title: "Accessibility",
      description: "Making essential resources available to all students.",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const team = [
    {
      name: "Prince Yekunya",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Sackey Kwame",
      role: "Head of Technology",
      image:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Chris Marfo",
      role: "Community Manager",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Marko
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We're on a mission to revolutionize how students buy and sell
              their essentials. Join our community of responsible and
              environmentally conscious students.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-20 translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're built on principles that put students first and create a
            sustainable marketplace for academic essentials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
              <div className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${value.color} mb-4`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-primary-100">Active Students</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-primary-100">Products Listed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-primary-100">Universities</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-100">Satisfaction Rate</div>
            </motion.div>
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
              Meet the people behind Marko
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
    </div>
  );
};

export default AboutPage;
