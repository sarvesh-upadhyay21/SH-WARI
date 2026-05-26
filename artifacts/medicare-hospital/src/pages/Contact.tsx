import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, ChevronRight, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone required"),
  department: z.string().min(1, "Select a department"),
  message: z.string().min(10, "Please describe your query")
});
type FormData = z.infer<typeof schema>;

function Breadcrumb() {
  const { t } = useTranslation();
  return (
    <div className="bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">{t("common.home")}</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{t("nav.contactUs")}</span>
      </div>
    </div>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", department: "", message: "" }
  });

  const contactInfoItems = [
    { icon: MapPin, label: t("contact.address"), value: "One MediCare Plaza, Excellence Boulevard, Boston, MA 02115" },
    { icon: Phone, label: t("contact.tollFree"), value: "1-800-221-166\n1-800-890-1111" },
    { icon: Phone, label: t("contact.emergencyLabel"), value: "022-MEDIEMG", red: true },
    { icon: Mail, label: t("contact.emailLabel"), value: "info@medicare-excellence.com" },
    { icon: Clock, label: t("contact.opdHours"), value: "Mon–Sat: 8:00 AM – 8:00 PM\nSun: 9:00 AM – 2:00 PM" }
  ];

  return (
    <div>
      <Breadcrumb />
      <section className="py-16 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-4">{t("contact.badge")}</Badge>
          <h1 className="text-5xl font-bold font-serif mb-4">{t("contact.title")}</h1>
          <p className="text-white/80 max-w-xl mx-auto">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-5">
              {contactInfoItems.map(item => (
                <Card key={item.label} className="border border-border">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className={item.red ? "text-red-500" : "text-primary"} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                      <p className={`text-sm font-semibold text-foreground whitespace-pre-line ${item.red ? "text-red-600" : ""}`}>{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-2">
              <Card className="border border-border">
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle size={32} className="text-accent" />
                      </div>
                      <h2 className="text-2xl font-bold font-serif text-foreground mb-3">{t("contact.form.successTitle")}</h2>
                      <p className="text-muted-foreground mb-6">{t("contact.form.successDesc")}</p>
                      <Button variant="outline" onClick={() => { setSubmitted(false); form.reset(); }} data-testid="btn-contact-new">{t("contact.form.sendAnother")}</Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold font-serif text-foreground mb-6">{t("contact.form.title")}</h2>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(() => setSubmitted(true))} className="space-y-5">
                          <div className="grid sm:grid-cols-2 gap-5">
                            <FormField control={form.control} name="name" render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("contact.form.fullName")}</FormLabel>
                                <FormControl><Input placeholder={t("contact.form.namePlaceholder")} {...field} data-testid="input-contact-name" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("contact.form.phone")}</FormLabel>
                                <FormControl><Input placeholder={t("contact.form.phonePlaceholder")} {...field} data-testid="input-contact-phone" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("contact.form.email")}</FormLabel>
                              <FormControl><Input type="email" placeholder={t("contact.form.emailPlaceholder")} {...field} data-testid="input-contact-email" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="department" render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("contact.form.department")}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-contact-dept">
                                    <SelectValue placeholder={t("contact.form.deptPlaceholder")} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.entries(t("contact.deptOptions", { returnObjects: true }) as Record<string, string>).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("contact.form.message")}</FormLabel>
                              <FormControl><Textarea placeholder={t("contact.form.messagePlaceholder")} rows={5} {...field} data-testid="textarea-contact-message" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <Button type="submit" className="w-full bg-primary text-white" data-testid="btn-contact-submit">
                            <Send size={16} className="mr-2" /> {t("contact.form.send")}
                          </Button>
                        </form>
                      </Form>
                    </>
                  )}
                </CardContent>
              </Card>
              <Card className="border border-border mt-6">
                <CardContent className="p-0">
                  <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={40} className="text-primary/40 mx-auto mb-3" />
                      <p className="font-semibold text-foreground">One MediCare Plaza</p>
                      <p className="text-sm text-muted-foreground">Excellence Boulevard, Boston, MA 02115</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
