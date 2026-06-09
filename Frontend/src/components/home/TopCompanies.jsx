import { FiMapPin } from "react-icons/fi";
import { topCompaniesData } from "../../data/homeData";

export default function TopCompanies() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-10">
          Top companies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {topCompaniesData.map((company) => (
            <div
              key={company.id}
              className="border border-gray-200 rounded-lg p-5 hover:border-blue-500 hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-pink-500 text-white flex items-center justify-center font-bold">
                  D
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {company.name}
                    </h3>
                    <span className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded">
                      Featured
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                    <FiMapPin />
                    {company.location}
                  </p>
                </div>
              </div>

              <button className="w-full bg-blue-50 text-blue-600 py-3 rounded-md mt-5 font-semibold hover:bg-blue-600 hover:text-white transition">
                Open Position ({company.openPositions})
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}