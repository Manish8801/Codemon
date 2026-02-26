"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { LanguageId } from "@/types";
import { LucideLock } from "lucide-react";
import { LANGUAGE_CONFIGS } from "../_constants";

type Props = {
  hasAccess: boolean;
};
const LanguageSelector = ({ hasAccess }: Props) => {
  const { language, setLanguage } = useCodeEditorStore();

  const currentLanguageObj = LANGUAGE_CONFIGS[language];

  const handleClick = (language: LanguageId) => {
    setLanguage(language);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="
        h-9 px-3 gap-2
        bg-[#14151b] border border-white/5
        hover:border-white/10 hover:bg-[#1a1b22]
        text-gray-300 hover:text-white
        rounded-lg
        transition-all duration-200
      "
        >
          {LanguageIcon(currentLanguageObj.id, "1.1rem")}
          <span className="text-sm font-medium">
            {currentLanguageObj.label}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="
      w-60 p-2
      bg-[#111218]
      border border-white/5
      rounded-xl
      shadow-[0_10px_40px_rgba(0,0,0,0.5)]
      backdrop-blur-xl
    "
      >
        <DropdownMenuGroup className="flex flex-col gap-1">
          {Object.values(LANGUAGE_CONFIGS).map((config) => {
            const { id, label } = config;
            const isLocked = !hasAccess && id !== "javascript";

            return (
              <DropdownMenuItem
                key={id}
                onSelect={() => {
                  if (!isLocked) setLanguage(id);
                }}
                className="
              p-0 rounded-lg
              data-[highlighted]:bg-white/10
              data-[highlighted]:text-white
              transition-colors
            "
              >
                <button
                  onClick={() => handleClick(id)}
                  disabled={isLocked}
                  className={cn(
                    `
                w-full flex items-center justify-between
                px-3 py-2 rounded-lg
                text-sm font-medium
                transition-all duration-150
                `,
                    {
                      // Active language
                      "bg-white/5 text-white border border-white/10":
                        currentLanguageObj?.id === id,

                      // Normal state
                      "text-gray-300 hover:text-white":
                        currentLanguageObj?.id !== id && !isLocked,

                      // Locked state
                      "text-gray-500 cursor-not-allowed opacity-60": isLocked,
                    },
                  )}
                >
                  <div className="flex gap-3 items-center">
                    {LanguageIcon(id, "1.1rem")}
                    <span>{label}</span>
                  </div>

                  {isLocked && <LucideLock className="size-3 text-gray-500" />}
                </button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
