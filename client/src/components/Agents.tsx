import agent1 from "@/assets/images/agent_1.jpg";
import agent2 from "@/assets/images/agent_2.jpg";
import agent3 from "@/assets/images/agent_3.jpg";
import agent4 from "@/assets/images/agent_4.jpg";

const agents = [
  {
    name: "Eleanor Sterling",
    role: "Senior Investment Advisor",
    languages: "English, French, Russian",
    image: agent1
  },
  {
    name: "Marcus Thorne",
    role: "Director of Private Office",
    languages: "English, Arabic",
    image: agent2
  },
  {
    name: "Isabella Rossi",
    role: "Head of Luxury Acquisitions",
    languages: "English, Italian, Spanish",
    image: agent3
  },
  {
    name: "Julian Wright",
    role: "Legal & Compliance Director",
    languages: "English, Mandarin",
    image: agent4
  }
];

export default function Agents() {
  return (
    <section className="py-32 bg-[#FAF8F5]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="font-lejour text-[#917C63] uppercase tracking-widest text-sm mb-4">Our People</h2>
            <h3 className="font-symphony text-4xl lg:text-5xl text-[#3D2716]">The Advisors.</h3>
          </div>
          <button className="hidden md:block font-inria uppercase tracking-widest text-sm text-[#3D2716] border-b border-[#3D2716] pb-1 hover:text-[#995134] hover:border-[#995134] transition-colors">
            Meet the Full Team
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {agents.map((agent, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden bg-[#D8BFAE]/20 mb-6">
                <img 
                  src={agent.image} 
                  alt={agent.name}
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <h4 className="font-lejour text-2xl text-[#3D2716] mb-1">{agent.name}</h4>
              <p className="font-inria text-sm text-[#917C63] uppercase tracking-widest mb-3">{agent.role}</p>
              <p className="font-inria text-sm text-[#3D2716]/60 italic">{agent.languages}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <button className="font-inria uppercase tracking-widest text-sm text-[#3D2716] border-b border-[#3D2716] pb-1">
            Meet the Full Team
          </button>
        </div>
      </div>
    </section>
  );
}