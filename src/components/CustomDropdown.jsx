import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  label,
  name,
  isSearchable,
  searchValue,
  onSearchChange,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.value } });
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div
        className={`relative rounded-xl shadow-sm ${
          isOpen ? "ring-2 ring-primary-500" : ""
        }`}>
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full cursor-pointer bg-white relative flex items-center justify-between pl-12 pr-4 py-3 border rounded-xl ${
            error
              ? "border-red-300 hover:border-red-400"
              : disabled
              ? "border-gray-200 bg-gray-50 cursor-not-allowed"
              : "border-gray-300 hover:border-gray-400"
          } transition-all duration-200`}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {Icon && (
              <Icon
                className={`h-5 w-5 ${
                  disabled ? "text-gray-300" : "text-gray-400"
                }`}
              />
            )}
          </div>
          <span
            className={`block truncate ${
              !value
                ? "text-gray-500"
                : disabled
                ? "text-gray-400"
                : "text-gray-900"
            }`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}>
              <FiChevronDown
                className={`h-5 w-5 ${
                  disabled ? "text-gray-300" : "text-gray-400"
                }`}
              />
            </motion.div>
          </span>
        </div>

        <AnimatePresence>
          {isOpen && !disabled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-xl border border-gray-200 py-1">
              {isSearchable && (
                <div className="px-3 py-2 border-b border-gray-100">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Search departments..."
                      value={searchValue}
                      onChange={(e) => onSearchChange(e.target.value)}
                    />
                  </div>
                </div>
              )}
              <div className="max-h-60 overflow-auto">
                {options.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No results found
                  </div>
                ) : (
                  options.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(option)}
                      className={`cursor-pointer select-none relative py-3 pl-12 pr-4 hover:bg-primary-50 transition-colors duration-200 ${
                        value === option.value
                          ? "bg-primary-50 text-primary-900"
                          : "text-gray-900"
                      }`}>
                      <span className="block truncate font-medium">
                        {option.label}
                      </span>
                      {value === option.value && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary-600">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CustomDropdown;
