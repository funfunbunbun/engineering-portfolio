import { additionalProjects } from "./additionalProjects";
import { advancedProjects } from "./advancedProjects";

export type ProjectId =
  | "vehicle-velocity"
  | "smart-classroom"
  | "fpga-fan"
  | "plc-sorting"
  | "heart-monitor"
  | "traffic-light"
  | "flood-control"
  | "trolley-cad"
  | "atm-interface"
  | "spring-study"
  | "battery-study"
  | "robot-recycling"
  | "nano-hmi"
  | "weather-expert"
  | "sentiment-analysis"
  | "neural-classifiers";
export type Project = {
  id: ProjectId;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  status:
    "Interactive simulation" | "Concept illustration" | "Documented project";
  description: string;
  problem: string;
  approach: string;
  limitations: string;
  tour: { title: string; text: string }[];
};

const coreProjects: Project[] = [
  {
    id: "vehicle-velocity",
    number: "01",
    title: "Vehicle detection and speed estimation",
    subtitle: "YOLO, Raspberry Pi 5 and Hailo-8",
    category: "Computer Vision",
    tags: ["YOLO", "Raspberry Pi 5", "Computer Vision"],
    status: "Documented project",
    description:
      "A final-year traffic-monitoring project using YOLO, a Raspberry Pi 5 and Hailo-8 acceleration to detect and track vehicles and estimate their speed.",
    problem: "How can a camera help estimate the speed of a moving vehicle?",
    approach:
      "The system processes camera footage, detects vehicles, follows tracks over time and uses perspective mapping to estimate road-plane motion. Results are presented through a web dashboard. The project investigated YOLOv8 and YOLO26.",
    limitations:
      "The embedded clip shows recorded project output. Local ONNX inference detects vehicles in one frame; it does not calculate speed or reproduce the full Raspberry Pi system. Estimates depend on camera geometry, calibration, timestamps and tracking quality.",
    tour: [
      {
        title: "Camera input",
        text: "The project uses camera footage to monitor moving vehicles with YOLO on a Raspberry Pi 5 system.",
      },
      {
        title: "Detection and tracking",
        text: "A detector finds vehicles in each frame. Tracking links detections over time, while perspective mapping relates image motion to positions on the road.",
      },
      {
        title: "Recorded output",
        text: "Play the short project recording to see tracking and speed annotations. These are recorded estimates, not a live measurement from this website.",
      },
    ],
  },
  {
    id: "smart-classroom",
    number: "02",
    title: "Smart classroom",
    subtitle: "IoT Smart Classroom",
    category: "IoT",
    tags: ["IoT", "Embedded Systems", "Control Systems"],
    status: "Interactive simulation",
    description:
      "Change the room conditions. Watch simple control rules decide what happens next.",
    problem:
      "How can a classroom respond to occupancy, temperature, and available light?",
    approach:
      "Adjust simulated sensor inputs and inspect the resulting fan, lighting, and ventilation decisions. The rules are educational examples, not recovered firmware.",
    limitations:
      "The room and sensor values are simulated. The demo illustrates simple lighting and fan rules without connecting to a classroom.",
    tour: [
      {
        title: "Set the scene",
        text: "This browser simulation represents a classroom using temperature, ambient light, occupancy and an illustrative air-quality input. No live sensors are connected.",
      },
      {
        title: "Change an input",
        text: "Increase the temperature beyond 27 degrees while the room is occupied to turn on the fan. Lower the light level below 300 lux to turn on the lights.",
      },
      {
        title: "Inspect the decision",
        text: "Engineering Mode shows the demo rules and an event history. Emptying the room disables the fan and lights. High simulated air-quality readings trigger an alert and open the window while the room is occupied.",
      },
    ],
  },
  {
    id: "fpga-fan",
    number: "03",
    title: "FPGA fan controller",
    subtitle: "FPGA PWM fan controller",
    category: "Embedded Systems",
    tags: ["FPGA", "Embedded Systems", "Control Systems"],
    status: "Interactive simulation",
    description:
      "Explore how the on-time of a digital signal changes its duty cycle.",
    problem: "How does a digital output represent different levels of drive?",
    approach:
      "Select a duty cycle and compare the signal waveform with a conceptual fan illustration. The independent project repository supplies this embedded demo.",
    limitations:
      "The waveform timing and fan animation are illustrative. Original prototype photos and oscilloscope results appear below.",
    tour: [
      {
        title: "Meet the signal",
        text: "Pulse-width modulation alternates a signal between high and low. Duty cycle describes the fraction of each period spent high.",
      },
      {
        title: "Try a duty cycle",
        text: "Select 25, 50, 75, or 100 percent. The waveform changes its high-time while keeping the illustrative period fixed.",
      },
      {
        title: "Separate model from measurement",
        text: "The fan graphic provides a qualitative visual cue. It is not a measured RPM response. Reset restores the default 50 percent duty cycle.",
      },
    ],
  },
  {
    id: "plc-sorting",
    number: "04",
    title: "PLC sorting machine",
    subtitle: "PLC & HMI sorting machine",
    category: "Automation",
    tags: ["PLC", "HMI", "Automation"],
    status: "Interactive simulation",
    description:
      "Step through a conveyor sequence and see how sensor states lead to a sorting decision.",
    problem:
      "How can a sequence of sensor decisions route objects to different destinations?",
    approach:
      "Choose an illustrative object category, advance the conveyor sequence, and inspect the state transitions. This is an educational model, not the original PLC program.",
    limitations:
      "The moving conveyor illustrates a simplified PLC sequence. Material categories and movement timings are demonstration values.",
    tour: [
      {
        title: "Choose an object",
        text: "This simplified conveyor has a sensor station and three destinations. The categories are educational examples, not claims about the original machine.",
      },
      {
        title: "Advance the sequence",
        text: "Select an object and press Next step to move from idle, through sensing and routing, to delivery. Run sequence advances the same states automatically.",
      },
      {
        title: "Read the state",
        text: "The current state and sensor indication explain each transition. Reset clears the sequence and delivered counters. This model has no connection to a real PLC.",
      },
    ],
  },
];

export const projects: Project[] = [
  ...coreProjects,
  ...additionalProjects,
  ...advancedProjects,
];
