import React from "react";
import { FiAlertCircle, FiCheck } from "react-icons/fi";

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  icon: Icon,
  error,
  required = false,
  validPattern,
  ...props
}) => {
  const isEmpty = !value || value.trim().length === 0;
  const isValid = value && 
    (validPattern ? validPattern.test(value) : value.trim().length > 0) && 
    !error;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500 font-medium">*</span>}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${
              error ? 'text-red-400' : 
              isValid ? 'text-green-500' : 
              'text-gray-400'
            }`} />
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-9 py-2 border ${
            error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : 
            isValid ? "border-green-300 focus:ring-green-500 focus:border-green-500" :
            required && isEmpty ? "border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500" :
            "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
          } rounded-md shadow-sm`}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
          placeholder={required ? `${props.placeholder || 'Required'}` : props.placeholder}
          {...props}
        />
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FiAlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
        
        {isValid && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FiCheck className="h-5 w-5 text-green-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput; 