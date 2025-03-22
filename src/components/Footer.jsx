import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              About Marko
            </h3>
            <p className="text-gray-300 mb-4">
              Your trusted marketplace for student essentials. We connect
              students with quality products and campus opportunities.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/marko"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-200 hover:text-white transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/marko"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-200 hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/marko"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-200 hover:text-white transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/marko"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-200 hover:text-white transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop?category=Electronics"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  Lab Equipment
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=Furniture"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  Hostel Essentials
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=Books"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  Textbooks
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=School%20Supplies"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  Academic Supplies
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: support@marko.com</li>
              <li>Phone: +233 53 141 6989</li>
              <li>Location: KNUST Commercial Area</li>
              <li>Kumasi, Ghana</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Marko. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-300 hover:text-primary-200 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-300 hover:text-primary-200 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
