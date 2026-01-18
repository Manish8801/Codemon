import { GripVertical } from "lucide-react";
import { Group, Separator } from "react-resizable-panels";
import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanelTrial from "./_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-450 mx-auto p-4">
        <Header />

        <div className="">
          <Group>
            <EditorPanel />
            <Separator className="outline-none flex items-center justify-center">
              <GripVertical size="1.2rem" />
            </Separator>
            <OutputPanelTrial />
          </Group>
        </div>
      </div>
    </div>
  );
}
