import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "introduction",
    heading: "1. Introduction and Acceptance",
    body: `These Terms of Service ("Terms") govern your access to and use of the website operated by Aviera Living at avieraliving.com (the "Website"). By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Website.

Aviera Living is a boutique real estate advisory firm based in Dubai, United Arab Emirates. Our registered office is at Churchill Tower, Business Bay, Dubai, Office No. 1809.

We reserve the right to update or modify these Terms at any time. Any changes will be effective upon posting to the Website with an updated "Last Updated" date. Your continued use of the Website following such posting constitutes your acceptance of the revised Terms.`,
  },
  {
    id: "about-us",
    heading: "2. About Aviera Living",
    body: `Aviera Living operates as a licensed real estate advisory firm in the Emirate of Dubai, providing buyer representation, investment advisory, and transaction coordination services in the Dubai residential property market.

We are not a property developer, a mortgage lender, a licensed legal practice, or a financial services firm. We do not sell or develop property on our own behalf. Our role is exclusively that of an advisory intermediary, acting on behalf of our clients in property transactions.

Our advisory activities are carried out in accordance with applicable UAE law and the regulations of the Real Estate Regulatory Agency (RERA) of Dubai. Any formal advisory engagement requires a signed mandate agreement between you and Aviera Living.`,
  },
  {
    id: "nature-of-information",
    heading: "3. Nature of Information on This Website",
    body: `All content published on the Website — including market commentary, price data, yield estimates, neighbourhood guides, legal guides, and blog articles — is provided for general informational purposes only. It does not constitute, and should not be construed as, financial advice, investment advice, legal advice, or a solicitation to buy or sell any property.

Property values, rental yields, transaction volumes, and regulatory requirements in the Dubai real estate market change frequently. All market data and figures referenced on the Website are indicative and were accurate at the time of publication, but may not reflect current market conditions. We make no representation or warranty as to the accuracy, completeness, or timeliness of any information published on the Website.

You should always conduct your own due diligence and seek independent professional advice — including from a qualified UAE lawyer, chartered financial advisor, and licensed real estate broker — before making any property investment decision. Aviera Living accepts no liability for decisions made in reliance on content published on this Website without a formal advisory engagement.`,
  },
  {
    id: "no-agency",
    heading: "4. No Agency or Client Relationship",
    body: `Accessing or browsing this Website does not create any advisory, agency, fiduciary, or client relationship between you and Aviera Living. Submitting an enquiry through our contact forms or communicating with us by email constitutes an expression of interest only and does not create a binding engagement.

A formal client relationship is established only upon the execution of a written mandate agreement signed by an authorised representative of Aviera Living and by you (or your authorised representative). Until such an agreement is in place, Aviera Living has no obligation to act on your behalf, to treat information you share as confidential in the legal sense, or to prioritise your interests over those of other clients or prospective clients.

Nothing on this Website constitutes an offer to provide services, and no contract is formed by your use of the Website.`,
  },
  {
    id: "intellectual-property",
    heading: "5. Intellectual Property",
    body: `All content on this Website — including but not limited to text, articles, market reports, photographs, graphics, logos, page layout, and the overall design and aesthetic of the Website — is the intellectual property of Aviera Living or its licensors and is protected by applicable UAE and international copyright law.

You may view, download, and print content from the Website for your own personal, non-commercial use only. You may not reproduce, distribute, republish, transmit, modify, adapt, create derivative works from, or commercially exploit any content from this Website without our prior written consent.

The name "Aviera Living", our logo, and our brand identity are proprietary to Aviera Living. You may not use our name, logo, or any other branding elements in any way that implies a relationship, endorsement, or affiliation without our express written permission.

Requests for content licensing or reproduction rights should be directed to hello@avieraliving.com.`,
  },
  {
    id: "limitation-of-liability",
    heading: "6. Limitation of Liability",
    body: `To the fullest extent permitted by applicable UAE law, Aviera Living, its directors, officers, employees, and advisors shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from or in connection with your use of this Website or your reliance on any information contained on it.

This limitation applies regardless of the cause of action — including but not limited to negligence, breach of contract, or any other legal theory — and applies even if Aviera Living has been advised of the possibility of such damages.

We do not warrant that the Website will be available at all times, free from errors, or free from viruses or other harmful components. We reserve the right to suspend or discontinue the Website at any time without notice.

Nothing in these Terms limits or excludes liability that cannot be limited or excluded under applicable UAE law.`,
  },
  {
    id: "third-party-links",
    heading: "7. Third-Party Links",
    body: `The Website may contain links to third-party websites, resources, or services for your convenience and reference. These links are provided in good faith; however, Aviera Living has no control over, and accepts no responsibility for, the content, privacy practices, or accuracy of any third-party website.

The inclusion of any link does not imply endorsement, approval, or affiliation by Aviera Living with the linked website or its operator. Your use of any third-party website is subject to that website's own terms and conditions and privacy policy.

If you follow a link to a third-party website, you do so at your own risk, and we encourage you to review the terms and privacy policy of any third-party site you visit.`,
  },
  {
    id: "privacy",
    heading: "8. Privacy",
    body: `Your use of this Website is also governed by our Privacy Policy, which is incorporated into these Terms by reference. The Privacy Policy describes in detail how we collect, use, store, and protect your personal data, and sets out your rights under applicable UAE data protection law.

By using this Website, you confirm that you have read and understood our Privacy Policy. If you have any questions or concerns about how we handle your personal data, please refer to the Privacy Policy or contact us directly.`,
  },
  {
    id: "governing-law",
    heading: "9. Governing Law and Jurisdiction",
    body: `These Terms and any disputes arising from or relating to them or to your use of this Website shall be governed by and construed in accordance with the laws of the United Arab Emirates, as applied in the Emirate of Dubai.

Any legal proceedings arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of the Emirate of Dubai, and you irrevocably submit to the jurisdiction of those courts for this purpose.

This clause does not affect any statutory rights you may have under the law of your country of residence that cannot be excluded or limited by contract.`,
  },
  {
    id: "amendments",
    heading: "10. Amendments",
    body: `Aviera Living reserves the right to amend, update, or replace these Terms at any time by posting the revised Terms on the Website. We will update the "Last Updated" date at the top of this page whenever material changes are made.

We may, but are not obliged to, notify registered users of material changes by email. It is your responsibility to check these Terms periodically for updates. Your continued use of the Website after any changes are posted constitutes your acceptance of the revised Terms.

If you do not agree to any revised Terms, your only remedy is to discontinue use of the Website.`,
  },
  {
    id: "contact",
    heading: "11. Contact",
    body: `If you have any questions about these Terms or about your use of the Website, please contact us:

By email: legal@avieraliving.com
By post: Aviera Living, Churchill Tower, Business Bay, Dubai, Office No. 1809, United Arab Emirates

For enquiries about our privacy practices, please refer to our Privacy Policy or contact privacy@avieraliving.com.`,
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="pt-44 pb-20 border-b border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">Legal</p>
            <h1 className="font-symphony text-5xl md:text-6xl text-[#3D2716] mb-6 leading-[1.05]">
              Terms of Service
            </h1>
            <p className="font-inria text-base text-[#3D2716]/60 leading-relaxed">
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
              Please read these Terms of Service carefully before using this website. By accessing avieraliving.com, you agree to be bound by these Terms. For information about how we handle your personal data, please see our{" "}
              <Link href="/privacy-policy" className="text-[#995134] hover:text-[#3D2716] transition-colors underline underline-offset-2">
                Privacy Policy
              </Link>.
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
