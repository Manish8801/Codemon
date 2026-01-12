import { cn } from "@/lib/utils";

import { LanguageId, ThemeId } from "@/types";
import {
    FaCloud,
    FaGithub,
    FaJava,
    FaLaptop,
    FaMoon,
    FaRust,
    FaSun,
    FaSwift,
} from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { SiCplusplus, SiPython, SiRuby, SiTypescript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

const LANGUAGE_ICONS: Record<LanguageId, IconType> = {
  javascript: IoLogoJavascript,
  typescript: SiTypescript,
  python: SiPython,
  java: FaJava,
  rust: FaRust,
  go: FaGolang,
  cpp: SiCplusplus,
  csharp: TbBrandCSharp,
  swift: FaSwift,
  ruby: SiRuby,
};

const THEME_ICONS: Record<ThemeId, IconType> = {
  "github-dark": FaGithub,
  monokai: FaLaptop,
  "solarized-dark": FaCloud,
  "vs-dark": FaMoon,
  "vs-light": FaSun,
};

export const LanguageIcon = (languageId: LanguageId, classname?: string) => {
  const Icon = LANGUAGE_ICONS[languageId];
  if (!Icon) return null;
  return <Icon className={cn("size-4 ", classname)} />;
};

export const ThemeIcon = (themeId: ThemeId, classname?: string) => {
  const Icon = THEME_ICONS[themeId];
  if (!Icon) return null;
  return <Icon className={cn("size-4 ", classname)} />;
};
