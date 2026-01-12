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
import { FaLock } from "react-icons/fa";
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
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button>
            {LanguageIcon(currentLanguageObj.id, "1.2rem")}
            {currentLanguageObj.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" bg-primary border-none" align="start">
          <DropdownMenuGroup className="flex flex-col gap-0">
            {Object.values(LANGUAGE_CONFIGS).map((config) => {
              const { id, label } = config;
              const isLocked = !hasAccess && id !== "javascript";
              return (
                <DropdownMenuItem
                  className="p-0"
                  key={id}
                  onSelect={() => {
                    if (!isLocked) setLanguage(id);
                  }}
                >
                  <Button
                    className={cn(
                      `rounded-none w-full flex font-semibold py-1 px-2 items-center justify-between gap-6`,
                      {
                        "rounded-sm border-2 border-gray-600":
                          currentLanguageObj?.id === id,
                      }
                    )}
                    disabled={isLocked}
                    onClick={() => handleClick(id)}
                  >
                    <div className="flex gap-4 items-center">
                      {LanguageIcon(id, "1.2rem")}

                      <span>{label}</span>
                    </div>
                    {isLocked && <FaLock className="size-3 text-gray-500" />}
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
