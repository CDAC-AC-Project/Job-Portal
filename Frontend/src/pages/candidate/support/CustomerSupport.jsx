import { useState } from "react";
import {
  FiSearch,
  FiMail,
  FiPhone,
  FiHelpCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

import { faqData, supportContactData } from "../../../data/supportData.js";

export default function CustomerSupport() {
  const [searchText, setSearchText] = useState("");
  const [openFaqId, setOpenFaqId] = useState(1);

  const filteredFaqs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchText.toLowerCase())
  );

  const getContactIcon = (title) => {
    if (title === "Email Support") return <FiMail />;
    if (title === "Phone Support") return <FiPhone />;
    return <FiHelpCircle />;
  };

  return (
    <div className="bg-white">
      <section className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Customer Support
          </h1>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Find quick answers about jobs, applications, recruiter tools,
            subscriptions, and account settings.
          </p>

          <div className="mt-8 max-w-2xl mx-auto relative">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search help topics..."
              className="w-full border border-gray-200 rounded-md pl-12 pr-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {supportContactData.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-sm transition"
            >
              <div className="w-12 h-12 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-5">
                {getContactIcon(item.title)}
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2 leading-6">
                {item.description}
              </p>

              <p className="text-blue-600 font-semibold mt-4">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaqId(openFaqId === faq.id ? null : faq.id)
                    }
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-900">
                      {faq.question}
                    </span>

                    {openFaqId === faq.id ? (
                      <FiChevronUp className="text-blue-600 shrink-0" />
                    ) : (
                      <FiChevronDown className="text-gray-500 shrink-0" />
                    )}
                  </button>

                  {openFaqId === faq.id && (
                    <div className="px-5 pb-5 text-sm text-gray-500 leading-6">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="border border-gray-200 rounded-lg p-8 text-center">
                <h3 className="font-semibold text-gray-900">No FAQ found</h3>
                <p className="text-gray-500 mt-2">
                  Try searching with another keyword.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}