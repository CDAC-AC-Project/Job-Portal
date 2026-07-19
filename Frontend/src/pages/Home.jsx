import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiGlobe,
  FiLayers,
  FiMapPin,
  FiMenu,
  FiSearch,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUserCheck,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Find Jobs", href: "#jobs" },
  { label: "For Recruiters", href: "#recruiters" },
  { label: "How it Works", href: "#how-it-works" },
];

const stats = [
  { value: "12k+", label: "Active Jobs" },
  { value: "8k+", label: "Candidates" },
  { value: "850+", label: "Companies" },
  { value: "96%", label: "Hiring Success" },
];

const jobCards = [
  {
    title: "Java Backend Developer",
    company: "TechNova Solutions",
    location: "Pune, India",
    type: "Full Time",
    salary: "₹6 - 10 LPA",
    skills: ["Spring Boot", "REST API", "MySQL"],
  },
  {
    title: "React Frontend Developer",
    company: "PixelCraft Labs",
    location: "Mumbai, India",
    type: "Remote",
    salary: "₹5 - 8 LPA",
    skills: ["React", "Tailwind", "JavaScript"],
  },
  {
    title: "UI/UX Designer",
    company: "DesignHub Studio",
    location: "Bangalore, India",
    type: "Hybrid",
    salary: "₹4 - 7 LPA",
    skills: ["Figma", "Wireframe", "Prototype"],
  },
];

const features = [
  {
    icon: FiSearch,
    title: "Smart Job Search",
    text: "Candidates can discover jobs using role, location, skills, job type, and salary filters.",
  },
  {
    icon: FiBriefcase,
    title: "Recruiter Dashboard",
    text: "Recruiters can post jobs, manage listings, review applications, and track hiring activity.",
  },
  {
    icon: FiShield,
    title: "Secure Authentication",
    text: "Role-based login flow keeps candidates, recruiters, and admins separated and secure.",
  },
  {
    icon: FiTrendingUp,
    title: "Application Tracking",
    text: "Recruiters can manage applicants through organized application columns and hiring stages.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    text: "Sign up as a candidate or recruiter and access your personalized dashboard.",
  },
  {
    number: "02",
    title: "Build Your Profile",
    text: "Candidates add skills and resumes, while recruiters complete company information.",
  },
  {
    number: "03",
    title: "Apply or Hire",
    text: "Candidates apply for jobs and recruiters shortlist the best profiles faster.",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="relative z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <FiBriefcase className="text-2xl" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">JobPilot</h1>
              <p className="text-xs text-slate-400 -mt-1">
                Hire. Apply. Grow.
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-500 transition shadow-lg shadow-blue-600/30"
            >
              Create Account
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-slate-950 px-4 py-5 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-slate-300"
              >
                {link.label}
              </a>
            ))}

            <div className="grid grid-cols-2 gap-3 pt-3">
              <Link
                to="/login"
                className="text-center px-4 py-3 rounded-xl bg-white/10 text-sm font-semibold"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-center px-4 py-3 rounded-xl bg-blue-600 text-sm font-semibold"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative z-10 pt-16 lg:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200 mb-6">
              <FiZap className="text-blue-300" />
              The modern hiring platform for candidates and recruiters
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight">
              Find jobs.
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Hire talent.
              </span>
              Faster than ever.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-8 max-w-2xl">
              JobPilot connects candidates and recruiters on one powerful
              platform. Search jobs, apply easily, post openings, manage
              applicants, and build a smarter hiring workflow.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 text-base font-bold text-white hover:bg-blue-500 transition shadow-2xl shadow-blue-600/30"
              >
                Login to Continue
                <FiArrowRight />
              </Link>

              <a
                href="#jobs"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-base font-bold text-white hover:bg-white/15 transition"
              >
                Explore Platform
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                >
                  <p className="text-2xl font-black text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-blue-600/30 to-cyan-500/20 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl p-5 shadow-2xl">
              <div className="rounded-3xl bg-slate-900/95 border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div>
                    <p className="text-sm text-slate-400">Recruiter Panel</p>
                    <h3 className="text-lg font-bold">
                      Hiring Dashboard
                    </h3>
                  </div>

                  <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center">
                    <FiTrendingUp className="text-2xl" />
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <MiniStat
                      icon={<FiBriefcase />}
                      label="Open Jobs"
                      value="589"
                    />
                    <MiniStat
                      icon={<FiUsers />}
                      label="Applicants"
                      value="2.5k"
                    />
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold">Top Candidate Match</h4>
                      <span className="text-xs rounded-full bg-green-500/15 px-3 py-1 text-green-300">
                        96% Match
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center font-black text-slate-950">
                        AS
                      </div>

                      <div>
                        <p className="font-bold">Aarav Sharma</p>
                        <p className="text-sm text-slate-400">
                          Java Backend Developer
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Java", "Spring Boot", "MySQL"].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-blue-600 p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-100">
                        Applications Today
                      </p>
                      <p className="text-3xl font-black">798</p>
                    </div>

                    <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
                      <FiUserCheck className="text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block absolute -left-8 top-14 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-5 py-4 shadow-xl">
              <p className="text-sm text-slate-300">New Application</p>
              <p className="font-bold">React Developer</p>
            </div>

            <div className="hidden sm:block absolute -right-8 bottom-14 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-5 py-4 shadow-xl">
              <p className="text-sm text-slate-300">Profile Views</p>
              <p className="font-bold">12.4k this month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Cards */}
      <section id="jobs" className="relative z-10 py-20 bg-white text-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Featured Opportunities"
            title="Latest jobs waiting for the right talent"
            text="A clean job discovery experience for candidates and a powerful hiring pipeline for recruiters."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {jobCards.map((job) => (
              <div
                key={job.title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >
                <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6">
                  <FiBriefcase />
                </div>

                <h3 className="text-xl font-black text-slate-950">
                  {job.title}
                </h3>

                <p className="text-slate-500 mt-2">{job.company}</p>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <FiMapPin className="text-blue-600" />
                    {job.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <FiGlobe className="text-blue-600" />
                    {job.type}
                  </p>

                  <p className="flex items-center gap-2">
                    <FiTrendingUp className="text-blue-600" />
                    {job.salary}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <Link
                  to="/login"
                  className="mt-7 inline-flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all"
                >
                  Apply after Login
                  <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="recruiters"
        className="relative z-10 py-20 bg-slate-50 text-slate-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why JobPilot"
            title="Built for real hiring workflows"
            text="From secure login to recruiter dashboards, JobPilot gives both candidates and employers a smooth experience."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl transition"
                >
                  <div className="h-14 w-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl mb-6">
                    <Icon />
                  </div>

                  <h3 className="text-lg font-black text-slate-950">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Candidate + Recruiter Split */}
      <section className="relative z-10 py-20 bg-white text-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AudienceCard
            icon={<FiUsers />}
            title="For Candidates"
            text="Search jobs, save opportunities, apply with resume, manage job alerts, and track applications from a dedicated candidate dashboard."
            points={[
              "Find jobs by skills and location",
              "Manage profile and resume",
              "Save jobs and track applications",
            ]}
          />

          <AudienceCard
            icon={<FiLayers />}
            title="For Recruiters"
            text="Create company profile, post jobs, view applications, find candidates, manage hiring columns, and control subscription-based job posting."
            points={[
              "Post and manage jobs",
              "Review candidate applications",
              "Find and save candidate profiles",
            ]}
          />
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="relative z-10 py-20 bg-slate-950 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeadingDark
            badge="Simple Process"
            title="Start hiring or applying in three steps"
            text="JobPilot keeps the journey clean, fast, and beginner-friendly."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
              >
                <p className="text-5xl font-black text-blue-400">
                  {step.number}
                </p>

                <h3 className="mt-6 text-xl font-black">{step.title}</h3>

                <p className="mt-3 text-slate-400 leading-7">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-20 bg-white text-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-10 py-14 text-center text-white shadow-2xl shadow-blue-600/25">
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                <FiStar />
              </div>

              <h2 className="text-3xl sm:text-5xl font-black">
                Ready to experience JobPilot?
              </h2>

              <p className="mt-5 max-w-2xl mx-auto text-blue-100 text-lg leading-8">
                Login to access your dashboard and continue your journey as a
                candidate, recruiter, or admin.
              </p>

              <Link
                to="/login"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-black text-blue-600 hover:bg-blue-50 transition"
              >
                Go to Login
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <FiBriefcase />
            </div>

            <div>
              <p className="font-bold">JobPilot</p>
              <p className="text-sm text-slate-400">
                © 2025 JobPilot. All rights reserved.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 text-sm text-slate-400">
            <a href="#home" className="hover:text-white">
              Home
            </a>
            <a href="#jobs" className="hover:text-white">
              Jobs
            </a>
            <Link to="/login" className="hover:text-white">
              Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-blue-300 text-xl mb-3">{icon}</div>
      <p className="text-2xl font-black">{value}</p>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  );
}

function SectionHeading({ badge, title, text }) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600">
        {badge}
      </span>

      <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
        {title}
      </h2>

      <p className="mt-5 text-lg leading-8 text-slate-600">{text}</p>
    </div>
  );
}

function SectionHeadingDark({ badge, title, text }) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <span className="inline-flex rounded-full bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300">
        {badge}
      </span>

      <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight text-white">
        {title}
      </h2>

      <p className="mt-5 text-lg leading-8 text-slate-400">{text}</p>
    </div>
  );
}

function AudienceCard({ icon, title, text, points }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-9 hover:shadow-2xl transition">
      <div className="h-16 w-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl mb-6">
        {icon}
      </div>

      <h3 className="text-2xl font-black text-slate-950">{title}</h3>

      <p className="mt-4 text-slate-600 leading-7">{text}</p>

      <div className="mt-7 space-y-4">
        {points.map((point) => (
          <p key={point} className="flex items-center gap-3 text-slate-700">
            <FiCheckCircle className="text-green-500 shrink-0" />
            {point}
          </p>
        ))}
      </div>

      <Link
        to="/login"
        className="mt-8 inline-flex items-center gap-2 font-black text-blue-600 hover:gap-3 transition-all"
      >
        Continue after Login
        <FiArrowRight />
      </Link>
    </div>
  );
}