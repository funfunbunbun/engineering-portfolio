# Free hosting on your GitHub account

GitHub Pages can serve this built HTML/CSS/JavaScript website. A public repository can use GitHub Free; a paid domain is unnecessary. See [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

## Prepared destination

- Account: `funfunbunbun` (verified through the existing signed-in GitHub CLI).
- New public repository: `engineering-portfolio`.
- Expected website: `https://funfunbunbun.github.io/engineering-portfolio/` after successful publication.
- The repository has not yet been created or uploaded. The site is not yet live.

Free Pages hosting uses a public repository, so both the source code and included images will be publicly readable. The original reports, ignored review tools, local source paths, and independent repositories are excluded.

## One-time publication, after content approval

1. Review [the publication scope and figures](./PUBLICATION_REVIEW.md).
2. Create the approved public repository and push the reviewed portfolio source to its `main` branch.
3. In the repository, open Settings → Pages and choose GitHub Actions as the source.
4. Open Actions → Publish reviewed portfolio to GitHub Pages → Run workflow.
5. Wait for both build and deploy jobs to pass; verify the live address, image loading, simulations, and hash routes.

The prepared workflow pins official GitHub Actions to verified release commits, installs dependencies from the lockfile, runs interaction tests and content checks, builds the static output, and deploys only `dist`. Its base path comes from Pages configuration. It has only a manual trigger; source pushes do not automatically publish.

The site is an educational personal portfolio, with tutoring described as experience. GitHub Pages is not intended to run an online business, e-commerce, or commercial SaaS. See [Pages usage limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits). Keep future sales, paid bookings, or payment processing off this Pages site.

## Future edits

Edit locally, test, review the changed public content, commit, and push. Run the Pages workflow manually only when ready to publish the update. The separate academic project repositories can remain local; reviewed standalone demo snapshots are already included in the portfolio source.
