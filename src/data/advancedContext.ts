import type { ProjectContext } from "./projectContext";
export const advancedContext: Record<
  | "robot-recycling"
  | "nano-hmi"
  | "weather-expert"
  | "sentiment-analysis"
  | "neural-classifiers",
  ProjectContext
> = {
  "robot-recycling": {
    setting: "USM EEM343 Robotics · group mini-project",
    background:
      "The project combines a 7-DOF collaborative arm, a gripper, inductive/capacitive material sensing, and motion planning for a small recycling cell. The report also documents a MATLAB model alongside the physical setup.",
    application:
      "University laboratory use: exploring sensor-informed pick-and-place for material recovery. Industrial recycling is the motivating application; no factory deployment is claimed.",
    evidence:
      "Architecture and process diagrams are selected from the academic report. Hardware addresses, calibration details, controller projects, and motion-command source remain private.",
    figures: [
      {
        file: "robot-system-diagram.webp",
        alt: "Report block diagram connecting object sensing and MATLAB simulation to robot control, motion execution, and sorted output.",
        caption:
          "The sensing, planning, and execution stages of the recycling cell.",
        source: "Robotics mini-project report · Figure 4.9",
      },
      {
        file: "robot-sorting-flow.webp",
        alt: "Process flow from startup and object sensing to metal or non-metal sorting destinations.",
        caption: "The report’s high-level sorting sequence.",
        source: "Robotics mini-project report · Figure 4.8",
      },
    ],
  },
  "nano-hmi": {
    setting: "Independent embedded-interface project",
    background:
      "A touchscreen-style desktop HMI built with Tkinter communicates with an Arduino Nano over USB serial. The host buffers typed values, sends confirmed entries and reports the device response.",
    application:
      "A bench interface for studying PC-to-microcontroller communication and keypad-style control. The original graphical interface runs on the PC, while the Nano handles serial commands and outputs.",
    evidence:
      "Based on the project documentation. The portfolio uses a separate browser simulation, without the original firmware, protected menus or hardware settings.",
    figures: [],
  },
  "weather-expert": {
    setting:
      "USM EEM348 Principles of Intelligent Systems · expert-system assignment",
    background:
      "The project applies IF–THEN weather rules and certainty-factor reasoning in Python. The report describes tests with simulated conditions and weather data; the public version isolates the reasoning so it works without a service account.",
    application:
      "Academic use: studying explainable inference under uncertainty. Weather is the case study; this portfolio does not provide a live forecast or a weather-warning service.",
    evidence:
      "The certainty-factor method is supported by the report. Only a self-contained explanatory algorithm is included; original data-fetching code, configuration, API details, and application screenshots are excluded.",
    figures: [],
  },
  "sentiment-analysis": {
    setting:
      "USM EEM348 Principles of Intelligent Systems · neural-network assignment",
    background:
      "Product-review sentiment is modeled with TF-IDF text features and a PyTorch multilayer perceptron. The report explores model structure, preprocessing, training, and evaluation.",
    application:
      "Used to investigate binary text classification in an academic setting. The application is understanding positive/negative language in reviews, not a deployed customer-analytics product.",
    evidence:
      "The report and small classifier/preprocessing modules were inspected without executing them. The public sketch omits private review records, data files, saved models, account settings, and full application source.",
    figures: [],
  },
  "neural-classifiers": {
    setting:
      "USM EEM348 Principles of Intelligent Systems · MATLAB mini-project",
    background:
      "The project begins with a single-layer perceptron for AND logic, then explores multilayer classification and principal-component reduction for high-dimensional inputs.",
    application:
      "Used as a neural-network learning exercise: relate weights and a threshold to a simple decision, then consider larger classification problems.",
    evidence:
      "The architecture figure comes from the mini-project report. The public AND-gate example uses deliberately illustrative weights and contains no original dataset or trained model.",
    figures: [
      {
        file: "perceptron-architecture.webp",
        alt: "Perceptron architecture showing a weighted sum, bias, hard-limit activation, and binary output.",
        caption:
          "The weighted-sum and threshold structure of the report’s perceptron.",
        source: "Intelligent Systems mini-project · Figure 4",
      },
    ],
  },
};
