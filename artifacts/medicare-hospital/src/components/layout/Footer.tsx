import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

const footerLinkGroups = {
  "About Us": ["Chairperson's Message", "Our Values", "Our Hospital", "Our Strengths", "Respect for Life", "Awards & Achievements"],
  "Patients & Visitors": ["Book Appointment", "Find a Doctor", "Patient Portal", "Insurance Plans", "International Patients", "Visitor Guidelines"],
  "Health Information": ["Health Articles", "Disease Information", "Patient Education", "Wellness Programs", "Nutrition Advice"],
  "Research & Academics": ["Research Programs", "Clinical Trials", "Fellowships", "Publications", "Conferences"],
  "Centre of Excellence": ["Cardiology", "Oncology", "Neurology", "Orthopedics", "Organ Transplant", "Robotic Surgery"],
  "Contact Us": ["Contact Form", "Hospital Locations", "Emergency Contacts", "Careers", "Media & Press"]
};

const footerLinkGroupsHi = {
  "हमारे बारे में": ["अध्यक्ष का संदेश", "हमारे मूल्य", "हमारा अस्पताल", "हमारी शक्तियां", "जीवन का सम्मान", "पुरस्कार और उपलब्धियां"],
  "मरीज़ और आगंतुक": ["अपॉइंटमेंट बुक करें", "डॉक्टर ढूंढें", "पेशेंट पोर्टल", "बीमा योजनाएं", "अंतरराष्ट्रीय मरीज़", "आगंतुक दिशानिर्देश"],
  "स्वास्थ्य जानकारी": ["स्वास्थ्य लेख", "रोग जानकारी", "रोगी शिक्षा", "वेलनेस प्रोग्राम", "पोषण सलाह"],
  "अनुसंधान और शिक्षा": ["अनुसंधान कार्यक्रम", "क्लिनिकल ट्रायल", "फेलोशिप", "प्रकाशन", "सम्मेलन"],
  "उत्कृष्टता केंद्र": ["हृदय रोग", "ऑन्कोलॉजी", "न्यूरोलॉजी", "ऑर्थोपेडिक्स", "अंग प्रत्यारोपण", "रोबोटिक सर्जरी"],
  "संपर्क करें": ["संपर्क फ़ॉर्म", "अस्पताल स्थान", "आपातकालीन संपर्क", "करियर", "मीडिया और प्रेस"]
};

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const groups = isHindi ? footerLinkGroupsHi : footerLinkGroups;

  return (
    <footer className="bg-primary text-white">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {Object.entries(groups).map(([category, links]) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-accent">{category}</h3>
                  <div className="flex-1 h-px bg-accent/30" />
                </div>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/70 hover:text-accent text-sm transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-accent font-bold text-xl">M+</span>
              </div>
              <div>
                <h2 className="text-xl font-bold font-serif mb-1">MediCare Excellence Hospital</h2>
                <p className="text-white/60 text-sm max-w-sm">{t("footer.tagline")}</p>
                <div className="flex gap-3 mt-4">
                  {[
                    { Icon: Facebook, label: "Facebook" },
                    { Icon: Twitter, label: "Twitter" },
                    { Icon: Linkedin, label: "LinkedIn" },
                    { Icon: Instagram, label: "Instagram" },
                    { Icon: Youtube, label: "YouTube" }
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={16} className="text-accent" />
                  <span className="text-xs text-white/60 uppercase tracking-wider">{t("footer.tollFree")}</span>
                </div>
                <p className="font-semibold text-sm">1-800-221-166</p>
                <p className="font-semibold text-sm">1-800-890-1111</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-accent" />
                  <span className="text-xs text-white/60 uppercase tracking-wider">{t("footer.email")}</span>
                </div>
                <p className="font-semibold text-sm break-all">info@medicare-excellence.com</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={16} className="text-red-400" />
                  <span className="text-xs text-white/60 uppercase tracking-wider">{t("footer.emergency")}</span>
                </div>
                <p className="font-semibold text-sm text-red-300">022-MEDIEMG</p>
                <p className="text-xs text-white/50">{t("footer.available247")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">{t("footer.terms")}</a>
            <a href="#" className="hover:text-accent transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-accent transition-colors">{t("footer.sitemap")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
