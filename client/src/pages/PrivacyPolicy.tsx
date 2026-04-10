import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "introduction",
    heading: "1. Introduction and Data Controller",
    body: `Aviera Living ("we", "us", "our") is a boutique real estate advisory firm operating in Dubai, United Arab Emirates, with registered offices at Churchill Tower, Business Bay, Dubai, Office No. 1809. We are committed to protecting the personal data of all individuals who interact with our website, enquire about our services, or engage us as clients.

This Privacy Policy explains what personal data we collect, how we use it, the legal basis on which we rely, with whom we share it, and the rights available to you. It applies to all personal data processed through our website at avieraliving.com and through our direct client communications.

If you have questions about this Policy or about how we handle your personal data, please contact us using the details set out in Section 11.`,
  },
  {
    id: "data-collected",
    heading: "2. Personal Data We Collect",
    body: `We collect personal data that you provide to us directly and data that is generated automatically when you use our website.

Data you provide directly includes: your full name, email address, telephone number, nationality and country of residence (where provided), property preferences and search criteria (budget, preferred area, property type), the content of any enquiry or message you submit through our contact forms or via email, and whether you have consented to receive our market intelligence newsletter.

Data collected automatically includes: technical data such as your IP address, browser type and version, device type, operating system, and the pages you visit on our site, along with the date and time of your visit. This data is collected through first-party session cookies and server logs solely for the purpose of ensuring the technical performance and security of our website.

We do not collect sensitive personal data (such as biometric data, health information, or financial account details) through our website.`,
  },
  {
    id: "use-of-data",
    heading: "3. How We Use Your Personal Data",
    body: `We use the personal data we collect for the following purposes:

Responding to enquiries: When you submit an enquiry through our website, we use your name, email address, telephone number, and the content of your message to respond to your request and, where appropriate, to connect you with the relevant member of our advisory team.

Delivering our services: If you engage Aviera Living as your real estate advisor, we use your personal data to carry out the services described in our engagement agreement, including property search, due diligence support, transaction coordination, and legal referrals.

Market intelligence communications: If you have opted in to receive our newsletter or market reports, we will send you periodic updates on the Dubai real estate market. You may withdraw your consent and unsubscribe at any time.

Improving our website and services: We use aggregated, anonymised website usage data to understand how visitors interact with our site and to improve its performance and content.

Legal and regulatory compliance: We may use and retain your personal data to comply with applicable UAE laws and regulations, including anti-money laundering (AML) and know-your-customer (KYC) obligations where required in connection with a property transaction.`,
  },
  {
    id: "legal-basis",
    heading: "4. Legal Basis for Processing",
    body: `We process your personal data on the following legal bases under UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (the "UAE Data Protection Law") and, where applicable, under the data protection laws of your country of residence:

Consent: Where you have given us clear, specific consent to process your data — for example, by subscribing to our newsletter or by submitting an enquiry form — we process your data on the basis of that consent. You may withdraw your consent at any time without affecting the lawfulness of processing carried out before withdrawal.

Legitimate interests: We process certain data (such as website analytics and business communications with existing and prospective clients) where it is necessary for our legitimate business interests, provided those interests are not overridden by your rights and interests.

Legal obligation: We process and retain certain data where we are required to do so by applicable UAE law, including obligations under the UAE Anti-Money Laundering Law and RERA requirements applicable to licensed real estate activities.

Performance of a contract: Where you have engaged our services under a formal advisory agreement, we process your data to the extent necessary to perform that contract.`,
  },
  {
    id: "data-sharing",
    heading: "5. Data Sharing",
    body: `We do not sell, rent, or trade your personal data to third parties. We share your personal data only in the following limited circumstances:

Service providers: We work with a small number of carefully selected third-party service providers who assist us in operating our business — for example, providers of email delivery, customer relationship management (CRM) software, and website hosting. These providers access your data only to the extent necessary to perform their specific function and are contractually required to handle it in accordance with applicable data protection law.

Professional referrals: Where you have engaged us to assist with a property transaction, we may, with your knowledge and at your direction, share relevant information with lawyers, mortgage advisors, developers, or the Dubai Land Department as necessary to complete the transaction.

Legal and regulatory disclosure: We may disclose personal data to government authorities, regulators, or law enforcement bodies where required to do so by UAE law — for example, in connection with anti-money laundering or counter-terrorism financing obligations.

All data sharing is conducted under appropriate agreements or legal obligations. We do not share your data for any third-party marketing purposes.`,
  },
  {
    id: "data-retention",
    heading: "6. Data Retention",
    body: `We retain your personal data only for as long as is necessary for the purposes for which it was collected, subject to applicable legal retention requirements.

Enquiry records (where no engagement follows): Personal data submitted through our contact forms is retained for up to three (3) years to allow us to respond to follow-up enquiries and to maintain records of our business interactions.

Client engagement records: Where you engage our services, we retain personal and transaction-related data for a minimum of seven (7) years from the conclusion of the engagement, in compliance with UAE commercial record-keeping requirements.

Newsletter subscription data: Your email address and subscription preferences are retained until you unsubscribe. Following unsubscription, we retain a minimal suppression record to prevent accidental re-subscription.

Website analytics data: Aggregated and anonymised website usage data is retained indefinitely for analytical purposes. Personally identifiable server logs are retained for a maximum of ninety (90) days.

At the end of the applicable retention period, personal data is securely deleted or anonymised.`,
  },
  {
    id: "your-rights",
    heading: "7. Your Rights",
    body: `Subject to applicable law, you have the following rights in relation to your personal data:

Right of access: You may request a copy of the personal data we hold about you and information about how we use it.

Right to rectification: You may ask us to correct any personal data we hold about you that is inaccurate or incomplete.

Right to erasure: In certain circumstances, you may request that we delete your personal data. This right is subject to applicable legal retention obligations — for example, we cannot delete data we are required to retain under UAE commercial or anti-money laundering law.

Right to withdraw consent: Where we process your data on the basis of your consent (such as for newsletter communications), you may withdraw that consent at any time by contacting us or by using the unsubscribe link included in every marketing communication.

Right to object: You may object to our processing of your personal data where we rely on our legitimate interests as the legal basis, subject to applicable law.

Right to lodge a complaint: If you believe we have processed your personal data in breach of applicable law, you have the right to lodge a complaint with the competent data protection authority in the UAE or, where applicable, in your country of residence.

To exercise any of these rights, please contact us at privacy@avieraliving.com. We will respond to your request within the timeframes required by applicable law.`,
  },
  {
    id: "cookies",
    heading: "8. Cookies and Analytics",
    body: `Our website uses a limited number of cookies necessary for the technical operation of the site. These include session cookies that allow you to navigate our website and use its features, and security cookies that protect against cross-site request forgery.

We do not use third-party advertising cookies, retargeting cookies, or any cookies that track your activity across other websites. We do not use Google Analytics or similar third-party analytics platforms that send your personal data to third parties outside our control.

Our server-side analytics collect anonymised aggregate data (page views, session durations, browser types) for internal performance monitoring only. You may disable cookies in your browser settings; however, some website features may not function correctly if cookies are disabled.`,
  },
  {
    id: "international-transfers",
    heading: "9. International Transfers",
    body: `Our primary operations and data storage are based in the United Arab Emirates. As a result, your personal data is processed within the UAE where UAE data protection law applies.

Some of our service providers (such as email delivery and CRM platforms) may process data on servers located outside the UAE, including within the European Economic Area or the United States. Where such transfers occur, we ensure that appropriate safeguards are in place — such as standard contractual clauses or adequacy decisions — to protect your personal data to a standard at least equivalent to that required by UAE Federal Decree-Law No. 45 of 2021.

By submitting your personal data to us, you acknowledge that your data may be transferred to, stored, and processed in countries outside your country of residence. We take all reasonable steps to ensure that any such transfers are conducted securely and in compliance with applicable law.`,
  },
  {
    id: "contact",
    heading: "10. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices, our services, or applicable law. When we make material changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this Policy periodically.

Your continued use of our website following the posting of any updates constitutes your acknowledgement of the changes.`,
  },
  {
    id: "contact-details",
    heading: "11. Contact",
    body: `If you have any questions, concerns, or requests relating to this Privacy Policy or to the personal data we hold about you, please contact us:

By email: privacy@avieraliving.com
By post: Aviera Living, Churchill Tower, Business Bay, Dubai, Office No. 1809, United Arab Emirates

We will respond to all enquiries within a reasonable timeframe and in compliance with our obligations under UAE data protection law.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="pt-44 pb-20 bg-[#3D2716]">
        <div className="container mx-auto px-6 lg:px-12">
          <Link href="/" className="inline-flex items-center gap-2 font-inria text-xs text-[#FAF8F5]/50 hover:text-[#FAF8F5] transition-colors mb-10 tracking-widest uppercase">
            <span>←</span> Back to Aviera Living
          </Link>
          <div className="max-w-3xl">
            <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-4">Legal</p>
            <h1 className="font-symphony text-5xl md:text-6xl text-[#FAF8F5] mb-6 leading-[1.05]">
              Privacy Policy
            </h1>
            <p className="font-inria text-base text-[#FAF8F5]/50 leading-relaxed">
              Last updated: April 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="font-inria text-base text-[#3D2716]/75 leading-relaxed mb-12">
              This Privacy Policy describes how Aviera Living collects, uses, and protects the personal data of individuals who visit our website or engage with our services. We take your privacy seriously and are committed to full transparency about our data practices.
            </p>

            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.id} id={section.id}>
                  <h2 className="font-lejour text-sm text-[#3D2716] uppercase tracking-wide mb-4 pb-3 border-b border-[#D8BFAE]/40">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.body.split("\n\n").map((para, i) => (
                      <p key={i} className="font-inria text-[15px] text-[#3D2716]/80 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
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
