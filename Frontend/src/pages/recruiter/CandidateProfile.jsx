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

import RecruiterHeader from "../../components/recruiter/RecruiterHeader";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";

import { getCandidateById } from "../../services/recruiterCandidateService";

export default function CandidateProfile() {
  const { candidateId } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidate = async () => {
      setLoading(true);

      const data = await getCandidateById(candidateId);

      setCandidate(data);
      setLoading(false);
    };

    fetchCandidate();
  }, [candidateId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <RecruiterHeader />

        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading candidate profile...</p>
        </main>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <RecruiterHeader />

        <main className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Candidate not found
          </h1>

          <button
            onClick={() => navigate("/recruiter/saved-candidates")}
            className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-md"
          >
            Back to Saved Candidates
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <RecruiterHeader />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-x border-gray-200">
          <RecruiterSidebar />

          <section className="flex-1 px-4 sm:px-6 lg:px-10 py-10">
            <button
              onClick={() => navigate("/recruiter/saved-candidates")}
              className="mb-6 text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <FiArrowLeft />
              Back to Saved Candidates
            </button>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
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
                  <button className="bg-blue-600 text-white px-5 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-blue-700">
                    <FiMail />
                    Send Email
                  </button>

                  <button className="bg-white text-blue-600 border border-blue-600 px-5 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-blue-50">
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
                    {candidate.skills.map((skill) => (
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
                    {candidate.workExperience.map((work, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-md p-4"
                      >
                        <h3 className="font-semibold text-gray-900">
                          {work.role}
                        </h3>

                        <p className="text-gray-500 mt-1">{work.company}</p>

                        <p className="text-sm text-blue-600 mt-2">
                          {work.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="border border-gray-200 rounded-lg p-5">
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

                  <div className="border border-gray-200 rounded-lg p-5 mt-5">
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
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-5 text-center text-sm text-gray-400">
        © 2025 Jobpilot - Job Board. All rights Reserved
      </footer>
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