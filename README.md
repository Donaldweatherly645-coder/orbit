# Orbit

A single-button arcade game. Debris is falling toward the planet — the only thing you can do about it is reverse your orbit.

**[Play it →](https://donaldweatherly645-coder.github.io/orbit/)**

## How to play

Your ship is locked in a fixed orbit around the planet. Press the one button to flip which direction you're circling — that's the entire control scheme.

- **Dodge** debris by timing your flips so you're never where a piece lands.
- **Graze** debris closely without touching it for a small score bonus (a near miss).
- **Grab sparks** as they appear on the orbit ring to build a score multiplier — the longer your streak, the more each spark is worth.
- **Grab a shield** when one appears to survive your next hit — it absorbs one collision (debris, a UFO, or a shot) and breaks.
- **Watch for UFOs.** They hover nearby, glow, and charge up before firing a shot straight at wherever you are the instant they finish charging. Touching one is as lethal as debris.
- **Survive long enough and the planet transforms.** It progresses through 20 stages as your score climbs -- from a dull, dormant rock, through molten and crystalline forms, into something increasingly cosmic: rings appear, then moons, then a pulsing corona, building toward a final glowing, many-ringed, many-mooned form. Early stages arrive quickly; the last few take real sustained score. How much score each stage takes depends on the difficulty, scaled so even a strong EXTREME run can see it all the way through.
- Take a hit without a shield up and it's over.

| Input | Action |
|---|---|
| Click / Tap | Flip orbit direction |
| `Space`, `←`, `→`, `Enter` | Flip orbit direction |
| `M` | Toggle sound |

Pick a difficulty from the title screen before launching. Every tier has its own dynamic backdrop -- soft, drifting color behind the action -- that gets more vivid the higher you go:

- **EASY** — debris starts slower and arrives less often; UFOs are rare and telegraph their shots generously. The backdrop is calm and muted -- present, but never distracting.
- **NORMAL** — the original tuning, with a moderately colorful backdrop.
- **HARD** — debris shows up sooner, ramps up faster, and starts arriving in clusters early into the run. UFOs appear more often and fire with less warning. The backdrop turns noticeably more vivid too. It's meant to feel like an overwhelming swarm while staying readable — the fix is anticipation and positioning, not just reflexes.
- **EXTREME** — the fastest, densest tier, paired with the most vivid, fastest-shifting version of that same backdrop -- full psychedelic. Up to three UFOs can be hovering at once, firing fast. A dark vignette keeps the ship and orbit legible at every tier, even as the edges of the screen go wild here.

Your best score is saved locally in your browser and shown on the title screen.

## Running it locally

It's a single self-contained HTML file — no build step, no dependencies.

```bash
open index.html
```

Or serve it if your browser is picky about local files:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Tech

Vanilla HTML/CSS/JS, rendered on a `<canvas>`. No frameworks, no build tooling. Sound effects are synthesized at runtime with the Web Audio API — there are no audio files.
