import React, { useCallback, useContext, useState } from "react";
import { Heading, Button } from "@radix-ui/themes";
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
import { montserrat } from "@/components/fonts";
import { BeatSheetDispatchContext } from "@/context/";
import formatMillisecondsToTime from "@/utils/formatMillisecondsToTime";
import CameraAngleIcon from "@/images/camera-angle-icon";
import DragHandleDotsIcon from "@/images/drag-handle-dots-icon";

export type BeatProps = {
  id: string;
  actId: string;
  timeStart: number;
  timestamp: number;
  description: string;
  duration: number;
  cameraAngle: string;
};

function Beat(props: BeatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useContext(BeatSheetDispatchContext);

  const { id, actId, timeStart, description, duration, cameraAngle } = props;
  const duration_min = Math.floor(duration / 60000);
  const duration_sec = Math.floor((duration % 60000) / 1000);
  const [newAct, setNewAct] = useState({
    description,
    duration_sec,
    duration_min,
    cameraAngle,
  });
  const timeDisplay = formatMillisecondsToTime(timeStart);
  const durationDisplay = formatMillisecondsToTime(duration);

  const handleUpdateBeat = useCallback(
    (actId: string, beatId: string) => {
      return () => {
        const { description, duration_min, duration_sec, cameraAngle } = newAct;
        const min = duration_min * 1000 * 60;
        const sec = duration_sec * 1000;
        const duration = min + sec;
        dispatch({
          type: "UPDATE_BEAT",
          payload: {
            actId,
            beatId,
            beat: {
              description,
              timestamp: new Date().getTime(),
              duration,
              cameraAngle,
            },
          },
        });
        setIsOpen(false);
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

  const handleRemoveBeat = useCallback(
    (actId: string, beatId: string) => () => {
      dispatch({
        type: "DELETE_BEAT",
        payload: {
          actId,
          beatId,
        },
      });
    },
    [dispatch],
  );

  return (
    <div
      data-testid="beat"
      className="flex flex-col h-auto bg-gray-600 rounded-lg p-4 shadow-lg gap-2"
    >
      <div className="flex w-full flex-row">
        <div className="flex flex-row grow items-center gap-2">
          <DragHandleDotsIcon className="w-6 h-6 fill-gray-500" />
          <Heading size="4" weight="bold" className={montserrat.className}>
            {timeDisplay}
          </Heading>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex cursor-pointer">
              <p>e</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Beat</DialogTitle>
              <DialogDescription>
                Update description, duration and camera angle to your beat.
                Click save when you&apos;re done.
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
                onClick={handleUpdateBeat(actId, id)}
              >
                Update Beat
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          color="red"
          className="flex cursor-pointer"
          onClick={handleRemoveBeat(actId, id)}
        >
          <p>-</p>
        </Button>
      </div>
      <p className="p-2 grow">{description}</p>
      <div className="flex flex-row items-center bg-gray-400 p-2 rounded-lg gap-2">
        <CameraAngleIcon className="w-6 h-6 fill-gray-500" />
        <p className="text-gray-900">{cameraAngle}</p>
      </div>
      <p className="p-2">
        Duration: <span>{durationDisplay}</span>
      </p>
    </div>
  );
}

export default Beat;
