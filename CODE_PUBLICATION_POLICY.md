# Selected code and source privacy

The user authorized review of the Robotics and Principles of Intelligent Systems academic work, while requiring API keys, personal material, and parts of the original source to remain private.

## What is included

The five additions use report-based descriptions, four reviewed diagrams/simulation figures, and short **newly written explanatory examples**. These examples illustrate selected algorithms; they are not exports of the original applications.

| Project | Public example | Original material kept private |
| --- | --- | --- |
| Robotic recycling cell | Symbolic Denavit–Hartenberg transform | Controller integrations, network/device identity, calibration, actual DH values, robot poses and motion commands |
| Planting trajectory | Generic smoothstep segment interpolation | Full planner, physical robot setup, controller configuration, calibration |
| Weather expert system | Combine two positive certainty-factor supports | Service access, credentials, location/history configuration, fetch routines, original application/screenshots |
| Sentiment analysis | Preprocessing/vectorization/training pseudocode | Original reviews, account records, interface/settings source, dataset, saved model and vectorizer |
| Neural classifiers | Fixed-weight illustrative AND decision | Full training scripts, datasets, learned parameters, saved models, raw evaluation records |

The public website contains its new frontend source so GitHub Pages can build it. That does not require uploading any original project application or its Git history. The website contains no live weather integration, hardware control, or inference using private saved models.

## Review performed

- Read selected academic reports locally. Sensitive configuration lines were suppressed in text review output.
- Inspected the static structure of three small model/preprocessing/kinematics modules without executing them. This was a bounded inspection, not an audit of the complete original applications.
- Did not load or deserialize datasets, saved models, vectorizers, user records, or account settings.
- Skipped original weather UI and source-code screenshots. Selected only visually reviewed process/architecture/academic simulation figures.
- Original source folders remain unchanged; no bulk copies or archive imports were made.

## Publication checks

- Only checksum-matched images in [the media manifest](./media-manifest.json) can enter the build.
- Build and tracked-file checks detect common credential shapes, named sensitive literal assignments, token-bearing URLs, private network addresses, and local source paths without printing matched values.
- Full reports, archives, datasets, serialized models, databases, notebooks, credential files, and logs are prohibited by publication checks and ignored where applicable.
- Focused browser checks verify that the new demo pages make no external data/API requests.
- Pattern scans cannot prove every secret or personal detail has been found. Human review of the exact selected content remains required before publication.

## Status

No original project source has been uploaded. The expanded version contains **16 project pages, 14 report-derived figures, and five adapted algorithm examples**. It requires an updated final review; approval referring to the earlier eleven-project/ten-image version does not automatically approve the additional material.
