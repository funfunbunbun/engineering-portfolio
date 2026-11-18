import type { ProjectId } from "./projects";
import { advancedContext } from "./advancedContext";
export type Figure = {
  file: string;
  alt: string;
  caption: string;
  source: string;
};
export type ProjectContext = {
  setting: string;
  background: string;
  application: string;
  evidence: string;
  figures: Figure[];
};
export const projectContext: Record<ProjectId, ProjectContext> = {
  ...advancedContext,
  "vehicle-velocity": {
    setting: "Final-year project · USM mechatronics",
    background:
      "A camera-based traffic-monitoring system built around a Raspberry Pi 5 and Hailo-8 accelerator. It combines YOLO vehicle detection, tracking and perspective mapping to estimate vehicle speed, with output presented through a web dashboard.",
    application:
      "Traffic observation and low-cost monitoring are the motivating applications. The final-year work investigated YOLOv8 and YOLO26, video processing and system validation.",
    evidence:
      "Summary paraphrased from the final thesis abstract. The clip below is original recorded project output.",
    figures: [],
  },
  "smart-classroom": {
    setting: "Academic IoT capstone concept",
    background:
      "A classroom is a useful setting for exploring how occupancy and environmental inputs can drive lighting and fan decisions. The portfolio brief lists this project as an academic capstone.",
    application:
      "Intended setting: classroom comfort and room-resource control. The browser rules are teaching examples, with no live classroom connection.",
    evidence:
      "Brief-based context. The original capstone source has not been reviewed.",
    figures: [],
  },
  "fpga-fan": {
    setting: "USM mechatronics laboratory project",
    background:
      "The report documents a temperature-responsive fan controller using an LM35 sensor, analog comparators, a buffer stage, FPGA logic, and a motor driver. It connects analog sensing with digital PWM control.",
    application:
      "Intended application: temperature-responsive cooling for electronic systems. The documented build is a laboratory demonstrator, not a deployed cooling product.",
    evidence:
      "Report architecture and selected figures have been reviewed. The interactive waveform uses illustrative timings.",
    figures: [
      {
        file: "fan-oscilloscope.webp",
        alt: "Oscilloscope display from the fan controller report appendix.",
        caption:
          "An original oscilloscope readout from fan-controller testing.",
        source: "FPGA fan controller report, page 32",
      },
      {
        file: "fan-control-diagram.webp",
        alt: "Report block diagram linking temperature sensing, comparators, a buffer, FPGA GPIO, and the motor circuit.",
        caption: "The original signal chain, from sensing to the fan driver.",
        source: "Fan controller report, page 6 · Figure 2.1",
      },
      {
        file: "fan-prototype.webp",
        alt: "FPGA development board and wired fan-control circuitry inside the demonstration enclosure.",
        caption: "The laboratory prototype in its demonstration enclosure.",
        source: "Fan controller report, page 20 · Figure 2.3a",
      },
    ],
  },
  "plc-sorting": {
    setting: "USM Mechatronic Design 1 · 2023/24",
    background:
      "A conveyor, PLC, sensors, pneumatic diverter, and HMI separate objects by material and height. The report frames the work around recycling and automated material handling.",
    application:
      "Intended application: sorting recyclable materials. The university machine demonstrates sensing and routing; it is not evidence of an industrial deployment.",
    evidence:
      "The report documents optical presence sensing, height detection, inductive metal detection, and HMI states. The browser model simplifies the machine and categories.",
    figures: [
      {
        file: "sorting-metal-detection.webp",
        alt: "A metal puck on the conveyor beside the inductive sensor.",
        caption: "A metal puck at the sensor stage.",
        source: "Sorting machine report, page 27 · conveyor results",
      },
      {
        file: "sorting-diverter.webp",
        alt: "The conveyor actuator diverting a puck from the belt.",
        caption: "The diverter routes the detected object.",
        source: "Sorting machine report, page 27 · conveyor results",
      },
    ],
  },
  "heart-monitor": {
    setting: "USM Microprocessor I mini-project · 2023/24",
    background:
      "A group project combining a VisionFive 2 RISC-V board, ultrasonic presence sensing, a MAX30102 optical sensor, an 8051-family microcontroller, and a 16×2 LCD. The work explored a guided measurement interaction.",
    application:
      "Proposed setting: a self-service check-up station. This was an academic prototype; no clinical deployment, certification, or diagnostic accuracy is claimed.",
    evidence:
      "The report describes the sensor, processing and LCD architecture. The browser simplifies this to finger placement and a simulated capture.",
    figures: [
      {
        file: "heart-oscilloscope.webp",
        alt: "Oscilloscope capture from the heartbeat monitor report.",
        caption: "Original oscilloscope readout during sensor testing.",
        source: "Heartbeat and SpO₂ report, page 47",
      },
      {
        file: "heart-block-diagram.webp",
        alt: "Ultrasonic and heartbeat sensors connect to VisionFive processing, an 8051 microcontroller, and an LCD.",
        caption: "How sensing, processing, and display stages connect.",
        source: "Heartbeat and SpO₂ report, page 18 · block diagram",
      },
    ],
  },
  "traffic-light": {
    setting: "USM mechatronic engineering practice project",
    background:
      "An Arduino Nano pedestrian-crossing demonstrator with LEDs, a pushbutton, and a model road. A crossing request interrupts the normal traffic-go state and starts a sequence.",
    application:
      "Intended application: explaining pedestrian-request traffic control. The evidence is a scale model, not a controller installed on a public road.",
    evidence:
      "The report documents the Nano-based prototype and construction. The browser sequence is simplified and must not control real traffic.",
    figures: [
      {
        file: "traffic-prototype.webp",
        alt: "Isometric view of the physical pedestrian-crossing model.",
        caption: "The physical crossing model built for the project.",
        source: "Traffic-light report, page 20 · isometric view",
      },
      {
        file: "traffic-top-view.webp",
        alt: "Top view of the model road and pedestrian crossing.",
        caption: "Road and crossing layout, viewed from above.",
        source: "Traffic-light report, page 20 · top view",
      },
    ],
  },
  "flood-control": {
    setting: "USM Basic Circuit Laboratory · 2022/23",
    background:
      "A water-level detector and pump controller built around an NE555 timer. The project connects conductive level sensing to a pump-control stage.",
    application:
      "Proposed setting: drainage of underground residential or commercial spaces. The evidence is a laboratory prototype, not an installed flood-protection system.",
    evidence:
      "The report documents the circuit and breadboard. The browser threshold model illustrates the idea rather than reproducing the analog circuit.",
    figures: [
      {
        file: "flood-prototype.webp",
        alt: "Breadboard prototype of the water-level detection and pump-control circuit.",
        caption: "The original laboratory circuit assembly.",
        source: "Flood detection and pump report, page 19 · appendix",
      },
    ],
  },
  "trolley-cad": {
    setting: "USM Engineering Drawing & CAD · 2022/23",
    background:
      "A miniature trolley modeled as an assembly of individual parts. The report covers part features, matching dimensions, geometric mates, assembly steps, and rendered views.",
    application:
      "Used as an engineering-drawing and CAD exercise. This is a digital model, not a manufactured or load-tested trolley.",
    evidence:
      "The report supports the CAD workflow and assembly rendering. Manufacturing tolerances and structural performance are not verified.",
    figures: [
      {
        file: "trolley-assembly.webp",
        alt: "Rendered CAD assembly of a miniature trolley with basket, handle, seat, frame, and wheels.",
        caption: "The completed miniature trolley assembly render.",
        source: "Miniature trolley CAD report, PDF page 44",
      },
    ],
  },
  "atm-interface": {
    setting: "USM Computer Programming for Engineers",
    background:
      "A C++ terminal program modeling an ATM-style interaction. The report explores registration, login, administration, and service operations as a programming exercise.",
    application:
      "Used to practice console interfaces, control flow, and program structure. It was not a banking system or a service handling real accounts.",
    evidence:
      "The original menu flowchart is shown. Account records, credentials, and terminal screenshots containing identifiers are excluded.",
    figures: [
      {
        file: "atm-flowchart.webp",
        alt: "Original flowchart from Start to Login, Register, or Admin menu options.",
        caption: "The top-level terminal interaction flow.",
        source: "ATM interface report, PDF page 9",
      },
    ],
  },
  "spring-study": {
    setting: "Pre-university physics investigation · 2020/21",
    background:
      "A comparative investigation of spring deformation using different materials. Applied load and extension were used to discuss elastic behavior and Hooke’s law.",
    application:
      "Used to develop measurement, plotting, and interpretation skills in physics. It was not a qualification test for a commercial spring.",
    evidence:
      "The report supports the investigation topic. Raw measurements and certified material specifications are not reproduced.",
    figures: [],
  },
  "battery-study": {
    setting: "Pre-university chemistry investigation",
    background:
      "An investigation of an aluminium–alkaline electrochemical cell and how electrolyte conditions relate to electrical output.",
    application:
      "Used as an academic electrochemistry investigation. It is not a commercial battery, a construction guide, or evidence of a product performance advantage.",
    evidence:
      "The report supports the research question. Construction recipes, historical material-handling methods, and unverified performance claims are omitted.",
    figures: [],
  },
};
