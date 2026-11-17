import type { Project } from "./projects";
function entry(project: Omit<Project, "tour">): Project {
  return {
    ...project,
    tour: [
      { title: "Meet the project", text: project.description },
      { title: "Follow the approach", text: project.approach },
      { title: "Know the limits", text: project.limitations },
    ],
  };
}
export const advancedProjects: Project[] = [
  entry({
    id: "robot-recycling",
    number: "12",
    title: "Pick with a purpose.",
    subtitle: "Robotic recycling cell",
    category: "Robotics",
    tags: ["Robotics", "MATLAB", "Sensing"],
    status: "Interactive simulation",
    description:
      "A university recycling-cell project connecting material sensing, robot motion, and sorting logic.",
    problem:
      "How can sensing and planned robot motion cooperate to sort an object?",
    approach:
      "The report documents a Flexiv Rizon 4S collaborative arm, gripper, material sensors, and a parallel MATLAB simulation. Selected diagrams show the path from sensing to a pick-and-place decision.",
    limitations:
      "The portfolio explains the academic system. Robot addresses, serials, calibration tables, actual joint/pose commands, and executable hardware control are excluded.",
  }),
  entry({
    id: "planting-trajectory",
    number: "13",
    title: "Plan the path.",
    subtitle: "Paddy-planting robot trajectory",
    category: "Robotics",
    tags: ["Robotics", "MATLAB", "Motion Planning"],
    status: "Interactive simulation",
    description:
      "A robotics assignment exploring a planting path through via points around a modeled obstacle.",
    problem:
      "How can a robot move from a pickup location to a planting location while respecting an obstacle?",
    approach:
      "The assignment plans straight and curved trajectory segments for a six-degree-of-freedom arm on a mobile platform. A simulation plot shows the academic path and via-point structure.",
    limitations:
      "The plot represents an assignment simulation, not a field-deployed agricultural robot. Physical calibration, collision validation, and real controller commands are not published.",
  }),
  entry({
    id: "weather-expert",
    number: "14",
    title: "Reason through the weather.",
    subtitle: "Certainty-factor weather expert system",
    category: "Intelligent Systems",
    tags: ["Intelligent Systems", "Python", "Rule-Based AI"],
    status: "Interactive simulation",
    description:
      "An explainable weather-reasoning project that combines rule support using certainty factors.",
    problem:
      "How can an expert system combine uncertain evidence into a traceable hypothesis?",
    approach:
      "The report describes a Python rule-based system using temperature, humidity, wind, and cloud-related attributes. The browser lab isolates one safe part: combining two positive rule-support scores for the same hypothesis.",
    limitations:
      "This is an offline explanation of certainty-factor reasoning. A score is not a calibrated rain probability, forecast, or weather alert. No weather-service connection, location history, or API credential is included.",
  }),
  entry({
    id: "sentiment-analysis",
    number: "15",
    title: "From words to a signal.",
    subtitle: "TF-IDF & MLP sentiment analysis",
    category: "Intelligent Systems",
    tags: ["Intelligent Systems", "Python", "PyTorch", "NLP"],
    status: "Interactive simulation",
    description:
      "A text-classification assignment using TF-IDF features and a multilayer perceptron to distinguish positive and negative reviews.",
    problem: "How can text become numerical input to a trainable classifier?",
    approach:
      "The reviewed report and small model/preprocessing modules support a pipeline from review preprocessing to TF-IDF vectorization, an MLP, and held-out evaluation. The portfolio shows the workflow and a minimal algorithm sketch.",
    limitations:
      "No original review text, account data, full interface code, large dataset, saved model, or serialized vectorizer is published. No live trained-model inference or performance score is claimed here.",
  }),
  entry({
    id: "neural-classifiers",
    number: "16",
    title: "Learning a boundary.",
    subtitle: "Perceptron & multilayer neural classifiers",
    category: "Intelligent Systems",
    tags: ["Intelligent Systems", "MATLAB", "Neural Networks"],
    status: "Interactive simulation",
    description:
      "A MATLAB mini-project spanning a simple AND perceptron and multiclass neural-network classification.",
    problem: "How does a weighted sum become a classification decision?",
    approach:
      "The mini-project compares perceptron initialization and explores multilayer classifiers with dimensionality reduction. The browser lab uses an illustrative fixed-weight AND gate to make the decision boundary visible.",
    limitations:
      "The browser weights are educational examples, not the trained project parameters. Full training data, model files, raw metrics, and training scripts are excluded.",
  }),
];
