# GitHub Pages deployment

The portfolio is published from funfunbunbun/engineering-portfolio at https://funfunbunbun.github.io/engineering-portfolio/. The user explicitly approved public hosting and requested the current revision. The workflow remains manual-only.

Before an authorized update, review staged files, run npm test and npm run build, and run the tracked-file and Git-history checks. Run npm run test:models when the separate local demo repositories are available. Run the browser check against a production preview or the live URL.

Push the reviewed commit, trigger the Pages workflow manually and verify that both build and deployment jobs succeed. Check the live routes, relative assets, embedded demos, video, dark-mode preference and social links. Publish only the built dist artifact; never publish the working directory, original project folders or ignored review tools.

The website uses hash routing and a repository base path. Diagram SVGs are generated from the Mermaid definitions with npm run diagrams when those definitions change. Model weights remain private; optional browser inference reads a visitor-selected file without uploading it.
