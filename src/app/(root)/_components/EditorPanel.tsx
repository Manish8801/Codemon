"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import useMounted from "@/hooks/useMounted";
import { cn } from "@/lib/utils";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useClerk } from "@clerk/nextjs";
import { Editor } from "@monaco-editor/react";
import { RotateCcwIcon, TypeIcon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIGS } from "../_constants";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import ShareSnippetDialog from "./NewShareSnippetDialog";

const EditorPanel = () => {
  const clerk = useClerk();
  const mounted = useMounted();
  const { language, theme, fontSize, editor, setFontSize, setEditor } =
    useCodeEditorStore();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);

    const newCode = savedCode || LANGUAGE_CONFIGS[language].defaultCode;

    if (editor) {
      editor.setValue(newCode);
    }
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem(`editor-font-size-${language}`);
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize, language]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIGS[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };
  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };
  const handleFontSizeChange = (newFontSize: number) => {
    const size = Math.min(Math.max(newFontSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };
  if (!mounted) return null;

  return (
    <div className="relative">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/5 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
              <Image
                src={"/" + language + ".png"}
                alt="Logo"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Code Editor</h2>
              <p className="text-xs text-gray-500">
                Write and execute your code
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Font Size Slider */}
            <div className={cn(buttonVariants())}>
              <TypeIcon className="size-4 text-gray-400" />
              <div className="flex items-center gap-3">
                <Slider
                  onValueChange={(value) => handleFontSizeChange(value[0])}
                  value={[fontSize]}
                  min={12}
                  max={24}
                  className="w-20"
                />

                <span className="text-sm font-medium text-gray-400 min-w-8 text-center">
                  {fontSize}
                </span>
              </div>
            </div>

            <Button
              onClick={handleRefresh}
              className="p-2 transition-colors"
              aria-label="Reset to default code"
            >
              <RotateCcwIcon className="size-4 text-gray-400" />
            </Button>

            {/* Share Button */}
            <ShareSnippetDialog />
          </div>
        </div>

        {/* Editor  */}
        <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/5">
          {clerk.loaded && (
            <Editor
              height="600px"
              language={LANGUAGE_CONFIGS[language].monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => setEditor(editor)}
              options={{
                minimap: { enabled: true },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
              }}
            />
          )}

          {!clerk.loaded && <EditorPanelSkeleton />}
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
