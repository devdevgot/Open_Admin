const values = [
  {
    title: "Absolute Transparency",
    description: "We operate with open books and clear communication. No hidden fees, no obscured terms—just pristine clarity."
  },
  {
    title: "Legal Precision",
    description: "Every transaction is underpinned by rigorous legal scrutiny. We protect our clients from exposure and ensure airtight compliance."
  },
  {
    title: "Boutique Excellence",
    description: "We prioritize quality over volume. Our bespoke approach means every client receives the undivided attention of senior advisors."
  },
  {
    title: "Discreet Confidentiality",
    description: "We guard our clients' privacy fiercely. Discretion is woven into the fabric of our operations."
  }
];

export default function CoreValues() {
  return (
    <section className="py-32 bg-[#D8BFAE]/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="font-lejour text-[#917C63] uppercase tracking-widest text-[30px] mb-4">Core Values</h2>
          <h3 className="font-symphony text-4xl lg:text-5xl text-[#3D2716]">The Pillars of Our Practice.</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div key={index} className="border-l border-[#3D2716]/20 pl-8">
              <h4 className="font-lejour text-2xl text-[#3D2716] mb-4">{value.title}</h4>
              <p className="font-inria text-[#3D2716]/80 leading-relaxed text-lg">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}