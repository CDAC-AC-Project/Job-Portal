import {
  FiBriefcase,
  FiCheckCircle,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

export const getRecruiterStats = (dashboardCounts) => [
  {
    id: 1,
    title: "Active Jobs",
    value: dashboardCounts.activeJobs,
    icon: FiBriefcase,
    bg: "bg-blue-50",
    iconBg: "bg-blue-600",
  },
  {
    id: 2,
    title: "Applications",
    value: dashboardCounts.applications,
    icon: FiUsers,
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-500",
  },
  {
    id: 3,
    title: "Shortlisted",
    value: dashboardCounts.shortlisted,
    icon: FiCheckCircle,
    bg: "bg-green-50",
    iconBg: "bg-green-600",
  },
  {
    id: 4,
    title: "Hired",
    value: dashboardCounts.hired,
    icon: FiUserCheck,
    bg: "bg-purple-50",
    iconBg: "bg-purple-600",
  },
];

export const recentlyPostedJobs = [
  {
    id: 1,
    title: "UI/UX Designer",
    type: "Full Time",
    remaining: "27 days remaining",
    status: "Active",
    applications: 798,
  },
  {
    id: 2,
    title: "Senior UX Designer",
    type: "Internship",
    remaining: "8 days remaining",
    status: "Active",
    applications: 185,
  },
  {
    id: 3,
    title: "Technical Support Specialist",
    type: "Part Time",
    remaining: "4 days remaining",
    status: "Active",
    applications: 556,
  },
  {
    id: 4,
    title: "Junior Graphic Designer",
    type: "Full Time",
    remaining: "24 days remaining",
    status: "Active",
    applications: 583,
  },
  {
    id: 5,
    title: "Front End Developer",
    type: "Full Time",
    remaining: "Dec 7, 2019",
    status: "Expire",
    applications: 740,
  },
];