# Deployment preparation — approval required

These are instructions only. No remote, account integration, upload, workflow, or hosting has been configured.

## Before either hosting option

1. Review [the inventory](./PROJECT_INVENTORY.md), profile wording, and [publication review](./PUBLICATION_REVIEW.md).
2. Confirm whether to publish the repository source as well as the built website. Source visibility and website visibility are separate choices.
3. Review individual media rights. Current media manifest: original SVG/CSS illustrations and browser demo code only; zero reports, videos, photographs, recordings, or external media.
4. Run `npm ci`, `npm test`, `npm run build`, and `npm run check:repo`. Inspect staged files and build output. Run standalone model tests when the independent repositories are present.
5. Check each repository's Git status and history. Confirm approved name/email attribution. Pattern scans complement human review; they cannot establish ownership or detect every secret.
6. Obtain explicit approval naming the destination repository, repository visibility, hosting platform, and assets to publish before configuring remotes, pushing, or deploying.

## Preferred: GitHub source → Cloudflare Pages

After approval, create/select the approved GitHub repository and push the portfolio source. The independent project repositories can be uploaded separately only if also approved. The portfolio's reviewed demo snapshots allow it to build without those repositories.

In Cloudflare Pages, connect the approved GitHub repository, select the intended production branch, use the repository root, set the build command to `npm run build`, and use `dist` as the output directory. Select a supported Node.js LTS version compatible with the lockfile. No backend, environment secrets, telemetry, or database is needed.

See the official [React Pages guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/) and [Git integration guide](https://developers.cloudflare.com/pages/get-started/git-integration/). Settings and platform terms should be rechecked at publication time.

## Optional: GitHub Pages, subject to use-case eligibility

GitHub states that Pages must not be used as free hosting to run an online business or a site primarily facilitating commercial transactions or commercial SaaS. This portfolio uses a studio brand and invites contact, so confirm that its final purpose is eligible before choosing Pages. Use Cloudflare Pages if commercial positioning creates uncertainty. See [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

For an eligible academic/personal portfolio, after approval:

1. Use the approved repository and choose GitHub Actions as the Pages build source.
2. Add a deployment workflow based on the current [Vite GitHub Pages guide](https://vite.dev/guide/static-deploy.html#github-pages). Install a compatible Node.js LTS release, run `npm ci`, tests, and `npm run build`, then upload/deploy only `dist`.
3. This project uses a relative Vite base and hash routing, supporting both repository subpaths and direct refresh of `#/projects/...` routes without a server rewrite.
4. Verify the published root, all project routes, embedded demos, favicon, and contact link after deployment. Do not publish the working folder itself or the ignored tools directory.

No workflow is installed now, so a later push cannot silently trigger deployment through this repository.
