import { Link } from "wouter";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Globe, Plane, Languages, Hotel, Video, FileText, ChevronRight, Calculator, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const procedures = [
  { name: "Heart Bypass Surgery (CABG)", low: 12000, high: 18000 },
  { name: "Knee Replacement", low: 8000, high: 14000 },
  { name: "Liver Transplant", low: 25000, high: 40000 },
  { name: "Hip Replacement", low: 7500, high: 12000 },
  { name: "Robotic Prostatectomy", low: 10000, high: 16000 },
  { name: "Spinal Fusion", low: 9000, high: 15000 }
];

const estimateSchema = z.object({
  procedure: z.string().min(1, "Select a procedure"),
  country: z.string().min(1, "Select your country")
});
type EstimateData = z.infer<typeof estimateSchema>;

function Breadcrumb() {
  const { t } = useTranslation();
  return (
    <div className="bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">{t("common.home")}</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{t("international.badge")}</span>
      </div>
    </div>
  );
}

export default function International() {
  const { t } = useTranslation();
  const [estimate, setEstimate] = useState<{ low: number; high: number; name: string } | null>(null);
  const form = useForm<EstimateData>({ resolver: zodResolver(estimateSchema), defaultValues: { procedure: "", country: "" } });

  const handleEstimate = (data: EstimateData) => {
    const proc = procedures.find(p => p.name === data.procedure);
    if (proc) setEstimate({ ...proc, name: proc.name });
  };

  const serviceDescsEn = [
    "Medical visa invitation letters issued within 24 hours. We guide you through every embassy requirement.",
    "Airport pick-up, hotel bookings near the hospital, and dedicated logistics coordinators available 24/7.",
    "Professional medical interpreters in 40+ languages — present for all consultations and procedures.",
    "Partnered accommodation across all budget levels within walking distance of the hospital.",
    "Pre-travel teleconsultation with your specialist to review reports and plan the treatment pathway.",
    "A dedicated International Patient Coordinator handles everything from inquiry to discharge."
  ];
  const serviceLabelsEn = ["Visa Assistance", "Travel & Logistics", "Interpreter Services", "Accommodation", "Teleconsultation", "End-to-End Coordination"];
  const serviceDescsHi = [
    "24 घंटे के भीतर मेडिकल वीज़ा आमंत्रण पत्र। हम आपको हर दूतावास आवश्यकता से गुज़ारते हैं।",
    "एयरपोर्ट पिकअप, अस्पताल के पास होटल बुकिंग, और 24/7 उपलब्ध समर्पित लॉजिस्टिक्स समन्वयक।",
    "40+ भाषाओं में पेशेवर चिकित्सा दुभाषिए — सभी परामर्शों और प्रक्रियाओं में उपस्थित।",
    "अस्पताल के पैदल दूरी के भीतर सभी बजट स्तरों पर भागीदार आवास।",
    "रिपोर्ट की समीक्षा और उपचार मार्ग की योजना बनाने के लिए यात्रा-पूर्व टेलीकंसल्टेशन।",
    "एक समर्पित अंतरराष्ट्रीय मरीज़ समन्वयक पहली पूछताछ से डिस्चार्ज तक सब कुछ संभालता है।"
  ];
  const serviceLabelsHi = ["वीज़ा सहायता", "यात्रा और लॉजिस्टिक्स", "दुभाषिया सेवाएं", "आवास", "टेलीकंसल्टेशन", "एंड-टू-एंड समन्वय"];
  const isHindi = t("lang") === "hi";
  const serviceIcons = [FileText, Plane, Languages, Hotel, Video, Globe];
  const serviceLabels = isHindi ? serviceLabelsHi : serviceLabelsEn;
  const serviceDescs = isHindi ? serviceDescsHi : serviceDescsEn;

  return (
    <div>
      <Breadcrumb />
      <section className="py-20 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <Badge className="bg-white/20 text-white border-0 mb-4">{t("international.badge")}</Badge>
            <h1 className="text-5xl font-bold font-serif mb-5">{t("international.title")}</h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8">{t("international.subtitle")}</p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-accent hover:bg-accent/90 text-white" data-testid="btn-intl-enquire">
                <Globe size={16} className="mr-2" /> {t("international.startJourney")}
              </Button>
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent" data-testid="btn-intl-teleconsult">
                <Video size={16} className="mr-2" /> {t("international.bookTeleconsult")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-0 mb-3">{t("international.services.badge")}</Badge>
            <h2 className="text-4xl font-bold font-serif text-foreground">{t("international.services.title")}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceLabels.map((label, i) => {
              const Icon = serviceIcons[i];
              return (
                <Card key={label} className="border border-border hover:shadow-xl hover:border-primary/30 transition-all" data-testid={`intl-service-${i}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Icon size={22} className="text-primary" /></div>
                    <h3 className="font-bold text-foreground mb-3">{label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{serviceDescs[i]}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-accent/10 text-accent border-0 mb-3">{t("international.estimator.badge")}</Badge>
            <h2 className="text-4xl font-bold font-serif text-foreground">{t("international.estimator.title")}</h2>
            <p className="text-muted-foreground mt-3">{t("international.estimator.subtitle")}</p>
          </div>
          <Card className="border border-border">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleEstimate)} className="space-y-5">
                  <FormField control={form.control} name="procedure" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("international.estimator.procedure")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-estimate-procedure">
                            <SelectValue placeholder={t("international.estimator.procedurePlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {procedures.map(p => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("international.estimator.country")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-estimate-country">
                            <SelectValue placeholder={t("international.estimator.countryPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["United States", "United Kingdom", "UAE", "Saudi Arabia", "Nigeria", "Kenya", "Canada", "Australia", "Germany", "Bangladesh", "Pakistan"].map(c => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full bg-primary text-white" data-testid="btn-get-estimate">
                    <Calculator size={16} className="mr-2" /> {t("international.estimator.getEstimate")}
                  </Button>
                </form>
              </Form>

              {estimate && (
                <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20" data-testid="estimate-result">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={18} className="text-accent" />
                    <h3 className="font-bold text-foreground">{estimate.name}</h3>
                  </div>
                  <p className="text-3xl font-bold text-primary font-serif mb-1">${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{t("international.estimator.indicativeRange")}</p>
                  <Link href="/contact">
                    <Button className="mt-4 bg-primary text-white w-full" data-testid="btn-estimate-enquire">{t("international.estimator.requestQuote")}</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
