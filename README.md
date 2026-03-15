# DORFTV NodeCG

While these [NodeCG](https://nodecg.dev) Bundles are used for DORFTV Community TV they are pretty generic so probably usable for others too.

## Bundles
Currently the following Bundles are implemented.

### Logos
Upload your logo files on the assets tab and select them in the Dashboard.
There are two panels. One for Live and one for playout.

### Broadcast Graphics
Single graphic overlay with three dashboard panels:

- **Lower Third** — Broadcast-style name/title card. 5 selectable styles via dropdown:
  - *Classic* — Accent bar + frosted glass card
  - *Two-Tone* — Title on accent background, subtitle on dark
  - *Staggered* — Stepped blocks, subtitle narrower and offset
  - *Wipe* — Horizontal wipe line reveals content
  - *Tag Label* — Accent tag above the card (e.g. LIVE, INTERVIEW)
- **Crawl** — Scrolling news ticker at the bottom. Separate items with `|`. Configurable speed, font size, and colors.
- **Clock** — Time display in the upper right corner.

All elements support customizable background, text, and accent colors. Left/right alignment for lower third.


## Usage

```
docker compose up -d
```

Point your Browser to http://localhost:9090

## Future
Panels and graphics can be integrated with [DOVE](https://github.com/dorftv/dove) Online Video Editor via its NodeCG input type.
