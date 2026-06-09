import { useNavigate } from "react-router-dom";

export default function HomeCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg bg-gray-100 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Become a Candidate
            </h2>

            <p className="text-gray-500 text-sm mt-3 max-w-sm">
              Create your candidate profile and apply to suitable jobs.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="mt-5 bg-white text-blue-600 px-5 py-3 rounded-md font-semibold hover:bg-blue-600 hover:text-white"
            >
              Register Now →
            </button>
          </div>

          <div className="text-7xl">💻</div>
        </div>

        <div className="rounded-lg bg-blue-600 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h2 className="text-2xl font-semibold">Become an Employer</h2>

            <p className="text-blue-100 text-sm mt-3 max-w-sm">
              Register as an employer and start posting jobs.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="mt-5 bg-white text-blue-600 px-5 py-3 rounded-md font-semibold hover:bg-blue-50"
            >
              Register Now →
            </button>
          </div>

          <div className="text-7xl">👨‍💼</div>
        </div>
      </div>
    </section>
  );
}