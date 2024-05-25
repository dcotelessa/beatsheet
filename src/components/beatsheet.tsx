import React, { useCallback, useContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Heading } from "@radix-ui/themes";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Act, { ActProps } from "./act";
import { rockSalt } from "./fonts";
import { BeatSheetContext, BeatSheetDispatchContext } from "@/context/";
import addTimesToActs from "@/utils/addTimesToActs";
import RectangleStackIcon from "@/images/rectangle-stack-icon";

export interface BeatSheetItem {
  _id: string;
  id: string;
  title: number;
  acts: ActProps[];
}

export type BeatSheetProps = {
  _id: string;
  id: string;
  title: number;
  acts: ActProps[];
};

function BeatSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [newDescription, setNewDescription] = useState("New Act");
  const beatSheet = useContext(BeatSheetContext);
  const dispatch = useContext(BeatSheetDispatchContext);
  const { _id, title, acts } = beatSheet || { _id: "", title: "", acts: [] };

  useMemo(async () => {
    addTimesToActs(acts);
    if (false) {
      const res = await fetch(`/api/update/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(beatSheet),
      });
    }
  }, [acts, _id, beatSheet]);

  const handleAddAct = useCallback(() => {
    dispatch({
      type: "ADD_ACT",
      payload: {
        act: {
          id: uuidv4(),
          description: newDescription,
          timestamp: new Date().getTime(),
          beats: [],
        },
      },
    });

    setIsOpen(false);
  }, [dispatch, newDescription]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };

  return (
    <main className="flex min-h-screen align-start flex-col p-10 h-[100vh]">
      <div className="w-full flex justify-between py-10 px-4 bg-gray-300 dark:bg-gray-800">
        <Heading
          size="9"
          className={clsx("font-semibold italic uppercase", rockSalt.className)}
        >
          {title}
        </Heading>
      </div>
      <div className=" border border-white rounded-lg overflow-auto y-full">
        {acts.map((act: ActProps, ndx: number) => {
          return (
            <Act
              key={`act-${act.id}`}
              {...act}
              bgcolor={ndx % 2 ? "#081b2a" : "#0c4a6e"}
            />
          );
        })}
      </div>
      <div className="flex p-4 w-full bg-gray-800 justify-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex w-fit flex-row cursor-pointer">
              <p>+ Add Act</p>
              <RectangleStackIcon className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Act</DialogTitle>
              <DialogDescription>
                Add title to your act. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  onChange={handleInputChange}
                  defaultValue={newDescription}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="cursor-pointer"
                type="submit"
                onClick={handleAddAct}
              >
                Add Act
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

export default BeatSheet;
