import type { Project } from "./projects";
type Entry = Omit<Project, "tour">;
function withTour(entry: Entry): Project {
  return {
    ...entry,
    tour: [
      { title: "Meet the project", text: entry.description },
      { title: "Follow the engineering", text: entry.approach },
      { title: "Know the limits", text: entry.limitations },
    ],
  };
}
export const additionalProjects: Project[] = [
  withTour({
    id: "heart-monitor",
    number: "05",
    title: "Sensing a heartbeat.",
    subtitle: "Autonomous heartbeat & SpO₂ monitor",
    category: "Embedded Systems",
    tags: ["RISC-V", "8051", "Embedded Systems"],
    status: "Interactive simulation",
    description:
      "A guided sensing-and-display sequence based on an academic optical-monitoring prototype.",
    problem:
      "How can processors and sensors cooperate in one guided measurement flow?",
    approach:
      "The report links ultrasonic sensing and a MAX30102 to VisionFive 2 processing, an 8051-family microcontroller, and an LCD. Try the browser interaction to explore the handoff between stages.",
    limitations:
      "This demonstration shows interface states only. It does not acquire real signals, provide clinical readings, or diagnose health conditions.",
  }),
  withTour({
    id: "traffic-light",
    number: "06",
    title: "A moment to cross.",
    subtitle: "Arduino pedestrian traffic light",
    category: "Embedded Systems",
    tags: ["Arduino", "Embedded Systems", "Control Systems"],
    status: "Interactive simulation",
    description:
      "From a pedestrian request to a crossing sequence: a small road model with clear digital states.",
    problem: "How does a pedestrian request change a traffic signal?",
    approach:
      "A pushbutton sends a request to an Arduino Nano. The academic model sequences traffic and pedestrian LEDs. The browser version lets you inspect each transition manually.",
    limitations:
      "This simplified model uses manual steps rather than verified road timings. It must not be used to control real traffic.",
  }),
  withTour({
    id: "flood-control",
    number: "07",
    title: "When the water rises.",
    subtitle: "Flood detection & pump control",
    category: "Control Systems",
    tags: ["Analog Circuits", "Control Systems"],
    status: "Interactive simulation",
    description:
      "Explore sensing a rising water level and responding with a pump.",
    problem:
      "How can a simple circuit respond to water collecting in an underground space?",
    approach:
      "The report combines conductive level sensing and NE555-based pump control. The browser model uses an illustrative threshold rule to make the input-to-output relationship visible.",
    limitations:
      "The demo is not a hydraulic model, does not reproduce the analog circuit, and has no connection to a real pump.",
  }),
  withTour({
    id: "trolley-cad",
    number: "08",
    title: "Parts become a whole.",
    subtitle: "Miniature trolley CAD assembly",
    category: "Mechanical Design",
    tags: ["CAD", "Mechanical Design"],
    status: "Documented project",
    description:
      "Individual features, matching parts, and assembly mates come together in a miniature trolley.",
    problem: "How do individually modeled parts become a coherent assembly?",
    approach:
      "Model the basket, frame, handle, wheels, and connecting parts, then build the assembly through geometric mates. The report documents the workflow.",
    limitations:
      "This is a CAD rendering. Manufacturing, load testing, and production-ready tolerances are not claimed.",
  }),
  withTour({
    id: "atm-interface",
    number: "09",
    title: "Logic behind the menu.",
    subtitle: "C++ ATM terminal interface",
    category: "Software",
    tags: ["C++", "Software"],
    status: "Documented project",
    description:
      "An ATM-style console interface for practicing menus, program structure, and account-operation flow.",
    problem:
      "How can a terminal interface guide a user through a multi-step task?",
    approach:
      "The academic program separates registration, login, administration, and services into a menu-driven flow. The original high-level flowchart shows the entry paths.",
    limitations:
      "This is an academic simulation. No real accounts, credentials, transactions, or claims of banking-grade security are included.",
  }),
  withTour({
    id: "spring-study",
    number: "10",
    title: "Give a little. Learn a lot.",
    subtitle: "Spring material & deformation study",
    category: "Experimental Science",
    tags: ["Physics", "Experimental Science"],
    status: "Documented project",
    description:
      "A physics investigation into how springs of different materials respond to load.",
    problem:
      "How does spring material affect the relationship between load and extension?",
    approach:
      "Compare load and extension across spring materials, plot the response, and discuss elastic behavior using Hooke’s law. The emphasis is experimental reasoning.",
    limitations:
      "The portfolio summarizes the investigation without reproducing raw readings or claiming a certified material property.",
  }),
  withTour({
    id: "battery-study",
    number: "11",
    title: "Chemistry into current.",
    subtitle: "Aluminium–alkaline battery study",
    category: "Experimental Science",
    tags: ["Chemistry", "Experimental Science"],
    status: "Documented project",
    description:
      "An electrochemistry investigation connecting cell materials, electrolyte conditions, and electrical output.",
    problem:
      "How do conditions inside an electrochemical cell relate to its output?",
    approach:
      "The report compares an aluminium–alkaline cell under different electrolyte conditions. The portfolio focuses on the research question and experimental variables.",
    limitations:
      "This is an academic study, not a product or construction guide. Historical handling instructions and unverified performance claims are omitted.",
  }),
];
