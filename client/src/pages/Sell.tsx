import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Sell() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <div className="pt-32 pb-16 bg-gradient-to-b from-[#3D2716]/5 to-transparent">
        <div className="container mx-auto px-6 lg:px-12">
          <Link href="/" className="text-sm font-inria text-[#917C63] uppercase tracking-widest hover:text-[#3D2716] transition-colors mb-6 inline-block" data-testid="link-back-home">
              ← Back to Home
          </Link>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#3D2716] mb-4" data-testid="text-page-title">
            Sell Your Property
          </h1>
          <p className="font-inria text-xl text-[#3D2716]/70 max-w-2xl">
            Trusted partners in selling luxury real estate across Dubai's most prestigious locations.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Get Valuation Card */}
          <div className="bg-white p-12 border border-[#D8BFAE]/30 text-center space-y-4" data-testid="card-valuation">
            <div className="text-5xl mb-4">💎</div>
            <h3 className="font-lejour text-2xl text-[#3D2716] uppercase tracking-widest">Free Valuation</h3>
            <p className="font-inria text-[#3D2716]/70">
              Get an accurate market assessment of your property from our expert advisors.
            </p>
            <button className="w-full bg-[#3D2716] text-[#FAF8F5] py-3 font-inria text-sm uppercase tracking-widest hover:bg-[#995134] transition-colors mt-6" data-testid="button-get-valuation">
              Request Valuation
            </button>
          </div>

          {/* Selling Process Card */}
          <div className="bg-white p-12 border border-[#D8BFAE]/30 text-center space-y-4" data-testid="card-process">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-lejour text-2xl text-[#3D2716] uppercase tracking-widest">Our Process</h3>
            <p className="font-inria text-[#3D2716]/70">
              From listing to closing, we guide you through every step with transparency and expertise.
            </p>
            <button className="w-full bg-[#3D2716] text-[#FAF8F5] py-3 font-inria text-sm uppercase tracking-widest hover:bg-[#995134] transition-colors mt-6" data-testid="button-learn-process">
              Learn More
            </button>
          </div>

          {/* Market Insights Card */}
          <div className="bg-white p-12 border border-[#D8BFAE]/30 text-center space-y-4" data-testid="card-insights">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="font-lejour text-2xl text-[#3D2716] uppercase tracking-widest">Market Insights</h3>
            <p className="font-inria text-[#3D2716]/70">
              Stay informed with current market data and pricing trends across Dubai's neighborhoods.
            </p>
            <button className="w-full bg-[#3D2716] text-[#FAF8F5] py-3 font-inria text-sm uppercase tracking-widest hover:bg-[#995134] transition-colors mt-6" data-testid="button-market-insights">
              View Market Data
            </button>
          </div>
        </div>
      </div>

      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl md:text-5xl mb-6">
            Ready to Sell?
          </h2>
          <p className="font-inria text-lg text-[#FAF8F5]/80 mb-12 max-w-2xl mx-auto">
            Let our team of expert advisors help you achieve the best outcome for your property sale.
          </p>
          <button className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-contact-advisor">
            Contact An Advisor
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
