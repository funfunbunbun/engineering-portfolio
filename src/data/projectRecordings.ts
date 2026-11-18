import type { ProjectId } from "./projects";

export const projectRecordings: Partial<Record<ProjectId, {
  file: string; poster: string; label: string; caption: string; source: string;
}>> = {
  "vehicle-velocity": {
    file: "vehicle-speed-demo.mp4", poster: "vehicle-demo-poster.webp",
    label: "Recorded vehicle detection with speed annotations",
    caption: "Original recording with vehicle boxes, tracking IDs and speed annotations.",
    source: "Final-year project recording · silent excerpt",
  },
  "plc-sorting": {
    file: "plc-sorting-demo.mp4", poster: "plc-video-poster.webp",
    label: "Recorded PLC sorting machine demonstration",
    caption: "A metal puck passing the conveyor's optical-sensor stage, with the HMI status shown in the recording.",
    source: "Sorting-machine project video · 3-second silent excerpt",
  },
  "flood-control": {
    file: "pump-control-demo.mp4", poster: "pump-video-poster.webp",
    label: "Recorded pump controller prototype demonstration",
    caption: "The prototype's level-selection inputs and pump assembly during a demonstration.",
    source: "Automated underground flood detection and pump project video · 3-second silent excerpt",
  },
};
