import { useState } from "react";
import { FiX, FiSend, FiMapPin, FiDollarSign } from "react-icons/fi";

import { applyJob } from "../../services/applicationApi";

export default function ApplyJobModal({ isOpen, job, onClose, onApplied }) {
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !job) return null;

  const handleClose = () => {
    if (submitting) return;
    setNote("");
    onClose();
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setSubmitting(true);

    const candidateId = 1; // temporary
    const resumeId = 1; // temporary

    console.log("Job object:", job);
console.log("Job ID:", job.id);

    const application = await applyJob(
      job.id,
      candidateId,
      resumeId
    );

    onApplied?.(application);
  } catch (error) {
    console.error(error);
    alert("Failed to apply for job");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-lg rounded-xl bg-white shadow-xl">
        <button
          type="button"
          onClick={handleClose}
          disabled={submitting}
          className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-60"
          aria-label="Close modal"
        >
          <FiX className="text-xl" />
        </button>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-md bg-blue-100 p-2 text-blue-600">
              <FiSend className="text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Apply for this job</h2>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-900">{job.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{job.company}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              {job.location && (
                <span className="flex items-center gap-1">
                  <FiMapPin /> {job.location}
                </span>
              )}
              {job.salary && (
                <span className="flex items-center gap-1">
                  <FiDollarSign /> {job.salary}
                </span>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Note to recruiter <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="Briefly mention why you're a good fit for this role..."
              className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <p className="mt-3 text-xs text-gray-400">
            Your default resume from Settings will be shared with the recruiter along with this application.
          </p>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="rounded-md bg-blue-50 px-5 py-3 font-medium text-blue-600 hover:bg-blue-100 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
