import { LANGUAGE_CONFIGS } from "@/app/(root)/_constants";
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
    getCode: () => get().editor?.getValue() || "",
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
    runCode: async () => {
      const { language, getCode } = get();
      const code = getCode();

      if (!code) {
        set({ error: "No code to run" });
        return;
      }

      set({ isRunning: true, error: null });

      try {
        const runtime = LANGUAGE_CONFIGS[language].pistonRuntime;
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
          }),
        });

        const data = await response.json();

        if (data.message) {
          set({ error: data.message });
        }

        if (data.compile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output;
          set({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
          });

          return;
        }

        if (data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output;
          set({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
          });

          return;
        }

        // here execution is successful
        const output = data.run.output;
        set({
          output,
          executionResult: {
            code,
            output: output.trim(),
            error: null,
          },
        });
      } catch (error) {
        console.error("Error running code:", error);
        set({
          error: "Error running code",
          executionResult: { code, output: "", error: "Error running code" },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

export const getExecutionResult = () => {
  return useCodeEditorStore.getState().executionResult;
};
