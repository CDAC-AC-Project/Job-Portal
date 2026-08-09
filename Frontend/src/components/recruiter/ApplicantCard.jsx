import { FiDownload } from "react-icons/fi";

export default function ApplicantCard({ applicant }) {
  const dummyApplicants = [
    {
      name: "Rahul Sharma",
      avatar: "/images/avatar1.png",
      education: "B.Tech Computer Engineering",
      experience: "2 Years",
    },
    {
      name: "Priya Patel",
      avatar: "/images/avatar2.png",
      education: "MCA",
      experience: "3 Years",
    },
    {
      name: "Aman Verma",
      avatar: "/images/avatar3.png",
      education: "B.E IT",
      experience: "1 Year",
    },
    {
      name: "Sneha Joshi",
      avatar: "/images/avatar4.png",
      education: "B.Sc Computer Science",
      experience: "Fresh Graduate",
    },
  ];

  const dummy =
    dummyApplicants[applicant.id % dummyApplicants.length];

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
      <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
        <img
          src={dummy.avatar}
          alt={dummy.name}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {dummy.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{applicant.role}</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p>• {dummy.experience}</p>
        <p>• Education: {dummy.education}</p>
        <p>• Applied: {applicant.appliedDate}</p>
      </div>

      <button className="mt-4 text-blue-600 text-sm font-semibold flex items-center gap-2 hover:underline">
        <FiDownload />
        Download Cv
      </button>

      <div className="flex gap-2 mt-4">

        <button
          onClick={() => onShortlist(applicant.id)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-md py-2 text-sm"
        >
          Shortlist
        </button>

        <button
          onClick={() => onReject(applicant.id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-md py-2 text-sm"
        >
          Reject
        </button>

      </div>

    </div>


  );
}