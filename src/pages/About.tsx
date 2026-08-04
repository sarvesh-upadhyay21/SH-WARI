import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Activity,
  Award,
  CheckCircle,
  Heart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { services } from "@/data/services";
import { accreditations, milestones, stats } from "@/data/stats";

type Feature = {
  title: string;
  desc: string;
};

function Breadcrumb() {
  const { t } = useTranslation();

  return (
    <div className="bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary transition-colors">
          {t("common.home")}
        </a>

        <span>/</span>

        <span className="text-foreground font-medium">{t("nav.aboutUs")}</span>
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useTranslation();

  const features = t("home.whyUs.features", {
    returnObjects: true,
  }) as Feature[];

  const valueIcons = [Heart, ShieldCheck, CheckCircle, Activity];

  return (
    <div>
      <Breadcrumb />

      <section className="py-24 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-4">{t("about.badge")}</Badge>

          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-5">{t("about.title")}</h1>

          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-primary/10 text-primary border-0 mb-4">
                {t("about.story.badge")}
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-5">
                {t("about.story.title")}
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t("about.subtitle")}</p>

                <p>{t("about.missionText")}</p>

                <p>{t("about.visionText")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <Card
                  key={`${stat.label}-${index}`}
                  className="border border-border text-center hover:shadow-lg transition-all"
                >
                  <CardContent className="p-6">
                    <p className="text-2xl md:text-3xl font-bold text-primary mb-2">
                      {stat.display}
                    </p>

                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border border-border hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Heart size={26} className="text-primary" />
                </div>

                <h2 className="text-2xl font-bold font-serif text-foreground mb-4">
                  {t("about.vision")}
                </h2>

                <p className="text-muted-foreground leading-relaxed">{t("about.visionText")}</p>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <CheckCircle size={26} className="text-accent" />
                </div>

                <h2 className="text-2xl font-bold font-serif text-foreground mb-4">
                  {t("about.mission")}
                </h2>

                <p className="text-muted-foreground leading-relaxed">{t("about.missionText")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-0 mb-3">
              {t("about.values.badge")}
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">
              {t("about.values.title")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = valueIcons[index % valueIcons.length];

              return (
                <motion.div
                  key={`${feature.title}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center border border-border hover:shadow-lg hover:border-primary/30 transition-all h-full">
                    <CardContent className="p-7">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                        <Icon size={25} className="text-primary" />
                      </div>

                      <h3 className="font-bold text-foreground mb-3">{feature.title}</h3>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-white/20 text-white border-0 mb-3">
              {t("about.leadership.badge")}
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold font-serif">
              {t("about.leadership.title")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="text-center border border-white/20 bg-white/10 hover:bg-white/15 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/10 flex items-center justify-center">
                      <Stethoscope size={28} className="text-accent" />
                    </div>

                    <h3 className="font-bold text-white mb-3">{service.name}</h3>

                    <p className="text-sm text-white/70 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-0 mb-3">
              {t("about.accreditations.badge")}
            </Badge>

            <h2 className="text-3xl font-bold font-serif text-foreground">
              {t("about.accreditations.title")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {accreditations.map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="text-center border border-border h-full hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Award size={26} className="text-primary" />
                    </div>

                    <h3 className="font-bold text-sm text-foreground mb-2">{item.name}</h3>

                    <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>

                    <p className="text-xs text-primary font-medium mt-2">{item.year}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-accent/10 text-accent border-0 mb-3">
              {t("about.milestones.badge")}
            </Badge>

            <h2 className="text-3xl font-bold font-serif text-foreground">
              {t("about.milestones.title")}
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

            <div className="space-y-8">
              {milestones.map((item, index) => (
                <motion.div
                  key={`${item.year}-${index}`}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -20 : 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className={`flex items-center gap-6 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <Card className="inline-block border border-border p-4 max-w-xs">
                      <p className="text-sm text-foreground">{item.event}</p>
                    </Card>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 z-10 shadow-lg">
                    <span className="text-white text-xs font-bold">{item.year}</span>
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-0 mb-3">
              {t("home.contact.badge")}
            </Badge>

            <h2 className="text-3xl font-bold font-serif text-foreground">
              {t("home.contact.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center border border-border">
              <CardContent className="p-7">
                <MapPin size={28} className="text-primary mx-auto mb-4" />

                <h3 className="font-bold text-foreground mb-2">{t("home.contact.address")}</h3>

                <p className="text-sm text-muted-foreground">{t("contact.address")}</p>
              </CardContent>
            </Card>

            <a href="tel:+918369179901">
              <Card className="text-center border border-border hover:shadow-lg transition-all h-full">
                <CardContent className="p-7">
                  <Phone size={28} className="text-primary mx-auto mb-4" />

                  <h3 className="font-bold text-foreground mb-2">{t("home.contact.contactUs")}</h3>

                  <p className="text-sm text-primary font-semibold">+91 8369179901</p>
                </CardContent>
              </Card>
            </a>

            <a href="mailto:Saroja.hospital25@gmail.com">
              <Card className="text-center border border-border hover:shadow-lg transition-all h-full">
                <CardContent className="p-7">
                  <Mail size={28} className="text-primary mx-auto mb-4" />

                  <h3 className="font-bold text-foreground mb-2">{t("contact.emailLabel")}</h3>

                  <p className="text-sm text-primary font-semibold break-all">
                    Saroja.hospital25@gmail.com
                  </p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
