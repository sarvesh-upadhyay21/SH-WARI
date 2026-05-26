import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FlaskConical, BookOpen, GraduationCap, Users, ArrowRight, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const trials = [
  { id: 1, title: "CAR-T Cell Therapy in Relapsed B-Cell Lymphoma", phase: "Phase III", status: "Recruiting", dept: "Oncology", pi: "Dr. Emily Rostova" },
  { id: 2, title: "Minimally Invasive vs. Open Cardiac Surgery Outcomes Study", phase: "Phase II", status: "Active", dept: "Cardiology", pi: "Dr. Sarah Jenkins" },
  { id: 3, title: "Deep Brain Stimulation for Treatment-Resistant Depression", phase: "Phase II", status: "Recruiting", dept: "Neurology", pi: "Dr. Michael Chen" },
  { id: 4, title: "Robotic Partial Nephrectomy Long-Term Renal Function Study", phase: "Phase III", status: "Active", dept: "Urology", pi: "Dr. Robert Foster" }
];

const fellowships = [
  { name: "Interventional Cardiology Fellowship", duration: "2 Years", seats: 4, dept: "Cardiology" },
  { name: "Surgical Oncology Fellowship", duration: "2 Years", seats: 3, dept: "Oncology" },
  { name: "Robotic Surgery Training Program", duration: "1 Year", seats: 6, dept: "Multiple" },
  { name: "Organ Transplant Fellowship", duration: "3 Years", seats: 2, dept: "Surgery" },
  { name: "Neuro-Intensive Care Fellowship", duration: "1 Year", seats: 4, dept: "Neurology" },
  { name: "Pediatric Neonatology Fellowship", duration: "2 Years", seats: 3, dept: "Pediatrics" }
];

const publications = [
  { title: "Long-term Outcomes of Robotic-Assisted Prostatectomy: A 10-Year Analysis", journal: "Journal of Urology", year: 2025, authors: "Foster R. et al." },
  { title: "Novel Immunotherapy Combinations in Triple-Negative Breast Cancer", journal: "Lancet Oncology", year: 2025, authors: "Rostova E. et al." },
  { title: "Stroke Outcomes in a High-Volume Comprehensive Stroke Center: 2020–2025", journal: "NEJM", year: 2024, authors: "Chen M. et al." }
];

function Breadcrumb() {
  const { t } = useTranslation();
  return (
    <div className="bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">{t("common.home")}</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{t("nav.researchAcademics")}</span>
      </div>
    </div>
  );
}

export default function Research() {
  const { t } = useTranslation();
  const statLabels: string[] = t("research.stats", { returnObjects: true }) as string[];
  const statValues = ["47", "124", "380+", "220+"];
  const statIcons = [FlaskConical, BookOpen, GraduationCap, Users];

  return (
    <div>
      <Breadcrumb />
      <section className="py-20 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-4">{t("research.badge")}</Badge>
          <h1 className="text-5xl font-bold font-serif mb-4">{t("research.title")}</h1>
          <p className="text-white/80 max-w-2xl mx-auto">{t("research.subtitle")}</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-5 mb-16">
            {statLabels.map((label, i) => {
              const Icon = statIcons[i];
              return (
                <Card key={label} className="text-center border border-border p-6" data-testid={`research-stat-${i}`}>
                  <CardContent className="p-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><Icon size={22} className="text-primary" /></div>
                    <div className="text-3xl font-bold font-serif text-primary mb-1">{statValues[i]}</div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mb-14">
            <div className="flex items-end justify-between mb-8">
              <div>
                <Badge className="bg-accent/10 text-accent border-0 mb-3">{t("research.trials.badge")}</Badge>
                <h2 className="text-3xl font-bold font-serif text-foreground">{t("research.trials.title")}</h2>
              </div>
            </div>
            <div className="space-y-4">
              {trials.map((trial, i) => (
                <motion.div key={trial.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className="border border-border hover:shadow-lg hover:border-primary/30 transition-all" data-testid={`trial-${trial.id}`}>
                    <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">{trial.phase}</Badge>
                          <Badge className={`text-xs ${trial.status === "Recruiting" ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"} border-0`}>{trial.status}</Badge>
                          <Badge variant="outline" className="text-xs">{trial.dept}</Badge>
                        </div>
                        <h3 className="font-semibold text-foreground">{trial.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">PI: {trial.pi}</p>
                      </div>
                      {trial.status === "Recruiting" && (
                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white flex-shrink-0" data-testid={`btn-trial-enquire-${trial.id}`}>
                          {t("research.trials.enquire")} <ArrowRight size={14} className="ml-1" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-14">
            <div>
              <Badge className="bg-primary/10 text-primary border-0 mb-3">{t("research.fellowships.badge")}</Badge>
              <h2 className="text-3xl font-bold font-serif text-foreground mb-6">{t("research.fellowships.title")}</h2>
              <div className="space-y-3">
                {fellowships.map((f, i) => (
                  <Card key={f.name} className="border border-border hover:shadow-md transition-all" data-testid={`fellowship-${i}`}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm text-foreground">{f.name}</p>
                        <p className="text-xs text-muted-foreground">{f.dept} • {f.duration} • {f.seats} seats</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary text-xs hover:bg-primary/10">{t("research.fellowships.apply")}</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <Badge className="bg-accent/10 text-accent border-0 mb-3">{t("research.publications.badge")}</Badge>
              <h2 className="text-3xl font-bold font-serif text-foreground mb-6">{t("research.publications.title")}</h2>
              <div className="space-y-4">
                {publications.map((pub, i) => (
                  <Card key={i} className="border border-border" data-testid={`publication-${i}`}>
                    <CardContent className="p-5">
                      <p className="font-semibold text-sm text-foreground mb-2">{pub.title}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="text-primary font-medium">{pub.journal}</span>
                        <span>•</span><span>{pub.year}</span>
                        <span>•</span><span>{pub.authors}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
