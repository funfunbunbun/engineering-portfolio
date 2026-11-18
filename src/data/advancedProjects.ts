import type { Project } from "./projects";
export const advancedProjects: Project[] = [
  {
    id: "nano-hmi",
    number: "12",
    title: "Arduino Nano touchscreen HMI",
    subtitle: "Touchscreen-style PC interface and Nano serial communication",
    category: "Embedded Systems",
    tags: ["Arduino Nano", "Serial communication", "Software"],
    status: "Interactive simulation",
    description:
      "A desktop touchscreen-style interface that sends confirmed inputs to an Arduino Nano and displays its responses.",
    problem:
      "How can a PC interface pass validated inputs to a small embedded controller?",
    approach:
      "The documented project uses a Python/Tkinter interface, USB serial and classic Nano firmware. Inputs are buffered until Enter, with a response displayed by the host application. The browser demo shows a simplified input, controller and PC display sequence.",
    limitations:
      "This browser demo does not open a serial port or drive keypad outputs. It does not reproduce protected menus, device credentials, electrical settings or machine calibration.",
    tour: [
      {
        title: "Project summary",
        text: "A desktop touchscreen-style interface that sends confirmed inputs to an Arduino Nano and displays its responses.",
      },
      {
        title: "Approach",
        text: "The documented project uses a Python/Tkinter interface, USB serial and classic Nano firmware. Inputs are buffered until Enter, with a response displayed by the host application. The browser demo shows a simplified input, controller and PC display sequence.",
      },
      {
        title: "Demo limitations",
        text: "This browser demo does not open a serial port or drive keypad outputs. It does not reproduce protected menus, device credentials, electrical settings or machine calibration.",
      },
    ],
  },
  {
    id: "robot-recycling",
    number: "13",
    title: "Robotic recycling cell",
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
      "The browser shows a simplified sorting sequence. It does not reproduce the full robot kinematics or control physical equipment.",
    tour: [
      {
        title: "Project summary",
        text: "A university recycling-cell project connecting material sensing, robot motion, and sorting logic.",
      },
      {
        title: "Approach",
        text: "The report documents a Flexiv Rizon 4S collaborative arm, gripper, material sensors, and a parallel MATLAB simulation. Selected diagrams show the path from sensing to a pick-and-place decision.",
      },
      {
        title: "Demo limitations",
        text: "The portfolio explains the academic system. Robot addresses, serials, calibration tables, actual joint/pose commands, and executable hardware control are excluded.",
      },
    ],
  },
  {
    id: "weather-expert",
    number: "14",
    title: "Weather expert system",
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
      "The demo combines sample rule-confidence values. It does not fetch weather data or provide a live forecast.",
    tour: [
      {
        title: "Project summary",
        text: "An explainable weather-reasoning project that combines rule support using certainty factors.",
      },
      {
        title: "Approach",
        text: "The report describes a Python rule-based system using temperature, humidity, wind, and cloud-related attributes. The browser lab isolates one safe part: combining two positive rule-support scores for the same hypothesis.",
      },
      {
        title: "Demo limitations",
        text: "This is an offline explanation of certainty-factor reasoning. A score is not a calibrated rain probability, forecast, or weather alert. No weather-service connection, location history, or API credential is included.",
      },
    ],
  },
  {
    id: "sentiment-analysis",
    number: "15",
    title: "Sentiment analysis",
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
      "The browser example uses a small hand-written word-weight table. It illustrates feature scoring and does not run the trained TF-IDF/MLP classifier.",
    tour: [
      {
        title: "Project summary",
        text: "A text-classification assignment using TF-IDF features and a multilayer perceptron to distinguish positive and negative reviews.",
      },
      {
        title: "Approach",
        text: "The reviewed report and small model/preprocessing modules support a pipeline from review preprocessing to TF-IDF vectorization, an MLP, and held-out evaluation. The portfolio shows the workflow and a minimal algorithm sketch.",
      },
      {
        title: "Demo limitations",
        text: "No original review text, account data, full interface code, large dataset, saved model, or serialized vectorizer is published. No live trained-model inference or performance score is claimed here.",
      },
    ],
  },
  {
    id: "neural-classifiers",
    number: "16",
    title: "Neural classifiers",
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
      "The demo uses an illustrative AND-gate perceptron. It does not load the original training datasets or reproduce the full multilayer experiments.",
    tour: [
      {
        title: "Project summary",
        text: "A MATLAB mini-project spanning a simple AND perceptron and multiclass neural-network classification.",
      },
      {
        title: "Approach",
        text: "The mini-project compares perceptron initialization and explores multilayer classifiers with dimensionality reduction. The browser lab uses an illustrative fixed-weight AND gate to make the decision boundary visible.",
      },
      {
        title: "Demo limitations",
        text: "The browser weights are educational examples, not the trained project parameters. Full training data, model files, raw metrics, and training scripts are excluded.",
      },
    ],
  },
];
