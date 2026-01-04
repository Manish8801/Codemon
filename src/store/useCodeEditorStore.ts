import { ExecutionResult } from "@/types";
import { type Monaco } from "@monaco-editor/react";
import { create } from "zustand";

interface Store {
  language: string;
  output: string;
  isRunning: boolean;
  error: string | null;
  theme: string;
  fontSize: number;
  editor: Monaco | null;
  executionResult: ExecutionResult | null;

  setEditor: (editor: Monaco | null) => void;
  getCode: () => string;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: number) => void;
  runCode: () => Promise<void>;
}

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  const language = localStorage.getItem("language") || "javascript";
  const fontSize = localStorage.getItem("fontSize") || "16";
  const theme = localStorage.getItem("theme") || "vs-dark";
  return {
    language,
    fontSize: parseInt(fontSize),
    theme,
  };
};
export const useCodeEditorStore = create<Store>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    setEditor: (editor: Monaco | null) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);

      if (savedCode) editor.setValue(savedCode);
      set({ editor });
    },
    getCode: () => "",
    setLanguage: (language) => {
      const currentCode = get().editor?.getValue();
      if (currentCode)
        localStorage.setItem(`editor-code-${get().language}`, currentCode);

      localStorage.setItem("editor-language", language);
      set({ language, output: "", error: null });
    },
    setTheme: (theme) => {
      localStorage.setItem("theme", theme);
      set({ theme });
    },
    setFontSize: (fontSize) => {
      localStorage.setItem("fontSize", fontSize.toString());
      set({ fontSize });
    },
    runCode: async () => {},
  };
});
