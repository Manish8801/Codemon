"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useMutation } from "convex/react";
import { LucideShare } from "lucide-react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../convex/_generated/api";

const ShareSnippetDialog = () => {
  const [title, setTitle] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const { language, getCode } = useCodeEditorStore();
  const createSnippet = useMutation(api.snippets.createSnippet);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSharing(true);
    try {
      const code = getCode();
      await createSnippet({ title, language, code });
      setTitle("");
      toast.success("Snippet shared successfully");
    } catch (error) {
      toast.error("Error creating snippet");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Dialog>
      <form>
        {/* Trigger Button */}
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="
          flex items-center gap-2
          h-9 px-3
          bg-[#14161d] border border-white/5
          hover:bg-[#1a1b22] hover:border-white/10
          text-gray-300 hover:text-white
          rounded-lg
          transition-all duration-200
        "
          >
            <LucideShare className="size-4 text-gray-400" />
            Share
          </Button>
        </DialogTrigger>

        {/* Dialog Panel */}
        <DialogContent
          className="
        sm:max-w-[425px]
        bg-[#111218]
        border border-white/5
        rounded-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        p-6
        space-y-4
      "
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              Share Snippet
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
              Enter a title for your snippet
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-gray-300">
                Title
              </Label>
              <Input
                id="title"
                name="name"
                placeholder="Enter snippet title"
                className="bg-[#14161d] border border-white/5 text-white placeholder-gray-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-md"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="bg-[#14161d] border border-white/5 hover:bg-[#1a1b22] text-gray-300 hover:text-white rounded-lg transition-all duration-200"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isSharing || !title}
              className={`
            px-4 py-2 rounded-lg
            bg-blue-600 text-white
            hover:bg-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
          `}
              onClick={handleShare}
            >
              {isSharing ? "Sharing..." : "Share"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ShareSnippetDialog;
