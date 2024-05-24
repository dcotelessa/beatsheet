import { useReducer } from "react";
import { BeatSheetProps } from "@/components/beatsheet";
import { ActProps } from "@/components/act";

function beatSheetDispatchReducer(beatsheet: BeatSheetProps, action: any) {
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
            description: action.payload.description,
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
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function useBeatSheet() {
  const initialBeatSheetData = {
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
