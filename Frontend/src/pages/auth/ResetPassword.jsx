import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      {/* Logo */}
      <div className="absolute top-8 flex items-center gap-2">
        <BriefcaseBusiness className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-gray-800 text-lg">
          Jobpilot
        </span>
      </div>

      <div className="w-full max-w-md">
        <h1 className="text-4xl font-semibold text-gray-900 mb-3 text-center">
          Reset Password
        </h1>

        <p className="text-gray-500 text-sm text-center mb-8">
          Create a new password for your account.
        </p>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md flex items-center justify-center gap-2 transition">
          Reset Password
          <ArrowRight size={18} />
        </button>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Back to{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;