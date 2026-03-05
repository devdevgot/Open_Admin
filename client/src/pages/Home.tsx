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
        <FounderMessage />
        <Services />
        <BrandPurpose />
        <MissionVision />
        <CoreValues />
        <Agents />
        <ClientExperience />
        <WhyItMatters />
      </main>
      <Footer />
    </div>
  );
}