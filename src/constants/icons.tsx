import { cn } from "@/lib/utils";

import { LanguageId, ThemeId } from "@/types";
import { FunctionComponent } from "react";
import GoOriginal from "react-devicons/go/original";
import JavaOriginal from "react-devicons/java/original";
import JavascriptOriginal from "react-devicons/javascript/original";
import PythonOriginal from "react-devicons/python/original";

import TypescriptOriginal from "react-devicons/typescript/original";

import CplusplusOriginal from "react-devicons/cplusplus/original";
import CsharpOriginal from "react-devicons/csharp/original";
import RustOriginal from "react-devicons/rust/original";
import SwiftOriginal from "react-devicons/swift/original";

import RubyOriginal from "react-devicons/ruby/original";

import { FaCloud, FaGithub, FaLaptop, FaMoon, FaSun } from "react-icons/fa";
import { IconType } from "react-icons/lib";

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

const THEME_ICONS: Record<ThemeId, IconType> = {
  "github-dark": FaGithub,
  monokai: FaLaptop,
  "solarized-dark": FaCloud,
  "vs-dark": FaMoon,
  "vs-light": FaSun,
};

export const LanguageIcon = (languageId: LanguageId, size?: string) => {
  const Icon = LANGUAGE_ICONS[languageId];
  return <Icon size={size || "2rem"} />;
};

export const ThemeIcon = (themeId: ThemeId, classname?: string) => {
  const Icon = THEME_ICONS[themeId];
  return <Icon className={cn("size-4 ", classname)} />;
};
