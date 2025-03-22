import { motion } from "framer-motion";
import { FiClock, FiMapPin, FiBriefcase, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const StudyAndWork = () => {
  const jobOpportunities = [
    {
      id: 1,
      title: "Library Assistant",
      location: "KNUST Prempeh II Library",
      type: "Part-time",
      hours: "10-15 hrs/week",
      salary: "GH₵ 15.00/hr",
      description:
        "Help maintain library resources and assist students in finding materials. Perfect for students who want to work in a quiet environment.",
      deadline: "Open until filled",
    },
    {
      id: 2,
      title: "College Café Server",
      location: "College of Engineering Food Court",
      type: "Flexible",
      hours: "12-20 hrs/week",
      salary: "GH₵ 13.50/hr",
      description:
        "Serve food and beverages at the Engineering Food Court. Flexible scheduling around your classes.",
      deadline: "Applications close Aug 30",
    },
    {
      id: 3,
      title: "IT Support Assistant",
      location: "KNUST ICT Centre",
      type: "Part-time",
      hours: "15-20 hrs/week",
      salary: "GH₵ 18.00/hr",
      description:
        "Provide technical support to faculty and students at the KNUST ICT Centre. Must have basic IT knowledge.",
      deadline: "Immediate start",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 mb-4">
            Campus Work Opportunities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600">
            Find flexible job opportunities around KNUST that fit your schedule
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobOpportunities.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <span className="px-3 py-1 text-sm font-medium text-primary-600 bg-primary-50 rounded-full">
                    {job.type}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiClock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.hours}</span>
                  </div>
                  <div className="flex items-center text-gray-900 font-medium">
                    <FiBriefcase className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{job.deadline}</span>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
                    Apply Now
                    <FiArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12">
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200">
            View All Campus Opportunities
            <FiArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default StudyAndWork;
