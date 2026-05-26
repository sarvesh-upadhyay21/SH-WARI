import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronRight, ChevronLeft, CheckCircle, User, Building2, UserCheck, CalendarDays, ClipboardCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";

const timeSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"];

const patientSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Please select gender"),
  message: z.string().optional()
});

type PatientFormData = z.infer<typeof patientSchema>;

function Breadcrumb() {
  const { t } = useTranslation();
  return (
    <div className="bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">{t("common.home")}</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{t("nav.bookAppointment")}</span>
      </div>
    </div>
  );
}

export default function Appointment() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientData, setPatientData] = useState<PatientFormData | null>(null);
  const [success, setSuccess] = useState(false);

  const stepLabels: string[] = t("appointment.steps", { returnObjects: true }) as string[];
  const stepIcons = [User, Building2, UserCheck, CalendarDays, ClipboardCheck];

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: { fullName: "", phone: "", email: "", age: "", gender: "", message: "" }
  });

  const filteredDoctors = selectedDept
    ? doctors.filter(d => d.department === departments.find(dep => dep.id === selectedDept)?.name)
    : doctors;

  const handlePatientSubmit = (data: PatientFormData) => { setPatientData(data); setStep(1); };
  const handleConfirm = () => setSuccess(true);
  const selectedDeptObj = departments.find(d => d.id === selectedDept);
  const selectedDoctorObj = doctors.find(d => d.id === selectedDoctor);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <Breadcrumb />
      <section className="py-12 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-3">{t("appointment.badge")}</Badge>
          <h1 className="text-4xl font-bold font-serif">{t("appointment.title")}</h1>
          <p className="text-white/80 mt-3">{t("appointment.subtitle")}</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10 relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border z-0" />
            {stepLabels.map((label, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={label} className="flex flex-col items-center gap-2 relative z-10" data-testid={`step-indicator-${i}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${i < step ? "bg-accent border-accent text-white" : i === step ? "bg-primary border-primary text-white" : "bg-white dark:bg-slate-900 border-border text-muted-foreground"}`}>
                    {i < step ? <CheckCircle size={18} /> : <Icon size={16} />}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-primary" : i < step ? "text-accent" : "text-muted-foreground"}`}>{label}</span>
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              {step === 0 && (
                <Card className="border border-border">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold font-serif text-foreground mb-6">{t("appointment.patientInfo.title")}</h2>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handlePatientSubmit)} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("appointment.patientInfo.fullName")}</FormLabel>
                              <FormControl><Input placeholder={t("appointment.patientInfo.fullNamePlaceholder")} {...field} data-testid="input-patient-name" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("appointment.patientInfo.phone")}</FormLabel>
                              <FormControl><Input placeholder={t("appointment.patientInfo.phonePlaceholder")} {...field} data-testid="input-patient-phone" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("appointment.patientInfo.email")}</FormLabel>
                            <FormControl><Input type="email" placeholder={t("appointment.patientInfo.emailPlaceholder")} {...field} data-testid="input-patient-email" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FormField control={form.control} name="age" render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("appointment.patientInfo.age")}</FormLabel>
                              <FormControl><Input type="number" placeholder="35" {...field} data-testid="input-patient-age" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="gender" render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("appointment.patientInfo.gender")}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-patient-gender">
                                    <SelectValue placeholder={t("appointment.patientInfo.genderPlaceholder")} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="male">{t("appointment.patientInfo.male")}</SelectItem>
                                  <SelectItem value="female">{t("appointment.patientInfo.female")}</SelectItem>
                                  <SelectItem value="other">{t("appointment.patientInfo.other")}</SelectItem>
                                  <SelectItem value="prefer-not">{t("appointment.patientInfo.preferNot")}</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>
                        <FormField control={form.control} name="message" render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("appointment.patientInfo.message")}</FormLabel>
                            <FormControl><Textarea placeholder={t("appointment.patientInfo.messagePlaceholder")} rows={3} {...field} data-testid="textarea-patient-message" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <Button type="submit" className="w-full bg-primary text-white" data-testid="btn-step-next-0">
                          {t("appointment.patientInfo.continue")} <ChevronRight size={16} className="ml-2" />
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}

              {step === 1 && (
                <Card className="border border-border">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold font-serif text-foreground mb-6">{t("appointment.selectDept.title")}</h2>
                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      {departments.map(dept => (
                        <button key={dept.id} onClick={() => setSelectedDept(dept.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${selectedDept === dept.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`} data-testid={`btn-dept-select-${dept.id}`}>
                          <p className="font-semibold text-sm text-foreground">{dept.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{dept.description}</p>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(0)} className="flex-1" data-testid="btn-step-back-1"><ChevronLeft size={16} className="mr-2" />{t("appointment.selectDept.back")}</Button>
                      <Button onClick={() => setStep(2)} disabled={!selectedDept} className="flex-1 bg-primary text-white" data-testid="btn-step-next-1">{t("appointment.selectDept.continue")} <ChevronRight size={16} className="ml-2" /></Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card className="border border-border">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold font-serif text-foreground mb-6">{t("appointment.selectDoctor.title")}</h2>
                    <div className="space-y-3 mb-6">
                      {(filteredDoctors.length > 0 ? filteredDoctors : doctors).map(doc => (
                        <button key={doc.id} onClick={() => setSelectedDoctor(doc.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${selectedDoctor === doc.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`} data-testid={`btn-doctor-select-${doc.id}`}>
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                            {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-foreground">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.specialty} • {doc.experience}</p>
                          </div>
                          {selectedDoctor === doc.id && <CheckCircle size={18} className="text-primary flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1" data-testid="btn-step-back-2"><ChevronLeft size={16} className="mr-2" />{t("appointment.selectDoctor.back")}</Button>
                      <Button onClick={() => setStep(3)} disabled={!selectedDoctor} className="flex-1 bg-primary text-white" data-testid="btn-step-next-2">{t("appointment.selectDoctor.continue")} <ChevronRight size={16} className="ml-2" /></Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card className="border border-border">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold font-serif text-foreground mb-6">{t("appointment.dateTime.title")}</h2>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-foreground mb-2">{t("appointment.dateTime.preferredDate")}</label>
                      <Input type="date" min={today} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="max-w-xs" data-testid="input-appointment-date" />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-foreground mb-3">{t("appointment.dateTime.preferredTime")}</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map(slot => (
                          <button key={slot} onClick={() => setSelectedTime(slot)} className={`py-2 px-3 rounded-lg text-sm border-2 transition-all ${selectedTime === slot ? "border-primary bg-primary text-white" : "border-border hover:border-primary/40 text-foreground"}`} data-testid={`btn-time-${slot.replace(/\s+/g, "-")}`}>{slot}</button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1" data-testid="btn-step-back-3"><ChevronLeft size={16} className="mr-2" />{t("appointment.dateTime.back")}</Button>
                      <Button onClick={() => setStep(4)} disabled={!selectedDate || !selectedTime} className="flex-1 bg-primary text-white" data-testid="btn-step-next-3">{t("appointment.dateTime.review")} <ChevronRight size={16} className="ml-2" /></Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 4 && (
                <Card className="border border-border">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold font-serif text-foreground mb-6">{t("appointment.confirm.title")}</h2>
                    <div className="space-y-4 mb-8">
                      {[
                        { label: t("appointment.confirm.patientName"), value: patientData?.fullName },
                        { label: t("appointment.confirm.phone"), value: patientData?.phone },
                        { label: t("appointment.confirm.email"), value: patientData?.email },
                        { label: t("appointment.confirm.department"), value: selectedDeptObj?.name },
                        { label: t("appointment.confirm.doctor"), value: selectedDoctorObj?.name },
                        { label: t("appointment.confirm.date"), value: selectedDate },
                        { label: t("appointment.confirm.time"), value: selectedTime }
                      ].map(item => (
                        <div key={item.label} className="flex items-start justify-between py-2 border-b border-border last:border-0">
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <span className="text-sm font-semibold text-foreground text-right">{item.value || "—"}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(3)} className="flex-1" data-testid="btn-step-back-4"><ChevronLeft size={16} className="mr-2" />{t("appointment.confirm.back")}</Button>
                      <Button onClick={handleConfirm} className="flex-1 bg-accent hover:bg-accent/90 text-white" data-testid="btn-confirm-appointment">
                        <CheckCircle size={16} className="mr-2" /> {t("appointment.confirm.confirmBtn")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="max-w-md text-center p-10">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-accent" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-foreground mb-3">{t("appointment.success.title")}</h2>
          <p className="text-muted-foreground mb-2">{t("appointment.success.desc", { doctor: selectedDoctorObj?.name })}</p>
          <p className="text-sm text-muted-foreground mb-6">{selectedDate} {t("appointment.success.emailNote", { date: "", time: selectedTime, email: patientData?.email })}</p>
          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full" data-testid="btn-success-home">{t("appointment.success.backHome")}</Button>
            </Link>
            <Button onClick={() => { setSuccess(false); setStep(0); }} className="flex-1 bg-primary text-white" data-testid="btn-success-new">{t("appointment.success.newAppointment")}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
