import type { ProjectContext } from "./projectContext";
export const advancedContext: Record<
  | "robot-recycling"
  | "planting-trajectory"
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
  "planting-trajectory": {
    setting: "USM EEM343 Robotics · trajectory assignment",
    background:
      "A six-degree-of-freedom arm on a mobile platform is used as a paddy-planting scenario. The task is to construct a trajectory between pickup and planting locations through via points while accounting for a modeled obstacle.",
    application:
      "Used as an academic motion-planning exercise. Paddy planting supplies a concrete scenario for geometric path reasoning, not evidence of agricultural deployment.",
    evidence:
      "The selected plot is the original assignment simulation. Its coordinates describe the modeled exercise, not live machine calibration.",
    figures: [
      {
        file: "planting-simulation.webp",
        alt: "Three-dimensional simulated planting path with via points and a rectangular obstacle.",
        caption: "The assignment’s simulated path around a modeled obstacle.",
        source: "Robotics Assignment 2 · 3D trajectory plot",
      },
    ],
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
