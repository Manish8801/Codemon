"use client";

import { Button } from "@/components/ui/button";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { LucideCopy, LucideCopyCheck } from "lucide-react";
import { useState } from "react";

const CopyButton = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { error, output } = useCodeEditorStore();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 4000);
  };
  return (
    <>
      {output || error ? (
        <Button className="cursor-pointer" onClick={handleCopy}>
          {isCopied ? (
            <>
              <LucideCopyCheck className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <LucideCopy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </Button>
      ) : null}
    </>
  );
};

export default CopyButton;
