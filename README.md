# Aymen Jedidi — portfolio

React + TypeScript + Vite + Tailwind + Motion + Lenis, with shadcn/ui and GSAP ScrollTrigger in the case-study stories.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/ (deploy to Vercel, Netlify or GitHub Pages)
```

- All text, projects, links and numbers live in `src/data.ts`.
- Each project's story (plain-language tagline, how it started, how it works step by step, what stuck, real captures) lives in `src/stories.ts`. Captures are in `src/assets/shots/`, videos in `public/media/`.
- Add a LinkedIn URL or a portrait in the `profile` object at the top of `src/data.ts`.
- Private projects without captures use the generated cover art in `src/components/Covers.tsx`.
- Case studies open at `#work-<slug>`, e.g. `#work-f1lab`.
- The hero circuit (`src/components/Hero.tsx`, physics in `track.ts`) derives speeds from track curvature: the car brakes into numbered corners and races the ghost of its best lap.
- Smart CapEx uses hand-drawn SVG illustrations (`src/components/SmartCapexArt.tsx`) because its dashboards hold private Orange data.
- shadcn/ui primitives are in `src/components/ui/`.

## Easter eggs (spoilers)
| Trigger | What happens |
| --- | --- |
| type `lights`, or click the © five times | F1 start-lights reaction test, personal best saved |
| type `box` | team radio + a car flies past |
| type `drs`, or the Konami code | DRS: the hero lap and marquee speed up |
| type `luffy` / `wanted`, or click the straw hat in the footer | WANTED bounty poster |
| type `gomu` | the hero name stretches like rubber |
| type `laymouna` | lime rain, small lime energy detected |

The footer counts how many have been found and shows hints. The browser console has a hint too.
