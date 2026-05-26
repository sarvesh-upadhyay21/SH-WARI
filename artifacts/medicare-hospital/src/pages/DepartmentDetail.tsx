import { Link, useParams } from "wouter";
import { useTranslation } from "react-i18next";
import { Heart, Brain, Bone, Shield, Droplets, Baby, Sun, Stethoscope, Wind, ChevronRight, CheckCircle, Cpu, Calendar, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";

const iconMap: Record<string, React.ElementType> = {
  Heart, Brain, Bone, Shield, Droplets, Baby, Sun, Stethoscope, Wind,
  Ribbon: Heart, Ear: Shield, Zap: ChevronRight
};

function Breadcrumb({ name }: { name: string }) {
  const { t } = useTranslation();
  return (
    <div className="bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">{t("common.home")}</Link>
        <ChevronRight size={14} />
        <Link href="/departments" className="hover:text-primary transition-colors">{t("departments.badge")}</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{name}</span>
      </div>
    </div>
  );
}

export default function DepartmentDetail() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const dept = departments.find(d => d.id === slug);

  if (!dept) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
        <p className="text-muted-foreground">{t("common.notFound")}</p>
        <Link href="/departments"><Button variant="outline">{t("common.back")}</Button></Link>
      </div>
    );
  }

  const Icon = iconMap[dept.icon] || Heart;
  const deptDoctors = doctors.filter(d => d.department === dept.name);

  return (
    <div>
      <Breadcrumb name={dept.name} />

      <section className="py-16 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Icon size={36} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-serif mb-2">{dept.name}</h1>
              <p className="text-white/80 max-w-2xl">{dept.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold font-serif text-foreground mb-5 flex items-center gap-2">
                  <CheckCircle size={20} className="text-accent" /> {t("departments.treatments")}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {dept.treatments.map((t_) => (
                    <div key={t_} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/30" data-testid={`treatment-${t_.toLowerCase().replace(/\s+/g, "-")}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">{t_}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-serif text-foreground mb-5 flex items-center gap-2">
                  <Stethoscope size={20} className="text-primary" /> {t("departments.procedures")}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {dept.procedures.map((p) => (
                    <div key={p} className="flex items-center gap-2 p-3 rounded-lg border border-border" data-testid={`procedure-${p.toLowerCase().replace(/\s+/g, "-")}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-serif text-foreground mb-5 flex items-center gap-2">
                  <Cpu size={20} className="text-indigo-500" /> {t("departments.technology")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {dept.technology.map((tech) => (
                    <Badge key={tech} variant="outline" className="border-primary/30 text-primary text-xs px-3 py-1">{tech}</Badge>
                  ))}
                </div>
              </div>

              {dept.faqs && dept.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold font-serif text-foreground mb-5">{t("departments.faq")}</h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {dept.faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-5 bg-muted/20" data-testid={`dept-faq-${i}`}>
                        <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground pb-4">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {deptDoctors.length > 0 && (
                <Card className="border border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold font-serif text-foreground mb-5">{t("departments.specialists")}</h3>
                    <div className="space-y-4">
                      {deptDoctors.map(doc => (
                        <Link key={doc.id} href={`/doctors/${doc.id}`}>
                          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer" data-testid={`dept-doctor-${doc.id}`}>
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                                {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm text-foreground">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border border-border bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-2">{t("departments.bookAppointment")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("departments.bookDesc")}</p>
                  <Link href="/appointment">
                    <Button className="w-full bg-primary text-white mb-3" data-testid="btn-dept-book">
                      <Calendar size={16} className="mr-2" /> {t("departments.bookAppointment")}
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" data-testid="btn-dept-emergency">
                      <Phone size={16} className="mr-2" /> {t("departments.emergency")}
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground text-center mt-3">{t("departments.emergencyDesc")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
