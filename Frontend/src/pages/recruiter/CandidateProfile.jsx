import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDownload,
  FiBriefcase,
  FiBookOpen,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";

import { getCandidateById } from "../../services/recruiterCandidateService";

export default function CandidateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);

        const data = await getCandidateById(id);

        setCandidate(data);
      } catch (error) {
        console.error("Failed to fetch candidate:", error);
        setCandidate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <p className="text-gray-500">Loading candidate profile...</p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Candidate not found
        </h1>

        <button
          type="button"
          onClick={() => navigate("/recruiter/saved-candidate")}
          className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          Back to Saved Candidates
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate("/recruiter/saved-candidate")}
        className="mb-6 text-gray-600 hover:text-blue-600 flex items-center gap-2"
      >
        <FiArrowLeft />
        Back to Saved Candidates
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-blue-50 px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white"
            />

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {candidate.name}
              </h1>

              <p className="text-blue-600 font-medium mt-1">
                {candidate.title}
              </p>

              <p className="text-gray-500 flex items-center gap-2 mt-2">
                <FiMapPin />
                {candidate.location}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              className="bg-blue-600 text-white px-5 py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <FiMail />
              Send Email
            </button>

            <button
              type="button"
              className="bg-white text-blue-600 border border-blue-600 px-5 py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-blue-50"
            >
              <FiDownload />
              Download CV
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Biography
            </h2>

            <p className="text-gray-600 leading-7 mb-8">
              {candidate.biography}
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3 mb-8">
              {(candidate.skills || []).map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Work Experience
            </h2>

            <div className="space-y-4">
              {(candidate.workExperience || []).map((work, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md p-4"
                >
                  <h3 className="font-semibold text-gray-900">{work.role}</h3>

                  <p className="text-gray-500 mt-1">{work.company}</p>

                  <p className="text-sm text-blue-600 mt-2">
                    {work.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="border border-gray-200 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Candidate Overview
              </h2>

              <OverviewItem
                icon={<FiBriefcase />}
                label="Experience"
                value={candidate.experience}
              />

              <OverviewItem
                icon={<FiBookOpen />}
                label="Education"
                value={candidate.education}
              />

              <OverviewItem
                icon={<FiDollarSign />}
                label="Expected Salary"
                value={candidate.expectedSalary}
              />

              <OverviewItem
                icon={<FiCheckCircle />}
                label="Availability"
                value={candidate.availability}
              />
            </div>

            <div className="border border-gray-200 rounded-xl p-5 mt-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Contact Information
              </h2>

              <p className="flex items-center gap-3 text-gray-600 mb-4">
                <FiMail className="text-blue-600" />
                {candidate.email}
              </p>

              <p className="flex items-center gap-3 text-gray-600">
                <FiPhone className="text-blue-600" />
                {candidate.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 mb-5 last:mb-0">
      <div className="w-10 h-10 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="font-semibold text-gray-900 mt-1">{value}</h3>
      </div>
    </div>
  );
}