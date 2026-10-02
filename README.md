# Orbit

A single-button arcade game. Debris is falling toward the planet — the only thing you can do about it is reverse your orbit.

**[Play it →](https://donaldweatherly645-coder.github.io/orbit/)**

## How to play

Your ship is locked in a fixed orbit around the planet. Press the one button to flip which direction you're circling — that's the entire control scheme.

- **Dodge** debris by timing your flips so you're never where a piece lands.
- **Graze** debris closely without touching it for a small score bonus (a near miss).
- **Grab sparks** as they appear on the orbit ring to build a score multiplier — the longer your streak, the more each spark is worth.
- **Grab shields** to survive hits. They stack up to three layers (shown as rings around your ship and dots in the HUD); each hit breaks one layer, with a red "SHIELD -1" / "SHIELD DOWN" flash so you always know where you stand, plus a split second of grace to escape the cluster that hit you.
- **Catch the violet hourglass** for three seconds of slow motion: every hazard crawls at 40% speed while your ship keeps full speed, then time eases back up to normal.
- **Watch for UFOs.** They hover nearby, glow, and charge up before firing a shot straight at wherever you are the instant they finish charging. Touching one is as lethal as debris. The further out you get, the more of them show up -- by the last planets before the Mothership, EASY can have 3 hovering at once and EXTREME up to 6. More UFOs means shots from more directions, not a wall of fire: UFOs share a fire budget (a cap on shots per second, growing gently with each planet), they never start charging at the same instant, only a few shots can be in the air at once, and they ease off while a heavy wave of debris is inbound.
- **Survive long enough and the planet transforms.** It progresses through 20 stages the longer you last -- from a dull, dormant rock, through molten and crystalline forms, into something increasingly cosmic: rings appear, then moons, then a pulsing corona, building toward a final glowing, many-ringed, many-mooned form. Stages are paced by survival time (each spark you catch adds a one-second bonus), not raw score, so a hot spark chain can't blow through them in seconds. On NORMAL the first stage takes about 20-25 seconds, the gaps stretch to about 40 seconds near the top, and the final form arrives around the 8-10 minute mark. EASY is paced a little slower; HARD and EXTREME a little faster, since their runs are shorter.
- **Every new planet is a payday.** A shockwave bursts from the planet and wipes the screen clear of debris, shots and UFOs, time freezes for a beat, a reward chime plays, the planet's name lands in a banner, and a cymbal crash and fanfare ring out over the soundtrack. You also get a random upgrade for the rest of the run:

  | Upgrade | Rarity | Effect |
  |---|---|---|
  | Hull Patch | Common (can repeat) | +1 shield layer |
  | Spark Magnet | Common | Grab pickups from further away |
  | Steady Nerves | Common | Longer escape window after a hit |
  | Dampener Field | Uncommon | New debris and UFO shots move 12% slower |
  | Chrono Core | Uncommon | Slow motion lasts 5s and shows up more often |
  | Signal Jammer | Uncommon | UFOs take longer to aim and fire less often |
  | Echo Shield | Uncommon | Every 10 near misses restores a shield layer |
  | Guardian Moon | Rare | A moon circles your ship and smashes debris (5s recharge) |
  | Nova Pulse | Rare | Every 30s a shockwave clears the space around the planet |
  | Last Stand | Rare | Once per run, survive a fatal hit with no shields -- the screen clears and time slows |

  Every active buff gets a card along the bottom of the screen with its name, a status line and a bar: slow-mo counts down its seconds, Nova Pulse counts down to its next shockwave, Guardian Moon shows its recharge, Echo Shield shows near misses toward its next shield, Last Stand shows READY or SPENT, and the rest say ALL RUN. The buffs that change during a run also show right on the playfield, so you never have to look away: slow-mo is a violet ring around your ship that drains as it runs out, Echo Shield is ten dots around the ship that light up with each near miss, Last Stand turns your ship's glow gold while it's ready, Guardian Moon shows a ring filling back up as it recharges, and Nova Pulse is a gold ring around the planet that fills toward the next shockwave and blinks when it's about to fire. Grabbing a shield or slow-mo, or being saved by Last Stand, flashes its name and what it does above the orbit. The game-over screen lists every buff and pickup you collected by name, next to the run and all-time counts.
- **Beat the Mothership.** A few seconds after the planet reaches its final form, the UFOs' mothership arrives and parks above your orbit. You can't shoot it -- the planet is charging a cannon, and you have to outlast the mothership until the charge bar fills (45s on EASY, 60s on NORMAL and HARD, 70s on EXTREME). Its four turrets charge and fire aimed shots like UFOs, and every few seconds it paints a blinking red arc on the orbit where you're heading, then burns it with a beam: flip away before it fires. Halfway through it turns red and everything comes faster. When the cannon is charged, the planet fires a giant laser, the mothership explodes (+2,500 points, plus 500 for every shield you still have), and a cutscene flies your ship down to land on the planet. That ends the run with a gold MISSION COMPLETE screen.
- Take a hit without a shield up and it's over.

The soundtrack is "Crossing the Meteor Belt", a recorded song that starts from the top every run and loops for as long as you last. The game still steers it: grabbing a buff (a shield, slow-mo or a planet upgrade) sparkles a bright shimmer over the top, and every new planet is announced by a cymbal crash and a quick fanfare, pitched to fit the song. It fades out when you crash, and `M` or the SOUND button mutes it along with the sound effects. Slow motion gets its own musical treatment: the song winds down like a tape slowing to a stop over about a second -- gently at first, then sinking -- with speed and pitch dropping together and the mix going dark and roomy, and the game slows on the same curve. When slow motion ends, the song and the game snap back to full speed in under half a second so the pace never drags, and a cymbal crash lands the song back on its feet. A new planet reached mid-slow-mo saves its fanfare until the song is back up to speed.

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

**Dev mode (for testing):** tap **DEV MODE** under the difficulty buttons, on the title or game-over screen. Two more toggles appear:

- **GOD MODE** makes your ship invincible: hits pass straight through.
- **LEVEL SELECT** starts every run on the planet you pick with the ◀ ▶ buttons (it wraps, so planet 20 is one tap back from planet 1). You start with the upgrades the earlier planets would have given you. Planet 20 brings the Mothership in a few seconds after launch.

Each toggle stays as you left it, across runs and visits, until you switch it off. With DEV MODE off, neither applies. While a dev effect is on, a green DEV tag sits in the top bar, and the run never saves your best score or adds to your all-time buffs. The old address shortcuts still work: `?dev=boss` turns on level select at planet 20, `?dev=god` turns on god mode, and `?dev=boss,god` does both.

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

Vanilla HTML/CSS/JS, rendered on a `<canvas>`. No frameworks, no build tooling. Sound effects are synthesized at runtime with the Web Audio API; the soundtrack is a single MP3 played through the same mixer.
