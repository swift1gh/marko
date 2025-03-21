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
              students with quality products at great prices.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-primary-200 hover:text-white transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-primary-200 hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-primary-200 hover:text-white transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
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
                  to="/shop?category=electronics"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=furniture"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  Furniture
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=books"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=supplies"
                  className="text-gray-300 hover:text-primary-200 transition-colors">
                  School Supplies
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
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 University Ave</li>
              <li>City, State 12345</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Marko Marketplace. All rights
              reserved.
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
