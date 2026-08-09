import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

import ApplicantCard from "./ApplicantCard";

export default function ApplicationColumn({
  column,
  applications,
  onShortlist,
  onReject,
}) {

  const [showMenu, setShowMenu] = useState(false);

  return (

    <div className="w-[380px] rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

        <div>

          <h2 className="text-lg font-semibold text-gray-900">
            {column.title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {applications.length} Candidate
            {applications.length !== 1 && "s"}
          </p>

        </div>

        <button
          className="rounded-lg p-2 hover:bg-gray-100"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FiMoreHorizontal />
        </button>

      </div>

      <div className="max-h-[720px] overflow-y-auto p-5 space-y-5">

        {applications.length === 0 ? (

          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">

            <p className="font-medium text-gray-700">
              No Applications
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Candidates will appear here.
            </p>

          </div>

        ) : (

          applications.map((application) => (

            <ApplicantCard
              key={application.id}
              applicant={application}
              onShortlist={onShortlist}
              onReject={onReject}
            />

          ))

        )}

      </div>

    </div>

  );

}