// The story layer of each case study: a plain-language explanation, how it started,
// how it works step by step, what stuck with me, and real captures of the running project.
// Facts and numbers come from data.ts, the project repositories, and their demos.
import agScan from "./assets/shots/ag-scan.webp";
import coHome from "./assets/shots/co-home.webp";
import coProduct from "./assets/shots/co-product.webp";
import coShop from "./assets/shots/co-shop.webp";
import f1Agent from "./assets/shots/f1-agent.webp";
import f1Replay from "./assets/shots/f1-replay.webp";
import f1Research from "./assets/shots/f1-research.webp";
import f1Telemetry from "./assets/shots/f1-telemetry.webp";
import godsAbout from "./assets/shots/gods-2.webp";
import godsHero from "./assets/shots/gods-hero.webp";

export type Shot = { src?: string; caption: string; url?: string; video?: boolean; illus?: "capex-city" | "capex-map" | "capex-decide" };
export type Step = { title: string; body: string };
export type Story = {
  tagline: string;     // one sentence anyone understands
  analogy: string;     // "think of it as…"
  spark: string;       // how it started
  flow: Step[];        // how it works, in order
  learned: string;     // what stuck with me
  shots: Shot[];       // real captures, first one is the gallery hero
};

const base = import.meta.env.BASE_URL;

export const stories: Record<string, Story> = {
  f1lab: {
    tagline: "A pit-wall workstation: replay a real race, forecast the next lap and test strategies, all on one clock.",
    analogy: "Think of it as the screens a race strategist watches, rebuilt from public data, with every prediction graded against the simplest honest guess.",
    spark:
      "I watch races with the timing screen open. F1LAB started as a question: could I build the tools someone on the pit wall uses, and refuse to call a model good unless it beats “the next lap will be like the last one”?",
    flow: [
      { title: "Ingest", body: "Timing, car positions and race-control messages from OpenF1 are packed locally per race. Monza 2025 alone is 1,506 events and 198,300 location points." },
      { title: "Replay", body: "One deterministic clock drives everything: timing tower, 2D track map, tyre history and telemetry. Seek anywhere and every panel agrees." },
      { title: "Predict", body: "LightGBM forecasts next-lap pace with a conformal interval, an overtake model scores pass odds, and a walk-forward ensemble ranks qualifying." },
      { title: "Simulate", body: "A seeded Monte Carlo simulator branches what-if strategies from any moment of the race." },
      { title: "Audit", body: "A research page compares every model to persistence, and a local LLM agent replays incidents read-only to explain what went wrong." },
    ],
    learned:
      "A model that wins by 0.018 s is not a win when the interval crosses zero. Writing that in bold in the README was the most honest line of the project.",
    shots: [
      { src: f1Replay, caption: "Race replay: Monza 2025 on one shared clock, with timing tower, track map, tyre stints and race control.", url: "f1lab · race control" },
      { src: f1Telemetry, caption: "Lap analysis: Verstappen vs Norris speed traces on lap 50, with the cumulative time delta underneath.", url: "f1lab · lap analysis" },
      { src: f1Research, caption: "Research & reliability: does the model beat persistence? −0.018 s, and the page says it is not a reliable gain.", url: "f1lab · research" },
      { src: f1Agent, caption: "The debug agent, evaluated on 16 planted incidents. Its misses stay on screen.", url: "f1lab · agent eval" },
    ],
  },
  "smart-capex": {
    tagline: "Helping a telecom operator decide where the next network investment should go, and prove why.",
    analogy: "Think of it as a weather forecast for network demand, plus a budget planner that reads it and an assistant you can question in plain language.",
    spark:
      "At Orange Digital Center the question was easy to ask and hard to answer: which sites need an upgrade next, and can we defend that choice? The answer was buried in hundreds of millions of network counters nobody fully trusted.",
    flow: [
      { title: "Collect", body: "Raw counters arrive from several sources at different granularities. They land in Parquet and are queried with DuckDB." },
      { title: "Reconcile", body: "380.4M rows fold into 99.18M cell-hours. 9.1M conflicts are resolved by explicit rules, and the pipeline fails if one survives." },
      { title: "Trace", body: "Every artifact carries a SHA-256, so a number on screen can be traced to the exact file behind it." },
      { title: "Forecast", body: "A demand model is checked over 43 rolling windows: 11.6% WAPE against 25.4% for the baseline." },
      { title: "Decide", body: "A mixed-integer optimizer picks upgrades under a budget, and a 19-tool agent lets planners question the result." },
    ],
    learned: "Most of the value came before any model. If a number can't be traced to a file and a rule, nobody should trust the forecast built on top of it.",
    shots: [
      { illus: "capex-city", url: "illustration · the network", caption: "Every phone in the city leaves a trace in network counters. 380.4M raw rows of them flow into the platform and fold into 99.18M clean cell-hours." },
      { illus: "capex-map", url: "illustration · the map", caption: "On the map, demand forecasts turn into hotspots, and the sites that will run out of capacity pulse as upgrade candidates." },
      { illus: "capex-decide", url: "illustration · the decision", caption: "A planner asks in plain words; the agent answers with the forecast, and the optimizer turns it into a plan that fits the budget." },
    ],
  },
  ansibleguard: {
    tagline: "A careful reviewer for Ansible code that reads every playbook and never gets tired.",
    analogy: "Think of it as a spell-checker for infrastructure: instead of typos, it underlines hard-coded passwords, open permissions and unverified downloads.",
    spark:
      "Infrastructure as Code copies a mistake to every machine it touches. At LARODEC, with N. Bessghaier (ÉTS Montréal), the goal was a tool that catches security smells before the playbook runs.",
    flow: [
      { title: "Parse", body: "Playbooks, roles and task files are read into a structured model of what each task actually does." },
      { title: "Detect", body: "76 rules look for security smells and misconfigurations, running alongside ansible-lint and GitLeaks." },
      { title: "Merge", body: "When several tools report the same issue, the reports are merged into one occurrence, so counts stay honest." },
      { title: "Review", body: "On a pull request, base and head are compared and only new problems block the merge." },
      { title: "Report", body: "Findings are written as SARIF, so they show up natively in GitHub code scanning and CI." },
    ],
    learned: "Precision is a feature. A rule that fires on everything gets switched off in a week, which is why every rule was run against 207 real repositories.",
    shots: [
      { src: `${base}media/ansibleguard-scan.mp4`, video: true, caption: "A real scan of redhat-cop/aap_configuration_extended, from clone to summary (sped up).", url: "terminal · ansibleguard scan" },
      { src: agScan, caption: "The summary of that scan: 670 files analysed, 3,100 occurrences, 199 security findings, with style kept apart from defects.", url: "scan/summary/report.json" },
    ],
  },
  sentinel: {
    tagline: "Crash-testing AI agents before they are trusted with real tools.",
    analogy: "Think of it as a crash-test lab: instead of cars and walls, it's an AI agent and documents with hidden instructions inside.",
    spark:
      "Agents now read files, call APIs and run commands. For IndabaX Tunisia 2026 we asked what happens when someone hides an instruction inside the data an agent reads, and how you would even measure it.",
    flow: [
      { title: "Plant", body: "Each of the 61 scenarios hides an attack where the agent will look, such as an instruction buried in a document it is asked to summarise." },
      { title: "Run", body: "A Qwen3-8B agent with real tools tries to complete an ordinary task." },
      { title: "Trace", body: "Every prompt, step, tool call and output is recorded, so a failure can be replayed." },
      { title: "Judge", body: "The harness checks the tool calls and their effects for the scenario's defined unsafe outcome, not the wording of the reply." },
      { title: "Compare", body: "Defenses are measured on the same fixed set, so a guardrail is judged by what it actually stops." },
    ],
    learned: "The dangerous moment is rarely the final answer. It's a tool call a few steps after the injection, so that's where the checks have to look.",
    shots: [],
  },
  "smart-checkout": {
    tagline: "A checkout that adds friction only where the risk actually is.",
    analogy: "Think of it as a bouncer who recognises regulars: trusted customers walk straight in, unknown ones get checked.",
    spark:
      "At TuniHack 2026 we started from a number: checkout abandonment commonly sits around 70 to 80%. Most checkouts treat every customer as a suspect. We wanted one that knows when to step aside.",
    flow: [
      { title: "Score", body: "A fraud model trained on IEEE-CIS rates the transaction, next to trust tier, amount, device stability and channel." },
      { title: "Decide", body: "A friction optimizer picks skip, frictionless, soft or full 3DS, with a cost on both sides of the choice." },
      { title: "Retain", body: "An abandonment model triggers a retention offer before the customer leaves." },
      { title: "Route", body: "After a decline, payment retries on an alternate route." },
      { title: "Measure", body: "Counterfactual evaluation over 500 simulated transactions, with experiment tracking." },
    ],
    learned: "Security and conversion pull in opposite directions. Treating friction as a per-transaction decision beats one threshold for everyone.",
    shots: [
      { src: coHome, caption: "The storefront built around the checkout.", url: "localhost · home" },
      { src: coShop, caption: "Catalogue with search and categories, the path into the AI checkout.", url: "localhost · /shop" },
      { src: coProduct, caption: "Product page, one click away from the risk-aware checkout.", url: "localhost · /shop/product/1" },
    ],
  },
  "penalty-kick": {
    tagline: "Predicting whether a penalty goes in, and learning not to trust a score that looks too good.",
    analogy: "Think of it as scouting for a goalkeeper: the kicker, the keeper and the pressure of the moment, turned into a probability.",
    spark:
      "A Kaggle competition with 20,000 penalty kicks. Shuffled cross-validation said 0.95. The leaderboard said 0.90. Understanding that gap became the real project.",
    flow: [
      { title: "Describe", body: "Two feature branches: 49 context features (ability, score state, pressure) and 24 matchup interactions." },
      { title: "Train", body: "CatBoost, two LightGBMs and an MLP, each on leakage-safe five-fold out-of-fold predictions." },
      { title: "Blend", body: "Probabilities are averaged and cut at a frozen 0.472 threshold." },
      { title: "Audit", body: "1,244 out-of-support rows, adversarial validation and a sequential-ID check explain why validation looked easier than the test." },
    ],
    learned: "When a tweak improved validation to 0.9506 and then fell to 0.8948 on the private board, I froze the threshold instead of tuning on predictions I'd already stared at.",
    shots: [],
  },
  gods: {
    tagline: "An event website built to make students want to register, then make registering easy.",
    analogy: "Think of it as a poster that moves: it tells the story of the event as you scroll, then hands you the form.",
    spark: "IEEE ENSI Student Branch's data-science hackathon, GODS 5.0, had a few weeks to make people care, and then had to take registrations without losing anyone.",
    flow: [
      { title: "Hook", body: "A bold hero with a live countdown to the 48-hour event." },
      { title: "Explain", body: "About and timeline sections animated with GSAP and Motion as you scroll." },
      { title: "Convince", body: "Team, ambassadors and sponsors, with a morphing navbar and light and dark themes." },
      { title: "Convert", body: "Separate hackathon and bootcamp registration flows, validated with Zod." },
    ],
    learned: "Animation on an event site should make the schedule and the call to register clearer, never hide them.",
    shots: [
      { src: godsHero, caption: "The hero: Go Data Science 5.0, with the countdown to 14–15 February.", url: "gods 5.0 · home" },
      { src: godsAbout, caption: "About section: competition, knowledge and prizes as animated cards.", url: "gods 5.0 · about" },
    ],
  },
  aigoat: {
    tagline: "A vision model small enough to run where large models can't: about 5 MB.",
    analogy: "Think of it as packing for a trip with only a carry-on: every feature has to earn its space.",
    spark: "At the Sup'Com competition the constraint was the opposite of usual. Accuracy is easy to buy with parameters; the goal was to stay small and still compete.",
    flow: [
      { title: "Design", body: "Size treated as a first-class constraint from the first layer, not a final compression step." },
      { title: "Train", body: "Each reduction measured against accuracy, so small doesn't just mean worse." },
      { title: "Export", body: "ONNX in half precision (FP16), landing at roughly 5 MB." },
    ],
    learned: "Every megabyte has to earn its place, and you only know if it did by measuring.",
    shots: [],
  },
  letudiant: {
    tagline: "Turning the PDFs students live in into data software can actually use.",
    analogy: "Think of it as a teaching assistant who reads your course PDFs and CV, then fills in the forms for you.",
    spark: "Students live in PDFs: courses, transcripts, CVs. The useful information is in there, locked in layouts made for printing.",
    flow: [
      { title: "Read", body: "PDFs are parsed, from course documents to CVs." },
      { title: "Delegate", body: "CrewAI and LangGraph agents each get one narrow job." },
      { title: "Structure", body: "Output is validated into a stable JSON shape that features can rely on." },
      { title: "Serve", body: "CV analysis and the other features sit behind an API." },
    ],
    learned: "Text extraction is the easy part. A stable, validated structure from documents that all look different is where the work is.",
    shots: [],
  },
};
