import { useState } from "react";
import { ProjectVisual } from "./Visual";

// Evidence assets are opt-in and must be approved before being referenced here.
export type OverlayFrame = {
  time: number;
  objects: {
    id: string;
    label?: string;
    speedKph?: number;
    box: [number, number, number, number];
  }[];
};
export type RecordedAsset = {
  src: string;
  poster?: string;
  captions?: string;
  overlays: OverlayFrame[];
};
const approvedRecording: RecordedAsset | null = null;

export default function VehicleDemo({ engineering }: { engineering: boolean }) {
  const [time, setTime] = useState(0);
  const [showBoxes, setShowBoxes] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showIds, setShowIds] = useState(true);
  const [showSpeed, setShowSpeed] = useState(true);
  const asset = approvedRecording as RecordedAsset | null;
  const frame = asset?.overlays.reduce<OverlayFrame | undefined>(
    (latest, current) =>
      current.time <= time && (!latest || current.time > latest.time)
        ? current
        : latest,
    undefined,
  );
  return (
    <div className="vehicle-demo">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">VISION / PLAYBACK LAB</span>
          <h3>A frame. A track. An estimate.</h3>
        </div>
        <span className="badge outline">
          {asset ? "Recorded demo" : "Concept illustration"}
        </span>
      </div>
      {asset ? (
        <>
          <div className="video-stage">
            <video
              controls
              preload="metadata"
              poster={asset.poster}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            >
              <source src={asset.src} />
              {asset.captions && (
                <track
                  kind="captions"
                  src={asset.captions}
                  srcLang="en"
                  label="English"
                  default
                />
              )}
            </video>
            <div className="overlay-layer" aria-hidden="true">
              {frame?.objects.map((object) => (
                <div
                  key={object.id}
                  className={
                    showBoxes ? "detection-box" : "detection-box no-border"
                  }
                  style={{
                    left: `${object.box[0] * 100}%`,
                    top: `${object.box[1] * 100}%`,
                    width: `${object.box[2] * 100}%`,
                    height: `${object.box[3] * 100}%`,
                  }}
                >
                  <span>
                    {showLabels && object.label} {showIds && `#${object.id}`}{" "}
                    {showSpeed &&
                      object.speedKph !== undefined &&
                      `${object.speedKph} km/h`}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {asset.overlays.length > 0 && (
            <fieldset className="overlay-controls">
              <legend>Approved overlay layers</legend>
              {[
                { label: "Boxes", value: showBoxes, set: setShowBoxes },
                { label: "Labels", value: showLabels, set: setShowLabels },
                { label: "IDs", value: showIds, set: setShowIds },
                {
                  label: "Speed estimates",
                  value: showSpeed,
                  set: setShowSpeed,
                },
              ].map((control) => (
                <label key={control.label}>
                  <input
                    type="checkbox"
                    checked={control.value}
                    onChange={(e) => control.set(e.target.checked)}
                  />
                  {control.label}
                </label>
              ))}
            </fieldset>
          )}
        </>
      ) : (
        <div className="footage-placeholder">
          <ProjectVisual id="vehicle-velocity" />
          <div>
            <span className="placeholder-icon">▷</span>
            <h4>Approved footage goes here.</h4>
            <p>
              This is an illustrative preview. No real detections or speed
              results are being shown.
            </p>
            <span className="eyebrow">
              AWAITING APPROVED VIDEO & OVERLAY DATA
            </span>
          </div>
        </div>
      )}
      <ol className="pipeline">
        {[
          "Video input",
          "Detection",
          "Tracking",
          "Calibration",
          "Distance / time",
        ].map((s, i) => (
          <li key={s}>
            <span>0{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      {engineering && (
        <div className="engineering-panel">
          <div>
            <h4>The underlying idea</h4>
            <code>speed = calibrated distance / elapsed time</code>
            <p>
              Pixel distance alone is not road distance. A usable spatial
              calibration and reliable timestamps are essential.
            </p>
          </div>
          <div>
            <h4>What this page can establish</h4>
            <p>
              The pipeline and assumptions only. Accuracy, inference rate,
              hardware performance, and experimental results await approved
              academic evidence.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
