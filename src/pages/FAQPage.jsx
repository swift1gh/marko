import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I verify my student status?",
      answer:
        "To verify your student status, you'll need to provide a valid student email address and upload a current student ID or enrollment verification document. We'll review your submission within 24-48 hours.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and student-specific payment solutions. All payments are processed securely through our payment partners.",
    },
    {
      question: "How does shipping work?",
      answer:
        "Shipping costs vary based on the item size and weight. Most items are shipped within 1-2 business days. You can track your order through your account dashboard once it's shipped.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return window for most items. Items must be unused and in their original packaging. Return shipping is free for defective items. Please contact our support team to initiate a return.",
    },
    {
      question: "How do I become a seller?",
      answer:
        "To become a seller, you need to be a verified student, complete our seller registration process, and provide necessary documentation. Once approved, you can start listing items for sale.",
    },
    {
      question: "How are prices determined?",
      answer:
        "Prices are set by individual sellers. We recommend researching similar items on the platform to set competitive prices. You can also use our price suggestion tool when listing items.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take your privacy seriously. All personal information is encrypted and stored securely. We never share your information with third parties without your consent.",
    },
    {
      question: "What happens if I receive a damaged item?",
      answer:
        "If you receive a damaged item, please document the damage with photos and contact our support team immediately. We'll help you resolve the issue and ensure you receive a replacement or refund.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-purple-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
            alt="FAQ"
          />
          <div className="absolute inset-0 bg-purple-800 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-xl text-purple-100 max-w-3xl">
            Find answers to common questions about using Marko
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                className="w-full px-6 py-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  <span className="ml-6 flex-shrink-0">
                    {openIndex === index ? (
                      <FiChevronUp className="h-5 w-5 text-purple-500" />
                    ) : (
                      <FiChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-500">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Still have questions?
          </h2>
          <p className="mt-4 text-gray-500">
            Can't find the answer you're looking for? Our support team is here
            to help.
          </p>
          <div className="mt-6">
            <a
              href="mailto:support@marko.com"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
