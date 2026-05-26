import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Award, CheckCircle, Target, Eye, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { accreditations, milestones } from "@/data/stats";

const leadership = [
  { name: "Dr. William Sterling", title: "Chairman & Managing Trustee", dept: "Cardiac Surgery", initials: "WS" },
  { name: "Dr. Priya Mehta", title: "Medical Director", dept: "Internal Medicine", initials: "PM" },
  { name: "Dr. Charles Okonkwo", title: "Chief of Surgery", dept: "Surgical Oncology", initials: "CO" },
  { name: "Ms. Rachel Torres", title: "CEO", dept: "Healthcare Administration", initials: "RT" }
];

function Breadcrumb() {
  const { t } = useTranslation();
  return (
    <div className="bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary transition-colors">{t("common.home")}</a>
        <span>/</span>
        <span className="text-foreground font-medium">{t("nav.aboutUs")}</span>
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useTranslation();
  const valueIcons = [Heart, Award, CheckCircle, Target, Eye];
  const valuesEn = [
    { name: "Respect for Life", desc: "Every patient is treated with dignity, empathy, and the highest standards of ethical care." },
    { name: "Excellence", desc: "We pursue clinical and service excellence through continuous learning, innovation, and quality improvement." },
    { name: "Accountability", desc: "We are transparent and honest in every interaction — with patients, families, and one another." },
    { name: "Compassion", desc: "We recognize the vulnerability of illness and respond with warmth, patience, and understanding." },
    { name: "Innovation", desc: "We invest in the best technology and research to continuously improve what we can offer our patients." }
  ];
  const valuesHi = [
    { name: "जीवन का सम्मान", desc: "हर मरीज़ के साथ गरिमा, सहानुभूति और नैतिक देखभाल के उच्चतम मानकों के साथ व्यवहार किया जाता है।" },
    { name: "उत्कृष्टता", desc: "हम निरंतर सीखने, नवाचार और गुणवत्ता सुधार के माध्यम से नैदानिक और सेवा उत्कृष्टता का पीछा करते हैं।" },
    { name: "जवाबदेही", desc: "हम मरीज़ों, परिवारों और एक-दूसरे के साथ हर बातचीत में पारदर्शी और ईमानदार हैं।" },
    { name: "करुणा", desc: "हम बीमारी की कमजोरी को पहचानते हैं और गर्मजोशी, धैर्य और समझ के साथ प्रतिक्रिया करते हैं।" },
    { name: "नवाचार", desc: "हम लगातार सुधार के लिए सर्वोत्तम तकनीक और अनुसंधान में निवेश करते हैं।" }
  ];
  const isHindi = t("lang") === "hi";
  const values = isHindi ? valuesHi : valuesEn;

  return (
    <div>
      <Breadcrumb />
      <section className="py-24 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-4">{t("about.badge")}</Badge>
          <h1 className="text-5xl font-bold font-serif mb-5">{t("about.title")}</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">{t("about.subtitle")}</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-primary/10 text-primary border-0 mb-4">{t("about.story.badge")}</Badge>
              <h2 className="text-4xl font-bold font-serif text-foreground mb-5">{t("about.story.title")}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>MediCare Excellence Hospital was founded on a simple but powerful belief: that world-class healthcare should be accessible. Since our doors opened in 2010, we have pursued that belief with relentless dedication.</p>
                <p>Today, with over 1,500 specialist doctors, 50+ medical departments, and JCI accreditation — one of healthcare's highest international standards — we serve patients from across the country and from 80+ nations worldwide.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ value: "2010", label: isHindi ? "स्थापित" : "Founded" }, { value: "1,000+", label: isHindi ? "अस्पताल बेड" : "Hospital Beds" }, { value: "JCI", label: isHindi ? "मान्यता प्राप्त" : "Accredited" }, { value: "80+", label: isHindi ? "देश सेवित" : "Countries Served" }].map(stat => (
                <Card key={stat.label} className="border border-border text-center p-6">
                  <div className="text-3xl font-bold text-primary font-serif mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border border-border overflow-hidden">
              <div className="h-2 bg-primary" />
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Eye size={20} className="text-primary" /></div>
                  <h3 className="text-2xl font-bold font-serif text-foreground">{t("about.vision")}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{t("about.visionText")}</p>
              </CardContent>
            </Card>
            <Card className="border border-border overflow-hidden">
              <div className="h-2 bg-accent" />
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"><Target size={20} className="text-accent" /></div>
                  <h3 className="text-2xl font-bold font-serif text-foreground">{t("about.mission")}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{t("about.missionText")}</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-0 mb-3">{t("about.values.badge")}</Badge>
            <h2 className="text-3xl font-bold font-serif text-foreground">{t("about.values.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
            {values.map((v, i) => {
              const Icon = valueIcons[i] || Heart;
              return (
                <motion.div key={v.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="text-center p-6 border border-border hover:shadow-lg hover:border-primary/30 transition-all h-full" data-testid={`card-value-${i}`}>
                    <CardContent className="p-0">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><Icon size={22} className="text-primary" /></div>
                      <h3 className="font-bold text-sm text-foreground mb-2">{v.name}</h3>
                      <p className="text-xs text-muted-foreground">{v.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-accent/10 text-accent border-0 mb-3">{t("about.leadership.badge")}</Badge>
            <h2 className="text-3xl font-bold font-serif text-foreground">{t("about.leadership.title")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {leadership.map((l, i) => (
              <motion.div key={l.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="text-center p-6 border border-border hover:shadow-lg transition-all" data-testid={`card-leader-${i}`}>
                  <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">{l.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-sm text-foreground">{l.name}</h3>
                  <p className="text-xs text-primary mt-1">{l.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{l.dept}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-0 mb-3">{t("about.accreditations.badge")}</Badge>
            <h2 className="text-3xl font-bold font-serif text-foreground">{t("about.accreditations.title")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {accreditations.map((a, i) => (
              <Card key={a.name} className="text-center p-6 border border-border" data-testid={`card-accreditation-${i}`}>
                <div className="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mx-auto mb-4">
                  <Award size={26} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-sm text-foreground mb-1">{a.name}</h3>
                <p className="text-xs text-muted-foreground">{a.body}</p>
                <p className="text-xs text-primary mt-1">{a.year}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-accent/10 text-accent border-0 mb-3">{t("about.milestones.badge")}</Badge>
            <h2 className="text-3xl font-bold font-serif text-foreground">{t("about.milestones.title")}</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`flex items-center gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`} data-testid={`milestone-${m.year}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <Card className="inline-block border border-border p-4 max-w-xs">
                      <p className="text-sm text-foreground">{m.event}</p>
                    </Card>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 z-10 shadow-lg">
                    <span className="text-white text-xs font-bold">{m.year}</span>
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
