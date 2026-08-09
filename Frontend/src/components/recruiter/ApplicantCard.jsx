import { FiDownload } from "react-icons/fi";

export default function ApplicantCard({
  applicant,
  onShortlist,
  onReject,
}) {
const dummyApplicants = [
  {
    name: "Rahul Sharma",
    avatar: "https://i.pravatar.cc/100?img=1",
    education: "B.Tech Computer Engineering",
    experience: "2 Years",
  },
  {
    name: "Priya Patel",
    avatar: "https://i.pravatar.cc/100?img=2",
    education: "MCA",
    experience: "3 Years",
  },
  {
    name: "Aman Verma",
    avatar: "https://i.pravatar.cc/100?img=3",
    education: "B.E IT",
    experience: "1 Year",
  },
  {
    name: "Sneha Joshi",
    avatar: "https://i.pravatar.cc/100?img=4",
    education: "B.Sc Computer Science",
    experience: "Fresher",
  },
  {
    name: "Arjun Mehta",
    avatar: "https://i.pravatar.cc/100?img=5",
    education: "B.Tech Information Technology",
    experience: "4 Years",
  },
  {
    name: "Riya Kapoor",
    avatar: "https://i.pravatar.cc/100?img=6",
    education: "M.Tech Software Engineering",
    experience: "5 Years",
  },
  {
    name: "Karan Singh",
    avatar: "https://i.pravatar.cc/100?img=7",
    education: "BCA",
    experience: "2 Years",
  },
  {
    name: "Neha Patil",
    avatar: "https://i.pravatar.cc/100?img=8",
    education: "M.Sc Computer Science",
    experience: "3 Years",
  },
  {
    name: "Rohit Desai",
    avatar: "https://i.pravatar.cc/100?img=9",
    education: "B.Tech AI & ML",
    experience: "2 Years",
  },
  {
    name: "Anjali Nair",
    avatar: "https://i.pravatar.cc/100?img=10",
    education: "B.E Computer Engineering",
    experience: "1 Year",
  },
  {
    name: "Vikram Rao",
    avatar: "https://i.pravatar.cc/100?img=11",
    education: "MCA",
    experience: "6 Years",
  },
  {
    name: "Pooja Kulkarni",
    avatar: "https://i.pravatar.cc/100?img=12",
    education: "B.Tech Electronics",
    experience: "2 Years",
  },
  {
    name: "Nikhil Gupta",
    avatar: "https://i.pravatar.cc/100?img=13",
    education: "B.Sc Information Technology",
    experience: "Fresher",
  },
  {
    name: "Meera Iyer",
    avatar: "https://i.pravatar.cc/100?img=14",
    education: "MBA HR",
    experience: "4 Years",
  },
  {
    name: "Siddharth Jain",
    avatar: "https://i.pravatar.cc/100?img=15",
    education: "B.Tech Mechanical",
    experience: "3 Years",
  },
  {
    name: "Aditi Mishra",
    avatar: "https://i.pravatar.cc/100?img=16",
    education: "B.Tech Computer Science",
    experience: "2 Years",
  },
  {
    name: "Yash Thakur",
    avatar: "https://i.pravatar.cc/100?img=17",
    education: "BCA",
    experience: "1 Year",
  },
  {
    name: "Kavya Reddy",
    avatar: "https://i.pravatar.cc/100?img=18",
    education: "M.Tech AI",
    experience: "5 Years",
  },
  {
    name: "Harsh Vardhan",
    avatar: "https://i.pravatar.cc/100?img=19",
    education: "B.E Software Engineering",
    experience: "3 Years",
  },
  {
    name: "Ishita Bose",
    avatar: "https://i.pravatar.cc/100?img=20",
    education: "B.Sc Data Science",
    experience: "Fresher",
  },
];

  const dummy =
    dummyApplicants[applicant.id % dummyApplicants.length];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">

      <div className="flex items-center gap-3">

        <img
          src={dummy.avatar}
          alt={dummy.name}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-gray-900">
            {dummy.name}
          </h3>

          <p className="text-sm text-gray-500">
            {applicant.jobTitle}
          </p>
        </div>

      </div>

      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <p className="text-xs text-red-500">
          Application ID: {applicant.id}
        </p>

        <p>
          <strong>Company:</strong>{" "}
          {applicant.companyName}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {applicant.location}
        </p>

        <p>
          <strong>Experience:</strong>{" "}
          {dummy.experience}
        </p>

        <p>
          <strong>Education:</strong>{" "}
          {dummy.education}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {applicant.status}
        </p>

      </div>

      <button
        className="mt-4 flex items-center gap-2 text-blue-600 hover:underline"
      >
        <FiDownload />
        Download Resume
      </button>

      {applicant.status === "APPLIED" && (

        <div className="grid grid-cols-2 gap-2 mt-4">

          <button
            onClick={() => onShortlist(applicant.id)}
            className="bg-green-600 hover:bg-green-700 text-white rounded-md py-2"
          >
            Shortlist
          </button>

          <button
            onClick={() => onReject(applicant.id)}
            className="bg-red-600 hover:bg-red-700 text-white rounded-md py-2"
          >
            Reject
          </button>

        </div>

      )}

      {applicant.status === "SHORTLISTED" && (

        <div className="mt-4">

          <button
            className="w-full bg-green-600 text-white rounded-md py-2"
            disabled
          >
            ✓ Shortlisted
          </button>

        </div>

      )}

      {applicant.status === "REJECTED" && (

        <div className="mt-4">

          <button
            className="w-full bg-red-600 text-white rounded-md py-2"
            disabled
          >
            Rejected
          </button>

        </div>

      )}

    </div>
  );
}