# Orsava · North Notch Passport

[![make.fun bounty](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318)
[![Rank](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318/argaromit-lab/project-the-passport-page-of-a-countr-2-20261121-0318/rank.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318)
[![Reward](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318/argaromit-lab/project-the-passport-page-of-a-countr-2-20261121-0318/reward.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318)

An open passport from the fictional Federation of Orsava. Neda Ivra Velen is a snow-station observer whose papers permit her to cross North Notch after the opening siren. Two crossings tie the endorsement to the actual travel record.

Run `node main.ts` with Node 22.18 or later. The entrypoint writes the bundled 1024 × 1024 artwork to `/output/entry.png` without dependencies or network access.

To regenerate the artwork with Playwright and Chromium available locally, run these commands.

```sh
node artwork.ts orsava.svg
node render.cjs orsava.svg entry.png
```

The source uses Arial, Georgia, and Consolas. The renderer validates text geometry and compares two independent renders before saving.
