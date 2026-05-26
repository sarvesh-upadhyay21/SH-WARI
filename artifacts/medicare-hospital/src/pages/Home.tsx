import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Heart, Brain, Bone, Shield, Droplets, Baby, Users, Activity, Cpu, Ribbon,
  Stethoscope, Zap, ChevronLeft, ChevronRight, Star, ArrowRight, Phone,
  Calendar, Search, MapPin, Clock, Award, Globe, Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { blogs } from "@/data/blogs";
import { events } from "@/data/events";
import { faqs } from "@/data/faqs";
import { stats } from "@/data/stats";

const iconMap: Record<string, React.ElementType> = {
  Heart, Brain, Bone, Shield, Droplets, Baby, Users, Activity, Cpu, Ribbon, Stethoscope, Zap
};

function HeroSlider() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const words: string[] = t("home.heroWords", { returnObjects: true }) as string[];
  const subtitles: string[] = t("home.heroSubtitles", { returnObjects: true }) as string[];
  const bgs = ["from-blue-900 via-primary to-blue-800", "from-teal-900 via-emerald-800 to-primary", "from-indigo-900 via-blue-800 to-primary"];

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % words.length), 5000);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className="relative h-[85vh] min-h-[520px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${bgs[current]}`}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4">{t("home.tagline")}</p>
            <h2 className="text-5xl md:text-7xl font-bold font-serif mb-6 text-white relative z-10">
              {words[current]}
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              {subtitles[current]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointment">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 text-base" data-testid="btn-hero-book">
                  <Calendar size={18} className="mr-2" />
                  {t("nav.bookAppointment")}
                </Button>
              </Link>
              <Link href="/doctors">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 bg-transparent px-8 text-base" data-testid="btn-hero-find-doctor">
                  <Search size={18} className="mr-2" />
                  {t("home.findDoctor")}
                </Button>
              </Link>
              <Link href="/departments">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 bg-transparent px-8 text-base hidden md:flex" data-testid="btn-hero-services">
                  <ArrowRight size={18} className="mr-2" />
                  {t("home.exploreServices")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {words.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-accent w-8" : "bg-white/40"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-24 pointer-events-none" />
    </div>
  );
}

function QuickAccess() {
  const { t } = useTranslation();
  const cards = [
    { icon: Calendar, label: t("home.quickAccess.bookAppointment"), desc: t("home.quickAccess.bookDesc"), href: "/appointment", color: "text-primary bg-primary/10" },
    { icon: Phone, label: t("home.quickAccess.emergencyCare"), desc: t("home.quickAccess.emergencyDesc"), href: "/contact", color: "text-red-600 bg-red-50 dark:bg-red-900/20" },
    { icon: Search, label: t("home.quickAccess.findDoctor"), desc: t("home.quickAccess.findDesc"), href: "/doctors", color: "text-accent bg-accent/10" },
    { icon: Shield, label: t("home.quickAccess.patientPortal"), desc: t("home.quickAccess.portalDesc"), href: "/portal", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" }
  ];

  return (
    <section className="py-10 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-16 relative z-10">
          {cards.map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link href={c.href}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-border bg-white dark:bg-slate-800" data-testid={`card-quick-${i}`}>
                  <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center`}>
                      <c.icon size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{c.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <Badge className="bg-accent/10 text-accent border-0 mb-3">{t("home.services.badge")}</Badge>
          <h2 className="text-4xl font-bold font-serif text-foreground mb-4">{t("home.services.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.services.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => {
            const Icon = iconMap[svc.icon] || Heart;
            return (
              <motion.div key={svc.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05 }}>
                <Link href={`/departments/${svc.id}`}>
                  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border border-border overflow-hidden" data-testid={`card-service-${svc.id}`}>
                    <CardContent className="p-5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <h3 className="font-semibold text-sm text-foreground mb-2 group-hover:text-primary transition-colors">{svc.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{svc.description}</p>
                      <div className="mt-3 flex items-center gap-1 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>{t("home.services.learnMore")}</span><ArrowRight size={12} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/departments">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" data-testid="btn-view-all-services">
              {t("home.services.viewAll")} <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CentresOfExcellence() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const centresEn = [
    { name: "Cardiology", desc: "Comprehensive cardiac care including interventional procedures, bypass surgery, and electrophysiology." },
    { name: "Oncology", desc: "Multidisciplinary cancer care with cutting-edge immunotherapy, robotic surgery, and radiation oncology." },
    { name: "Neurology & Neurosurgery", desc: "Comprehensive brain and spine care, stroke management, and advanced neurosurgical procedures." },
    { name: "Orthopedics", desc: "Robotic joint replacement, spine surgery, sports medicine, and complex trauma management." },
    { name: "Organ Transplant", desc: "Liver, kidney, heart, and bone marrow transplant programs with exceptional long-term outcomes." },
    { name: "Robotic Surgery", desc: "Multi-specialty robotic surgical center using the latest da Vinci Xi and ROSA surgical systems." },
    { name: "Emergency Medicine", desc: "Level I Trauma Center with dedicated cardiac, neuro, and pediatric emergency teams — 24/7." }
  ];
  const centresHi = [
    { name: "हृदय रोग विभाग", desc: "इंटरवेंशनल प्रक्रियाओं, बाईपास सर्जरी और इलेक्ट्रोफिजियोलॉजी सहित व्यापक हृदय देखभाल।" },
    { name: "ऑन्कोलॉजी", desc: "अत्याधुनिक इम्यूनोथेरेपी, रोबोटिक सर्जरी और रेडिएशन ऑन्कोलॉजी के साथ बहु-विषयक कैंसर देखभाल।" },
    { name: "न्यूरोलॉजी और न्यूरोसर्जरी", desc: "व्यापक मस्तिष्क और रीढ़ की देखभाल, स्ट्रोक प्रबंधन और उन्नत न्यूरोसर्जिकल प्रक्रियाएं।" },
    { name: "ऑर्थोपेडिक्स", desc: "रोबोटिक जॉइंट रिप्लेसमेंट, स्पाइन सर्जरी, स्पोर्ट्स मेडिसिन और जटिल ट्रॉमा प्रबंधन।" },
    { name: "अंग प्रत्यारोपण", desc: "असाधारण दीर्घकालिक परिणामों के साथ लिवर, किडनी, हृदय और अस्थि मज्जा प्रत्यारोपण।" },
    { name: "रोबोटिक सर्जरी", desc: "नवीनतम da Vinci Xi और ROSA सर्जिकल सिस्टम का उपयोग करने वाला बहु-विशेषज्ञता रोबोटिक सर्जिकल केंद्र।" },
    { name: "आपातकालीन चिकित्सा", desc: "Level I ट्रॉमा सेंटर जिसमें समर्पित कार्डियक, न्यूरो और पीडियाट्रिक आपातकालीन टीमें — 24/7।" }
  ];
  const isHindi = t("lang") === "hi";
  const centres = isHindi ? centresHi : centresEn;
  const visible = 3;

  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <Badge className="bg-accent/20 text-accent border-0 mb-3">{t("home.centres.badge")}</Badge>
            <h2 className="text-4xl font-bold font-serif">{t("home.centres.title")}</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => setCurrent(c => Math.max(0, c - 1))} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Previous"><ChevronLeft size={18} /></button>
            <button onClick={() => setCurrent(c => Math.min(centres.length - visible, c + 1))} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Next"><ChevronRight size={18} /></button>
          </div>
        </div>
        <div className="overflow-hidden">
          <motion.div className="flex gap-5" animate={{ x: `calc(-${current * (100 / visible)}% - ${current * 20 / visible}px)` }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            {centres.map((c, i) => (
              <div key={c.name} className="flex-none w-[calc(33.333%-14px)] min-w-[280px]">
                <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer group h-full" data-testid={`card-centre-${i}`}>
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-4"><Award size={20} className="text-accent" /></div>
                    <h3 className="font-bold text-lg mb-2 text-white">{c.name}</h3>
                    <p className="text-white/70 text-sm">{c.desc}</p>
                    <button className="mt-4 flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                      <span>{t("home.centres.explore")}</span><ArrowRight size={14} />
                    </button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DoctorsSection() {
  const { t } = useTranslation();
  const [dept, setDept] = useState("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const depts = ["all", ...Array.from(new Set(doctors.map(d => d.department)))];
  const filtered = dept === "all" ? doctors.slice(0, 6) : doctors.filter(d => d.department === dept).slice(0, 6);

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <Badge className="bg-primary/10 text-primary border-0 mb-3">{t("home.doctors.badge")}</Badge>
            <h2 className="text-4xl font-bold font-serif text-foreground">{t("home.doctors.title")}</h2>
          </div>
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger className="w-52" data-testid="select-doctor-department">
              <SelectValue placeholder={t("home.doctors.allDepartments")} />
            </SelectTrigger>
            <SelectContent>
              {depts.map(d => <SelectItem key={d} value={d}>{d === "all" ? t("home.doctors.allDepartments") : d}</SelectItem>)}
            </SelectContent>
          </Select>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc, i) => (
            <motion.div key={doc.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-border" data-testid={`card-doctor-${doc.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                        {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{doc.name}</h3>
                      <Badge variant="secondary" className="text-xs mt-1">{doc.department}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{doc.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock size={12} className="text-accent" />{doc.experience}</span>
                    <span className="flex items-center gap-1"><Award size={12} className="text-accent" />{doc.qualifications[0]}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/doctors/${doc.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-white text-xs" data-testid={`btn-doctor-profile-${doc.id}`}>
                        {t("home.doctors.viewProfile")}
                      </Button>
                    </Link>
                    <Link href="/appointment" className="flex-1">
                      <Button size="sm" className="w-full bg-primary text-white text-xs" data-testid={`btn-doctor-book-${doc.id}`}>
                        {t("home.doctors.bookNow")}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/doctors">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" data-testid="btn-view-all-doctors">
              {t("home.doctors.viewAll")} <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const features: { title: string; desc: string }[] = t("home.whyUs.features", { returnObjects: true }) as { title: string; desc: string }[];
  const icons = [Award, Cpu, Heart, Globe];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <Badge className="bg-accent/10 text-accent border-0 mb-3">{t("home.whyUs.badge")}</Badge>
          <h2 className="text-4xl font-bold font-serif text-foreground mb-4">{t("home.whyUs.title")}</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = icons[i] || Award;
            return (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
                <Card className="text-center p-6 h-full border border-border hover:shadow-xl hover:border-primary/30 transition-all group" data-testid={`card-feature-${i}`}>
                  <CardContent className="p-0">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary transition-colors">
                      <Icon size={26} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-3">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); return; }
      setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  const display = count >= 1000000 ? `${(count / 1000000).toFixed(1)}M+` : count >= 1000 ? `${(count / 1000).toFixed(0)}K+` : `${count}+`;

  return (
    <div ref={ref} className="text-center" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="text-4xl md:text-5xl font-bold text-white font-serif mb-2">{display}</div>
      <div className="text-white/70 text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
}

function StatsSection() {
  const { t } = useTranslation();
  const statItems = [
    { value: 12000000, label: t("home.stats.livesTouched") },
    { value: 1500, label: t("home.stats.expertDoctors") },
    { value: 50, label: t("home.stats.specialties") },
    { value: 5000, label: t("home.stats.surgeries") },
    { value: 250, label: t("home.stats.icuBeds") }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-blue-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {statItems.map(s => <StatCounter key={s.label} value={s.value} label={s.label} />)}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <Badge className="bg-primary/10 text-primary border-0 mb-3">{t("home.testimonials.badge")}</Badge>
          <h2 className="text-4xl font-bold font-serif text-foreground">{t("home.testimonials.title")}</h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <Card className="border border-border shadow-lg" data-testid={`card-testimonial-${current}`}>
                <CardContent className="p-10 text-center">
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-lg text-foreground leading-relaxed mb-8 italic">"{testimonials[current].review}"</p>
                  <div className="flex items-center justify-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {testimonials[current].name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-bold text-foreground">{testimonials[current].name}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[current].condition} • {testimonials[current].location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-primary w-8" : "bg-border"}`} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="flex items-end justify-between mb-12">
          <div>
            <Badge className="bg-accent/10 text-accent border-0 mb-3">{t("home.blogs.badge")}</Badge>
            <h2 className="text-4xl font-bold font-serif text-foreground">{t("home.blogs.title")}</h2>
          </div>
          <Button variant="outline" className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-white" data-testid="btn-all-articles">
            {t("home.blogs.allArticles")} <ArrowRight size={16} className="ml-2" />
          </Button>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog, i) => (
            <motion.div key={blog.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer border border-border" data-testid={`card-blog-${blog.id}`}>
                <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                  <div className="text-primary/30 font-serif text-5xl font-bold">{blog.category[0]}</div>
                </div>
                <CardContent className="p-5">
                  <Badge variant="secondary" className="text-xs mb-3">{blog.category}</Badge>
                  <h3 className="font-bold text-sm text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 mb-4">{blog.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{blog.date}</span><span>{blog.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-0 mb-3">{t("home.events.badge")}</Badge>
          <h2 className="text-4xl font-bold font-serif text-foreground">{t("home.events.title")}</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
              <Card className="border border-border hover:shadow-xl transition-all duration-300 h-full" data-testid={`card-event-${event.id}`}>
                <CardContent className="p-6">
                  <Badge className={`text-xs mb-4 ${event.type === "Conference" ? "bg-primary/10 text-primary" : event.type === "Workshop" ? "bg-accent/10 text-accent" : "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"}`}>{event.type}</Badge>
                  <h3 className="font-bold text-foreground mb-3">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  <div className="space-y-2 text-xs text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center gap-2"><Calendar size={12} className="text-primary" />{event.date}</div>
                    <div className="flex items-center gap-2"><MapPin size={12} className="text-primary" />{event.location}</div>
                  </div>
                  <Button size="sm" className={`mt-4 w-full text-xs ${event.registrationOpen ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`} disabled={!event.registrationOpen} data-testid={`btn-event-register-${event.id}`}>
                    {event.registrationOpen ? t("home.events.register") : t("home.events.closed")}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InternationalSection() {
  const { t } = useTranslation();
  const serviceLabels: string[] = t("home.international.services", { returnObjects: true }) as string[];
  const serviceDescs: string[] = t("home.international.serviceDescs", { returnObjects: true }) as string[];
  const icons = [Globe, Smartphone, Users, MapPin];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-accent/10 text-accent border-0 mb-4">{t("home.international.badge")}</Badge>
            <h2 className="text-4xl font-bold font-serif text-foreground mb-5">{t("home.international.title")}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">{t("home.international.desc")}</p>
            <Link href="/international">
              <Button className="bg-primary text-white" data-testid="btn-international-learn-more">
                {t("home.international.learnMore")} <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {serviceLabels.map((label, i) => {
              const Icon = icons[i] || Globe;
              return (
                <Card key={label} className="border border-border p-5 hover:shadow-lg transition-all" data-testid={`card-intl-${i}`}>
                  <CardContent className="p-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground mb-1.5">{label}</h3>
                    <p className="text-xs text-muted-foreground">{serviceDescs[i]}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function InsuranceCarousel() {
  const { t } = useTranslation();
  const partners = ["Aetna", "Blue Cross Blue Shield", "Cigna", "United Healthcare", "Humana", "Kaiser Permanente", "MetLife", "Anthem", "Centene", "Molina Healthcare", "WellCare", "Magellan"];

  return (
    <section className="py-16 border-y border-border overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">{t("home.insurance.label")}</p>
      </div>
      <div className="flex gap-12 animate-[scroll_25s_linear_infinite] whitespace-nowrap">
        {[...partners, ...partners].map((p, i) => (
          <span key={i} className="text-muted-foreground font-semibold text-sm flex-none px-2">{p}</span>
        ))}
      </div>
    </section>
  );
}

function MobileAppSection() {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-lg">
            <Badge className="bg-accent/20 text-accent border-0 mb-4">{t("home.app.badge")}</Badge>
            <h2 className="text-4xl font-bold font-serif mb-5">{t("home.app.title")}</h2>
            <p className="text-white/75 mb-8 leading-relaxed">{t("home.app.desc")}</p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-primary hover:bg-white/90" data-testid="btn-app-store">
                <Smartphone size={18} className="mr-2" />{t("home.app.appStore")}
              </Button>
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent" data-testid="btn-play-store">
                <Smartphone size={18} className="mr-2" />{t("home.app.playStore")}
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            {[["Book Appts", "Find Doctors", "My Records"], ["Lab Results", "Prescriptions", "Video Consult"]].map((col, ci) => (
              <div key={ci} className={`w-36 bg-white/10 rounded-2xl p-4 space-y-3 ${ci === 1 ? "mt-8" : ""}`}>
                {col.map(item => (
                  <div key={item} className="bg-white/10 rounded-lg px-3 py-2">
                    <p className="text-white/80 text-xs font-medium">{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-0 mb-3">{t("home.faq.badge")}</Badge>
          <h2 className="text-4xl font-bold font-serif text-foreground">{t("home.faq.title")}</h2>
        </motion.div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-5 bg-white dark:bg-slate-800" data-testid={`faq-item-${i}`}>
              <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline py-5">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-5">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function ContactPreview() {
  const { t } = useTranslation();
  const items = [
    { icon: MapPin, label: t("home.contact.address"), value: "One MediCare Plaza, Excellence Boulevard, Boston, MA 02115" },
    { icon: Phone, label: t("home.contact.tollFree"), value: "1-800-221-166 / 1-800-890-1111" },
    { icon: Phone, label: t("home.contact.emergency"), value: "022-MEDIEMG (24/7)" },
    { icon: Clock, label: t("home.contact.opdHours"), value: "Mon–Sat: 8:00 AM – 8:00 PM | Sun: 9:00 AM – 2:00 PM" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Badge className="bg-accent/10 text-accent border-0 mb-4">{t("home.contact.badge")}</Badge>
            <h2 className="text-4xl font-bold font-serif text-foreground mb-6">{t("home.contact.title")}</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/contact">
              <Button className="mt-8 bg-primary text-white" data-testid="btn-contact-us">
                {t("home.contact.contactUs")} <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center h-80 border border-border">
            <div className="text-center">
              <MapPin size={48} className="text-primary/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">One MediCare Plaza, Boston MA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <QuickAccess />
      <ServicesSection />
      <CentresOfExcellence />
      <DoctorsSection />
      <WhyChooseUs />
      <StatsSection />
      <Testimonials />
      <BlogSection />
      <EventsSection />
      <InternationalSection />
      <InsuranceCarousel />
      <MobileAppSection />
      <FAQSection />
      <ContactPreview />
    </main>
  );
}
