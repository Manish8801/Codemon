"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useClerk } from "@clerk/nextjs";
import { RotateCcwIcon, TypeIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Panel, PanelSize } from "react-resizable-panels";
import { defineMonacoThemes, LANGUAGE_CONFIGS } from "../_constants";
import { EditorViewSkeleton } from "./skeletons/editor-panel-skeleton";
import ShareSnippetDialog from "./share-snippet-dialog";

const Editor = dynamic(
  () => import("@monaco-editor/react").then((m) => m.Editor),
  { loading: () => <EditorViewSkeleton />, ssr: false },
);

const EditorPanel = () => {
  const [panelSize, setPanelSize] = useState<PanelSize>();
  const clerk = useClerk();
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
    setFontSize(newFontSize);
  };

  return (
    <Panel collapsible defaultSize={50} onResize={(size) => setPanelSize(size)}>
      <div className="flex flex-col h-full w-full bg-[#0f1117] border-r border-white/5">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#11131a] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1a1d26] border border-white/5">
              <Image
                src={"/" + language + ".png"}
                alt="Logo"
                width={22}
                height={22}
              />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Code Editor</h2>
              {panelSize && panelSize?.inPixels > 550 && (
                <span className="text-xs text-gray-500">
                  Write and execute your code
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size slider */}
            <div className="flex items-center gap-3 h-9 px-3 rounded-lg bg-[#14161d] border border-white/5">
              <TypeIcon className="size-4 text-gray-400" />
              <Slider
                value={[fontSize]}
                onValueChange={(v) => handleFontSizeChange(v[0])}
                min={12}
                max={24}
                step={1}
                className="w-20"
              />
              <span className="text-sm font-medium text-gray-400 min-w-8 text-center">
                {fontSize}
              </span>
            </div>

            <Button
              onClick={handleRefresh}
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-[#14161d] rounded-lg border border-white/5 hover:bg-[#1a1d26] hover:border-white/10 transition-all"
            >
              <RotateCcwIcon className="size-4 text-gray-400" />
            </Button>

            <ShareSnippetDialog />
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1">
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
        </div>
      </div>
    </Panel>
  );
};

export default EditorPanel;
