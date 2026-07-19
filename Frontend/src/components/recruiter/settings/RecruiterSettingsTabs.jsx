import { FiBriefcase, FiGlobe, FiLink, FiSettings } from "react-icons/fi";

const tabs = [
  {
    id: "company",
    label: "Company Info",
    icon: FiBriefcase,
  },
  {
    id: "founding",
    label: "Founding Info",
    icon: FiGlobe,
  },
  {
    id: "social",
    label: "Social Media Profile",
    icon: FiLink,
  },
  {
    id: "account",
    label: "Account Setting",
    icon: FiSettings,
  },
];

export default function RecruiterSettingsTabs({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-gray-200 mb-6 overflow-x-auto">
      <div className="flex items-center gap-6 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-blue-600"
              }`}
            >
              <Icon />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}