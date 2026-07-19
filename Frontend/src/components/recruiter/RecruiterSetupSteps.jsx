import { NavLink } from "react-router-dom";


const steps = [
  {
    label: "Company Info",
    path: "/recruiter/company-info",
  },
  {
    label: "Founding Info",
    path: "/recruiter/founding-info",
  },
  {
    label: "Social Media Profile",
    path: "/recruiter/social-media-profile",
  },
  {
    label: "Contact",
    path: "/recruiter/contact",
  },
];

export default function RecruiterSetupSteps() {
  return (
    <div className="flex justify-center gap-10 border-b border-gray-200 pb-4 mb-8 text-sm">
      {steps.map((step) => (
        <NavLink
          key={step.path}
          to={step.path}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-4 -mb-4"
              : "text-gray-400 hover:text-blue-600 transition"
          }
        >
          {step.label}
        </NavLink>
      ))}
    </div>
  );
}