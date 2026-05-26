import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, MapPin, Clock, Briefcase, ChevronRight, Send, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const jobs = [
  { id: 1, title: "Consultant Cardiologist", dept: "Cardiology", type: "Full-Time", location: "Boston, MA", exp: "5+ Years", desc: "Seeking an experienced interventional cardiologist to join our nationally recognized cardiac center. Candidates should be board-certified with a focus on complex coronary interventions." },
  { id: 2, title: "Senior Oncology Nurse", dept: "Oncology", type: "Full-Time", location: "Boston, MA", exp: "3+ Years", desc: "Join our dedicated cancer care team. This role involves supporting patients through chemotherapy and immunotherapy, symptom management, and patient education." },
  { id: 3, title: "Robotic Surgery Coordinator", dept: "Urology", type: "Full-Time", location: "Boston, MA", exp: "2+ Years", desc: "Coordinate scheduling, training, and quality assurance for our da Vinci robotic surgery program." },
  { id: 4, title: "Radiologist — MRI Specialist", dept: "Radiology", type: "Full-Time", location: "Boston, MA", exp: "4+ Years", desc: "Seeking a fellowship-trained radiologist with specialized expertise in MRI neuroimaging and musculoskeletal radiology." },
  { id: 5, title: "Medical Social Worker", dept: "Patient Services", type: "Full-Time", location: "Boston, MA", exp: "2+ Years", desc: "Provide psychosocial support to patients and families, assist with discharge planning, connect patients to community resources." },
  { id: 6, title: "Healthcare Data Analyst", dept: "Administration", type: "Full-Time", location: "Boston, MA", exp: "1+ Years", desc: "Analyze clinical and operational data to support quality improvement initiatives." }
];

const applySchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone required"),
  experience: z.string().min(1, "Experience required"),
  coverLetter: z.string().min(50, "Please write at least 50 characters")
});
type ApplyData = z.infer<typeof applySchema>;

function Breadcrumb() {
  const { t } = useTranslation();
  return (
    <div className="bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">{t("common.home")}</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{t("careers.badge")}</span>
      </div>
    </div>
  );
}

export default function Careers() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("all");
  const [applyJob, setApplyJob] = useState<typeof jobs[0] | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const depts = ["all", ...Array.from(new Set(jobs.map(j => j.dept)))];
  const filtered = jobs.filter(j => {
    const matchesQuery = query === "" || j.title.toLowerCase().includes(query.toLowerCase()) || j.dept.toLowerCase().includes(query.toLowerCase());
    const matchesDept = dept === "all" || j.dept === dept;
    return matchesQuery && matchesDept;
  });

  const form = useForm<ApplyData>({
    resolver: zodResolver(applySchema),
    defaultValues: { name: "", email: "", phone: "", experience: "", coverLetter: "" }
  });

  return (
    <div>
      <Breadcrumb />
      <section className="py-20 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-4">{t("careers.badge")}</Badge>
          <h1 className="text-5xl font-bold font-serif mb-4">{t("careers.title")}</h1>
          <p className="text-white/80 max-w-2xl mx-auto">{t("careers.subtitle")}</p>
        </div>
      </section>

      <section className="py-10 bg-muted/30 border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder={t("careers.searchPlaceholder")} value={query} onChange={e => setQuery(e.target.value)} className="pl-9" data-testid="input-job-search" />
            </div>
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="w-full sm:w-52" data-testid="select-job-dept">
                <SelectValue placeholder={t("careers.allDepartments")} />
              </SelectTrigger>
              <SelectContent>
                {depts.map(d => <SelectItem key={d} value={d}>{d === "all" ? t("careers.allDepartments") : d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-6">{t(filtered.length === 1 ? "careers.positions" : "careers.positionsPlural", { count: filtered.length })}</p>
          <div className="space-y-4">
            {filtered.map((job) => (
              <Card key={job.id} className="border border-border hover:shadow-xl hover:border-primary/30 transition-all" data-testid={`card-job-${job.id}`}>
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">{job.dept}</Badge>
                      <Badge className="bg-primary/10 text-primary border-0 text-xs">{job.type}</Badge>
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-1">{job.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{job.desc}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin size={11} className="text-primary" />{job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase size={11} className="text-primary" />{job.exp} {t("careers.experience")}</span>
                      <span className="flex items-center gap-1"><Clock size={11} className="text-primary" />{job.type}</span>
                    </div>
                  </div>
                  <Button onClick={() => { setApplyJob(job); setSubmitted(false); form.reset(); }} className="bg-primary text-white flex-shrink-0" data-testid={`btn-apply-${job.id}`}>
                    {t("careers.applyNow")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Briefcase size={40} className="text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">{t("careers.noResults")}</p>
              <Button variant="outline" onClick={() => { setQuery(""); setDept("all"); }} className="mt-4">{t("careers.clearFilters")}</Button>
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!applyJob} onOpenChange={() => setApplyJob(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-accent mx-auto mb-5" />
              <h2 className="text-2xl font-bold font-serif text-foreground mb-3">{t("careers.form.successTitle")}</h2>
              <p className="text-muted-foreground mb-2">{t("careers.form.successDesc", { title: applyJob?.title })}</p>
              <p className="text-sm text-muted-foreground mb-6">{t("careers.form.successNote")}</p>
              <Button onClick={() => setApplyJob(null)} className="bg-primary text-white" data-testid="btn-application-done">{t("careers.form.done")}</Button>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <Badge variant="secondary" className="text-xs mb-2">{applyJob?.dept}</Badge>
                <h2 className="text-2xl font-bold font-serif text-foreground">{t("careers.form.title", { title: applyJob?.title })}</h2>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(() => setSubmitted(true))} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("careers.form.fullName")}</FormLabel>
                      <FormControl><Input placeholder={t("careers.form.namePlaceholder")} {...field} data-testid="input-apply-name" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("careers.form.email")}</FormLabel>
                        <FormControl><Input type="email" placeholder={t("careers.form.emailPlaceholder")} {...field} data-testid="input-apply-email" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("careers.form.phone")}</FormLabel>
                        <FormControl><Input placeholder={t("careers.form.phonePlaceholder")} {...field} data-testid="input-apply-phone" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="experience" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("careers.form.yearsExp")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-apply-exp">
                            <SelectValue placeholder={t("careers.form.expPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-1">0–1 years</SelectItem>
                          <SelectItem value="1-3">1–3 years</SelectItem>
                          <SelectItem value="3-5">3–5 years</SelectItem>
                          <SelectItem value="5-10">5–10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="coverLetter" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("careers.form.coverLetter")}</FormLabel>
                      <FormControl><Textarea placeholder={t("careers.form.coverPlaceholder")} rows={4} {...field} data-testid="textarea-apply-cover" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="p-3 rounded-lg border border-dashed border-border bg-muted/30 text-center">
                    <p className="text-sm text-muted-foreground">{t("careers.form.resumeNote")}</p>
                  </div>
                  <Button type="submit" className="w-full bg-primary text-white" data-testid="btn-submit-application">
                    <Send size={16} className="mr-2" /> {t("careers.form.submit")}
                  </Button>
                </form>
              </Form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
