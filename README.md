# Aymen Jedidi — portfolio

React + TypeScript + Vite + Tailwind + Framer Motion + Lenis.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/ (deploy to Vercel, Netlify or GitHub Pages)
```

- All text, projects, links and numbers live in `src/data.ts`.
- Add a LinkedIn URL or a portrait in the `profile` object at the top of that file.
- Each project's cover art is in `src/components/Covers.tsx`.
- Case studies open at `#work-<slug>`, e.g. `#work-f1lab`.

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
