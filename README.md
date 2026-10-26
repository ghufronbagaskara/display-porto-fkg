# Elora Smile Clinic — Architectural Explorer V2

## How to open

1. Extract the ZIP.
2. Double-click `index.html` on Windows or macOS.
3. Use a recent Edge, Chrome, Firefox, or Safari with WebGL2 enabled.

**No network, npm install, dev server, login, or CDN is required to view the model.** `app.bundle.js` contains the 3D renderer and copies of all 56 GLB assets for direct `file://` operation. The separate original `.glb` files are provided for editing and reuse.

### Controls

- 3D Orbit — drag to rotate and scroll to zoom.
- Floor Plan — orthographic bird's-eye view with room labels.
- Eye Level — lower-perspective view; drag to look around.
- Cutaway / Full Walls — inspect rooms without wall occlusion.
- Select a room via the sidebar or by clicking its floor; use Reset to start again.
- Save PNG — save the current WebGL scene.

## Contents

```
index.html              Browser UI
app.bundle.js           Self-contained Three.js + glTF models
assets/models/*.glb     Original editable 3D assets (56 models)
src/main.js             Scene authoring source
src/embedded-assets.js  Generated binary embedding source
scripts/                Reproducible asset download / embedding helpers
ASSET_LICENSES.json     Asset URLs and licences
package.json            Dependency versions and build command
```

All included GLB models were published under **CC0 1.0 Universal** by 3DAssets.dev. They come from Dental Practice and Surgery, Home Appliances and Utility Room, Downtown Office Interiors, Fitted Kitchen and Bathroom Builder, Hospital Wards and Clinic Operations, and Clinic and Veterinary Practice. Sources, dimensions, triangle counts, and licences are in `ASSET_LICENSES.json`. These are creator-reported AI-generated assets, not manufacturer CAD models.

### Developer workflow

For changes to `src/main.js`:

```
npm install
npm run build
npm test
```

The build bundles Three.js and the embedded local model payload. No runtime requests to a CDN.

### Deploy to Vercel

This is a static Three.js site built with esbuild, **not Vite or React**. Import the repository into Vercel and set Root Directory to `elora_klinik_dental` (or `.` when importing that folder as its own repository). Select Framework Preset **Other**. The included `vercel.json` sets Build Command to `npm run build` and Output Directory to `dist`. The postbuild step copies only `index.html` and the self-contained `app.bundle.js` into `dist`.

You can still double-click the project's `index.html`, or `dist/index.html`, after building. Both use a classic bundled script with embedded models and no runtime server requests. A Vite migration is not required for Vercel deployment.

To refresh the downloaded assets, run `python scripts/fetch_assets.py`, then `python scripts/embed_assets.py`, then rebuild. The downloader checks the source licence and byte length. Cached API manifests retain the asset metadata used for the download.

## Interior enhancement, 26 October 2026

Radiography now contains an intraoral X-ray arm mounted against the wall, patient chair, sensor tray on the worktop, viewing screen, operator workstation, apron representation, warning sign, and split AC. This is an intraoral room, not a panoramic/CBCT installation; premium panoramic model candidates are linked in `ENHANCEMENT_NOTES.md`.

Consultation has doctor/visitor seating, a computer, teaching jaw model, and records. Staff space has seating, lockers, a fridge, and kettle. Treatment rooms include countertop instruments and dispensers. Sterilization includes a sink and instrument processing equipment. The toilet has a WC, basin, mirror, paper holder, and bin. Storage has stocked shelving. Repeated furniture shares loaded GLB geometry and materials.

Timber/tile floor textures, skirting, a warm sun, cool fill, and four local lights provide more material definition. Ceiling panels appear in Eye Level; orbit and plan views hide them to keep rooms visible.

The camera now fits the clinic to the actual viewport aspect ratio. A `ResizeObserver` catches changes to the preview panel as well as window changes; switching views resets zoom, and Reset clears the selection and camera target. The renderer skips drawing while idle and reuses one static sunlight shadow map, invalidated when geometry or wall visibility changes.

`npm test` parses the actual GLBs and checks room boundaries, floor placement, responsive camera framing, view changes, Reset, idle rendering, the canvas sizing hook, and mobile notice behavior with DOM/WebGL stand-ins. Browser verification is recorded in `ENHANCEMENT_NOTES.md`.

The canvas now receives its `scene` ID so its CSS size matches the viewport instead of its high-DPI drawing buffer. Before this fix, a 1.25 device pixel ratio produced a 1525px-wide canvas in a 1220px-wide panel, shifting the apparent scene center. The in-app browser confirmed matching panel/canvas bounds after the fix. Sunlight now has a lower angle, warmer color, and a 2048² shadow map; ambient/fill intensity is reduced for more visible directional shadows.

Below 850 CSS pixels, a native dialog recommends a laptop/desktop or the browser's desktop-site setting. It appears automatically, supports keyboard dismissal, and stays dismissed for the current visit. Resizing to desktop closes it. The site cannot change the browser's desktop-site setting itself.

## Spatial assumptions and limitations

The site and building dimensions are **assumptions**, not given in the supplied source report: 18 × 12m = 216m², one storey, 2.8m visualized wall height. The program follows the Elora Smile Clinic business plan's three dental units and patient-centered/Scandinavian concept. It includes a reception/waiting area, consultation, three treatment rooms, sterilization, radiography, staff, toilet, storage/utilities, and patient corridors.

The result is a **visual study for an academic task**, not a licensed architectural or medical-facility construction drawing. In particular, this scene does not establish compliance with Indonesian rules for infection prevention, instrument dirty-clean segregation, accessible movement and toilets, radiation shielding, fire and emergency egress, HVAC, medical waste handling, and supporting utilities. A licensed professional must review those systems before real implementation.
