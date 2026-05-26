import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, FileText, Pill, TestTube, Receipt, Shield, LogOut, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Password required")
});
type LoginData = z.infer<typeof loginSchema>;

const mockData = {
  appointments: [
    { id: "A001", doctor: "Dr. Sarah Jenkins", dept: "Cardiology", date: "June 15, 2026", time: "10:00 AM", status: "Upcoming" },
    { id: "A002", doctor: "Dr. Michael Chen", dept: "Neurology", date: "May 8, 2026", time: "02:30 PM", status: "Completed" },
    { id: "A003", doctor: "Dr. David Alistair", dept: "Orthopedics", date: "April 20, 2026", time: "11:00 AM", status: "Completed" }
  ],
  records: [
    { id: "R001", type: "Discharge Summary", date: "May 8, 2026", doctor: "Dr. Michael Chen" },
    { id: "R002", type: "ECG Report", date: "April 5, 2026", doctor: "Dr. Sarah Jenkins" },
    { id: "R003", type: "MRI Brain — Report", date: "April 20, 2026", doctor: "Dr. Michael Chen" }
  ],
  prescriptions: [
    { id: "P001", medicine: "Atorvastatin 40mg", dose: "Once daily at night", duration: "3 months", doctor: "Dr. Jenkins" },
    { id: "P002", medicine: "Aspirin 81mg", dose: "Once daily with food", duration: "Ongoing", doctor: "Dr. Jenkins" }
  ],
  reports: [
    { id: "T001", test: "Complete Blood Count", date: "May 5, 2026", status: "Normal" },
    { id: "T002", test: "Lipid Profile", date: "May 5, 2026", status: "Borderline" },
    { id: "T003", test: "Blood Glucose Fasting", date: "April 18, 2026", status: "Normal" }
  ],
  bills: [
    { id: "B001", desc: "OPD Consultation", date: "May 8, 2026", amount: "$150", status: "Paid" },
    { id: "B002", desc: "Lab Tests", date: "May 5, 2026", amount: "$320", status: "Paid" }
  ]
};

function StatusBadge({ status }: { status: string }) {
  const color = ["Upcoming", "Normal", "Paid"].some(s => status === s)
    ? status === "Upcoming" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    : status === "Borderline" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
    : "bg-muted text-muted-foreground";
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>{status}</span>;
}

export default function Portal() {
  const { t } = useTranslation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState("appointments");
  const [userName, setUserName] = useState("");

  const form = useForm<LoginData>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });
  const handleLogin = (data: LoginData) => { setUserName(data.email.split("@")[0]); setLoggedIn(true); };

  const sidebarItems = [
    { id: "appointments", label: t("portal.nav.appointments"), icon: Calendar },
    { id: "records", label: t("portal.nav.records"), icon: FileText },
    { id: "prescriptions", label: t("portal.nav.prescriptions"), icon: Pill },
    { id: "reports", label: t("portal.nav.reports"), icon: TestTube },
    { id: "bills", label: t("portal.nav.bills"), icon: Receipt },
    { id: "insurance", label: t("portal.nav.insurance"), icon: Shield }
  ];

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="border border-border shadow-2xl">
            <CardContent className="p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4"><User size={28} className="text-white" /></div>
                <h1 className="text-2xl font-bold font-serif text-foreground">{t("portal.title")}</h1>
                <p className="text-muted-foreground text-sm mt-2">{t("portal.subtitle")}</p>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("portal.email")}</FormLabel>
                      <FormControl><Input type="email" placeholder={t("portal.emailPlaceholder")} {...field} data-testid="input-portal-email" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("portal.password")}</FormLabel>
                      <FormControl><Input type="password" placeholder="••••••••" {...field} data-testid="input-portal-password" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full bg-primary text-white" data-testid="btn-portal-login">{t("portal.signIn")}</Button>
                </form>
              </Form>
              <p className="text-center text-xs text-muted-foreground mt-6">{t("portal.demoNote")}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-primary text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm">{t("portal.welcomeBack")}</p>
            <h1 className="text-xl font-bold font-serif capitalize">{userName}</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => setLoggedIn(false)} className="border-white/30 text-white hover:bg-white/10 bg-transparent" data-testid="btn-portal-logout">
            <LogOut size={14} className="mr-2" /> {t("portal.signOut")}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: t("portal.stats.upcomingVisits"), value: "1", icon: Calendar, color: "text-blue-600" },
            { label: t("portal.stats.activePrescriptions"), value: "2", icon: Pill, color: "text-green-600" },
            { label: t("portal.stats.pendingReports"), value: "0", icon: TestTube, color: "text-purple-600" },
            { label: t("portal.stats.outstandingBills"), value: "$0", icon: Receipt, color: "text-amber-600" }
          ].map(stat => (
            <Card key={stat.label} className="border border-border" data-testid={`portal-stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="p-5 flex items-center gap-3">
                <stat.icon size={24} className={stat.color} />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-56 flex-shrink-0">
            <Card className="border border-border">
              <CardContent className="p-2">
                {sidebarItems.map(item => (
                  <button key={item.id} onClick={() => setActive(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active === item.id ? "bg-primary text-white" : "text-foreground hover:bg-muted"}`} data-testid={`portal-nav-${item.id}`}>
                    <item.icon size={16} />{item.label}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <Card className="border border-border">
              <CardContent className="p-6">
                {active === "appointments" && (
                  <div>
                    <h2 className="text-xl font-bold font-serif text-foreground mb-5">{t("portal.nav.appointments")}</h2>
                    <div className="space-y-3">
                      {mockData.appointments.map(apt => (
                        <div key={apt.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors" data-testid={`appointment-row-${apt.id}`}>
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><Calendar size={16} className="text-primary" /></div>
                            <div>
                              <p className="font-semibold text-sm text-foreground">{apt.doctor}</p>
                              <p className="text-xs text-muted-foreground">{apt.dept} • {apt.date} at {apt.time}</p>
                            </div>
                          </div>
                          <StatusBadge status={apt.status} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {active === "records" && (
                  <div>
                    <h2 className="text-xl font-bold font-serif text-foreground mb-5">{t("portal.nav.records")}</h2>
                    <div className="space-y-3">
                      {mockData.records.map(rec => (
                        <div key={rec.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors" data-testid={`record-row-${rec.id}`}>
                          <div className="flex items-center gap-4">
                            <FileText size={20} className="text-primary flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-sm text-foreground">{rec.type}</p>
                              <p className="text-xs text-muted-foreground">{rec.date} by {rec.doctor}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="text-xs border-primary text-primary hover:bg-primary hover:text-white">{t("portal.download")}</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {active === "prescriptions" && (
                  <div>
                    <h2 className="text-xl font-bold font-serif text-foreground mb-5">{t("portal.nav.prescriptions")}</h2>
                    <div className="space-y-3">
                      {mockData.prescriptions.map(rx => (
                        <div key={rx.id} className="p-4 rounded-xl border border-border bg-green-50/50 dark:bg-green-900/10" data-testid={`prescription-row-${rx.id}`}>
                          <div className="flex items-start gap-3">
                            <Pill size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-sm text-foreground">{rx.medicine}</p>
                              <p className="text-xs text-muted-foreground">{rx.dose}</p>
                              <p className="text-xs text-muted-foreground">Duration: {rx.duration} | Prescribed by: {rx.doctor}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {active === "reports" && (
                  <div>
                    <h2 className="text-xl font-bold font-serif text-foreground mb-5">{t("portal.nav.reports")}</h2>
                    <div className="space-y-3">
                      {mockData.reports.map(rep => (
                        <div key={rep.id} className="flex items-center justify-between p-4 rounded-xl border border-border" data-testid={`report-row-${rep.id}`}>
                          <div className="flex items-center gap-4">
                            <TestTube size={18} className="text-purple-600 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-sm text-foreground">{rep.test}</p>
                              <p className="text-xs text-muted-foreground">{rep.date}</p>
                            </div>
                          </div>
                          <StatusBadge status={rep.status} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {active === "bills" && (
                  <div>
                    <h2 className="text-xl font-bold font-serif text-foreground mb-5">{t("portal.nav.bills")}</h2>
                    <div className="space-y-3">
                      {mockData.bills.map(bill => (
                        <div key={bill.id} className="flex items-center justify-between p-4 rounded-xl border border-border" data-testid={`bill-row-${bill.id}`}>
                          <div className="flex items-center gap-4">
                            <Receipt size={18} className="text-amber-600 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-sm text-foreground">{bill.desc}</p>
                              <p className="text-xs text-muted-foreground">{bill.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-foreground">{bill.amount}</span>
                            <StatusBadge status={bill.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {active === "insurance" && (
                  <div>
                    <h2 className="text-xl font-bold font-serif text-foreground mb-5">{t("portal.nav.insurance")}</h2>
                    <div className="p-6 rounded-xl border border-border text-center">
                      <Shield size={40} className="text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground">{t("portal.noInsurance")}</p>
                      <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary hover:text-white" data-testid="btn-add-insurance">{t("portal.addInsurance")}</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
