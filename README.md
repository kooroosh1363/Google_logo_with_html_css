# MarkLab — CSS Geometry Reconstruction Lab

MarkLab modernizes a tiny 2023 CSS-logo exercise into an interactive geometry lab.

The page reconstructs an **unofficial multicolor G-shaped mark** using HTML and CSS only. The mark itself does not use SVG, canvas, or image assets. JavaScript is limited to changing CSS custom properties and exposing the geometry as an interactive learning tool.

> Educational exercise only. This repository is not affiliated with or endorsed by Google.

## What changed

The original repository had:

- an incorrect stylesheet path in `index.html`
- fixed-pixel geometry only
- no responsive layout
- no accessibility treatment
- no explanation of the construction technique
- no tests or CI
- a two-line README
- an unrelated Dynamics 365 `.gitignore`
- a stray `tyext.txt` file

MarkLab turns the exercise into a small CSS-engineering portfolio piece.

## Features

- CSS-only multicolor mark construction
- responsive preview canvas
- live overall-size control
- live stroke-width control
- three canvas presets
- optional center guides
- derived geometry metrics
- generated CSS custom-property snippet
- clipboard copy action
- accessible controls and focus states
- reduced-motion support
- zero runtime dependencies

## Geometry model

The configurable geometry is isolated in:

```text
assets/geometry.js
```

It owns:

- valid size bounds
- valid stroke bounds
- input normalization
- inner-diameter calculation
- stroke ratio
- crossbar sizing
- CSS custom-property generation

The UI layer in `assets/main.js` only reads that model and updates the DOM.

## Construction technique

The mark uses:

1. a circular element with four differently colored borders;
2. a `::before` pseudo-element that masks part of the right side;
3. a `::after` pseudo-element that draws the blue horizontal crossbar;
4. CSS custom properties for size and stroke control.

## Local development

No runtime package install is required.

Serve the repository with any static server, for example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Tests

```bash
npm test
```

Run the complete quality gate:

```bash
npm run check
```

The test suite covers geometry normalization, bounds, derived metrics, CSS-variable output, and deterministic snippet generation.

## CI

Every pull request and push to `main` runs JavaScript syntax checks and the Node test suite.

## GitHub Pages

Enable:

**Settings → Pages → Source → GitHub Actions**

Then run:

**Actions → Deploy Pages → Run workflow**

## Scope

MarkLab is a front-end educational geometry experiment. It is not an official brand asset generator and should not be used as a source of canonical logo specifications.

## License

MIT.
