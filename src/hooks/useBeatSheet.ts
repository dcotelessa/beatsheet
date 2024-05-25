import { useReducer } from "react";
import { BeatSheetProps } from "@/components/beatsheet";
import { ActProps } from "@/components/act";
import { BeatProps } from "@/components/beat";

type Action =
  | { type: "LOAD_BEATSHEET"; payload: { beatSheet: BeatSheetProps } }
  | { type: "UPDATE_TITLE"; payload: { title: string } }
  | { type: "ADD_ACT"; payload: { act: ActProps } }
  | {
      type: "UPDATE_ACT_DESCRIPTION";
      payload: { actId: string; act: Partial<ActProps> };
    }
  | { type: "UPDATE_ACT"; payload: { actId: string; act: Partial<ActProps> } }
  | { type: "DELETE_ACT"; payload: { actId: string } }
  | { type: "ADD_BEAT"; payload: { actId: string; beat: BeatProps } }
  | {
      type: "UPDATE_BEAT";
      payload: { actId: string; beatId: string; beat: Partial<BeatProps> };
    }
  | { type: "DELETE_BEAT"; payload: { actId: string; beatId: string } };

function beatSheetDispatchReducer(beatsheet: BeatSheetProps, action: Action) {
  switch (action.type) {
    case "LOAD_BEATSHEET": {
      return action.payload.beatSheet;
    }
    case "UPDATE_TITLE": {
      return {
        ...beatsheet,
        title: action.payload.title,
      };
    }
    case "ADD_ACT": {
      return {
        ...beatsheet,
        acts: [...beatsheet.acts, action.payload.act],
      };
    }
    case "UPDATE_ACT_DESCRIPTION": {
      const newActs = beatsheet.acts.map((act: ActProps) => {
        if (act.id === action.payload.actId) {
          return {
            ...act,
            ...action.payload.act,
          };
        }
        return act;
      });
      return {
        ...beatsheet,
        acts: newActs,
      };
    }
    case "UPDATE_ACT": {
      const newActs = beatsheet.acts.map((act: ActProps) => {
        if (act.id === action.payload.actId) {
          return { ...act, ...action.payload.act };
        }
        return act;
      });
      return {
        ...beatsheet,
        acts: newActs,
      };
    }
    case "DELETE_ACT": {
      const newActs = beatsheet.acts.filter(
        (act: ActProps) => act.id !== action.payload.actId,
      );
      return {
        ...beatsheet,
        acts: newActs,
      };
    }
    case "ADD_BEAT": {
      const newActs = beatsheet.acts.map((act: ActProps) => {
        if (act.id === action.payload.actId) {
          return {
            ...act,
            beats: [...act.beats, action.payload.beat],
          };
        }
        return act;
      });
      return {
        ...beatsheet,
        acts: newActs,
      };
    }
    case "UPDATE_BEAT": {
      const newActs = beatsheet.acts.map((act: ActProps) => {
        if (act.id === action.payload.actId) {
          const newBeats = act.beats.map((beat) => {
            if (beat.id === action.payload.beatId) {
              return { ...beat, ...action.payload.beat };
            }
            return beat;
          });
          return {
            ...act,
            beats: newBeats,
          };
        }
        return act;
      });
      return {
        ...beatsheet,
        acts: newActs,
      };
    }

    case "DELETE_BEAT": {
      const newActs = beatsheet.acts.map((act: ActProps) => {
        if (act.id === action.payload.actId) {
          const newBeats = act.beats.filter(
            (beat) => beat.id !== action.payload.beatId,
          );
          return {
            ...act,
            beats: newBeats,
          };
        }
        return act;
      });
      return {
        ...beatsheet,
        acts: newActs,
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

export default function useBeatSheet() {
  const initialBeatSheetData: BeatSheetProps = {
    _id: "",
    id: "",
    title: "",
    acts: [],
  };

  const [beatsheet, beatsheetDispatch] = useReducer(
    beatSheetDispatchReducer,
    initialBeatSheetData,
  );

  return [beatsheet, beatsheetDispatch];
}
