import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type { InferenceSession } from "onnxruntime-web";

const classes = ["bicycle", "bus", "car", "motorbike", "truck", "van"];
export default function NativeVehicle({
  video,
}: {
  video: RefObject<HTMLVideoElement | null>;
}) {
  const session = useRef<InferenceSession | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const version = useRef(0);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(
    "Choose a compatible ONNX model to detect vehicles in a paused frame.",
  );
  useEffect(
    () => () => {
      version.current++;
      void session.current?.release();
      session.current = null;
    },
    [],
  );
  async function load(file?: File) {
    if (!file) return;
    const current = ++version.current;
    setReady(false);
    setBusy(true);
    setMessage("Loading the model on your device…");
    try {
      if (
        !file.name.toLowerCase().endsWith(".onnx") ||
        file.size > 64 * 1024 * 1024
      )
        throw Error("Use an ONNX file smaller than 64 MB.");
      const ort = await import("onnxruntime-web/wasm");
      ort.env.wasm.numThreads = 1;
      ort.env.wasm.proxy = false;
      ort.env.wasm.wasmPaths = new URL(
        import.meta.env.BASE_URL + "assets/runtime/",
        document.baseURI,
      ).href;
      const loaded = await ort.InferenceSession.create(
        new Uint8Array(await file.arrayBuffer()),
        { executionProviders: ["wasm"] },
      );
      if (version.current !== current) {
        await loaded.release();
        return;
      }
      const metadata = loaded.inputMetadata[0];
      if (
        loaded.inputNames.length !== 1 ||
        !metadata.isTensor ||
        metadata.type !== "float32" ||
        metadata.shape.join(",") !== "1,3,640,640"
      ) {
        await loaded.release();
        throw Error(
          "This demo expects one float32 input with shape 1 × 3 × 640 × 640.",
        );
      }
      await session.current?.release();
      session.current = loaded;
      setReady(true);
      setMessage(
        "Model ready. Pause the video on a vehicle, then detect the current frame.",
      );
    } catch (error) {
      if (current === version.current)
        setMessage(
          error instanceof Error && /^(Use an|This demo)/.test(error.message)
            ? error.message
            : "This model could not be loaded. The recorded demonstration is still available.",
        );
    } finally {
      if (current === version.current) setBusy(false);
    }
  }
  async function detect() {
    const active = session.current,
      source = video.current,
      output = canvas.current;
    if (!active || !source || !output || source.readyState < 2) {
      setMessage("Play or seek the video to load a frame first.");
      return;
    }
    const current = version.current;
    source.pause();
    setBusy(true);
    setMessage("Detecting vehicles in the selected frame…");
    try {
      const ort = await import("onnxruntime-web/wasm");
      const input = document.createElement("canvas");
      input.width = input.height = 640;
      const ctx = input.getContext("2d", { willReadFrequently: true })!;
      const scale = Math.min(640 / source.videoWidth, 640 / source.videoHeight),
        width = Math.round(source.videoWidth * scale),
        height = Math.round(source.videoHeight * scale),
        left = Math.floor((640 - width) / 2),
        top = Math.floor((640 - height) / 2);
      ctx.fillStyle = "rgb(114,114,114)";
      ctx.fillRect(0, 0, 640, 640);
      ctx.drawImage(source, left, top, width, height);
      const rgba = ctx.getImageData(0, 0, 640, 640).data,
        values = new Float32Array(3 * 640 * 640);
      for (let p = 0; p < 640 * 640; p++)
        for (let channel = 0; channel < 3; channel++)
          values[channel * 640 * 640 + p] = rgba[p * 4 + channel] / 255;
      const results = await active.run({
        [active.inputNames[0]]: new ort.Tensor(
          "float32",
          values,
          [1, 3, 640, 640],
        ),
      });
      if (current !== version.current) return;
      const result = results[active.outputNames[0]];
      if (
        result.type !== "float32" ||
        result.dims.length !== 3 ||
        result.dims[0] !== 1 ||
        result.dims[2] !== 6 ||
        result.dims[1] > 300
      )
        throw Error("Unsupported output");
      output.width = source.videoWidth;
      output.height = source.videoHeight;
      const draw = output.getContext("2d")!;
      draw.drawImage(source, 0, 0);
      let count = 0;
      const data = result.data as Float32Array;
      draw.strokeStyle = "#85ffaf";
      draw.fillStyle = "#85ffaf";
      draw.lineWidth = 2;
      draw.font = "16px sans-serif";
      for (let row = 0; row < result.dims[1]; row++) {
        const [x1, y1, x2, y2, score, category] = Array.from(
          data.slice(row * 6, row * 6 + 6),
        );
        if (
          ![x1, y1, x2, y2, score, category].every(Number.isFinite) ||
          score < 0.4 ||
          score > 1 ||
          !Number.isInteger(category) ||
          !classes[category] ||
          x2 <= x1 ||
          y2 <= y1
        )
          continue;
        const x = Math.max(0, Math.min(output.width, (x1 - left) / scale)),
          y = Math.max(0, Math.min(output.height, (y1 - top) / scale));
        const w = Math.max(0, Math.min(output.width - x, (x2 - x1) / scale)),
          h = Math.max(0, Math.min(output.height - y, (y2 - y1) / scale));
        draw.strokeRect(x, y, w, h);
        const label = classes[category] + " " + Math.round(score * 100) + "%";
        const labelY = Math.max(20, y);
        draw.fillStyle = "#102531";
        draw.fillRect(x, labelY - 19, draw.measureText(label).width + 10, 23);
        draw.fillStyle = "#85ffaf";
        draw.fillText(label, x + 4, labelY - 2);
        count++;
      }
      setMessage(
        `${count} vehicle${count === 1 ? "" : "s"} detected in this frame. These boxes are browser model output; speed annotations in the recording are pre-recorded.`,
      );
    } catch {
      if (current === version.current)
        setMessage(
          "Inference failed or this model’s output format is unsupported. Use an end-to-end detector with output 1 × up to 300 × 6.",
        );
    } finally {
      if (current === version.current) setBusy(false);
    }
  }
  return (
    <details className="native-model">
      <summary>Try vehicle detection on your device</summary>
      <p>
        Load your own compatible YOLO ONNX model. The file stays in your
        browser; nothing is uploaded. This demo accepts a 640 × 640 end-to-end
        detector for six vehicle classes.
      </p>
      <div className="native-model-controls">
        <label>
          ONNX model{" "}
          <input
            aria-label="ONNX model"
            type="file"
            accept=".onnx"
            disabled={busy}
            onChange={(e) => void load(e.target.files?.[0])}
          />
        </label>
        <button
          className="button small"
          disabled={!ready || busy}
          onClick={() => void detect()}
        >
          Detect current frame
        </button>
      </div>
      <p role="status">{message}</p>
      <canvas
        ref={canvas}
        width="0"
        height="0"
        aria-label="Vehicle detections from the selected model"
      />
      <p className="muted">
        Detection only. Browser inference does not calculate road speed or run
        the Raspberry Pi system.
      </p>
    </details>
  );
}
