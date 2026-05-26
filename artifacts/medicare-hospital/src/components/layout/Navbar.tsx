import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Search, ChevronDown, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { departments } from "@/data/departments";

interface NavbarProps {
  dark: boolean;
  toggleDark: () => void;
}

export default function Navbar({ dark, toggleDark }: NavbarProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, navigate] = useLocation();

  const navItems = [
    {
      label: t("nav.aboutUs"),
      href: "/about",
      mega: [
        { label: t("nav.aboutUs"), href: "/about" },
        { label: "Chairperson's Message", href: "/about" },
        { label: "Our Values", href: "/about" },
        { label: "Awards & Achievements", href: "/about" }
      ]
    },
    {
      label: t("nav.centresOfExcellence"),
      href: "/departments",
      mega: departments.slice(0, 6).map(d => ({ label: d.name, href: `/departments/${d.id}` }))
    },
    {
      label: t("nav.patientsVisitors"),
      href: "/appointment",
      mega: [
        { label: t("nav.bookAppointment"), href: "/appointment" },
        { label: t("common.home") === "होम" ? "डॉक्टर ढूंढें" : "Find a Doctor", href: "/doctors" },
        { label: "Patient Portal", href: "/portal" },
        { label: "International Patients", href: "/international" }
      ]
    },
    {
      label: t("nav.healthInformation"),
      href: "#",
      mega: [
        { label: "Health Articles", href: "#" },
        { label: "Disease Directory", href: "#" },
        { label: "Wellness Programs", href: "#" }
      ]
    },
    {
      label: t("nav.researchAcademics"),
      href: "/research",
      mega: [
        { label: "Research Programs", href: "/research" },
        { label: "Clinical Trials", href: "/research" },
        { label: "Fellowships", href: "/research" }
      ]
    },
    { label: t("nav.contactUs"), href: "/contact" }
  ];

  const searchItems = [
    { label: t("nav.bookAppointment"), href: "/appointment" },
    { label: "Find a Doctor", href: "/doctors" },
    { label: "Departments", href: "/departments" },
    { label: "Cardiology", href: "/departments/cardiology" },
    { label: "Oncology", href: "/departments/oncology" },
    { label: "Emergency Care", href: "/contact" },
    { label: "Research Programs", href: "/research" },
    { label: "International Patients", href: "/international" },
    { label: "Patient Portal", href: "/portal" },
    { label: "Careers", href: "/careers" }
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const filteredSearch = searchQuery
    ? searchItems.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : searchItems;

  return (
    <>
      <div className="bg-primary text-white text-sm py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/80">
            <Phone size={14} className="text-accent" />
            <span>{t("nav.emergency")}: <strong className="text-accent">022-MEDIEMG</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/appointment">
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-white h-7 text-xs px-3" data-testid="btn-book-appointment-top">
                {t("nav.bookAppointment")}
              </Button>
            </Link>
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-7 text-xs px-3 bg-transparent">
              {t("nav.iWantToFind")}
            </Button>
            <Link href="/portal">
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-7 text-xs px-3 bg-transparent">
                {t("nav.myHealthRecords")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-md" : "bg-white dark:bg-slate-900"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">M+</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-primary text-base leading-tight font-serif">MediCare Excellence</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Hospital</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.mega ? setActiveMenu(item.label) : setActiveMenu(null)}
                >
                  <Link href={item.href}>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
                      {item.label}
                      {item.mega && <ChevronDown size={14} className={`transition-transform ${activeMenu === item.label ? "rotate-180" : ""}`} />}
                    </button>
                  </Link>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label={t("common.search")}
                data-testid="btn-search"
              >
                <Search size={18} className="text-foreground" />
              </button>
              <button
                onClick={toggleDark}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label={t("common.darkMode")}
                data-testid="btn-dark-mode"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} className="text-foreground" />}
              </button>
              <Link href="/appointment" className="hidden md:block">
                <Button size="sm" className="bg-primary text-white h-8 text-xs px-4" data-testid="btn-book-appointment-nav">
                  {t("nav.bookAppointment")}
                </Button>
              </Link>
              <button
                className="lg:hidden p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Menu"
                data-testid="btn-mobile-menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 bg-white dark:bg-slate-900 border-t border-border shadow-xl z-50"
              onMouseEnter={() => setActiveMenu(activeMenu)}
            >
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {navItems.find(n => n.label === activeMenu)?.mega?.map((sub) => (
                    <Link key={sub.label} href={sub.href}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer group transition-colors">
                        <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{sub.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border bg-white dark:bg-slate-900 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
                      {item.label}
                    </button>
                  </Link>
                ))}
                <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
                  <Link href="/appointment" className="flex-1">
                    <Button className="w-full bg-primary text-white" size="sm">{t("nav.bookAppointment")}</Button>
                  </Link>
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Search size={18} className="text-muted-foreground flex-shrink-0" />
              <Input
                autoFocus
                placeholder={t("nav.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 shadow-none focus-visible:ring-0 text-base p-0 h-auto"
                data-testid="input-search"
              />
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredSearch.map((item) => (
              <button
                key={item.href + item.label}
                onClick={() => { navigate(item.href); setSearchOpen(false); setSearchQuery(""); }}
                className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
                data-testid={`search-result-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Search size={14} className="text-muted-foreground flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
