# DORFTV NodeCG

[NodeCG](https://nodecg.dev) bundles for broadcast graphics, made for the DORFTV community TV. They are generic enough to be useful for others too.

They work on their own in any browser source, and they are integrated with [DOVE](https://github.com/dorftv/dove) Online Video Editor: DOVE renders the graphics as a transparent video input and shows the NodeCG dashboard panels in its own UI. See the DOVE docs: [NodeCG input](https://github.com/dorftv/dove/blob/main/dove/docs/inputs-nodecg.md).

## Bundles

### Logos

A station logo ("bug") with separate panels for the **Live** and the **Playout** program, so each has its own logo.

1. Upload logo files on the NodeCG **Assets** tab: category *Logo* for playout, *Live Logo* for live (PNG, JPEG or GIF).
2. Pick a logo in the *Logo* or *Live Logo* dashboard panel and press **Submit**. *No logo* hides it.

| Panel | Asset category | Graphic |
|-------|----------------|---------|
| Logo (playout) | Logo | `/bundles/logos/graphics/logo.html` |
| Live Logo | Live Logo | `/bundles/logos/graphics/livelogo.html` |

Each graphic is a 1920×1080 transparent page that scales the logo to fit, centred. Upload a full-frame transparent PNG with the logo already in its corner for a correctly placed bug. While no logo is shown the page draws nothing.

### Broadcast Graphics

One overlay graphic (`/bundles/broadcast-graphics/graphics/index.html`, 1920×1080, transparent) with three dashboard panels:

- **Lower Third**: name/title card with an optional tag (e.g. LIVE, INTERVIEW), left or right aligned. Five styles:
  - *Classic*: accent bar and frosted glass card
  - *Two-Tone*: title on the accent colour, subtitle on dark
  - *Staggered*: stepped blocks, subtitle narrower and offset
  - *Wipe*: a horizontal wipe line reveals the content
  - *Tag Label*: accent tag above the card
- **Crawl**: news ticker at the bottom. Separate items with `|`. Adjustable speed and font size.
- **Clock**: time in the upper right corner. Styles *Digital*, *Analog* and *Minimal*, adjustable size.

Every element has its own show/hide toggle and background, text and accent colours.

## Usage

```
docker compose up -d
```

Open the dashboard at http://localhost:9090. Graphics are served under `http://localhost:9090/bundles/<bundle>/graphics/...`.

The image is published as `ghcr.io/dorftv/nodecg-bundles` when a tag is pushed.

## With DOVE

DOVE ships a compose overlay that runs this image next to DOVE:

```
docker compose -f docker-compose.yml -f docker-compose.nodecg.yml up
```

In DOVE, add a `nodecg` input with a graphic URL, e.g. `http://nodecg:9090/bundles/broadcast-graphics/graphics/index.html`, and place it in a scene above the video. DOVE proxies the NodeCG dashboard, so the panels work behind DOVE's login. Setup and proxy details: [DOVE NodeCG docs](https://github.com/dorftv/dove/blob/main/dove/docs/inputs-nodecg.md).
