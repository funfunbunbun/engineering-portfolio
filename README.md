# VM Engineering Technologies

Vinay Vyraveraja's interactive university engineering portfolio.

Contact: v.vinayx@outlook.com

## Run locally on this machine

In PowerShell, from this repository:

```powershell
.\dev.ps1
```

Open **http://127.0.0.1:5173/**. Use the URL printed by Vite if that port is occupied. Keep the terminal open; Ctrl+C stops the server. If PowerShell blocks the script, use a process-only policy override:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\dev.ps1
```

The helper uses the ignored, checksum-verified portable Node.js runtime when present. It changes PATH only inside that process. On another machine, install a current supported Node.js LTS release, then run `npm ci` and `npm run dev`.

VS Code also has tasks named **Portfolio: local preview**, **Project: PWM demo**, and **Project: PLC demo** under Terminal → Run Task.

## What works

- Home, searchable/filterable Projects, sixteen project-detail pages, Experience, Tutoring, About, and Contact.
- Classroom simulation: temperature, light, occupancy, CO2, fan/lighting decisions, ventilation alert, event log, and Reset.
- PWM simulation: duty-cycle slider and presets, high-time readout, waveform, conceptual fan animation, and Reset.
- PLC/HMI sorting simulation: selectable illustrative object, step/run/pause/reset sequence, sensor state, and delivery totals.
- Heart-monitor interaction, pedestrian-crossing state sequence, and illustrative water-level/pump decision demos.
- Fourteen selected report figures with captions and keyboard-accessible enlargement. Original cover sheets, configuration screenshots, and full reports are excluded.
- Robotics, planting trajectories, weather reasoning, sentiment analysis, and neural classifiers, with five newly written algorithm explanations. Offline certainty-factor and AND-gate demos make no external data requests.
- Project background and intended-use context; PROTON 3rd place as team contributor (confirmed by Vinay); historical club involvement, training themes, tutoring, and LinkedIn.
- FYP showcase: explicitly labeled concept illustration, pipeline explanation, and a typed integration point for future approved recordings/overlays. No footage or fake performance results.
- Manual guided tours with transcripts; speech synthesis only after explicit opt-in. Narration cancels on exit, navigation, page hide, or unmount.
- Keyboard controls, focus indicators, responsive layouts, and reduced-motion handling.

All interactive demonstrations are educational browser models. Selected report-derived figures are separate from simulations. No real hardware connection, full reports, raw measurements, student records, payment data, or class recordings are included.

## Independent project repositories

| Repository | Standalone start from this workspace | Local URL |
| --- | --- | --- |
| [FPGA PWM fan controller](./projects/fpga-pwm-fan-controller/) | `.\dev.ps1 -Demo pwm` | http://127.0.0.1:4181/ |
| [PLC/HMI sorting machine](./projects/plc-hmi-sorting-machine/) | `.\dev.ps1 -Demo plc` | http://127.0.0.1:4182/ |

Each has its own Git history, model tests, dependency-free browser demo, and small local HTTP server. The portfolio ignores `projects/` so these repositories are committed independently.

Twelve additional independent repositories hold the reviewed background, selected figures, and, where applicable, short adapted algorithm examples. Their interactive presentations live in this portfolio; these repositories are curated documentation/example collections rather than full original applications. The exact list is in [project-repositories.json](./project-repositories.json). All independent repositories remain local unless separately approved for upload.

The portfolio tracks self-contained snapshots of **only** `index.html`, `style.css`, `demo.js`, and `model.js` in `public/demos/`. Run `npm run sync:demos` after editing either independent demo, review the changes, then build. A fresh clone of the portfolio builds without the project repositories. Sync and standalone model tests require those separate repositories; the normal build does not.

## Editing content

- [Approved profile](./src/data/profile.json): display name, email, short biography.
- [Project data](./src/data/projects.ts): titles, tags, descriptions, assumptions, and tour transcripts.
- [FYP integration](./src/components/VehicleDemo.tsx): approved recording and normalized timestamped overlays. Keep `approvedRecording` null until media review is complete. Overlay boxes use normalized x/y/width/height. Add captions and review synchronization when integrating a real video.
- [Publication review](./PUBLICATION_REVIEW.md) and [project inventory](./PROJECT_INVENTORY.md).

## Validation

For a terminal with Node.js/npm on PATH, or after temporarily adding the portable runtime from `.tools/node-path.txt` to the current process PATH:

```text
npm run typecheck
npm test
npm run test:models
npm run build
npm run check:repo -- --projects
npm run test:browser
```

`test:browser` requires a running local preview and Microsoft Edge. Set `PORTFOLIO_URL` to test another local URL. It uses headless Edge and stores QA screenshots in the ignored tools folder.

Validated on 2026-11-17 using Node.js v26.13.1:

- TypeScript: passed.
- Vitest: 15 tests passed, including classroom rules, guided-tour consent/cleanup, presence/finger gating, crossing states, pump thresholds, bounded certainty-factor combination, and the AND truth table. Five additional Node tests validate the publication policy using synthetic values.
- Standalone Node model tests: 6 passed, including PWM boundary signals and conveyor delivery accounting.
- Browser: navigation, search/filter, sliders via keyboard, all demo resets, PLC stepping/automatic sequence, tour controls, FYP placeholder, contact link, and hash-route refresh passed.
- Layout: 320, 390, 768, 1024, and 1440 px widths passed without page horizontal overflow or clipped embedded documents; mobile menu and reduced motion passed.
- Production build and public-path/credential-pattern/tracker checks passed. Review is pattern-based, not proof that all possible sensitive content is absent.
- The original eleven pages passed the expanded browser suite. Focused checks also pass for the five robotics/intelligent-systems additions at 320, 390, 768, and 1440 px, including code blocks, figures, offline controls, and absence of external data requests.

For a production preview after building, run `.\dev.ps1 -Preview` and open the URL printed by Vite (normally http://127.0.0.1:4173/).

## Deployment preparation

The selected route is free GitHub Pages on the user's own account. See [GitHub hosting instructions](./HOST_ON_GITHUB.md) and [the exact publication review](./PUBLICATION_REVIEW.md). The prepared workflow requires a manual trigger; a push alone does not publish. No remote upload or deployment occurs until the reviewed public scope is approved.

Read [the selected-code policy](./CODE_PUBLICATION_POLICY.md) before adding more source. The original project applications, credentials/configuration, datasets, saved models, personal records, and hardware parameters remain private. The code shown publicly is an adapted explanation, not a bulk source export. Run `node scripts/browser-new-projects.mjs` against the production preview for focused robotics/intelligent-systems validation.
