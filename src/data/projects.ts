export type ProjectId =
  "vehicle-velocity" | "smart-classroom" | "fpga-fan" | "plc-sorting";
export type Project = {
  id: ProjectId;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  status: "Interactive simulation" | "Concept illustration";
  description: string;
  problem: string;
  approach: string;
  limitations: string;
  tour: { title: string; text: string }[];
};

export const projects: Project[] = [
  {
    id: "vehicle-velocity",
    number: "01",
    title: "Seeing speed.",
    subtitle: "Vehicle velocity estimation",
    category: "Computer Vision",
    tags: ["YOLO", "Raspberry Pi 5", "Computer Vision"],
    status: "Concept illustration",
    description:
      "A visual introduction to turning video observations into vehicle speed estimates.",
    problem: "How can a camera help estimate the speed of a moving vehicle?",
    approach:
      "Explore the conceptual chain from video input to detection, tracking, spatial calibration, and distance over time. Recorded results will be added after review.",
    limitations:
      "No footage, detections, measured accuracy, or runtime results are supplied. Camera geometry, calibration, occlusion, frame timing, and tracking errors affect monocular speed estimation.",
    tour: [
      {
        title: "Start with a frame",
        text: "This showcase introduces a university project on vehicle velocity estimation using YOLO and Raspberry Pi 5. The current view is an illustration awaiting approved project footage.",
      },
      {
        title: "Follow the pipeline",
        text: "A detector locates vehicles. Tracking associates observations over time. Spatial calibration is needed to relate image positions to real distances.",
      },
      {
        title: "Understand the estimate",
        text: "Speed is distance divided by elapsed time. Calibration, perspective, occlusion, and timing can affect the estimate. No measured results are claimed here.",
      },
    ],
  },
  {
    id: "smart-classroom",
    number: "02",
    title: "A room that responds.",
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
      "All sensor values and events are generated in this browser. Thresholds are illustrative, with no live classroom connection or measured energy-saving claim.",
    tour: [
      {
        title: "Set the scene",
        text: "This browser simulation represents a classroom using temperature, ambient light, occupancy, and carbon dioxide inputs. No live sensors are connected.",
      },
      {
        title: "Change an input",
        text: "Increase the temperature beyond 27 degrees while the room is occupied to turn on the fan. Lower the light level below 300 lux to turn on the lights.",
      },
      {
        title: "Inspect the decision",
        text: "Engineering Mode shows the exact rules and an event history. Emptying the room disables the fan and lights. High simulated carbon dioxide still triggers a ventilation alert.",
      },
    ],
  },
  {
    id: "fpga-fan",
    number: "03",
    title: "Small pulses. Big control.",
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
      "Fan animation is illustrative. RPM is not measured and is not assumed to scale linearly with duty cycle. No specific FPGA timing or temperature-sensor implementation is claimed.",
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
    title: "Sense. Decide. Sort.",
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
      "Categories, conveyor geometry, and transition timing are illustrative. No live PLC, safety logic, or verified machine behavior is reproduced.",
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
