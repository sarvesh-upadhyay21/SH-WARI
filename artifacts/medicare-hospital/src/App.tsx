import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/layout/BackToTop";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Doctors from "@/pages/Doctors";
import DoctorDetail from "@/pages/DoctorDetail";
import Departments from "@/pages/Departments";
import DepartmentDetail from "@/pages/DepartmentDetail";
import Appointment from "@/pages/Appointment";
import Portal from "@/pages/Portal";
import Research from "@/pages/Research";
import International from "@/pages/International";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/doctors/:id" component={DoctorDetail} />
      <Route path="/doctors" component={Doctors} />
      <Route path="/departments/:slug" component={DepartmentDetail} />
      <Route path="/departments" component={Departments} />
      <Route path="/appointment" component={Appointment} />
      <Route path="/portal" component={Portal} />
      <Route path="/research" component={Research} />
      <Route path="/international" component={International} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppInner() {
  const { i18n } = useTranslation();
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const lang = i18n.language?.startsWith("hi") ? "hi" : "en";
    document.documentElement.lang = lang;
    if (lang === "hi") {
      document.documentElement.style.setProperty("--font-devanagari", "'Noto Sans Devanagari', sans-serif");
    }
  }, [i18n.language]);

  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <ScrollProgress />
      <Navbar dark={dark} toggleDark={() => setDark(v => !v)} />
      <Router />
      <Footer />
      <BackToTop />
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppInner />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
