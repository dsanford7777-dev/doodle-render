# doodle-render

Hand-drawn doodle animations (Remotion), rendered for free on GitHub Actions.

Push `render.json` (`{"composition": "...", "chunks": 10}`, optional `"range": [first, last]`) and
`.github/workflows/render.yml` renders the composition in parallel chunks, joins them, renders the
soundtrack in one pass (narration + effects, as placed in the code) and keeps the result as an
encrypted 3-day artifact.

Narration, word timings and YouTube Audio Library sound effects are not public: they live in
`secure/*.tar.enc` and are unlocked at render time with the `ASSET_KEY` repository secret.
