import { FiBriefcase, FiArrowRight } from "react-icons/fi";
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

export default function CandidateFooter() {
  return (
    <footer className="bg-[#18191c] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div>
          <div className="flex items-center gap-2 text-white text-2xl font-semibold mb-6">
            <FiBriefcase />
            Jobpilot
          </div>

          <p className="text-sm mb-4">
            Call now:{" "}
            <span className="text-white font-semibold">(319) 555-0115</span>
          </p>

          <p className="text-sm leading-6">
            6391 Elgin St. Celina, Delaware 10299, New York, United States of
            America
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-5">Quick Link</h3>
          <ul className="space-y-3 text-sm">
            <li>About</li>
            <li className="text-white flex items-center gap-2">
              <FiArrowRight /> Contact
            </li>
            <li>Pricing</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-5">Candidate</h3>
          <ul className="space-y-3 text-sm">
            <li>Browse Jobs</li>
            <li>Browse Employers</li>
            <li>Candidate Dashboard</li>
            <li>Saved Jobs</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-5">Employers</h3>
          <ul className="space-y-3 text-sm">
            <li>Post a Job</li>
            <li>Browse Candidates</li>
            <li>Employers Dashboard</li>
            <li>Applications</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-5">Support</h3>
          <ul className="space-y-3 text-sm">
            <li>Faqs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2025 Jobpilot - Job Portal. All rights Reserved</p>

          <div className="flex items-center gap-5 text-gray-500">
            <FaFacebookF />
            <FaYoutube />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
      </div>
    </footer>
  );
}