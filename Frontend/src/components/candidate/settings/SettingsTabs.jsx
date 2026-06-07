import { FiUser, FiGlobe, FiSettings, FiLink } from "react-icons/fi";

const tabs = [
  {
    id: "personal",
    label: "Personal",
    icon: FiUser,
  },
  {
    id: "profile",
    label: "Profile",
    icon: FiGlobe,
  },
  {
    id: "social",
    label: "Social Links",
    icon: FiLink,
  },
  {
    id: "account",
    label: "Account Setting",
    icon: FiSettings,
  },
];

export default function SettingsTabs({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-gray-200 mb-6 overflow-x-auto">
      <div className="flex items-center gap-6 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
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