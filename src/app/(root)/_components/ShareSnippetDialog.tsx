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
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaShare } from "react-icons/fa";
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
        <DialogTrigger asChild>
          <Button
            className="bg-linear-to-r
               from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity"
          >
            <FaShare />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25 bg-primary border-none">
          <DialogHeader>
            <DialogTitle>Share Snippet</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                onChange={handleInputChange}
                id="title"
                name="name"
                placeholder="Enter snippet title"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSharing || !title}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              disabled:opacity-50"
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
