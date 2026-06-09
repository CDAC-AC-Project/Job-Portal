import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

export default function SubscriptionPlanCard({ plan }) {
  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:border-blue-600 hover:shadow-xl hover:-translate-y-2">
      {/* Recommendation badge appears only on hover if plan is recommended */}
      {plan.recommended && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-t-md text-sm font-medium opacity-0 group-hover:opacity-100 transition">
          Recommendation
        </div>
      )}

      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          {plan.name}
        </h3>

        <p className="text-sm text-gray-500 leading-6 mb-5">
          {plan.description}
        </p>

        <div className="flex items-end gap-1">
          <span className="text-blue-600 text-4xl font-semibold">
            ${plan.price}
          </span>
          <span className="text-gray-400 mb-2">/{plan.duration}</span>
        </div>
      </div>

      <div className="p-6">
        <ul className="space-y-4 mb-6">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-gray-600"
            >
              <FiCheckCircle className="text-blue-500 mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button className="w-full px-5 py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
          Choose Plan
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}