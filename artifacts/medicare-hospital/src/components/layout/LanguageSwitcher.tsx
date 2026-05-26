import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("hi") ? "hi" : "en";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <div className="relative flex items-center gap-1.5">
      <Globe size={14} className="text-foreground/60 pointer-events-none flex-shrink-0" aria-hidden="true" />
      <select
        value={current}
        onChange={handleChange}
        aria-label="Select language"
        className="appearance-none bg-transparent text-sm font-medium text-foreground/80 hover:text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 rounded pr-1 py-0.5"
        data-testid="select-language"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.native}
          </option>
        ))}
      </select>
    </div>
  );
}
