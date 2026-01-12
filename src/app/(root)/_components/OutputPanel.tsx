"use client";

import useMounted from "@/hooks/useMounted";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Terminal } from "lucide-react";
import { Panel } from "react-resizable-panels";
import CopyButton from "./CopyButton";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

const OutputPanel = () => {
  const { output, error, isRunning } = useCodeEditorStore();
  const mounted = useMounted();

  if (!mounted) {
    return <RunningCodeSkeleton />;
  }

  return (
    <Panel collapsible defaultSize={50}>
      <div className="flex flex-col gap-2 h-full bg-[#181825] p-4">
        {/* Header */}
        <div className="relative mb-2 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Terminal className="size-4 text-blue-400" />
            <span className="text-sm font-semibold">Output</span>
          </div>
          <CopyButton />
        </div>
        {/* Output Area */}
        <div className="relative h-full">
          <div className="relative h-full bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] p-4  overflow-auto font-mono text-sm">
            {isRunning ? (
              <RunningCodeSkeleton />
            ) : error ? (
              <div className="flex items-start gap-3 text-red-400">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="font-medium">Execution Error</div>
                  <pre className="whitespace-pre-wrap text-red-400/80">
                    {error}
                  </pre>
                </div>
              </div>
            ) : output ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Execution Successful</span>
                </div>
                <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-center">
                  Run your code to see the output here...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default OutputPanel;
