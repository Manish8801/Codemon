import { Id } from "../../convex/_generated/dataModel";
import { LANGUAGE_CONFIGS, THEMES } from "../app/(root)/_constants/index";

export type ThemeId = (typeof THEMES)[number]["id"];
export type LanguageId = keyof typeof LANGUAGE_CONFIGS;
export type LanguageConfig = (typeof LANGUAGE_CONFIGS)[LanguageId];
export type LanguageRuntime = LanguageConfig["pistonRuntime"];

export interface ExecuteCodeResponse {
  compile?: {
    output: string;
  };
  run?: {
    output: string;
    stderr: string;
  };
}

export interface ExecutionResult {
  code: string;
  output: string;
  error: string | null;
}

export interface Snippet {
  _id: Id<"snippets">;
  _creationTime: number;
  userId: string;
  language: string;
  code: string;
  title: string;
  userName: string;
}
