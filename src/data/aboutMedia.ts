export type AboutPhoto = {
  file: string;
  alt: string;
  caption: string;
  group: "achievement" | "experience" | "teaching";
};
export const aboutPhotos: AboutPhoto[] = [
  {
    file: "maths-t-worked-example.webp",
    alt: "Handwritten working from Vinay’s Mathematics T integration lesson.",
    caption:
      "A worked trigonometric integration example from my Form 6 Mathematics T class notes.",
    group: "teaching",
  },
  {
    file: "maths-t-substitution.webp",
    alt: "Vinay’s handwritten substitution steps for an integration example.",
    caption: "Using substitution to explain an integration problem.",
    group: "teaching",
  },
];
