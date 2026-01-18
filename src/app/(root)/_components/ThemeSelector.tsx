"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { ThemeId } from "@/types";
import { Palette } from "lucide-react";
import { THEMES } from "../_constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useCodeEditorStore();

  const currentTheme = THEMES.find((t) => t.id === theme) || THEMES[0];
  const handleThemeSelect = (themeId: ThemeId) => {
    setTheme(themeId);
  };

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button>
            <Palette className="size-4" />
            {currentTheme.label}
            <div
              style={{ backgroundColor: currentTheme.color }}
              className="rounded-full size-4 border border-gray-500"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" bg-primary border-none" align="start">
          <DropdownMenuGroup className="flex flex-col gap-0">
            {THEMES.map(({ color, id, label }) => (
              <DropdownMenuItem key={id} className="p-0">
                <Button
                  className={cn(
                    `rounded-none w-full flex font-semibold py-1 px-2 items-center justify-between gap-6`,
                    {
                      "rounded-sm border-2 border-gray-600":
                        currentTheme.id === id,
                    },
                  )}
                  onClick={() => handleThemeSelect(id)}
                >
                  <div className="flex gap-3">
                    {ThemeIcon(id)}
                    <span>{label}</span>
                  </div>
                  <div
                    style={{ backgroundColor: color }}
                    className="rounded-full size-4 border border-gray-500"
                  />
                </Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeSelector;
