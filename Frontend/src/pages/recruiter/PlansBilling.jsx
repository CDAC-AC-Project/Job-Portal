import RecruiterHeader from "../../components/recruiter/RecruiterHeader";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import SubscriptionPlanCard from "../../components/recruiter/SubscriptionPlanCard";
import PremiumSubscriptionIllustration from "../../components/recruiter/PremiumSubscriptionIllustration";
import { subscriptionPlans } from "../../data/subscriptionPlansData";
import Footer from "../../components/layout/Footer";

export default function PlansBilling() {
  const handleChoosePlan = (plan) => {
    console.log("Selected plan:", plan);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <RecruiterHeader />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-x border-gray-200">
          <RecruiterSidebar />

          <section className="flex-1 px-4 sm:px-6 lg:px-10 py-10">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5">
                  Buy Premium Subscription to Post a Job
                </h1>

                <p className="text-sm sm:text-base text-gray-500 leading-7 max-w-xl">
                  Donec eu dui ut dolor commodo ornare. Sed arcu libero,
                  malesuada quis justo sit amet, varius tempus neque. Quisque
                  ultrices mi sed lorem condimentum, vel tempus lectus ultricies.
                </p>
              </div>

              <PremiumSubscriptionIllustration />
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 items-end">
              {subscriptionPlans.map((plan) => (
                <div key={plan.id} onClick={() => handleChoosePlan(plan)}>
                  <SubscriptionPlanCard plan={plan} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer/>
    </div>
  );
}