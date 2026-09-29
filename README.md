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
- **Survive long enough and the planet transforms.** It progresses through 20 stages the longer you last -- from a dull, dormant rock, through molten and crystalline forms, into something increasingly cosmic: rings appear, then moons, then a pulsing corona, building toward a final glowing, many-ringed, many-mooned form. Stages are paced by survival time (each spark you catch adds a one-second bonus), not raw score, so a hot spark chain can't blow through them in seconds. On NORMAL the first stage takes about 20-25 seconds, the gaps stretch to about 40 seconds near the top, and the final form arrives around the 8-10 minute mark. EASY is paced a little slower; HARD and EXTREME a little faster, since their runs are shorter.
- Take a hit without a shield up and it's over.

Every run has its own adaptive soundtrack: a synthwave track with a catchy lead hook that grows as you go. The further you get, the more it builds -- an arpeggio, then huge swelling chords, a driving bass and drum fills, then key changes and a faster tempo for the late game. It also reacts to the action in the moment, opening up and rolling the drums when debris and UFOs close in, and settling when things calm down. Every change lands on the beat, so it never cuts or jumps. Harder difficulties play it faster, it fades out when you crash, and `M` or the SOUND button mutes it along with the sound effects.

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

## Install it on your phone

Orbit works as a Home Screen app: it gets its own icon, opens full screen with no browser bars, and keeps working offline.

- **iPhone / iPad (Safari):** open the game, tap **Share**, then **Add to Home Screen**.
- **Android (Chrome):** open the menu (⋮), then **Install app** or **Add to Home screen**.

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
