import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FounderMessage from "@/components/FounderMessage";
import Services from "@/components/Services";
import BrandPurpose from "@/components/BrandPurpose";
import MissionVision from "@/components/MissionVision";
import CoreValues from "@/components/CoreValues";
import Agents from "@/components/Agents";
import ClientExperience from "@/components/ClientExperience";
import WhyItMatters from "@/components/WhyItMatters";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] font-inria text-[#3D2716]">
      <Navbar />
      <main>
        <Hero />
        <div id="founder"><FounderMessage /></div>
        <div id="services"><Services /></div>
        <div id="brand-purpose"><BrandPurpose /></div>
        <div id="mission-vision"><MissionVision /></div>
        <div id="core-values"><CoreValues /></div>
        <div id="agents"><Agents /></div>
        <div id="client-experience"><ClientExperience /></div>
        <div id="why-it-matters"><WhyItMatters /></div>
      </main>
      <Footer />
    </div>
  );
}
