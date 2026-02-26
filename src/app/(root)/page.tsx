import { GripVertical } from "lucide-react";
import { Group, Separator } from "react-resizable-panels";
import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanelTrial from "./_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0c10] p-6">
      <div className="max-w-450 mx-auto">
        <Header />
        <div className="h-full">
          {" "}
          <Group
            className="
    relative rounded-xl overflow-hidden
    border border-white/5
    bg-[#111218]
    shadow-[0_20px_60px_rgba(0,0,0,0.45)]
    backdrop-blur-xl
  "
          >
            {/* Editor Panel */}
            <EditorPanel />

            {/* Separator (Resizable Handle) */}
            <Separator
              className="
      relative flex items-center justify-center
      w-[10px] 
      bg-[#0f1015]
      transition-colors duration-200
      hover:bg-[#151720]
      group
    "
            >
              {/* Center Grip Indicator */}
              <div
                className="
        flex items-center justify-center
        h-10 w-[3px]
        rounded-full
        bg-white/10
        group-hover:bg-blue-400/40
        transition-all duration-200
      "
              >
                <GripVertical
                  size="1rem"
                  className="text-gray-600 group-hover:text-blue-400 transition-colors"
                />
              </div>
            </Separator>

            {/* Output Panel */}
            <OutputPanelTrial />
          </Group>
        </div>
      </div>
    </div>
  );
}
