# Project demos

Open a project from Projects to use its embedded demo. Each project includes a summary, an interactive demo or recording, and a Mermaid flowchart. The separate Demos page has been removed; its old URL redirects to Projects.

- Vehicle detection: play the original annotated clip. Optionally load a compatible local ONNX model and detect the current frame. Browser inference does not calculate speed.
- PLC sorting: select a material and start sorting. The material repeats; changing it applies to the next object. Pause, step and reset are available.
- Heart monitor: choose a simulated range, place the finger and capture a randomly generated reading. Removing the finger clears it. This is not a real measurement.
- Nano HMI: enter digits and press Enter to see the input pass through the simulated controller to the PC display. No serial port or hardware is opened.
- The other demos illustrate classroom rules, PWM control, crossing states, pump switching, CAD assembly, ATM menus, spring extension, ideal cells, robot sorting, certainty factors, word-feature scoring and perceptron decisions. Their individual limitations are stated on each page.

Use the top-right button to switch colour themes. The preference is saved locally. Experience and tutoring are under About me.

Run application tests with npm test, standalone simulation tests with npm run test:models, and the production-preview browser check with npm run test:browser. Optional local model validation uses the PORTFOLIO_MODEL environment variable; no model is checked into this repository.
