import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiCalendar,
  FiArrowLeft,
  FiUpload,
  FiCheck,
} from "react-icons/fi";

const JobDetailsPage = () => {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
    yearOfStudy: "",
    program: "",
    coverLetter: "",
    resume: null,
  });

  // This would come from an API in a real application
  const job = {
    id: parseInt(id),
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
    responsibilities: [
      "Assist students and faculty in locating library materials",
      "Shelve and organize books and other materials",
      "Process new library materials",
      "Maintain a clean and organized library environment",
      "Help with basic technology troubleshooting",
    ],
    benefits: [
      "Flexible scheduling around your classes",
      "Valuable work experience",
      "Access to library resources",
      "Professional development opportunities",
    ],
    applicationProcess: [
      "Submit your application through the online form",
      "Selected candidates will be contacted for an interview",
      "Required documents: Resume and Student ID",
      "Training will be provided upon selection",
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/jobs"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
        <FiArrowLeft className="w-4 h-4 mr-2" />
        Back to Jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Details */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <span className="px-3 py-1 text-sm font-medium text-primary-600 bg-primary-50 rounded-full">
                {job.type}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center text-gray-600">
                <FiMapPin className="w-4 h-4 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiClock className="w-4 h-4 mr-2" />
                <span>{job.hours}</span>
              </div>
              <div className="flex items-center text-gray-900 font-medium">
                <FiBriefcase className="w-4 h-4 mr-2" />
                <span>{job.salary}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Job Description
                </h2>
                <p className="text-gray-600">{job.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Requirements
                </h2>
                <ul className="list-disc pl-5 text-gray-600">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Responsibilities
                </h2>
                <ul className="list-disc pl-5 text-gray-600">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Benefits
                </h2>
                <ul className="list-disc pl-5 text-gray-600">
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Application Process
                </h2>
                <ul className="list-disc pl-5 text-gray-600">
                  {job.applicationProcess.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Apply for this Position
              </h2>
              <div className="flex items-center text-gray-500">
                <FiCalendar className="w-4 h-4 mr-2" />
                <span className="text-sm">Deadline: {job.deadline}</span>
              </div>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Application Submitted!
                </h3>
                <p className="text-gray-600 mb-6">
                  We'll review your application and get back to you soon.
                </p>
                <Link
                  to="/jobs"
                  className="text-primary-600 hover:text-primary-700 font-medium">
                  Browse more opportunities
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="studentId"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    required
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="program"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Program of Study
                  </label>
                  <input
                    type="text"
                    id="program"
                    name="program"
                    required
                    value={formData.program}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="yearOfStudy"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Study
                  </label>
                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    required
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Select year</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Why are you interested in this position?
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={4}
                    required
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="resume"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Resume/CV
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="resume-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                          <span>Upload a file</span>
                          <input
                            id="resume-upload"
                            name="resume"
                            type="file"
                            required
                            onChange={handleFileChange}
                            className="sr-only"
                            accept=".pdf,.doc,.docx"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
