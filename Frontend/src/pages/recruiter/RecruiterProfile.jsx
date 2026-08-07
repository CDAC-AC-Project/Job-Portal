import React from "react";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiUsers,
  FiBriefcase,
  FiCalendar,
  FiLinkedin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiEdit,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const recruiter = {
  companyName: "TechNova Solutions",
  recruiterName: "Rahul Sharma",
  designation: "Senior Technical Recruiter",
  logo: "https://placehold.co/120x120",
  industry: "Information Technology",
  companySize: "201-500 Employees",
  founded: "2015",
  website: "https://www.technova.com",
  email: "hr@technova.com",
  phone: "+91 9876543210",
  location: "Pune, Maharashtra, India",
  address: "Cyber Park, Hinjawadi Phase 2, Pune - 411057",
  about:
    "TechNova Solutions is a software company specializing in cloud computing, AI, enterprise applications, and digital transformation. We are committed to hiring talented professionals and building innovative products for customers across the globe.",
  linkedin: "https://linkedin.com/company/technova",
  facebook: "https://facebook.com/technova",
  twitter: "https://twitter.com/technova",
  instagram: "https://instagram.com/technova",
};

function OverviewItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-b-0">
      <div className="text-blue-600 text-lg mt-1">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="font-semibold text-gray-900">{value}</h3>
      </div>
    </div>
  );
}

export default function RecruiterProfile() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <button
        type="button"
        onClick={() => navigate("/recruiter/dashboard")}
        className="mb-6 text-gray-600 hover:text-blue-600 flex items-center gap-2"
      >
        <FiArrowLeft />
        Back to Dashboard
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-blue-50 px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={recruiter.logo}
              alt={recruiter.companyName}
              className="w-24 h-24 rounded-full border-4 border-white object-cover bg-white"
            />

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {recruiter.companyName}
              </h1>

              <p className="text-blue-600 font-medium mt-1">
                {recruiter.designation}
              </p>

              <p className="text-gray-600 mt-1">
                Recruiter: {recruiter.recruiterName}
              </p>

              <p className="text-gray-500 flex items-center gap-2 mt-2">
                <FiMapPin />
                {recruiter.location}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-5 py-3 rounded-md flex items-center gap-2 hover:bg-blue-700">
              <FiEdit />
              Edit Profile
            </button>

            <a
              href={recruiter.website}
              target="_blank"
              rel="noreferrer"
              className="bg-white border border-blue-600 text-blue-600 px-5 py-3 rounded-md flex items-center gap-2 hover:bg-blue-50"
            >
              <FiGlobe />
              Visit Website
            </a>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-3">About Company</h2>
            <p className="text-gray-600 leading-7 mb-8">
              {recruiter.about}
            </p>

            <div className="border border-gray-200 rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-5">
                Contact Information
              </h2>

              <p className="flex items-center gap-3 mb-4 text-gray-600">
                <FiMail className="text-blue-600" />
                {recruiter.email}
              </p>

              <p className="flex items-center gap-3 mb-4 text-gray-600">
                <FiPhone className="text-blue-600" />
                {recruiter.phone}
              </p>

              <p className="flex items-center gap-3 text-gray-600">
                <FiMapPin className="text-blue-600" />
                {recruiter.address}
              </p>
            </div>
          </div>

          <div>
            <div className="border border-gray-200 rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-5">
                Company Overview
              </h2>

              <OverviewItem
                icon={<FiBriefcase />}
                label="Industry"
                value={recruiter.industry}
              />

              <OverviewItem
                icon={<FiUsers />}
                label="Company Size"
                value={recruiter.companySize}
              />

              <OverviewItem
                icon={<FiCalendar />}
                label="Founded"
                value={recruiter.founded}
              />

              <OverviewItem
                icon={<FiGlobe />}
                label="Website"
                value={recruiter.website}
              />
            </div>

            <div className="border border-gray-200 rounded-xl p-5 mt-5">
              <h2 className="text-lg font-semibold mb-5">
                Social Links
              </h2>

              <p className="flex items-center gap-3 mb-4">
                <FiLinkedin className="text-blue-600" />
                <a href={recruiter.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-600">
                  LinkedIn
                </a>
              </p>

              <p className="flex items-center gap-3 mb-4">
                <FiFacebook className="text-blue-600" />
                <a href={recruiter.facebook} target="_blank" rel="noreferrer" className="hover:text-blue-600">
                  Facebook
                </a>
              </p>

              <p className="flex items-center gap-3 mb-4">
                <FiTwitter className="text-blue-600" />
                <a href={recruiter.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-600">
                  Twitter
                </a>
              </p>

              <p className="flex items-center gap-3">
                <FiInstagram className="text-blue-600" />
                <a href={recruiter.instagram} target="_blank" rel="noreferrer" className="hover:text-blue-600">
                  Instagram
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}