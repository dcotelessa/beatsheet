import { ActProps } from "@/components/acts";
import { BeatProps } from "@/components/beats";

export default function addTimesToActs(acts: ActProps[]): void {
  return acts.reduce((acc, act) => {
    const { beats } = act;
    act["timeStart"] = acc;
    const duration = beats.reduce((bacc: number, beat: BeatProps) => {
      beat["timeStart"] = bacc;
      return bacc + beat.duration;
    }, acc);
    return duration;
  }, 0);
}
