import { useState } from "react";
export default function WeatherRules() {
  const [temperature, setTemperature] = useState(34),
    [humidity, setHumidity] = useState(76),
    [visibility, setVisibility] = useState(1500);
  const hot = temperature > 33 && humidity > 70,
    low = visibility < 2000;
  return (
    <section className="motion-demo">
      <h3>From weather values to a rule-based judgement</h3>
      <p>
        These two example rules are described in the project report. Change the
        sample inputs to see which conditions match.
      </p>
      <div className="motion-controls">
        {[
          {
            name: "Temperature",
            value: temperature,
            set: setTemperature,
            min: 15,
            max: 45,
            unit: "°C",
          },
          {
            name: "Humidity",
            value: humidity,
            set: setHumidity,
            min: 0,
            max: 100,
            unit: "%",
          },
          {
            name: "Visibility",
            value: visibility,
            set: setVisibility,
            min: 100,
            max: 10000,
            unit: "m",
          },
        ].map((c) => (
          <label key={c.name}>
            {c.name}: {c.value} {c.unit}
            <input
              aria-label={`Sample ${c.name}`}
              type="range"
              min={c.min}
              max={c.max}
              value={c.value}
              onChange={(e) => c.set(+e.target.value)}
            />
          </label>
        ))}
      </div>
      <ol className="rule-list">
        <li className={hot ? "rule-matched" : ""}>
          <code>IF temperature &gt; 33 °C AND humidity &gt; 70%</code>
          <p>
            THEN very hot and humid · rule CF 0.8 ·{" "}
            {hot ? "matched" : "not matched"}
          </p>
        </li>
        <li className={low ? "rule-matched" : ""}>
          <code>IF visibility &lt; 2,000 m</code>
          <p>
            THEN low visibility · rule CF 0.9 ·{" "}
            {low ? "matched" : "not matched"}
          </p>
        </li>
      </ol>
      <p role="status">
        {[hot && "Hot/humid rule matched", low && "Low-visibility rule matched"]
          .filter(Boolean)
          .join("; ") || "Neither displayed rule matches these inputs."}
      </p>
      <h4>How the original API flow works</h4>
      <ol>
        <li>
          The application requests weather observations for a location from a
          weather-data service.
        </li>
        <li>
          The service returns JSON fields such as temperature, humidity, cloud
          cover, wind and visibility.
        </li>
        <li>
          The application checks that required fields exist and converts units
          before testing IF conditions.
        </li>
        <li>
          Matching rules produce hypotheses and certainty factors. Evidence for
          the same hypothesis can then be combined.
        </li>
      </ol>
      <pre>
        {JSON.stringify(
          {
            temperatureC: temperature,
            humidityPercent: humidity,
            visibilityMetres: visibility,
          },
          null,
          2,
        )}
      </pre>
      <p>
        Here the sliders replace the API response. No network requests or
        account credentials are used. In a hosted implementation, a server would
        keep the API credential private and send only validated weather values
        to the page. Missing data should be reported rather than treated as
        zero.
      </p>
      <p>
        CF expresses rule support, not a calibrated probability. The combination
        example below uses two supports for the same hypothesis; the two
        displayed conditions above describe different outcomes and are not
        merged together.
      </p>
    </section>
  );
}
