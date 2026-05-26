import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Search, Clock, Award, ChevronRight, BookOpen, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { doctors } from "@/data/doctors";

function Breadcrumb() {
  const { t } = useTranslation();
  return (
    <div className="bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">{t("common.home")}</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{t("doctors.badge")}</span>
      </div>
    </div>
  );
}

export default function Doctors() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("all");
  const [exp, setExp] = useState("all");

  const depts = ["all", ...Array.from(new Set(doctors.map(d => d.department)))];
  const filtered = doctors.filter(doc => {
    const matchesQuery = query === "" || doc.name.toLowerCase().includes(query.toLowerCase()) || doc.specialty.toLowerCase().includes(query.toLowerCase());
    const matchesDept = dept === "all" || doc.department === dept;
    const matchesExp = exp === "all" ||
      (exp === "10+" && parseInt(doc.experience) >= 10) ||
      (exp === "15+" && parseInt(doc.experience) >= 15) ||
      (exp === "20+" && parseInt(doc.experience) >= 20);
    return matchesQuery && matchesDept && matchesExp;
  });

  return (
    <div>
      <Breadcrumb />
      <section className="py-16 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-4">{t("doctors.badge")}</Badge>
          <h1 className="text-5xl font-bold font-serif mb-4">{t("doctors.title")}</h1>
          <p className="text-white/80 max-w-xl mx-auto">{t("doctors.subtitle")}</p>
        </div>
      </section>

      <section className="py-10 bg-muted/30 border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder={t("doctors.searchPlaceholder")} value={query} onChange={e => setQuery(e.target.value)} className="pl-9" data-testid="input-doctor-search" />
            </div>
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-doctor-dept">
                <SelectValue placeholder={t("doctors.allDepartments")} />
              </SelectTrigger>
              <SelectContent>
                {depts.map(d => <SelectItem key={d} value={d}>{d === "all" ? t("doctors.allDepartments") : d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={exp} onValueChange={setExp}>
              <SelectTrigger className="w-full md:w-44" data-testid="select-doctor-exp">
                <SelectValue placeholder={t("doctors.anyExperience")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("doctors.anyExperience")}</SelectItem>
                <SelectItem value="10+">10+ {t("doctors.experience")}</SelectItem>
                <SelectItem value="15+">15+ {t("doctors.experience")}</SelectItem>
                <SelectItem value="20+">20+ {t("doctors.experience")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-8">{t(filtered.length === 1 ? "doctors.showing" : "doctors.showingPlural", { count: filtered.length })}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((doc, i) => (
              <motion.div key={doc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-border h-full" data-testid={`card-doctor-${doc.id}`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="w-20 h-20 border-2 border-primary/20 mb-4">
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                          {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{doc.name}</h3>
                      <Badge variant="secondary" className="text-xs mt-2">{doc.department}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{doc.specialty}</p>
                    </div>
                    <div className="flex justify-center gap-6 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Clock size={11} className="text-accent" />{doc.experience}</span>
                      <span className="flex items-center gap-1"><Award size={11} className="text-accent" />{doc.qualifications[0]}</span>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Link href={`/doctors/${doc.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-white text-xs" data-testid={`btn-doctor-view-${doc.id}`}>
                          <BookOpen size={12} className="mr-1" /> {t("doctors.viewProfile")}
                        </Button>
                      </Link>
                      <Link href="/appointment" className="flex-1">
                        <Button size="sm" className="w-full bg-primary text-white text-xs" data-testid={`btn-doctor-book-${doc.id}`}>
                          <Calendar size={12} className="mr-1" /> {t("doctors.book")}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Search size={40} className="text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">{t("doctors.noResults")}</p>
              <Button variant="outline" onClick={() => { setQuery(""); setDept("all"); setExp("all"); }} className="mt-4">{t("doctors.clearFilters")}</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
