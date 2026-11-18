import type { ProjectId } from "./projects";

export const projectPurpose: Record<ProjectId, { problem: string; useCase: string }> = {
  "vehicle-velocity": {
    problem: "Traffic footage shows vehicles moving, but turning that video into usable speed information requires detection, tracking and camera calibration.",
    useCase: "Roadside traffic observation using a camera, Raspberry Pi 5 and Hailo-8. The recording shows the project's tracking and speed annotations.",
  },
  "smart-classroom": {
    problem: "Classroom lights and fans can stay on in empty rooms, while changes in temperature and air quality go unnoticed.",
    useCase: "An ESP32 classroom model that responds to room conditions and supports RFID attendance. The prototype was demonstrated during school outreach.",
  },
  "fpga-fan": {
    problem: "A cooling fan does not always need to run at full speed. Its drive can respond to the temperature instead.",
    useCase: "A laboratory cooling controller combining an LM35 sensor, comparators, FPGA PWM and a fan driver.",
  },
  "plc-sorting": {
    problem: "Objects on a conveyor need to be identified and routed consistently by their material and height.",
    useCase: "A laboratory sorting machine for studying automated recycling and material handling, with PLC control, sensors, pneumatic diversion and an HMI.",
  },
  "heart-monitor": {
    problem: "A self-service pulse measurement needs to guide someone into position, detect a finger and show a clear result.",
    useCase: "An academic check-up-station prototype combining ultrasonic guidance, optical pulse sensing, a RISC-V board and an LCD. The report's LCD examples are emulations.",
  },
  "traffic-light": {
    problem: "A pedestrian request must change the traffic sequence while keeping vehicle and pedestrian permissions separate.",
    useCase: "An Arduino Nano scale model for demonstrating a requested crossing, vehicle stopping and pedestrian movement.",
  },
  "flood-control": {
    problem: "Rising water in an underground space needs an early indication and a pump response before it overflows.",
    useCase: "A laboratory circuit exploring level detection, alarm indication and pump control. The recording shows the prototype's input switches and pump assembly.",
  },
  "trolley-cad": {
    problem: "A complete trolley assembly needs individual parts that fit together and drawings that explain their shape and position.",
    useCase: "A SolidWorks modelling exercise using a miniature trolley as a reference, with part drawings, assembly mates, rendered views and a bill of materials.",
  },
  "atm-interface": {
    problem: "A terminal application needs a clear route between registration, login, service choices and account operations.",
    useCase: "A C++ programming exercise in menus, control flow and program structure. The browser uses fictional balances.",
  },
  "spring-study": {
    problem: "Different springs respond differently to an applied load, so their deformation needs to be compared systematically.",
    useCase: "A physics investigation of elastic behaviour, load and extension. The browser illustrates Hooke's law with adjustable example values.",
  },
  "battery-study": {
    problem: "An electrochemical cell's output depends on its materials and electrolyte conditions.",
    useCase: "An academic aluminium–alkaline cell investigation. The portfolio explains the circuit concept without reproducing preparation procedures or private measurements.",
  },
  "robot-recycling": {
    problem: "A robot sorting cell must identify an object, pick it up and place it in the correct destination in a repeatable sequence.",
    useCase: "A university recycling-cell project using a collaborative arm, a gripper and material sensors, with MATLAB modelling alongside the physical setup.",
  },
  "nano-hmi": {
    problem: "A PC interface needs to send confirmed keypad entries to a microcontroller and make the response visible.",
    useCase: "A freelance Tkinter-to-Arduino Nano interface over USB serial. The browser shows the touch-input, controller and PC-response sequence.",
  },
  "weather-expert": {
    problem: "Weather readings need an understandable explanation of how several conditions lead to a judgement.",
    useCase: "A Python expert-system assignment using IF–THEN rules and certainty factors. The browser demonstrates the reasoning with offline example inputs.",
  },
  "sentiment-analysis": {
    problem: "A large collection of product reviews is difficult to inspect manually for positive and negative language.",
    useCase: "An academic text-classification project using TF-IDF features and a multilayer perceptron. The browser separately illustrates word features with a small hand-written example.",
  },
  "neural-classifiers": {
    problem: "A neural classifier needs a way to turn input values, weights and a bias into a decision.",
    useCase: "A MATLAB learning exercise beginning with perceptron logic gates, then exploring multilayer classification and dimensionality reduction.",
  },
};
