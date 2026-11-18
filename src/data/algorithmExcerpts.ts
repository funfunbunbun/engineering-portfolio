import type { ProjectId } from "./projects";
export type AlgorithmExcerpt = {
  title: string;
  description: string;
  code: string;
  note: string;
};
export const algorithmExcerpts: Partial<Record<ProjectId, AlgorithmExcerpt>> = {
  "weather-expert": {
    title: "Combine positive rule support",
    description:
      "A self-contained adaptation of the report’s certainty-factor combination. Inputs are rule-support scores in [0, 1].",
    code: `function combineSupport(a, b) {
  // Two positive rules supporting the same hypothesis.
  return a + b * (1 - a);
}`,
    note: "This example deliberately contains no fetching, location selection, service configuration, or credentials. It is not a complete forecasting system.",
  },
  "neural-classifiers": {
    title: "A minimal AND decision",
    description:
      "An illustrative weighted-sum classifier with fixed teaching values.",
    code: `function andGate(a, b) {
  const weightedSum = Number(a) + Number(b) - 1.5;
  return weightedSum >= 0 ? 1 : 0;
}`,
    note: "The example does not expose original training data, learned parameters, or model files.",
  },
  "robot-recycling": {
    title: "The transform, without machine parameters",
    description:
      "A generic Denavit–Hartenberg transform sketch illustrating how link transforms can be composed. No real robot values are included.",
    code: `function dhTransform(theta, d, a, alpha) {
  const c = Math.cos(theta), s = Math.sin(theta);
  const ca = Math.cos(alpha), sa = Math.sin(alpha);
  return [
    [c, -s * ca,  s * sa, a * c],
    [s,  c * ca, -c * sa, a * s],
    [0,       sa,       ca,     d],
    [0,        0,        0,     1]
  ];
}`,
    note: "A general mathematical example, adapted for explanation. Actual DH tables, calibration, controller commands, addresses, and hardware integration remain private.",
  },
  "sentiment-analysis": {
    title: "The classification pipeline",
    description:
      "Language-neutral pseudocode for the important processing stages. The original model and preprocessing modules support this structure.",
    code: `training, heldOut = split(labeledReviews)
vectorizer.fit(training.text)
trainFeatures = vectorizer.transform(training.text)
testFeatures = vectorizer.transform(heldOut.text)
classifier.fit(trainFeatures, training.labels)
predictions = classifier.predict(testFeatures)
evaluate(predictions, heldOut.labels)`,
    note: "Fit text features on the training partition only. Original reviews, datasets, user records, interface/settings files, and serialized models are omitted.",
  },
};
