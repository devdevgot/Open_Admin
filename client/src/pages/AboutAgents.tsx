import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { MapPin, Languages } from "lucide-react";
import { openContactModal } from "@/lib/contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutAgents() {
  const { data: agents = [] } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: () => fetch("/api/agents").then(r => r.json()),
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-[#3D2716]/[0.03]">
        <div className="container mx-auto px-6 lg:px-12">
          <Link href="/about" className="text-sm font-inria text-[#917C63] uppercase tracking-widest hover:text-[#3D2716] transition-colors mb-8 inline-block" data-testid="link-back">
            ← About Us
          </Link>
          <p className="font-lejour text-[30px] text-[#917C63] uppercase tracking-[0.3em] mb-4">The Team</p>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#3D2716] mb-6 leading-[1.1]" data-testid="text-page-title">
            The People<br />Behind Every Deal
          </h1>
          <p className="font-inria text-xl text-[#3D2716]/70 max-w-2xl leading-relaxed">
            Small by design. Each member of the Aviera team was chosen not for their sales record, but for the quality of their judgment, the depth of their expertise, and the standard of their integrity.
          </p>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-20 container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <div key={agent.id} className="group" data-testid={`card-agent-${agent.name.toLowerCase().replace(/\s/g, "-")}`}>
              {/* Photo */}
              <div className="relative overflow-hidden aspect-[3/4] mb-6">
                {agent.image ? (
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-[#D8BFAE]/20 flex items-center justify-center">
                    <span className="text-[#917C63]">No photo</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-16">
                  <p className="font-lejour text-2xl text-[#FAF8F5]">{agent.name}</p>
                  <p className="font-symphony text-sm text-[#D8BFAE] mt-1">{agent.role}</p>
                </div>
              </div>
              {/* Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#917C63]">
                  <MapPin size={14} />
                  <span className="font-inria text-sm">Dubai, UAE</span>
                </div>
                {agent.specialties && agent.specialties.length > 0 && (
                  <p className="font-inria text-sm text-[#3D2716] font-medium">{agent.specialties.join(", ")}</p>
                )}
                {agent.bio && (
                  <p className="font-inria text-sm text-[#3D2716]/65 leading-relaxed">{agent.bio}</p>
                )}
                {agent.languages && agent.languages.length > 0 && (
                  <div className="flex items-start gap-2 pt-2">
                    <Languages size={14} className="text-[#917C63] mt-0.5 shrink-0" />
                    <span className="font-inria text-xs text-[#917C63]">{agent.languages.join(", ")}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-[#D8BFAE]/20 flex justify-between items-center">
                  <div>
                    <p className="font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.2em]">Transactions</p>
                    <p className="font-symphony text-xl text-[#3D2716]">{agent.transactions || 0}</p>
                  </div>
                  <button onClick={() => openContactModal({ type: "general", agentName: agent.name, prefillMessage: `I would like to speak with ${agent.name} about a property.` })} className="bg-[#424D38] text-[#FAF8F5] px-6 py-2.5 font-lejour text-xs uppercase tracking-widest hover:bg-[#3D2716] transition-colors" data-testid={`button-contact-${agent.name.toLowerCase().replace(/\s/g, "-")}`}>
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the team */}
      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-lejour text-[30px] text-[#D8BFAE] uppercase tracking-[0.3em] mb-4">Careers</p>
              <h2 className="font-symphony text-4xl md:text-5xl mb-6">Join a Team That<br />Does Things Differently</h2>
              <p className="font-inria text-lg text-[#FAF8F5]/70 leading-relaxed mb-10">
                We are always interested in meeting exceptional real estate professionals who share our values. If you believe that trust and legal precision are as important as sales results, we want to hear from you.
              </p>
              <button onClick={() => openContactModal({ type: "general", prefillMessage: "I am interested in joining the Aviera Living team." })} className="bg-[#995134] text-[#FAF8F5] px-10 py-4 font-lejour uppercase tracking-widest text-sm hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-careers">
                View Open Positions
              </button>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-6">
              {[
                { label: "Team Size", value: "12" },
                { label: "Avg. Tenure", value: "5.2 yrs" },
                { label: "Languages", value: "11" },
                { label: "Nationalities", value: "8" },
              ].map((s) => (
                <div key={s.label} className="border border-[#FAF8F5]/10 p-8 text-center">
                  <p className="font-symphony text-4xl text-[#D8BFAE]">{s.value}</p>
                  <p className="font-inria text-xs text-[#FAF8F5]/50 uppercase tracking-wider mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
