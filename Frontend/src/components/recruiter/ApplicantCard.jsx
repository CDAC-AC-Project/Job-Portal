import { FiDownload, FiCalendar, FiFileText } from "react-icons/fi";

// Only forward transitions the backend actually allows (see Application-service's
// ALLOWED_TRANSITIONS) - APPLIED and WITHDRAWN aren't settable through this endpoint.
const STATUS_OPTIONS = ["SHORTLISTED", "INTERVIEW", "HIRED", "REJECTED"];

function formatAppliedDate(appliedAt) {
  if (!appliedAt) return "";
  const date = new Date(appliedAt);
  if (Number.isNaN(date.getTime())) return appliedAt;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function ApplicantCard({
  application,
  columns,
  onMoveApplication,
  onUpdateStatus,
}) {
  const {
    applicationId,
    candidateName,
    resumeFileUrl,
    resumeFileName,
    note,
    appliedAt,
    columnId,
    status,
  } = application;

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
      <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
          {getInitials(candidateName)}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {candidateName || "Unknown candidate"}
          </h3>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <FiCalendar /> Applied {formatAppliedDate(appliedAt)}
          </p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 space-y-1">
        {note && <p className="italic text-gray-500">"{note}"</p>}
      </div>

      <div className="mt-4">
        {resumeFileUrl ? (
          <a
            href={resumeFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm font-semibold flex items-center gap-2 hover:underline"
          >
            <FiDownload />
            {resumeFileName || "Resume"}
          </a>
        ) : (
          <span className="text-gray-400 text-sm flex items-center gap-2">
            <FiFileText /> No resume
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        {columns && columns.length > 0 && (
          <select
            value={columnId ?? ""}
            onChange={(e) =>
              onMoveApplication?.(applicationId, Number(e.target.value))
            }
            className="flex-1 text-xs border border-gray-200 rounded-md px-2 py-1.5 text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
          >
            {columns.map((col) => (
              <option key={col.id} value={col.id}>
                {col.title}
              </option>
            ))}
          </select>
        )}

        <select
          value={status ?? ""}
          onChange={(e) => onUpdateStatus?.(applicationId, e.target.value)}
          className="flex-1 text-xs border border-gray-200 rounded-md px-2 py-1.5 text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={status} disabled hidden>
            {status}
          </option>
          {STATUS_OPTIONS.filter((option) => option !== status).map((option) => (
            <option key={option} value={option}>
              Move to {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
