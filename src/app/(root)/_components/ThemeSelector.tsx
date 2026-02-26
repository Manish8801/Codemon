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
            <Palette className="size-4 text-gray-400" />
            <span className="text-sm font-medium">{currentTheme.label}</span>
            <div
              style={{ backgroundColor: currentTheme.color }}
              className="rounded-full size-3 border border-white/20"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="
        w-56 p-2
        bg-[#111218]
        border border-white/5
        rounded-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        backdrop-blur-xl
      "
        >
          <DropdownMenuGroup className="flex flex-col gap-1">
            {THEMES.map(({ color, id, label }) => (
              <DropdownMenuItem
                key={id}
                className="p-0 rounded-lg data-[highlighted]:bg-white/10 data-[highlighted]:text-white transition-colors duration-50"
              >
                <button
                  onClick={() => handleThemeSelect(id)}
                  className={cn(
                    `
                w-full flex items-center justify-between
                px-3 py-2 rounded-lg
                text-sm font-medium
                text-gray-300 hover:text-white
                transition-all duration-50
                
                `,
                    {
                      "bg-white/5 text-white border border-white/10":
                        currentTheme.id === id,
                    },
                  )}
                >
                  <div className="flex items-center gap-3">
                    {ThemeIcon(id)}
                    <span>{label}</span>
                  </div>

                  <div
                    style={{ backgroundColor: color }}
                    className="rounded-full size-3 border border-white/20"
                  />
                </button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    // <div>
    //   <DropdownMenu modal={false}>
    //     <DropdownMenuTrigger asChild>
    //       <Button>
    //         <Palette className="size-4" />
    //         {currentTheme.label}
    //         <div
    //           style={{ backgroundColor: currentTheme.color }}
    //           className="rounded-full size-4 border border-gray-500"
    //         />
    //       </Button>
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent className=" bg-primary border-none" align="start">
    //       <DropdownMenuGroup className="flex flex-col gap-0">
    //         {THEMES.map(({ color, id, label }) => (
    //           <DropdownMenuItem key={id} className="p-0">
    //             <Button
    //               className={cn(
    //                 `rounded-none w-full flex font-semibold py-1 px-2 items-center justify-between gap-6`,
    //                 {
    //                   "rounded-sm border-2 border-gray-600":
    //                     currentTheme.id === id,
    //                 },
    //               )}
    //               onClick={() => handleThemeSelect(id)}
    //             >
    //               <div className="flex gap-3">
    //                 {ThemeIcon(id)}
    //                 <span>{label}</span>
    //               </div>
    //               <div
    //                 style={{ backgroundColor: color }}
    //                 className="rounded-full size-4 border border-gray-500"
    //               />
    //             </Button>
    //           </DropdownMenuItem>
    //         ))}
    //       </DropdownMenuGroup>
    //     </DropdownMenuContent>
    //   </DropdownMenu>
    // </div>
  );
};

export default ThemeSelector;
