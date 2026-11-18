import type { ProjectId } from "./projects";
export const projectMechanisms: Record<ProjectId, [string[], string[]]> = {
  "vehicle-velocity": [
    [
      "Camera/video input",
      "Raspberry Pi 5",
      "Hailo-8 accelerator",
      "YOLO detector",
      "Tracking and perspective mapping",
      "Web dashboard",
    ],
    [
      "Read frames from the camera or recording.",
      "Detect vehicle boxes and associate them across frames with a track ID.",
      "Map motion into a road plane and combine distance with elapsed time.",
      "Display tracked vehicles and estimated speed. The line-crossing demo illustrates timing; it is not the full deployed algorithm.",
    ],
  ],
  "smart-classroom": [
    [
      "ESP32 controller",
      "DHT22 temperature/humidity sensor",
      "MQ-135 analog gas/air-quality sensor",
      "LDR light sensing",
      "PIR occupancy sensor",
      "Servo-operated window",
      "Brushless fan and LED lamps",
      "RC522 RFID reader and 16×2 LCD",
      "Firebase/dashboard synchronization",
    ],
    [
      "Read environmental values and room occupancy.",
      "Control fan, lighting and the servo window using the room conditions.",
      "A high air-quality value requests window opening; occupancy/scheduled power saving also affects window state in the report.",
      "RFID and the LCD support attendance/status functions. The browser omits schedules, attendance records and cloud access, and simplifies the report’s control rules.",
    ],
  ],
  "fpga-fan": [
    [
      "LM35 temperature sensor",
      "Analog comparators",
      "Buffer stage",
      "FPGA PWM logic",
      "Motor driver and fan",
    ],
    [
      "Temperature changes the LM35 voltage.",
      "Comparator outputs provide digital conditions for the FPGA.",
      "FPGA logic changes PWM duty cycle.",
      "The driver powers the fan; the browser waveform and animation use illustrative timings.",
    ],
  ],
  "plc-sorting": [
    [
      "Photoelectric presence sensing",
      "Height sensing",
      "Inductive metal sensor",
      "PLC",
      "Pneumatic diverter",
      "HMI and collection bins",
    ],
    [
      "A conveyor brings an object to the sensors.",
      "Presence, height and metal detection inform routing.",
      "The PLC sequences the conveyor and diverter.",
      "The HMI shows state and counts. The browser latches each object’s material before routing it.",
    ],
  ],
  "heart-monitor": [
    [
      "MAX30102 optical sensor",
      "Ultrasonic presence sensor",
      "VisionFive 2 RISC-V board",
      "8051-family microcontroller",
      "16×2 LCD",
    ],
    [
      "Presence sensing prompts the visitor to use the sensor.",
      "The optical sensor samples changing light absorption at a finger.",
      "Processing and the microcontroller interface drive the LCD.",
      "The browser simplifies this to finger placement and a simulated reading; it does not implement clinical measurement or SpO₂ estimation.",
    ],
  ],
  "traffic-light": [
    [
      "Arduino Nano",
      "Pedestrian pushbutton",
      "Traffic LEDs",
      "Pedestrian signal",
      "Scale road model",
    ],
    [
      "Traffic normally has permission to move.",
      "A button request starts amber, red and clearance states.",
      "Pedestrians receive permission only while traffic is red.",
      "The crossing closes before traffic returns to green. Browser timings are illustrative.",
    ],
  ],
  "flood-control": [
    [
      "Conductive level probes",
      "NE555 timer/control circuit",
      "Pump drive stage",
      "Pump and water container",
    ],
    [
      "Water reaching the probes changes the sensing circuit state.",
      "The control stage drives the pump.",
      "The browser adds variable motor speed, incoming water and a visual high-level alarm to explain drainage behavior.",
      "The speed and alarm thresholds in the browser are examples rather than verified circuit settings.",
    ],
  ],
  "trolley-cad": [
    [
      "SolidWorks part models",
      "Basket, frame and handle",
      "Wheels and small fasteners",
      "Assembly mates",
      "Assembly drawing and BOM",
    ],
    [
      "Model individual components from the reference trolley.",
      "Mate parts so their positions and axes fit the assembly.",
      "Inspect the separated parts and assembled design.",
      "Create the assembly drawing and bill of materials. The reference photograph is not evidence of a newly manufactured trolley.",
    ],
  ],
  "atm-interface": [
    [
      "C++ console interface",
      "Menu logic",
      "Input validation",
      "Session balance and transaction states",
    ],
    [
      "Read a selected operation and validate its input.",
      "Apply a valid deposit or withdrawal to the session balance.",
      "Display the result and return to the menu.",
      "The browser uses fictional credits in memory and does not handle bank accounts.",
    ],
  ],
  "spring-study": [
    [
      "Spring specimens",
      "Applied loads",
      "Extension measurement",
      "Load–extension comparison",
    ],
    [
      "Apply a load and observe extension.",
      "Compare deformation between spring materials.",
      "Discuss the elastic region and departures from ideal behavior.",
      "The browser uses Hooke’s law with chosen stiffness; it does not reproduce raw experimental measurements.",
    ],
  ],
  "battery-study": [
    [
      "Aluminium electrode",
      "Alkaline electrolyte",
      "External circuit",
      "Electrical output observations",
    ],
    [
      "An electrochemical reaction supplies charge to an external circuit.",
      "Electrolyte conditions and cell construction affect output.",
      "The project compares observations from the academic investigation.",
      "The browser shows an ideal-cell circuit analogy, not the original chemistry or a construction recipe.",
    ],
  ],
  "robot-recycling": [
    [
      "7-DOF collaborative robot",
      "Gripper",
      "Inductive and capacitive sensing",
      "Material collection bins",
      "MATLAB model",
    ],
    [
      "Detect an object and distinguish material responses.",
      "Plan the pickup and destination movement.",
      "Grip, move, release and update the destination count.",
      "Return for the next object. Browser positions are symbolic and never command the real robot.",
    ],
  ],
  "weather-expert": [
    [
      "Weather-service observations",
      "Temperature, humidity, visibility, cloud and wind fields",
      "IF–THEN rule base",
      "Certainty factors",
      "Inference display",
    ],
    [
      "Request and validate weather values.",
      "Check available values against each rule condition.",
      "Produce matching hypotheses with certainty factors.",
      "Combine compatible evidence for the same hypothesis and explain the result. Browser sample inputs need no API credential.",
    ],
  ],
  "sentiment-analysis": [
    [
      "Review text",
      "Text preprocessing",
      "TF-IDF vectorizer",
      "Multilayer perceptron",
      "Sentiment output",
    ],
    [
      "Clean and tokenize review text.",
      "Transform words into the trained TF-IDF feature space.",
      "Apply the trained classifier to obtain a sentiment class.",
      "The public demo uses a small word-weight example; original weights, vectorizer and review records remain private.",
    ],
  ],
  "neural-classifiers": [
    [
      "Input features",
      "Weights and bias",
      "Activation/threshold function",
      "Perceptron and multilayer models",
    ],
    [
      "Multiply each input by its weight and add the bias.",
      "Threshold the sum to produce a binary output.",
      "Training adjusts parameters using examples.",
      "The browser gate presets demonstrate single-layer behavior; the original report also covers multilayer classification and dimensionality reduction.",
    ],
  ],
  "nano-hmi": [
    [
      "Tkinter host interface",
      "USB serial communication",
      "Arduino Nano",
      "Keypad-style outputs",
      "PC response display",
    ],
    [
      "Buffer an operator entry in the desktop interface.",
      "Send the confirmed entry over the serial connection.",
      "The Nano handles the command and its outputs.",
      "The PC displays a response. The browser shows a separate, offline communication illustration.",
    ],
  ],
};
