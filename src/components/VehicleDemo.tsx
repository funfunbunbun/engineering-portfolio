export default function VehicleDemo({ engineering }: { engineering: boolean }) {
  if (!engineering) return null;
  return (
    <div className="vehicle-demo">
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
