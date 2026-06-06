import { FiCheck } from "react-icons/fi";
import Button from "../../components/common/Button";
import Footer from "../../components/layout/Footer";
import SetupProgressBar from "../../components/recruiter/SetupProgressBar";
import { useNavigate } from "react-router-dom";

export default function ProfileComplete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white px-10 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">JobPilot</h1>
          <SetupProgressBar progress={100} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          {/* Circle Icon */}
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-blue-600 text-4xl" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            🎉 Congratulations, Your profile is 100% complete!
          </h2>

          <p className="text-sm text-gray-500 leading-6 mb-8">
            Donec hendrerit, ante mattis pellentesque eleifend, tortor urna
            malesuada ante, eget aliquam nulla augue hendrerit ligula. Nunc
            mauris arcu, mattis sed sem vitae.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="secondary"
              onClick={() => navigate("/recruiter/dashboard")}
            >
              View Dashboard
            </Button>

            <Button onClick={() => navigate("/recruiter/post-job")}>
              Post Job →
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}