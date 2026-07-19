import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiBriefcase, FiArrowRight } from "react-icons/fi";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "emailaddress@gmail.com";

  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    if (!verificationCode.trim()) {
      setError("Verification code is required");
      return;
    }

    if (verificationCode.trim().length < 4) {
      setError("Please enter a valid verification code");
      return;
    }

    setError("");

    console.log("Verification Code:", verificationCode);

    // Later backend API call will come here.
    // If verification succeeds:
    navigate("/login");
  };

  const handleResendCode = () => {
    console.log("Resend verification code to:", email);
  };

  return (
    <div className="min-h-screen bg-gray-300 p-5">
      <div className="min-h-[calc(100vh-40px)] bg-white flex flex-col">
        {/* Logo */}
        <header className="pt-8">
          <div className="flex items-center justify-center gap-2">
            <FiBriefcase className="text-blue-600 text-2xl" />
            <span className="text-xl font-semibold text-gray-900">
              Jobpilot
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-5">
              Email Verification
            </h1>

            <p className="text-sm text-gray-500 leading-6 mb-8">
              We&apos;ve sent an verification to{" "}
              <span className="text-gray-800 font-medium">{email}</span> to
              verify your email address and activate your account.
            </p>

            <form onSubmit={handleVerify}>
              <div className="text-left mb-5">
                <Input
                  type="text"
                  placeholder="Verification Code"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                    setError("");
                  }}
                />

                {error && (
                  <p className="text-red-500 text-xs mt-2">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3"
              >
                Verify My Account
                <FiArrowRight />
              </Button>
            </form>

            <p className="text-sm text-gray-500 mt-8">
              Didn&apos;t recieve any code!{" "}
              <button
                type="button"
                onClick={handleResendCode}
                className="text-blue-600 font-medium hover:underline"
              >
                Resends
              </button>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}