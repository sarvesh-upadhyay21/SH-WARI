import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Heart, Brain, Bone, Shield, Droplets, Baby, Sun, Stethoscope, Wind, ChevronRight, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { departments } from "@/data/departments";

const iconMap: Record<string, React.ElementType> = {
  Heart, Brain, Bone, Shield, Droplets, Baby, Sun, Stethoscope, Wind,
  Ribbon: Heart, Ear: Shield, Zap: ChevronRight
};

function Breadcrumb() {
  const { t } = useTranslation();
  return (
    <div className="bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">{t("common.home")}</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{t("departments.badge")}</span>
      </div>
    </div>
  );
}

export default function Departments() {
  const { t } = useTranslation();

  return (
    <div>
      <Breadcrumb />
      <section className="py-20 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-4">{t("departments.badge")}</Badge>
          <h1 className="text-5xl font-bold font-serif mb-4">{t("departments.title")}</h1>
          <p className="text-white/80 max-w-xl mx-auto">{t("departments.subtitle")}</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, i) => {
              const Icon = iconMap[dept.icon] || Heart;
              return (
                <motion.div key={dept.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link href={`/departments/${dept.id}`}>
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer border border-border h-full" data-testid={`card-dept-${dept.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                            <Icon size={22} className="text-primary group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2">{dept.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{dept.description}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {dept.treatments.slice(0, 3).map(t => (
                            <span key={t} className="text-xs bg-muted text-muted-foreground rounded-full px-2.5 py-0.5">{t}</span>
                          ))}
                          {dept.treatments.length > 3 && <span className="text-xs text-primary font-medium">+{dept.treatments.length - 3} more</span>}
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-primary text-xs font-medium">
                          <span>{t("departments.viewDepartment")}</span>
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
