import React from "react";
import { FiMail, FiLock, FiUser, FiBook } from "react-icons/fi";
import FormInput from "./FormInput";

const RegisterForm = ({ formData, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormInput
        label="Full Name"
        id="name"
        icon={FiUser}
        value={formData.name}
        onChange={onChange}
        placeholder="John Doe"
        required
      />

      <FormInput
        label="Student ID"
        id="studentId"
        icon={FiBook}
        value={formData.studentId}
        onChange={onChange}
        placeholder="123456789"
        required
      />

      <FormInput
        label="Email"
        id="email"
        type="email"
        icon={FiMail}
        value={formData.email}
        onChange={onChange}
        placeholder="you@example.com"
        required
      />

      <FormInput
        label="Password"
        id="password"
        type="password"
        icon={FiLock}
        value={formData.password}
        onChange={onChange}
        placeholder="••••••••"
        required
      />

      <FormInput
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        icon={FiLock}
        value={formData.confirmPassword}
        onChange={onChange}
        placeholder="••••••••"
        required
      />

      <div className="mt-5 sm:mt-6">
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm">
          Create Account
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
