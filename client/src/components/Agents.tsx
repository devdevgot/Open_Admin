import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function Agents() {
  const { data: agents = [] } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: () => fetch("/api/agents").then(r => r.json()),
  });

  return (
    <section className="py-16 lg:py-32 bg-[#FAF8F5]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16">
          <div>
            <h2 className="font-lejour text-[#917C63] uppercase tracking-widest text-[30px] mb-3">Our People</h2>
            <h3 className="font-lejour uppercase text-3xl md:text-4xl lg:text-5xl text-[#3D2716]">The <span className="font-symphony normal-case">Advisors.</span></h3>
          </div>
          <Link href="/about/agents" className="hidden md:block font-inria uppercase tracking-widest text-xs md:text-sm text-[#3D2716] border-b border-[#3D2716] pb-1 hover:text-[#995134] hover:border-[#995134] transition-colors">
            Meet the Full Team
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {agents.map((agent) => (
            <div key={agent.id} className="group cursor-pointer">
              {agent.image && (
                <div className="aspect-[3/4] overflow-hidden bg-[#D8BFAE]/20 mb-6">
                  <img 
                    src={agent.image} 
                    alt={agent.name}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <h4 className="font-lejour text-2xl text-[#3D2716] mb-1">{agent.name}</h4>
              <p className="font-inria text-sm text-[#917C63] uppercase tracking-widest mb-3">{agent.role}</p>
              {agent.languages && agent.languages.length > 0 && (
                <p className="font-inria text-sm text-[#3D2716]/60 italic">{agent.languages.join(", ")}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/about/agents" className="font-inria uppercase tracking-widest text-sm text-[#3D2716] border-b border-[#3D2716] pb-1 hover:text-[#995134] hover:border-[#995134] transition-colors">
            Meet the Full Team
          </Link>
        </div>
      </div>
    </section>
  );
}