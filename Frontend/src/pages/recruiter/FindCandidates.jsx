import { useMemo, useState } from "react";
import { FiMapPin, FiSearch, FiBriefcase, FiBookmark, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { recruiterCandidates } from "../../data/recruiterCandidatesData";

export default function FindCandidate() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  const filteredCandidates = useMemo(() => {
    return recruiterCandidates.filter((candidate) => {
      const keywordMatch =
        candidate.name.toLowerCase().includes(keyword.toLowerCase()) ||
        candidate.title.toLowerCase().includes(keyword.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(keyword.toLowerCase())
        );

      const locationMatch = candidate.location
        .toLowerCase()
        .includes(location.toLowerCase());

      const experienceMatch = experience
        ? candidate.experience.toLowerCase().includes(experience.toLowerCase())
        : true;

      return keywordMatch && locationMatch && experienceMatch;
    });
  }, [keyword, location, experience]);

  return (
    <div>
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-8 text-white">
        <p className="text-sm font-medium text-blue-100">Recruiter Search</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
          Find the right candidates faster
        </h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-base text-blue-100">
          Search candidates by role, skills, location, and experience. Shortlist
          strong profiles directly from here.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-5 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_0.8fr_auto] gap-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by name, role, or skill"
              className="w-full rounded-xl border border-gray-200 pl-11 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="relative">
            <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full rounded-xl border border-gray-200 pl-11 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Experience</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
          </select>

          <button
            type="button"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Find Candidate
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Candidate Profiles
          </h2>
          <p className="text-sm text-gray-500">
            {filteredCandidates.length} matching candidates found
          </p>
        </div>

        <select className="w-full sm:w-48 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500">
          <option>Sort by Latest</option>
          <option>Experience</option>
          <option>Profile Completion</option>
        </select>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onView={() =>
              navigate(`/recruiter/candidate-profile/${candidate.id}`)
            }
          />
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="border border-dashed border-gray-300 rounded-2xl py-16 text-center">
          <p className="text-gray-500">No candidates found.</p>
        </div>
      )}
    </div>
  );
}

function CandidateCard({ candidate, onView }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold">
          {candidate.name
            .split(" ")
            .map((item) => item[0])
            .join("")}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {candidate.name}
              </h3>
              <p className="text-sm text-blue-600 font-medium">
                {candidate.title}
              </p>
            </div>

            <button className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300">
              <FiBookmark />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <FiMapPin className="text-gray-400" />
              {candidate.location}
            </p>
            <p className="flex items-center gap-2">
              <FiBriefcase className="text-gray-400" />
              {candidate.experience}
            </p>
            <p>{candidate.education}</p>
            <p>Expected: {candidate.expectedSalary}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {candidate.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs text-gray-500">
                Availability:{" "}
                <span className="font-semibold text-gray-700">
                  {candidate.availability}
                </span>
              </p>
              <div className="mt-2 h-2 w-40 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${candidate.profileCompletion}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={onView}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <FiEye />
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}