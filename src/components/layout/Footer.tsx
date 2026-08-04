import { Link } from "wouter";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

const footerLinkGroups = {
  "About Us": ["About Saroja Hospital", "Our Vision", "Our Mission", "Our Values"],
  "Patient Services": [
    "Book Appointment",
    "Find a Doctor",
    "Medical Consultation",
    "Patient Information",
  ],
  "Medical Services": [
    "Endoscopy & Colonoscopy",
    "Laparoscopic Surgery",
    "General Surgery",
    "Digestive Care",
  ],
  "Specialized Care": [
    "Stones & Piles Treatment",
    "Hernia & Fissure Care",
    "Heart, BP & Thyroid Care",
    "Liver & Diabetes Management",
  ],
  "Health Information": [
    "Health Articles",
    "Patient Education",
    "Disease Information",
    "Health Awareness",
  ],
  "Contact Us": ["Contact Hospital", "Hospital Location", "Book Appointment", "Careers"],
};

const footerLinkGroupsHi = {
  "हमारे बारे में": ["सरोजा हॉस्पिटल के बारे में", "हमारा विज़न", "हमारा मिशन", "हमारे मूल्य"],
  "मरीज सेवाएं": ["अपॉइंटमेंट बुक करें", "डॉक्टर खोजें", "चिकित्सा परामर्श", "मरीज जानकारी"],
  "चिकित्सा सेवाएं": [
    "एंडोस्कोपी एवं कोलोनोस्कोपी",
    "लेप्रोस्कोपिक सर्जरी",
    "सामान्य सर्जरी",
    "पेट एवं पाचन देखभाल",
  ],
  "विशेष देखभाल": [
    "पथरी एवं बवासीर का उपचार",
    "हर्निया एवं फिशर देखभाल",
    "हृदय, बीपी एवं थायराइड देखभाल",
    "लिवर एवं डायबिटीज प्रबंधन",
  ],
  "स्वास्थ्य जानकारी": ["स्वास्थ्य लेख", "मरीज शिक्षा", "रोग जानकारी", "स्वास्थ्य जागरूकता"],
  "संपर्क करें": ["अस्पताल से संपर्क करें", "अस्पताल का स्थान", "अपॉइंटमेंट बुक करें", "करियर"],
};

const socialLinks = [
  {
    Icon: Facebook,
    label: "Facebook",
    href: "#",
  },
  {
    Icon: Instagram,
    label: "Instagram",
    href: "#",
  },
  {
    Icon: Youtube,
    label: "YouTube",
    href: "#",
  },
];

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
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-accent">
                    {category}
                  </h3>

                  <div className="flex-1 h-px bg-accent/30" />
                </div>

                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/70 hover:text-accent text-sm transition-colors"
                      >
                        {link}
                      </a>
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
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-accent font-bold text-xl">SH</span>
              </div>

              <div>
                <h2 className="text-xl font-bold font-serif mb-1">Saroja Hospital</h2>

                <p className="text-white/60 text-sm max-w-md leading-relaxed">
                  {t("footer.tagline")}
                </p>

                <div className="flex gap-3 mt-4">
                  {socialLinks.map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <a
                href="tel:+918369179901"
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={16} className="text-accent" />

                  <span className="text-xs text-white/60 uppercase tracking-wider">
                    {t("footer.tollFree")}
                  </span>
                </div>

                <p className="font-semibold text-sm">+91 8369179901</p>
              </a>

              <a
                href="mailto:Saroja.hospital25@gmail.com"
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-accent" />

                  <span className="text-xs text-white/60 uppercase tracking-wider">
                    {t("footer.email")}
                  </span>
                </div>

                <p className="font-semibold text-xs break-all">Saroja.hospital25@gmail.com</p>
              </a>

              <Link href="/contact">
                <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors h-full cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-accent" />

                    <span className="text-xs text-white/60 uppercase tracking-wider">
                      {isHindi ? "स्थान" : "Location"}
                    </span>
                  </div>

                  <p className="font-semibold text-sm">
                    {isHindi ? "वारी, प्रतापपुर, प्रयागराज" : "Wari, Pratappur, Prayagraj"}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>{t("footer.copyright")}</p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/terms" className="hover:text-accent transition-colors">
              {t("footer.terms")}
            </Link>

            <Link href="/privacy" className="hover:text-accent transition-colors">
              {t("footer.privacy")}
            </Link>

            <Link href="/contact" className="hover:text-accent transition-colors">
              {isHindi ? "संपर्क करें" : "Contact Us"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
