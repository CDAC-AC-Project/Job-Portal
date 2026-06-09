import HomeNavbar from "../components/home/HomeNavbar";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import PopularVacancies from "../components/home/PopularVacancies";
import HowItWorks from "../components/home/HowItWorks";
import FeaturedJobs from "../components/home/FeaturedJobs";
import TopCompanies from "../components/home/TopCompanies";
import HomeCTA from "../components/home/HomeCTA";
import HomeFooter from "../components/home/HomeFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HomeNavbar />
      <HeroSection />
      <StatsSection />
      <PopularVacancies />
      <HowItWorks />
      <FeaturedJobs />
      <TopCompanies />
      <HomeCTA />
      <HomeFooter />
    </div>
  );
}