import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronRight, Clock, Award, MapPin, GraduationCap, Calendar, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { doctors } from "@/data/doctors";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeSlots = ["9:00–10:00 AM", "10:00–11:00 AM", "11:00 AM–12:00 PM", "2:00–3:00 PM", "3:00–4:00 PM", "4:00–5:00 PM"];

function Breadcrumb({ name }: { name: string }) {
  const { t } = useTranslation();
  return (
    <div className="bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">{t("common.home")}</Link>
        <ChevronRight size={14} />
        <Link href="/doctors" className="hover:text-primary transition-colors">{t("doctors.badge")}</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{name}</span>
      </div>
    </div>
  );
}

export default function DoctorDetail() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const doctor = doctors.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">{t("common.notFound")}</p>
        <Link href="/doctors"><Button variant="outline">{t("common.back")}</Button></Link>
      </div>
    );
  }

  const availability: Record<string, string | null> = {};
  weekdays.forEach((day, i) => {
    availability[day] = i === 2 || i === 5 ? null : timeSlots[i % timeSlots.length];
  });

  return (
    <div>
      <Breadcrumb name={doctor.name} />

      <section className="py-16 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <Avatar className="w-28 h-28 border-4 border-white/30 flex-shrink-0">
              <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                {doctor.name.split(" ").slice(1).map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-4xl font-bold font-serif mb-2">{doctor.name}</h1>
              <p className="text-white/80 text-lg mb-3">{doctor.specialty}</p>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge className="bg-white/20 text-white border-0">{doctor.department}</Badge>
                {doctor.qualifications.map(q => <Badge key={q} className="bg-white/10 text-white border-0 text-xs">{q}</Badge>)}
              </div>
              <div className="flex flex-wrap gap-6 text-white/70 text-sm">
                <span className="flex items-center gap-1.5"><Clock size={14} />{doctor.experience}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} />{doctor.hospital}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/appointment">
                <Button className="bg-accent hover:bg-accent/90 text-white" data-testid="btn-doctor-detail-book">
                  <Calendar size={16} className="mr-2" /> {t("doctors.bookThisDoctor")}
                </Button>
              </Link>
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent" data-testid="btn-doctor-emergency">
                <Phone size={16} className="mr-2" /> {t("common.emergency")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border border-border">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold font-serif text-foreground mb-5 flex items-center gap-2">
                      <div className="w-1 h-7 bg-primary rounded-full" />{t("doctors.biography")}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border border-border">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold font-serif text-foreground mb-5 flex items-center gap-2">
                      <div className="w-1 h-7 bg-accent rounded-full" />{t("doctors.education")}
                    </h2>
                    <div className="space-y-4">
                      {doctor.education.map((edu, i) => (
                        <div key={i} className="flex items-start gap-4" data-testid={`education-item-${i}`}>
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <GraduationCap size={18} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                            <p className="text-xs text-primary">{edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {doctor.awards && doctor.awards.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="border border-border">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold font-serif text-foreground mb-5 flex items-center gap-2">
                        <div className="w-1 h-7 bg-amber-400 rounded-full" />{t("doctors.awards")}
                      </h2>
                      <div className="space-y-3">
                        {doctor.awards.map((award, i) => (
                          <div key={i} className="flex items-center gap-3" data-testid={`award-item-${i}`}>
                            <Award size={16} className="text-amber-500 flex-shrink-0" />
                            <span className="text-sm text-foreground">{award}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <Card className="border border-border">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold font-serif text-foreground mb-4">{t("doctors.schedule")}</h2>
                  <div className="space-y-2">
                    {weekdays.map(day => (
                      <div key={day} className="flex items-center justify-between py-2 border-b border-border last:border-0" data-testid={`schedule-${day}`}>
                        <span className="text-sm font-medium text-foreground w-10">{day}</span>
                        <span className={`text-xs ${availability[day] ? "text-accent" : "text-muted-foreground"}`}>
                          {availability[day] ?? t("doctors.notAvailable")}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link href="/appointment" className="block mt-5">
                    <Button className="w-full bg-primary text-white" data-testid="btn-schedule-book">{t("doctors.bookThisDoctor")}</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border border-border bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-2">{t("doctors.urgentConsult")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("doctors.urgentDesc")}</p>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white" data-testid="btn-teleconsult">
                    {t("doctors.teleconsultNow")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
