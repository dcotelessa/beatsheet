import { createContext, Dispatch } from "react";
import { BeatSheetProps } from "@/components/beatsheet";

type BeatSheetAction = {
  type: string;
  payload: any; // Replace 'any' with the shape of your action payload
};

export const BeatSheetContext = createContext<BeatSheetProps | null>(null);
export const BeatSheetDispatchContext =
  createContext<Dispatch<BeatSheetAction> | null>(null);
