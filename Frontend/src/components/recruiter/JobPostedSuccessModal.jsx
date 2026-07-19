import { FiX, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function JobPostedSuccessModal({ isOpen, onClose, job }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const goToMyJobs = () => {
    onClose();
    navigate("/recruiter/my-jobs");
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute -right-4 -top-4 w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
        >
          <FiX className="text-xl" />
        </button>

        <div className="p-6 sm:p-8 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <FiCheckCircle className="text-green-600 text-2xl mt-1" />

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Congratulations, Your Job is successfully posted!
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                You can manage your job from my-jobs section in your dashboard.
              </p>

              <button
                onClick={goToMyJobs}
                className="mt-5 border border-blue-600 text-blue-600 px-5 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-blue-50"
              >
                View Jobs
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Promote Job: {job?.jobTitle || "UI/UX Designer"}
          </h3>

          <p className="text-sm text-gray-500 leading-6 mb-6">
            Fusce commodo, sem non tempor convallis, sapien turpis bibendum
            turpis, non pharetra nisl velit pulvinar lectus. Suspendisse varius
            at nisl aliquam.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="border border-blue-600 rounded-md p-5 cursor-pointer bg-blue-50">
              <div className="h-32 bg-white rounded-md border border-gray-200 p-4 mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="border-2 border-blue-600 rounded h-12 bg-blue-50"></div>
                  <div className="border rounded h-12 bg-gray-100"></div>
                  <div className="border rounded h-12 bg-gray-100"></div>
                  <div className="border rounded h-12 bg-gray-100"></div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input type="radio" name="promote" defaultChecked />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Feature Your Job
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Sed neque diam, lacinia nec dolor et, euismod bibendum
                    turpis.
                  </p>
                </div>
              </div>
            </label>

            <label className="border border-gray-200 rounded-md p-5 cursor-pointer hover:border-blue-600">
              <div className="h-32 bg-white rounded-md border border-gray-200 p-4 mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded h-12 bg-gray-100"></div>
                  <div className="border-2 border-yellow-500 rounded h-12 bg-yellow-50"></div>
                  <div className="border rounded h-12 bg-gray-100"></div>
                  <div className="border rounded h-12 bg-gray-100"></div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input type="radio" name="promote" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Highlight Your Job
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Sed neque diam, lacinia nec dolor et, euismod bibendum
                    turpis.
                  </p>
                </div>
              </div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <button
              onClick={goToMyJobs}
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Skip Now
            </button>

            <button
              onClick={goToMyJobs}
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-blue-700"
            >
              Promote Job
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}