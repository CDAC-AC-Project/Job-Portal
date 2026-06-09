import { FiMapPin, FiBookmark } from "react-icons/fi";
import { featuredJobsData } from "../../data/homeData";

export default function FeaturedJobs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-semibold text-gray-900">
            Featured job
          </h2>

          <button className="text-blue-600 font-semibold text-sm hover:underline">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {featuredJobsData.map((job) => (
            <div
              key={job.id}
              className="border border-gray-200 rounded-lg p-5 hover:border-blue-500 hover:shadow-md transition bg-white"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs font-semibold bg-green-50 text-green-600 px-2 py-1 rounded">
                      {job.type}
                    </span>

                    <span className="text-xs text-gray-500">
                      Salary: {job.salary}
                    </span>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-blue-600">
                  <FiBookmark />
                </button>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-blue-600 font-bold">
                  G
                </div>

                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {job.company}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <FiMapPin />
                    {job.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}