import { FiCheck, FiClock, FiStar, FiCalendar } from "react-icons/fi";

const statusStyles = {
  Applied: { icon: FiCheck, className: "text-blue-600 bg-blue-50" },
  "Under Review": { icon: FiClock, className: "text-amber-600 bg-amber-50" },
  Shortlisted: { icon: FiStar, className: "text-purple-600 bg-purple-50" },
  "Interview Scheduled": { icon: FiCalendar, className: "text-green-600 bg-green-50" },
};

export default function ApplicationStatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.Applied;
  const Icon = style.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${style.className}`}
    >
      <Icon />
      {status}
    </span>
  );
}
