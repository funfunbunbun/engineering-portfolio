export type PhotoTopic =
  | "training"
  | "clubs"
  | "events"
  | "activities"
  | "capstone"
  | "proton"
  | "ppsl"
  | "deans";
export type AboutPhoto = {
  file: string;
  alt: string;
  caption: string;
  group: "achievement" | "experience" | "teaching";
  topic?: PhotoTopic;
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
  {
    file: "proton-award-2024.webp",
    alt: "Vinay holding a third-place award at the PROTON Business Case Study Challenge.",
    caption: "PROTON Business Case Study Challenge, 2024.",
    group: "achievement",
  },
  {
    file: "proton-grand-final-2024.webp",
    alt: "Vinay holding the third-place award at the 2024 PROTON grand final.",
    caption: "Third place at the PROTON grand final, 2024.",
    group: "achievement",
  },
  {
    file: "deans-list-award.webp",
    alt: "Vinay receiving a Dean’s List certificate at an award ceremony.",
    caption: "Receiving a Dean’s List award.",
    group: "achievement",
    topic: "deans",
  },
  {
    file: "intel-training.webp",
    alt: "Vinay in front of an Intel building during industrial training.",
    caption: "During industrial training at Intel.",
    group: "experience",
    topic: "training",
  },
  {
    file: "school-stem-demonstration.webp",
    alt: "Students watching an engineering model demonstration at a school.",
    caption: "Smart classroom capstone demonstration at a school.",
    group: "experience",
    topic: "capstone",
  },
  {
    file: "career-fair-gala-2024.webp",
    alt: "Two people at the Career Fair 2024 gala dinner stage.",
    caption: "Career Fair gala dinner, 2024.",
    group: "experience",
    topic: "events",
  },
  {
    file: "career-fair-2024.webp",
    alt: "Vinay at Career Fair 2024.",
    caption: "Career Fair, 2024.",
    group: "experience",
    topic: "events",
  },
  {
    file: "career-fair-2023.webp",
    alt: "Vinay and another committee member at Career Fair 2023.",
    caption: "Career Fair, 2023.",
    group: "experience",
    topic: "events",
  },
  {
    file: "career-fair-committee.webp",
    alt: "The Career Fair committee in red event shirts.",
    caption: "Career Fair, career talk team.",
    group: "experience",
    topic: "events",
  },
  {
    file: "career-fair-poster-2023.webp",
    alt: "The Career Fair 2023 event poster.",
    caption: "Career Fair poster, 2023.",
    group: "experience",
    topic: "events",
  },
  {
    file: "ppsl-2023.webp",
    alt: "Vinay with the PPSL group for the 2023 student intake.",
    caption: "PPSL, 2023 intake.",
    group: "experience",
    topic: "ppsl",
  },
  {
    file: "school-outreach-parit-buntar.webp",
    alt: "Vinay and the outreach team outside SMK Methodist ACS Parit Buntar.",
    caption: "School outreach in Parit Buntar.",
    group: "experience",
    topic: "clubs",
  },
  {
    file: "mathematics-outreach.webp",
    alt: "A group photo after a mathematics outreach session in a classroom.",
    caption: "Mathematics outreach session.",
    group: "experience",
    topic: "clubs",
  },
  {
    file: "deepavali-celebration.webp",
    alt: "The Kaalvi Yaathirai group outside a temple.",
    caption: "Kaalvi Yaathirai.",
    group: "experience",
    topic: "activities",
  },
  {
    file: "deepavali-university.webp",
    alt: "A university group photo during Deepavali activities.",
    caption: "Deepavali 2023.",
    group: "experience",
    topic: "activities",
  },
];
