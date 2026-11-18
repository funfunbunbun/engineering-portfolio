import type { Figure } from "./projectContext";
import type { ProjectId } from "./projects";
export const showcaseFigures: Partial<Record<ProjectId, Figure[]>> = {
  "spring-study": [{ file: "spring-setup-diagram.webp", alt: "Report apparatus diagram showing a spring suspended from a clamp beside a metre stick and a hanging mass.", caption: "The spring-extension apparatus shown in the investigation report.", source: "Spring deformation report · PDF page 10, Figure 1" }],
  "smart-classroom": [
    {
      "file": "classroom-prototype.webp",
      "alt": "Physical smart-classroom model with a window, room enclosure and an RFID reader beside the LCD.",
      "caption": "The completed classroom model, with its motorised window and RFID/LCD panel.",
      "source": "Smart classroom capstone report · PDF page 62, Figure 3.28"
    },
    {
      "file": "classroom-circuit.webp",
      "alt": "Original smart-classroom circuit diagram showing the ESP32, environmental sensors, RFID, LCD and actuators.",
      "caption": "The ESP32 circuit schematic linking sensors, LCD, fan and window servo.",
      "source": "Smart classroom capstone report · PDF page 57, Figure 3.25"
    },
    {
      "file": "classroom-lcd-ready.webp",
      "alt": "The physical RFID reader beside an LCD displaying a class code and Scan Card prompt.",
      "caption": "RFID reader and LCD waiting for a card during a scheduled class.",
      "source": "Smart classroom capstone report · PDF page 73, Figure 4.16"
    }
  ],
  "heart-monitor": [
    {
      "file": "heart-circuit-schematic.webp",
      "alt": "The project circuit schematic connecting the HC-SR04, MAX30102, VisionFive 2, AT89C52 and character LCD.",
      "caption": "Circuit schematic for the ultrasonic sensor, optical sensor, VisionFive 2, 8051 and LCD.",
      "source": "Heartbeat monitor report · PDF page 17"
    },
    {
      "file": "heart-lcd-guidance.webp",
      "alt": "LCD messages: welcome, please have a seat, place finger on scanner and finger is not detected.",
      "caption": "LCD emulator prompts for the ultrasonic presence check and finger placement.",
      "source": "Heartbeat monitor report · PDF page 43"
    }
  ],
  "trolley-cad": [
    {
      "file": "trolley-front-board-model.webp",
      "alt": "SolidWorks isometric view of the trolley front board, with its rim, mounting tabs and raised panel.",
      "caption": "The front-board part model before assembly.",
      "source": "Trolley CAD report · PDF page 9"
    },
    {
      "file": "trolley-front-board-drawing.webp",
      "alt": "Original CAD drawing of the trolley front board showing its main view, sectional detail and isometric view.",
      "caption": "Front-board drawing with orthographic, section and isometric views.",
      "source": "Trolley CAD report · PDF page 16"
    }
  ],
  "plc-sorting": [
    {
      "file": "sorting-hmi-status.webp",
      "alt": "Conveyor status menu showing running and ready indicators, cylinder states, sorted-item counters and reset control.",
      "caption": "The HMI conveyor-status screen, shown in the report emulator.",
      "source": "PLC sorting machine report · PDF page 21"
    },
    {
      "file": "sorting-control-panel.webp",
      "alt": "Photograph of the sorting-machine HMI, start and stop pushbuttons, on-off switch and emergency-stop button.",
      "caption": "The physical HMI and start/stop controls on the sorting machine.",
      "source": "PLC sorting machine report · PDF page 30"
    },
    {
      "file": "sorting-pneumatic-electrical.webp",
      "alt": "Report schematic with two pneumatic cylinders, sensor inputs, PLC I/O, tower lights and solenoid outputs.",
      "caption": "The pneumatic and electrical diagram linking sensors, PLC and diverters.",
      "source": "PLC sorting machine report · PDF page 24"
    }
  ],
  "weather-expert": [
    {
      "file": "weather-main-menu.webp",
      "alt": "Terminal menu offering current weather analysis, next-day prediction, location selection and exit.",
      "caption": "The weather expert system’s terminal menu.",
      "source": "Rule-Based Expert System report · Figure 8, menu options"
    }
  ],
  "sentiment-analysis": [
    {
      "file": "sentiment-network-diagram.webp",
      "alt": "A neural-network diagram showing input nodes, one hidden layer and output nodes.",
      "caption": "The multilayer perceptron concept illustrated in the report.",
      "source": "Machine Learning assignment report · introductory multilayer perceptron illustration"
    }
  ],
  "neural-classifiers": [
    {
      "file": "perceptron-matlab-architecture.webp",
      "alt": "MATLAB network diagram connecting two inputs to weights, a bias, a sum and a hard-limit output.",
      "caption": "The single-layer perceptron network shown in MATLAB.",
      "source": "Neural-network mini-project report · Figure 4, Perceptron Architecture"
    },
    {
      "file": "perceptron-and-boundaries.webp",
      "alt": "Two MATLAB plots show the four binary AND inputs and a separating line for each initialisation method.",
      "caption": "AND-gate decision boundaries with manual and automatic initialisation.",
      "source": "Neural-network mini-project report · Figure 8, Decision Boundary"
    }
  ],
  "vehicle-velocity": [
    {
      "file": "vehicle-roadside-deployment.webp",
      "alt": "A camera and electronics enclosure mounted on a roadside pole at the university.",
      "caption": "The roadside camera and enclosure installed for the final-year project.",
      "source": "Final-year thesis, PDF page 97 (printed page 81) · Figure 4.1"
    },
    {
      "file": "vehicle-system-architecture.webp",
      "alt": "Original system diagram showing an IP camera feeding a Raspberry Pi 5 and Hailo-8, followed by vehicle tracking, road-plane mapping and web dashboard updates.",
      "caption": "Camera input, Raspberry Pi processing and the web dashboard in the original system.",
      "source": "Final-year thesis, PDF page 64 (printed page 48) · Figure 3.4"
    }
  ]
};
