import { useRef } from "react";
import NativeVehicle from "./NativeVehicle";
export default function VehicleDemo({ engineering }: { engineering: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  return (
    <div className="vehicle-demo">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">Final-year project</span>
          <h3>Vehicle detection and speed estimation</h3>
        </div>
        <span className="badge outline">Recorded demonstration</span>
      </div>
      <p>
        A car passes through the scene with the project’s tracking and speed
        annotations. Use the video controls to pause and examine the output.
      </p>
      <div className="video-stage">
        <video
          ref={video}
          controls
          muted
          playsInline
          preload="metadata"
          poster={
            import.meta.env.BASE_URL +
            "assets/reviewed/vehicle-demo-poster.webp"
          }
          aria-label="Recorded vehicle detection with speed annotations"
        >
          <source
            src={
              import.meta.env.BASE_URL +
              "assets/reviewed/vehicle-speed-demo.mp4"
            }
            type="video/mp4"
          />
        </video>
      </div>
      <p className="muted">
        Silent project recording. Boxes, track IDs and speed estimates are part
        of the original video, not live browser measurements.
      </p>
      <NativeVehicle video={video} />
      {engineering && (
        <div className="engineering-panel">
          <div>
            <h4>Original system</h4>
            <p>
              Raspberry Pi 5, Hailo-8 acceleration and YOLO detection support
              vehicle tracking and camera-based speed estimation. Perspective
              mapping relates image motion to road-plane distance.
            </p>
          </div>
          <div>
            <h4>Speed estimation</h4>
            <code>speed = mapped distance / elapsed time</code>
            <p>
              Camera position, perspective calibration, timestamps and tracking
              quality all affect an estimate. The recording shows a
              demonstration, not a certified road-speed measurement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
