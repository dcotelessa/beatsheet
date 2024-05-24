import React, { useContext, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BeatSheetDispatchContext } from "@/context/";
import { Heading } from "@radix-ui/themes";
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
import { Button, Section } from "@radix-ui/themes";
import { montserrat } from "@/components/fonts";
import formatMillisecondsToTime from "@/utils/formatMillisecondsToTime";
import DragHandleDotsIcon from "@/images/drag-handle-dots-icon";
import Beat, { BeatProps } from "./beat";

export type ActProps = {
  id: string;
  description: string;
  timestamp: number;
  timeStart: number;
  beats: BeatProps[];
  bgcolor: string;
};

function Act(props: ActProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBeatOpen, setIsBeatOpen] = useState(false);
  const dispatch = useContext(BeatSheetDispatchContext);
  const { id, timeStart, description, beats, bgcolor } = props;
  const [newDescription, setNewDescription] = useState(description);
  const [newAct, setNewAct] = useState({
    description: "",
    duration_sec: 0,
    duration_min: 0,
    cameraAngle: "",
  });
  const timeStartDisplay = formatMillisecondsToTime(timeStart);
  const duration = beats.reduce((acc, beat) => {
    return acc + beat.duration;
  }, 0);
  const timeEnd = timeStart + duration;
  const timeEndDisplay = formatMillisecondsToTime(timeEnd);
  const timeRange = `(${timeStartDisplay} - ${timeEndDisplay})`;

  const handleAddBeat = useCallback(
    (actId: string) => {
      return () => {
        const { description, duration_min, duration_sec, cameraAngle } = newAct;
        const min = duration_min * 1000 * 60;
        const sec = duration_sec * 1000;
        const duration = min + sec;
        dispatch({
          type: "ADD_BEAT",
          payload: {
            actId,
            beat: {
              id: uuidv4(),
              description,
              timestamp: new Date().getTime(),
              duration,
              cameraAngle,
            },
          },
        });
        setIsBeatOpen(false);
      };
    },
    [dispatch, newAct],
  );

  const handleBeatDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewAct({
      ...newAct,
      description: event.target.value,
    });
  };

  const handleBeatDurationSecChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewAct({
      ...newAct,
      duration_sec: Number(event.target.value),
    });
  };

  const handleBeatDurationMinChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewAct({
      ...newAct,
      duration_min: Number(event.target.value),
    });
  };

  const handleBeatCameraAngleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewAct({
      ...newAct,
      cameraAngle: event.target.value,
    });
  };

  const handleDeleteAct = useCallback(
    (actId: string, beatId: string) => {
      return () => {
        dispatch({
          type: "DELETE_ACT",
          payload: {
            actId,
          },
        });
      };
    },
    [dispatch],
  );

  const handleUpdateAct = useCallback(
    (actId: string) => {
      return () => {
        dispatch({
          type: "UPDATE_ACT_DESCRIPTION",
          payload: {
            actId,
            act: {
              description: newDescription,
              timestamp: new Date().getTime(),
            },
          },
        });

        setIsOpen(false);
      };
    },
    [dispatch, newDescription],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };

  return (
    <Section
      className="flex pt-4 pb-10 px-10 w-full"
      style={{ backgroundColor: bgcolor }}
    >
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col sm:flex-row justify-between py-4 gap-4">
          <div
            className={clsx(
              montserrat.className,
              "flex grow flex-row items-center",
            )}
          >
            <DragHandleDotsIcon className="w-6 h-6 fill-gray-500 " />
            <div className="flex flex-row items-end gap-4">
              <Heading size="6" weight="bold">
                {description}
              </Heading>
              <span>{timeRange}</span>
            </div>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="flex w-fit flex-row cursor-pointer">
                Edit Act
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Act</DialogTitle>
                <DialogDescription>
                  Update title to your act. Click save when you're done.
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
                  onClick={handleUpdateAct(id)}
                >
                  Add Act
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            color="red"
            className="flex cursor-pointer"
            onClick={handleDeleteAct(id)}
          >
            Delete Act
          </Button>
        </div>
        <div className="w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 w-auto">
            {beats.map((beat) => {
              return <Beat key={`beat-${beat.id}`} {...beat} actId={id} />;
            })}

            <Dialog open={isBeatOpen} onOpenChange={setIsBeatOpen}>
              <DialogTrigger asChild>
                <Button className="flex w-min h-auto justify-center bg-gray-800 bg-opacity-15 hover:bg-opacity-30 rounded-lg p-4 cursor-pointer">
                  +
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Beat</DialogTitle>
                  <DialogDescription>
                    Add description, duration and camera angle to your beat.
                    Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      onChange={handleBeatDescriptionChange}
                      defaultValue={newAct.description}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="duration_min" className="text-right">
                      Minutes
                    </Label>
                    <Input
                      id="duration_min"
                      type="number"
                      onChange={handleBeatDurationMinChange}
                      defaultValue={newAct.duration_min}
                      className="col-span-2"
                    />
                    <Label htmlFor="duration_sec" className="text-right">
                      Seconds
                    </Label>
                    <Input
                      id="duration_sec"
                      type="number"
                      onChange={handleBeatDurationSecChange}
                      defaultValue={newAct.duration_sec}
                      className="col-span-2"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="camera_angle" className="text-right">
                      Camera Angle
                    </Label>
                    <Input
                      id="camera_angle"
                      onChange={handleBeatCameraAngleChange}
                      defaultValue={newAct.cameraAngle}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className="cursor-pointer"
                    type="submit"
                    onClick={handleAddBeat(id)}
                  >
                    Add Beat
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Act;
