import React from "react";

const FormInput = ({
  label,
  id,
  type = "text",
  icon: Icon,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};

export default FormInput;
