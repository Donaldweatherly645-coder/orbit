# Orbit

A single-button arcade game. Debris is falling toward the planet — the only thing you can do about it is reverse your orbit.

**[Play it →](https://donaldweatherly645-coder.github.io/orbit/)**

## How to play

Your ship is locked in a fixed orbit around the planet. Press the one button to flip which direction you're circling — that's the entire control scheme.

- **Dodge** debris by timing your flips so you're never where a piece lands.
- **Graze** debris closely without touching it for a small score bonus (a near miss).
- **Grab sparks** as they appear on the orbit ring to build a score multiplier — the longer your streak, the more each spark is worth.
- **Grab shields** to survive hits. Each shield absorbs exactly one hit and is gone -- the next thing that touches you gets through. How many you can hold depends on the difficulty: 2 on EASY and NORMAL, 3 on HARD, 4 on EXTREME (shown as rings around your ship and dots in the HUD), with a red "SHIELD -1" / "SHIELD DOWN" flash so you always know where you stand.
- **Catch the violet hourglass** for three seconds of slow motion: every hazard crawls at 40% speed while your ship keeps full speed, then time eases back up to normal.
- **Watch for UFOs.** They hover nearby, glow, and charge up before firing a shot straight at wherever you are the instant they finish charging. Touching one is as lethal as debris. The further out you get, the more of them show up -- by the last planets before the Mothership, EASY can have 3 hovering at once and EXTREME up to 6. More UFOs means shots from more directions, not a wall of fire: UFOs share a fire budget (a cap on shots per second, growing gently with each planet), they never start charging at the same instant, only a few shots can be in the air at once, and they ease off while a heavy wave of debris is inbound.
- **Survive long enough and the planet transforms.** It progresses through 20 stages the longer you last -- from a dull, dormant rock, through molten and crystalline forms, into something increasingly cosmic: rings appear, then moons, then a pulsing corona, building toward a final glowing, many-ringed, many-mooned form. Stages are paced by survival time (each spark you catch adds a one-second bonus), not raw score, so a hot spark chain can't blow through them in seconds. On NORMAL the first stage takes about 20-25 seconds, the gaps stretch to about 40 seconds near the top, and the final form arrives around the 8-10 minute mark. EASY is paced a little slower; HARD and EXTREME a little faster, since their runs are shorter.
- **Every new planet is a payday.** A shockwave bursts from the planet and clears the debris, shots and UFOs close enough to reach your orbit within about a second (far-off ones stay, so the action picks straight back up), time freezes for a beat, you get a brief 0.6s of grace, a reward chime plays, the planet's name lands in a banner, and a cymbal crash and fanfare ring out over the soundtrack. You also get a random upgrade for the rest of the run:

  | Upgrade | Rarity | Effect |
  |---|---|---|
  | Hull Patch | Common (can repeat) | +1 shield right away. Only offered when you have room for it; if nothing else is left either, you get +250 score instead |
  | Chrono Core | Uncommon | Slow motion lasts 5s instead of 3, and the next hourglass arrives 30% sooner. Hourglasses get a rose halo |
  | Echo Shield | Uncommon | Every 10 near misses restores a shield. If your shields are full, one charge is banked (a ring around the dots) and paid out the moment you have room; only one can be banked |
  | Guardian Moon | Rare | A moon circles your ship and smashes one rock, then recharges for 5s. Rocks only |
  | Nova Pulse | Rare | Every 30s a shockwave clears rocks and shots near the planet, then shows how many it got |
  | Last Stand | Rare | Once per run, survive a fatal hit with no shields: the hit and the danger right around you are cleared, 0.8s of grace, and slow motion (3s, or 5s with Chrono Core) |

  There's no text tracker to read mid-fight. Every upgrade is announced by name when you get it, and the ones that change during a run show right on the playfield, so you never have to look away: slow-mo is a violet ring around your ship that drains as it runs out, Echo Shield is ten dots around the ship that light up with each near miss, Last Stand turns your ship's glow rose while it's ready, Guardian Moon flashes a ring when it arrives and when it's ready again, and shows a ring filling back up as it recharges, and Nova Pulse is a rose ring around the planet that fills toward the next shockwave and blinks when it's about to fire (during the Mothership fight the Planet Cannon countdown is the one timer shown, though the pulse still fires) -- then a rose wave visibly rolls out from the planet, smashing debris and shots near it, with a NOVA PULSE callout. Grabbing a shield or slow-mo, or being saved by Last Stand, shows its name and what it does in a small box over the planet -- the one spot that never covers your ship or anything dangerous. Messages take turns rather than piling up, and wait for a new-planet banner to finish. The game-over screen lists every buff and pickup you collected by name, next to the run and all-time counts. Colors always mean the same thing: **red** is danger or damage, **cyan** is shields, **violet** is a temporary effect (slow-mo), **rose** is an upgrade you own, and **gold** is an achievement. The SHIELD readout in the top bar is always shown during a run, with a slot for each shield your difficulty allows.
- **Beat the Mothership.** A few seconds after the planet reaches its final form, the UFOs' mothership arrives and parks above your orbit. You can't shoot it -- the planet is charging a cannon, and you have to outlast the mothership until the charge bar fills (45s on EASY, 60s on NORMAL and HARD, 70s on EXTREME). Its four turrets charge and fire aimed shots like UFOs, and every few seconds it paints a blinking red arc on the orbit where you're heading, then burns it with a beam: flip away before it fires. Halfway through it turns red and everything comes faster. When the cannon is charged, the planet fires a giant laser, the mothership explodes (+2,500 points, plus 500 for every shield you still have), and a cutscene flies your ship down to land on the planet. That ends the run with a gold MISSION COMPLETE screen.
- **Watch for snagged rocks.** Every few seconds, one of the falling rocks gets caught on your orbit instead of passing through: it glows red there, then cracks apart. It's not aimed at you and it's not an extra rock -- but it stays longer than it takes your ship to go all the way round, so you can't just coast in one direction. Flip away from it, and when two are up, bounce between them. They change with difficulty: on EASY and NORMAL they linger 4.5s; on HARD they last 3s and only appear in the quieter moments, so heavy waves stay pure dodging; on EXTREME the same, but they **creep** slowly along the orbit, so the safe space keeps shifting.
- Take a hit without a shield up and it's over.

The soundtrack is a recorded song that loops for as long as you last: "Crossing the Meteor Belt" on EASY, "Phase Eight Pursuit" on NORMAL and HARD, and the faster, more intense "Last Save Point" on EXTREME. All three behave the same way, and all the songs are mastered to the same loudness. The title screen has its own song, "Ready for Launch": it starts with your first tap on the title screen (browsers don't allow sound before that), fades out when you launch, and the run's song begins the instant it has gone quiet -- the two are never heard at the same time. After a crash the run's song keeps playing under the results: **PRESS TO RELAUNCH** carries on with the same song from where it is (even if you pick another difficulty -- the song changes at the menu), and **BACK TO MAIN MENU** fades it out, then fades "Ready for Launch" back in. After a win (whose finale ends the run's song), "Ready for Launch" returns on the results screen. The game still steers it: grabbing a buff (a shield, slow-mo or a planet upgrade) sparkles a bright shimmer over the top, and every new planet is announced by a cymbal crash and a quick fanfare, pitched to fit the song. The sound button in the top-right corner (on every screen) or `M` mutes it along with the sound effects. Slow motion gets its own musical treatment: the song winds down like a tape slowing to a stop over about a second -- gently at first, then sinking -- with speed and pitch dropping together and just a touch of softening and room, so it still sounds like the same song, only slower -- and the game slows on the same curve. When slow motion ends, the song and the game snap back to full speed in under half a second so the pace never drags, and a cymbal crash lands the song back on its feet. A new planet reached mid-slow-mo saves its fanfare until the song is back up to speed.

| Input | Action |
|---|---|
| Click / Tap | Flip orbit direction |
| `Space`, `←`, `→`, `Enter` | Flip orbit direction |
| `M` | Toggle sound |
| `Esc` / `P` | Pause / resume |

Pick a difficulty from the title screen before launching. Every tier has its own dynamic backdrop -- soft, drifting color behind the action -- that gets more vivid the higher you go:

- **EASY** — debris starts slower and arrives less often; UFOs are rare and telegraph their shots generously. The backdrop is calm and muted -- present, but never distracting.
- **NORMAL** — the original tuning, with a moderately colorful backdrop.
- **HARD** — debris shows up sooner, ramps up faster, and starts arriving in clusters early into the run. UFOs appear more often and fire with less warning. The backdrop turns noticeably more vivid too. It's meant to feel like an overwhelming swarm while staying readable — the fix is anticipation and positioning, not just reflexes.
- **EXTREME** — the fastest, densest tier, paired with the most vivid, fastest-shifting version of that same backdrop -- full psychedelic. Up to three UFOs can be hovering at once, firing fast. A dark vignette keeps the ship and orbit legible at every tier, even as the edges of the screen go wild here.

Your best score is saved locally in your browser and shown on the title screen.

**Achievements:** ten to earn, saved on your device. Tap **ACHIEVEMENTS** on the title or game-over screen to see them all -- the ones you haven't earned yet are greyed out with what it takes. A banner drops in the moment you earn one (several earned at once share one banner). Dev-mode runs don't count.

| Achievement | How to earn it |
|---|---|
| First Orbit | Survive 30 seconds |
| Iron Nerves | Survive 3 minutes in one run |
| Cadet / Pilot / Ace / Legend | Reach planet 5 on EASY / NORMAL / HARD / EXTREME |
| Halfway There | Reach planet 10 |
| Ascendant | Reach planet 20 |
| Mission Complete | Beat the Mothership |
| Extreme Victor | Beat the Mothership on EXTREME |

**Dev mode (for testing):** tap **DEV MODE** under the difficulty buttons, on the title or game-over screen. Two more toggles appear:

- **GOD MODE** makes your ship invincible: hits pass straight through.
- **LEVEL SELECT** starts every run on the planet you pick with the ◀ ▶ buttons (it wraps, so planet 20 is one tap back from planet 1). You start with the upgrades the earlier planets would have given you. Planet 20 brings the Mothership in a few seconds after launch.

Each toggle stays as you left it, across runs and visits, until you switch it off. With DEV MODE off, neither applies. While a dev effect is on, a green DEV tag sits in the top bar, and the run never saves your best score or adds to your all-time buffs. The old address shortcuts still work: `?dev=boss` turns on level select at planet 20, `?dev=god` turns on god mode, and `?dev=boss,god` does both.

## Install it on your phone

Orbit works as a Home Screen app: it gets its own icon, opens full screen with no browser bars, and keeps working offline. On the title screen, **PLAY OFFLINE** installs it directly on Android, and on iPhone opens a short how-to (Apple doesn't let websites add themselves to the Home Screen).

- **iPhone / iPad (Safari):** open the game, tap **Share**, then **Add to Home Screen**.
- **Android (Chrome):** open the menu (⋮), then **Install app** or **Add to Home screen**.

**No sound?** Browsers keep every page silent until you tap it once, so the sound button in the top-right corner reads **TAP FOR SOUND** until sound is on (tapping anywhere else works too), then **TAP TO MUTE**. It's the same button on the title, during a run and on the game-over screen, and it never starts or steers the game.

**Pause:** during a run, the ❚❚ button under the sound button (or `Esc` / `P`) pauses everything -- the game, every timer and all sound. Leaving the app mid-run pauses it too. **RESUME** picks up exactly where you left off, with sound as it was; **BACK TO MAIN MENU** ends the run (it isn't scored) and fades over to the menu song. On iPhone: On iOS 17 and later, music plays even with the silent switch on; on older iOS, flip the side switch off silent.

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

## Release checks

Before shipping: `python3 tests/check.py` (asset rules + service-worker scenarios) and `tests/regression.html` in a browser (gameplay, collisions, shields, run state, audio). See [tests/README.md](tests/README.md). If you replace a song's audio, run `python3 tests/check.py --fix` so installed copies pick it up.

## Tech

Vanilla HTML/CSS/JS, rendered on a `<canvas>`. No frameworks, no build tooling. Sound effects are synthesized at runtime with the Web Audio API; the soundtrack is a single MP3 played through the same mixer.
