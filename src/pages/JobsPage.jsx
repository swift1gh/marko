import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiFilter,
  FiArrowRight,
} from "react-icons/fi";

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const allJobs = [
    {
      id: 1,
      title: "Library Assistant",
      location: "KNUST Main Library",
      type: "Part-time",
      hours: "10-15 hrs/week",
      salary: "GH₵ 15.00/hr",
      description:
        "Help maintain library resources and assist students in finding materials. Perfect for students who want to work in a quiet environment.",
      deadline: "Open until filled",
      department: "Library Services",
      requirements: [
        "Currently enrolled KNUST student",
        "Good organizational skills",
        "Basic computer literacy",
        "Excellent communication skills",
      ],
    },
    {
      id: 2,
      title: "Campus Café Barista",
      location: "Faculty of Engineering Café",
      type: "Flexible",
      hours: "12-20 hrs/week",
      salary: "GH₵ 13.50/hr",
      description:
        "Prepare and serve beverages and snacks. Training provided. Flexible scheduling around your classes.",
      deadline: "Applications close Aug 30",
      department: "Campus Food Services",
      requirements: [
        "No prior experience needed",
        "Friendly and customer-oriented",
        "Ability to work in a fast-paced environment",
        "Food handling certification (training provided)",
      ],
    },
    {
      id: 3,
      title: "IT Support Assistant",
      location: "College of Science",
      type: "Part-time",
      hours: "15-20 hrs/week",
      salary: "GH₵ 18.00/hr",
      description:
        "Provide technical support to faculty and students. Must have basic IT knowledge and good communication skills.",
      deadline: "Immediate start",
      department: "IT Services",
      requirements: [
        "IT or Computer Science major preferred",
        "Knowledge of basic troubleshooting",
        "Experience with Windows and Mac OS",
        "Strong problem-solving skills",
      ],
    },
    {
      id: 4,
      title: "Research Assistant",
      location: "Faculty of Social Sciences",
      type: "Project-based",
      hours: "10-12 hrs/week",
      salary: "GH₵ 16.50/hr",
      description:
        "Assist faculty members with ongoing research projects. Tasks include data collection, literature review, and basic data analysis.",
      deadline: "Applications close Sept 15",
      department: "Research Office",
      requirements: [
        "Minimum 3.0 GPA",
        "Completed at least 2 years of study",
        "Strong analytical skills",
        "Experience with research methodologies",
      ],
    },
    {
      id: 5,
      title: "Campus Tour Guide",
      location: "Admissions Office",
      type: "Part-time",
      hours: "8-12 hrs/week",
      salary: "GH₵ 14.00/hr",
      description:
        "Lead campus tours for prospective students and their families. Share your KNUST experience and knowledge about campus facilities and programs.",
      deadline: "Rolling applications",
      department: "Admissions",
      requirements: [
        "Excellent public speaking skills",
        "Minimum 2nd year student",
        "Good knowledge of KNUST history and facilities",
        "Enthusiastic and friendly demeanor",
      ],
    },
    {
      id: 6,
      title: "Student Mentor",
      location: "Student Success Center",
      type: "Flexible",
      hours: "6-10 hrs/week",
      salary: "GH₵ 15.50/hr",
      description:
        "Provide academic support and mentoring to first-year students. Help them navigate university life and develop successful study habits.",
      deadline: "Applications close Aug 25",
      department: "Student Affairs",
      requirements: [
        "Minimum 3.2 GPA",
        "Completed at least 2 years of study",
        "Strong interpersonal skills",
        "Experience in peer tutoring preferred",
      ],
    },
  ];

  const locations = [
    "all",
    "KNUST Main Library",
    "Faculty of Engineering",
    "College of Science",
    "Faculty of Social Sciences",
    "Admissions Office",
    "Student Success Center",
  ];

  const jobTypes = ["all", "Part-time", "Flexible", "Project-based"];

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || job.type === selectedType;
    const matchesLocation =
      selectedLocation === "all" || job.location.includes(selectedLocation);

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Campus Job Opportunities
        </h1>
        <p className="text-lg text-gray-600">
          Find the perfect part-time job that fits your schedule and helps you
          gain valuable experience
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location === "all" ? "All Locations" : location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FiBriefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No jobs found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {job.title}
                  </h2>
                  <span className="px-3 py-1 text-sm font-medium text-primary-600 bg-primary-50 rounded-full">
                    {job.type}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
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

                  <div>
                    <p className="text-gray-600 text-sm mb-2">
                      {job.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Department: {job.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{job.deadline}</span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => (window.location.href = `/jobs/${job.id}`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                    View Details
                    <FiArrowRight className="ml-2 w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobsPage;
