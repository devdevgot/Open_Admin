import { useState, useEffect } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import type { ContactOptions } from "@/lib/contact";

const TYPE_LABELS: Record<string, string> = {
  buy: "Property Purchase",
  sell: "Property Sale",
  rent: "Rental Enquiry",
  valuation: "Property Valuation",
  general: "General Enquiry",
};

const TYPE_MESSAGES: Record<string, string> = {
  buy: "I am interested in purchasing a property and would like to discuss my requirements with an advisor.",
  sell: "I would like to discuss selling my property and understand the process and current market conditions.",
  rent: "I am looking for a rental property and would like assistance finding the right home.",
  valuation: "I would like to arrange a professional valuation of my property.",
  general: "",
};

const CONTEXT_HEADINGS: Record<string, { title: string; subtitle: string }> = {
  buy: { title: "Speak to a Buying Advisor", subtitle: "Our specialists will guide you through every step of your acquisition." },
  sell: { title: "Speak to a Sales Advisor", subtitle: "We provide discreet, expert guidance to achieve the best outcome for your sale." },
  rent: { title: "Speak to a Rental Specialist", subtitle: "Let us help you find the perfect home tailored to your lifestyle." },
  valuation: { title: "Request a Valuation", subtitle: "Our advisors will provide an accurate and transparent assessment of your property." },
  general: { title: "Get in Touch", subtitle: "Our team will respond to your enquiry within 24 hours." },
};

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [opts, setOpts] = useState<ContactOptions>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "general", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ContactOptions>).detail;
      setOpts(detail);
      setForm({
        name: "",
        email: "",
        phone: "",
        type: detail.type || "general",
        message: detail.prefillMessage || (detail.propertyTitle ? `I am interested in: ${detail.propertyTitle}` : "") || TYPE_MESSAGES[detail.type || "general"] || "",
      });
      setSuccess(false);
      setError("");
      setIsOpen(true);
    };
    document.addEventListener("aviera:contact", handler);
    return () => document.removeEventListener("aviera:contact", handler);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSuccess(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const body: any = { name: form.name, email: form.email, type: form.type, message: form.message };
      if (form.phone.trim()) body.phone = form.phone;
      if (opts.propertyId) body.propertyId = opts.propertyId;

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Submission failed");
      }
      setSuccess(true);
      setTimeout(() => { setIsOpen(false); setSuccess(false); }, 4000);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const heading = CONTEXT_HEADINGS[form.type] || CONTEXT_HEADINGS.general;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1C0E04]/85 backdrop-blur-sm" onClick={handleClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-[#FAF8F5] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#424D38] px-8 pt-8 pb-6">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
            data-testid="button-close-modal"
          >
            <X size={20} />
          </button>
          <p className="text-[10px] text-[#D8BFAE]/60 uppercase tracking-[0.4em] font-mono mb-2">Aviera Living</p>
          <h2 className="font-lejour text-2xl md:text-3xl text-[#FAF8F5] leading-tight mb-1">
            {heading.title}
          </h2>
          <p className="text-xs text-[#D8BFAE]/80 font-inria leading-relaxed">{heading.subtitle}</p>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle2 size={44} className="text-[#424D38] mx-auto mb-4" />
              <h3 className="font-lejour text-2xl text-[#3D2716] mb-2">Thank You</h3>
              <p className="text-sm font-inria text-[#917C63] leading-relaxed">
                Your enquiry has been received. One of our specialists will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[10px] font-bold text-[#917C63] uppercase tracking-[0.15em] mb-1.5">Full Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    className={INPUT}
                    data-testid="input-name"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[10px] font-bold text-[#917C63] uppercase tracking-[0.15em] mb-1.5">Phone Number</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+971 50 000 0000"
                    className={INPUT}
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#917C63] uppercase tracking-[0.15em] mb-1.5">Email Address *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className={INPUT}
                  data-testid="input-email"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#917C63] uppercase tracking-[0.15em] mb-1.5">Enquiry Type</label>
                <select
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className={INPUT}
                  data-testid="select-inquiry-type"
                >
                  {Object.entries(TYPE_LABELS).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#917C63] uppercase tracking-[0.15em] mb-1.5">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us how we can help…"
                  className={`${INPUT} resize-none`}
                  data-testid="input-message"
                />
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2">{error}</p>
              )}

              {opts.propertyTitle && (
                <p className="text-[10px] text-[#917C63] font-inria">
                  Enquiring about: <span className="text-[#3D2716] font-medium">{opts.propertyTitle}</span>
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                data-testid="button-submit-inquiry"
                className="w-full bg-[#995134] text-[#FAF8F5] py-4 font-lejour uppercase tracking-widest text-sm hover:bg-[#3D2716] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting && <Loader2 size={14} className="animate-spin" />}
                {submitting ? "Sending..." : "Send Enquiry"}
              </button>

              <p className="text-[10px] text-center text-[#917C63]/70 font-inria">
                By submitting, you agree to our privacy policy. We will never share your data.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const INPUT = "w-full border border-[#D8BFAE] bg-white px-4 py-3 text-sm font-inria text-[#3D2716] placeholder-[#917C63]/60 focus:outline-none focus:border-[#995134] transition-colors";
