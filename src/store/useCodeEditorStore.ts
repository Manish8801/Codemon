import { LANGUAGE_CONFIGS } from "@/app/(root)/_constants";
import { ExecutionResult, LanguageId, ThemeId } from "@/types";
import { type Monaco } from "@monaco-editor/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreState = {
  language: LanguageId;
  output: string;
  isRunning: boolean;
  error: string | null;
  fontSize: number;
  editor: Monaco | null;
  theme: ThemeId;
  executionResult: ExecutionResult | null;
};
type StoreActions = {
  setEditor: (editor: StoreState["editor"]) => void;
  setLanguage: (language: StoreState["language"]) => void;
  setTheme: (theme: StoreState["theme"]) => void;
  setFontSize: (fontSize: number) => void;
  getCode: () => string;
  runCode: () => Promise<void>;
};

type Store = StoreState & StoreActions;

const DEFAULT_STATE = {
  language: "javascript" as LanguageId,
  fontSize: 16,
  theme: "vs-dark" as ThemeId,
};

export const useCodeEditorStore = create<Store>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,
      output: "",
      isRunning: false,
      error: null,
      editor: null,
      executionResult: null,
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      getCode: () => get().editor?.getValue() || "",
      setEditor: (editor) => {
        const savedCode = localStorage.getItem(`editor-code-${get().language}`);
        if (savedCode) editor.setValue(savedCode);
        set({ editor });
      },
      setLanguage: (language) => {
        const currentCode = get().editor?.getValue();

        // Save the current code to local storage by language
        if (currentCode) {
          localStorage.setItem(`editor-code-${get().language}`, currentCode);
        }
        set({ language, output: "", error: null });
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
          const response = await fetch(
            "https://emkc.org/api/v2/piston/execute",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                language: runtime.language,
                version: runtime.version,
                files: [{ content: code }],
              }),
            }
          );

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
    }),
    {
      name: "code-editor-storage",
      partialize: (state) => {
        const { fontSize, theme, language } = state;
        return { fontSize, theme, language };
      },
    }
  )
);

export const getExecutionResult = () => {
  return useCodeEditorStore.getState().executionResult;
};
