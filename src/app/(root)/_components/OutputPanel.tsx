"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Terminal } from "lucide-react";
import { Panel } from "react-resizable-panels";
import CopyButton from "./CopyButton";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

const OutputPanel = () => {
  const { output, error, isRunning } = useCodeEditorStore();

  return (
    <Panel collapsible defaultSize={50}>
      <div className="flex flex-col h-full bg-[#111218] border-l border-white/5 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="size-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">Output</span>
          </div>
          <CopyButton />
        </div>

        {/* Output Area */}
        <div className="flex-1 relative">
          <div className="flex flex-col h-full bg-[#1a1a2e]/60 backdrop-blur-md border border-white/10 rounded-lg p-4 overflow-auto font-mono text-sm">
            {/* Running state */}
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
                <pre className="whitespace-pre-wrap text-gray-300">
                  {output}
                </pre>
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
