// All site content lives here. Edit this file to update text, links or projects.

export const profile = {
  name: "Aymen Jedidi",
  first: "Aymen",
  role: "AI & Software Engineer",
  focus: "Data · Agents · Systems",
  location: "Tunisia",
  email: "aymen.jedidi@ensi-uma.tn",
  github: "https://github.com/JedidiAymen",
  // Add your LinkedIn URL here and it appears in the footer automatically.
  linkedin: "",
  // Drop a portrait in src/assets and import it here to replace the initials in the footer avatar.
  photo: "" as string,
  status: "Looking for a 6-month PFE (end-of-studies internship) in AI or software engineering, starting 2027.",
};

export type Result = { value: string; label: string; note?: string };
export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  context: string;
  role: string;
  award?: string;
  stack: string[];
  lead: string;
  problem: string;
  built: string[];
  hard: { title: string; body: string };
  results: Result[];
  limits: string;
  links: { label: string; href: string }[];
  tone: { bg: string; fg: string; accent: string };
};

export const projects: Project[] = [
  {
    slug: "smart-capex",
    title: "Smart CapEx",
    kind: "Data platform · Forecasting · Agents",
    year: "2026",
    context: "Orange Digital Center · Orange Summer Challenge 2026",
    role: "Co-developer, data & ML (team project)",
    stack: ["Python", "DuckDB", "Parquet", "Pyomo + HiGHS", "Qwen", "FastAPI", "NestJS", "React", "PostGIS", "Redis", "Docker"],
    lead:
      "A decision platform that helps a telecom operator choose where to invest in its network. We turned hundreds of millions of raw network measurements into clean, traceable data, forecast where demand is heading, and let an optimizer and an LLM agent propose which upgrades to fund.",
    problem:
      "Network investment is often decided on spreadsheets built from data nobody fully trusts. Counters arrive at different granularities, overlap, and contradict each other. If the data underneath is wrong, the forecast is wrong, and the budget goes to the wrong sites.",
    built: [
      "A DuckDB and Parquet pipeline that folds 380.4M raw rows into 99.18M cell-hours (5.69B values). Every conflicting record is resolved by an explicit rule: 9.1M conflicts in, zero left.",
      "Lineage on every artifact: 599 Parquet files (12.4 GB), each tracked by SHA-256, so a number on screen can be traced back to the exact file it came from.",
      "A demand forecaster evaluated over 43 rolling windows, reaching 11.6% WAPE against 25.4% for the baseline.",
      "A mixed-integer optimizer (Pyomo with the HiGHS solver) that picks which upgrades to fund under a budget.",
      "A Qwen-based agent with 19 tools, so planners can ask questions in plain language. It is checked against 52 evaluation cases.",
      "The product around it: React and TypeScript front end, NestJS and FastAPI services, PostgreSQL/PostGIS for the map, Redis and Docker. 331 tests across the stack.",
    ],
    hard: {
      title: "Conflicts at scale",
      body:
        "Two sources often reported different values for the same cell and hour. Silently keeping one would have been easy and wrong. We wrote a resolution rule per conflict type and made the pipeline fail loudly if a single conflict survived.",
    },
    results: [
      { value: "11.6%", label: "WAPE", note: "vs 25.4% baseline, 43 windows" },
      { value: "380.4M", label: "raw rows", note: "into 99.18M cell-hours" },
      { value: "9.1M → 0", label: "conflicts", note: "resolved by explicit rules" },
      { value: "331", label: "tests", note: "data, API and UI" },
    ],
    limits:
      "This was team work at Orange; I co-developed the data and ML parts. The data belongs to Orange, so the code and dashboards are private.",
    links: [],
    tone: { bg: "#0E1A24", fg: "#E9F1F4", accent: "#FF7A1A" },
  },
  {
    slug: "sentinel",
    title: "SENTINEL",
    kind: "AI-agent security · Red teaming",
    year: "2026",
    context: "IndabaX Tunisia 2026",
    award: "1st place",
    role: "Co-developer",
    stack: ["Python", "Qwen3-8B", "LLM agents", "Tool calling", "Tracing", "Evaluation"],
    lead:
      "A red-teaming harness for LLM agents. It puts an agent with real tools in front of adversarial scenarios and records exactly where it can be talked into doing something it should not.",
    problem:
      "An agent that can call tools can do damage a chatbot can't: read a file it shouldn't, send data out, run a command. Testing only the final reply misses most of it, because the failure happens in a tool call, a few steps after the malicious instruction slipped in.",
    built: [
      "61 attack scenarios run against a Qwen3-8B agent, each with a defined unsafe outcome the harness checks for.",
      "Full traces of every run (prompt, steps, tool calls and their outputs), so a failure can be replayed and explained instead of only counted.",
      "A fixed scenario set that defenses are measured against, so a guardrail is judged by what it actually stops.",
    ],
    hard: {
      title: "Deciding what counts as unsafe",
      body:
        "A scenario is only useful if the harness can decide on its own whether the agent crossed the line. That means inspecting tool calls and their effects, not searching the reply text for scary words.",
    },
    results: [
      { value: "1st", label: "IndabaX Tunisia 2026" },
      { value: "61", label: "attack scenarios" },
      { value: "8B", label: "Qwen3 agent under test" },
    ],
    limits: "Built with my team for the competition. The code is private.",
    links: [],
    tone: { bg: "#121212", fg: "#F2F2F2", accent: "#C7F464" },
  },
  {
    slug: "f1lab",
    title: "F1LAB",
    kind: "Race intelligence · ML · Full-stack",
    year: "2025 – 2026",
    context: "Personal project, open source",
    role: "Solo, end to end",
    stack: ["Python", "LightGBM", "PyTorch", "FastAPI", "React", "Vite", "MLflow", "Prometheus", "Ollama", "Docker", "Playwright"],
    lead:
      "A Formula 1 race-intelligence workstation. Replay a historical race on one shared clock, forecast the next lap and the qualifying order, estimate overtake odds, and branch what-if strategies. FastAPI behind, React in front, one docker compose to run it.",
    problem:
      "F1 data is a perfect trap for machine learning: dense, noisy, and very easy to leak the future into your features. I wanted to build the tools someone on the pit wall would use, and grade every model against the simplest honest baseline.",
    built: [
      "Race replay for Monza 2025, Monaco 2023 and Brazil 2024 on one deterministic clock, with timing, a 2D track map and race-control messages. The Monza pack alone holds 1,506 events and 198,300 location points.",
      "Next-lap pace forecasting with LightGBM over 65 races and 57,679 green laps, served through a versioned API. A chronological conformal correction brings the 80% interval to its stated coverage.",
      "An overtake model scored by Brier: 0.0329 for LightGBM against 0.0407 for a gap-only logistic baseline.",
      "A walk-forward qualifying ensemble with rank probabilities, and a seeded Monte Carlo strategy simulator for what-if branches.",
      "Driver DNA: handcrafted, TCN and contrastive telemetry encoders studied over 1,749 laps.",
      "A local LLM debug agent (Ollama) that replays incidents read-only. It is evaluated on planted faults, with its limits documented.",
      "MLflow tracking, Prometheus, and CI that runs ruff, pytest, web unit tests and Playwright.",
    ],
    hard: {
      title: "Catching my own leakage",
      body:
        "When I switched Driver DNA to train-only normalization, cross-circuit accuracy fell from 38.4% to 19.8%. The first number had been helped by information from the test circuits. I kept the honest one and documented why it moved.",
    },
    results: [
      { value: "0.575 s", label: "next-lap MAE", note: "vs 0.593 s last-lap persistence" },
      { value: "0.0329", label: "overtake Brier", note: "vs 0.0407 gap-only baseline" },
      { value: "57,679", label: "green laps scored", note: "across 65 races" },
      { value: "3", label: "races replayable", note: "Monza, Monaco, Brazil" },
    ],
    limits:
      "The pace model beats persistence by 0.018 s, but the race-clustered 95% interval [-0.057, +0.029] crosses zero, so the gain is not significant, and persistence wins in 2025. The README says it in bold. Raw data comes from OpenF1 under non-commercial terms and stays local.",
    links: [{ label: "GitHub", href: "https://github.com/JedidiAymen/f1lab" }],
    tone: { bg: "#17181B", fg: "#F3F3F1", accent: "#E8402F" },
  },
  {
    slug: "ansibleguard",
    title: "AnsibleGuard",
    kind: "Static analysis · IaC security · Research",
    year: "2026",
    context: "LARODEC, ENSI · mentored by N. Bessghaier (ÉTS Montréal)",
    role: "Research intern",
    stack: ["Python", "Ansible", "YAML", "Static analysis", "SARIF", "CI/CD"],
    lead:
      "A static analyzer for Ansible. It reads playbooks and roles the way a careful reviewer would, and flags security smells and misconfigurations before they reach a server.",
    problem:
      "With Infrastructure as Code, one YAML mistake (a hard-coded secret, a world-readable file, an unverified download) is copied to every machine the playbook touches. General-purpose linters catch style. Most of them don't catch this.",
    built: [
      "76 detection rules for security smells and misconfigurations in playbooks and roles.",
      "An evaluation corpus of 207 real-world Ansible repositories, to see how each rule behaves on code people actually ship.",
      "SARIF output, so findings appear natively in GitHub code scanning and CI pipelines. The validation work is public.",
    ],
    hard: {
      title: "Earning trust with low noise",
      body:
        "A rule that fires on every repository gets switched off by the second week. Running against 207 real projects is how you learn which rules help a reviewer and which only look good on paper.",
    },
    results: [
      { value: "76", label: "detection rules" },
      { value: "207", label: "real repositories analyzed" },
      { value: "SARIF", label: "native CI output" },
    ],
    limits: "Ongoing research, so the analyzer itself is not public yet. The SARIF validation repository is.",
    links: [{ label: "SARIF validation", href: "https://github.com/JedidiAymen/ansibleguard-sarif-validation" }],
    tone: { bg: "#E6E3DA", fg: "#1A1A1A", accent: "#D13C2F" },
  },
  {
    slug: "smart-checkout",
    title: "AI Smart Checkout",
    kind: "ML · Payments · Hackathon",
    year: "2026",
    context: "TuniHack 2026",
    role: "Team hackathon project",
    stack: ["Python", "XGBoost", "scikit-learn", "FastAPI", "React", "PostgreSQL"],
    lead:
      "A checkout that decides, for each transaction, how much friction to add. Trusted customers go straight through; risky ones get the challenge they deserve.",
    problem:
      "Most checkouts give everyone the same 3D Secure challenge and the same long form. That stops some fraud and loses many honest customers: abandonment at checkout commonly sits around 70 to 80%.",
    built: [
      "A friction optimizer that chooses skip, frictionless, soft or full 3DS challenge from risk score, trust tier, amount, device stability and channel.",
      "Fraud risk scoring trained on the IEEE-CIS dataset, plus an abandonment model that triggers a retention offer before the customer leaves.",
      "A portable trust passport, payment routing that retries on an alternate route after a decline, and an AI shopping assistant.",
      "FastAPI services and a React front end, with counterfactual evaluation and experiment tracking.",
    ],
    hard: {
      title: "Security and conversion pull in opposite directions",
      body:
        "Every check you skip raises fraud risk; every check you add loses customers. The optimizer treats friction as a per-transaction decision with a cost on both sides, instead of one threshold for everyone.",
    },
    results: [
      { value: "+13.6 pp", label: "conversion", note: "61.2% → 74.8%" },
      { value: "+10.8 pp", label: "approval rate", note: "78.4% → 89.2%" },
      { value: "+26.6 pp", label: "3DS skipped safely", note: "12.1% → 38.7%" },
    ],
    limits: "These figures come from a 500-transaction simulation, not live payment traffic.",
    links: [{ label: "GitHub", href: "https://github.com/JedidiAymen/ai-smart-checkout" }],
    tone: { bg: "#1B2A22", fg: "#EEF3EE", accent: "#9BE38B" },
  },
  {
    slug: "penalty-kick",
    title: "Penalty Kick",
    kind: "Tabular ML · Kaggle",
    year: "2026",
    context: "Kaggle competition",
    role: "Solo",
    stack: ["Python", "CatBoost", "LightGBM", "PyTorch MLP", "pandas", "pytest"],
    lead:
      "Predict whether a penalty kick is scored, from 20,000 kicks described by kicker, keeper and match context. Finished at 0.89957 private F1 with a four-model ensemble.",
    problem:
      "Shuffled cross-validation said 0.95. The private leaderboard said 0.90. The interesting work was understanding that gap instead of chasing a better-looking validation score.",
    built: [
      "One feature module with two branches: full_context_49 (relative ability, score state, pressure and composure proxies) and compact_interaction_24 (matchup and urgency interactions).",
      "A champion ensemble of CatBoost, two LightGBMs and an MLP, averaged from leakage-safe five-fold out-of-fold probabilities, with a frozen 0.472 threshold.",
      "Audits that explain the gap: 1,244 out-of-support training rows that are 96% positive and make shuffled validation look easier than the test, adversarial validation, and a sequential-ID check.",
    ],
    hard: {
      title: "Not trusting my own validation",
      body:
        "One feature-selection variant improved out-of-fold F1 to 0.9506 and then fell to 0.8948 on the private board. So I froze the threshold rather than re-tune it on predictions I had already looked at many times.",
    },
    results: [
      { value: "0.89957", label: "private F1" },
      { value: "0.90966", label: "public F1" },
      { value: "4", label: "models in the ensemble" },
    ],
    limits: "First place finished 0.043 F1 ahead. The repository says so plainly and does not call the problem solved.",
    links: [{ label: "GitHub", href: "https://github.com/JedidiAymen/penalty-kick" }],
    tone: { bg: "#0F3B2E", fg: "#F1F6EF", accent: "#F4F4F0" },
  },
  {
    slug: "aigoat",
    title: "AIGOAT",
    kind: "Computer vision · Compact models",
    year: "2026",
    context: "Sup'Com competition",
    award: "2nd place",
    role: "Team project",
    stack: ["Python", "PyTorch", "ONNX", "FP16"],
    lead: "A compact vision model built to run where large models can't: about 5 MB once exported to FP16 ONNX.",
    problem:
      "Accuracy is easy to buy with parameters. The constraint here was the opposite: keep the model small enough to ship on modest hardware and still be competitive.",
    built: [
      "A vision model designed with size as a first-class constraint, not an afterthought.",
      "Export to ONNX in half precision (FP16), landing at roughly 5 MB.",
    ],
    hard: {
      title: "Every megabyte has to earn its place",
      body: "Shrinking a model is a series of trade-offs. Each one has to be measured against accuracy, or the small model is just a worse model.",
    },
    results: [
      { value: "≈5 MB", label: "FP16 ONNX model" },
      { value: "2nd", label: "place at Sup'Com" },
    ],
    limits: "Competition project; code is private.",
    links: [],
    tone: { bg: "#23202E", fg: "#F2EFFA", accent: "#B9A6FF" },
  },
  {
    slug: "letudiant",
    title: "L'Étudiant Intelligent",
    kind: "LLM apps · Document extraction",
    year: "2025",
    context: "Academic project",
    role: "Developer",
    stack: ["Python", "LangGraph", "CrewAI", "LLMs", "PDF parsing", "APIs"],
    lead: "An assistant for students built on LLM agents. It reads PDFs, from course documents to CVs, and turns them into structured data a student can actually use.",
    problem: "Students live in PDFs. The useful information is in there, but it is locked in layouts made for printing, not for software.",
    built: [
      "Agent workflows built with CrewAI and LangGraph, each agent with a narrow job.",
      "PDF extraction into structured output that downstream features can rely on.",
      "A CV analysis service, exposed with the other features behind an API.",
    ],
    hard: {
      title: "Structure out of layout",
      body: "Text extraction is the easy part. Getting a stable, validated structure out of documents that all look different is where the work is.",
    },
    results: [
      { value: "2", label: "agent frameworks", note: "CrewAI and LangGraph" },
      { value: "PDF → JSON", label: "structured extraction" },
    ],
    limits: "Academic project; code is private.",
    links: [],
    tone: { bg: "#F0E9DF", fg: "#1D1B18", accent: "#2F5BFF" },
  },
  {
    slug: "gods",
    title: "GODS 5.0",
    kind: "Web · Motion design",
    year: "2025",
    context: "IEEE ENSI Student Branch",
    role: "Front-end developer",
    stack: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Motion", "Zod"],
    lead: "The website for GODS 5.0, the data-science hackathon of IEEE ENSI Student Branch. Motion-heavy, with registration built in.",
    problem: "An event site has a few weeks to make people care, then has to handle registrations without losing anyone.",
    built: [
      "Scroll-driven and section animations with GSAP and Motion, plus a morphing navbar.",
      "Registration flows validated with Zod.",
      "Team, ambassadors, sponsors and timeline sections, with light and dark themes.",
    ],
    hard: {
      title: "Motion that doesn't fight the content",
      body: "Animation on an event site should make the schedule and the call to register clearer, not hide them behind effects.",
    },
    results: [
      { value: "React + GSAP", label: "motion-heavy front end" },
      { value: "Zod", label: "validated registration" },
    ],
    limits: "",
    links: [{ label: "GitHub", href: "https://github.com/JedidiAymen/GODS-5.0-website" }],
    tone: { bg: "#0B0B12", fg: "#F5F5FA", accent: "#5B6CFF" },
  },
];

export const experience = [
  {
    when: "Jul 2026 – now",
    title: "AI & Software Intern",
    where: "Orange Digital Center",
    what: "Smart CapEx, Orange Summer Challenge 2026. Data pipelines, forecasting, optimization and an LLM agent for network investment.",
  },
  {
    when: "Jun 2026 – now",
    title: "Research Intern",
    where: "LARODEC, ENSI",
    what: "AnsibleGuard, static analysis for Ansible, with N. Bessghaier (ÉTS Montréal).",
  },
  {
    when: "Graduating 2027",
    title: "Computer Science Engineering",
    where: "ENSI, Tunisia",
    what: "École Nationale des Sciences de l'Informatique, final year.",
  },
];

export const awards = [
  { place: "1st", what: "IndabaX Tunisia 2026", detail: "SENTINEL, AI-agent security" },
  { place: "2nd", what: "Sup'Com competition", detail: "AIGOAT, compact vision model" },
  { place: "0.89957", what: "Kaggle, private F1", detail: "Penalty Kick ensemble" },
  { place: "TuniHack", what: "2026 hackathon", detail: "AI Smart Checkout" },
];

export const capabilities = [
  {
    title: "Data & ML",
    body: "Pipelines that survive real data, forecasting, and evaluation that doesn't lie: walk-forward splits, honest baselines, leakage audits, confidence intervals.",
    tools: ["pandas", "DuckDB", "LightGBM", "XGBoost", "CatBoost", "PyTorch", "MLflow"],
  },
  {
    title: "LLM agents & security",
    body: "Agents with real tools, and the harnesses to test them: scenario suites, traces you can replay, red teaming before someone else does it for you.",
    tools: ["Qwen", "Ollama", "LangGraph", "CrewAI", "Tool calling", "Evals"],
  },
  {
    title: "Backend & product",
    body: "APIs, schemas and the interface someone actually clicks. I like knowing what happens under every abstraction, from the database to the UI.",
    tools: ["FastAPI", "NestJS", "PostgreSQL/PostGIS", "Redis", "React", "TypeScript", "Docker"],
  },
];
