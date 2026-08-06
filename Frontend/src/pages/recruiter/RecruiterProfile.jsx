import { FiMapPin, FiGlobe, FiUsers, FiEdit2 } from "react-icons/fi";

export default function RecruiterProfile() {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Employer Profile
        </h1>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition">
          <FiEdit2 />
          Edit Profile
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Banner */}
        <div className="h-56 bg-gradient-to-r from-blue-600 to-sky-400"></div>

        {/* Company */}
        <div className="px-8 pb-8">
          <div className="-mt-16 flex flex-col md:flex-row md:items-end gap-6">
            <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow flex items-center justify-center text-4xl font-bold text-blue-600">
              JP
            </div>

            <div className="pb-2">
              <h2 className="text-3xl font-semibold text-gray-900">
                JobPilot Technologies
              </h2>

              <p className="text-gray-500 mt-2">
                Software Development Company
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="border rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-4">
                Company Information
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>Email:</strong> hr@jobpilot.com
                </p>

                <p className="flex items-center gap-2">
                  <FiGlobe />
                  www.jobpilot.com
                </p>

                <p className="flex items-center gap-2">
                  <FiMapPin />
                  Pune, Maharashtra, India
                </p>

                <p className="flex items-center gap-2">
                  <FiUsers />
                  100 - 500 Employees
                </p>
              </div>
            </div>

            <div className="md:col-span-2 border rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-4">
                About Company
              </h3>

              <p className="text-gray-600 leading-7">
                JobPilot Technologies is a leading recruitment platform
                connecting talented professionals with top companies across
                multiple industries. Our mission is to simplify hiring by
                providing recruiters and candidates with a modern, fast, and
                reliable hiring experience.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-5 mt-8">
            <div className="bg-blue-50 rounded-lg p-5 text-center">
              <h4 className="text-3xl font-bold text-blue-600">125</h4>
              <p className="text-gray-600 mt-2">Active Jobs</p>
            </div>

            <div className="bg-green-50 rounded-lg p-5 text-center">
              <h4 className="text-3xl font-bold text-green-600">420</h4>
              <p className="text-gray-600 mt-2">Applications</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-5 text-center">
              <h4 className="text-3xl font-bold text-yellow-600">62</h4>
              <p className="text-gray-600 mt-2">Shortlisted</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-5 text-center">
              <h4 className="text-3xl font-bold text-purple-600">18</h4>
              <p className="text-gray-600 mt-2">Hired</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}