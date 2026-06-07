import bannerImg from "../../assets/images/register-bg.png";
import {
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

const AuthBanner = () => {
  return (
    <div className="hidden lg:block relative overflow-hidden">
      {/* Image */}
      <img
        src={bannerImg}
        alt="banner"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-blue-950/70"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
        <h2 className="text-5xl font-semibold max-w-xl leading-tight">
          Over 1,75,324 candidates waiting for good employees.
        </h2>

        {/* Stats */}
        <div className="flex gap-12 mt-12">
          <div>
            <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center mb-3">
              <BriefcaseBusiness size={24} />
            </div>

            <h3 className="text-xl font-semibold">
              1,75,324
            </h3>

            <p className="text-gray-300 text-sm">
              Live Jobs
            </p>
          </div>

          <div>
            <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center mb-3">
              <Building2 size={24} />
            </div>

            <h3 className="text-xl font-semibold">
              97,354
            </h3>

            <p className="text-gray-300 text-sm">
              Companies
            </p>
          </div>

          <div>
            <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center mb-3">
              <BriefcaseBusiness size={24} />
            </div>

            <h3 className="text-xl font-semibold">
              7,532
            </h3>

            <p className="text-gray-300 text-sm">
              New Jobs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;