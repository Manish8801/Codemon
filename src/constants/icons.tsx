import { LanguageId, ThemeId } from "@/types";
import { FunctionComponent, JSX } from "react";
import CplusplusOriginal from "react-devicons/cplusplus/original";
import CsharpOriginal from "react-devicons/csharp/original";
import GoOriginal from "react-devicons/go/original";
import JavaOriginal from "react-devicons/java/original";
import JavascriptOriginal from "react-devicons/javascript/original";
import PythonOriginal from "react-devicons/python/original";
import RustOriginal from "react-devicons/rust/original";
import SwiftOriginal from "react-devicons/swift/original";
import TypescriptOriginal from "react-devicons/typescript/original";

import RubyOriginal from "react-devicons/ruby/original";

import { Cloud, Github, Laptop, Moon, Sun } from "lucide-react";

const LANGUAGE_ICONS: Record<
  LanguageId,
  FunctionComponent<{ size?: string }>
> = {
  javascript: JavascriptOriginal,
  typescript: TypescriptOriginal,
  python: PythonOriginal,
  java: JavaOriginal,
  rust: RustOriginal,
  go: GoOriginal,
  cpp: CplusplusOriginal,
  csharp: CsharpOriginal,
  swift: SwiftOriginal,
  ruby: RubyOriginal,
};

const THEME_ICONS: Record<ThemeId, JSX.Element> = {
  "github-dark": <Github />,
  monokai: <Laptop />,
  "solarized-dark": <Cloud />,
  "vs-dark": <Moon />,
  "vs-light": <Sun />,
};

export const LanguageIcon = (languageId: LanguageId, size?: string) => {
  const Icon = LANGUAGE_ICONS[languageId];
  return <Icon size={size || "2rem"} />;
};

export const ThemeIcon = (themeId: ThemeId) => {
  return THEME_ICONS[themeId];
};
