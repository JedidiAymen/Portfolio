// Turns the single-file Vite build into a page body for a claude.ai artifact preview.
import { readFileSync, writeFileSync } from "node:fs";
const html = readFileSync("dist-single/index.html", "utf8");
const styles = [...html.matchAll(/<style[^>]*>[\s\S]*?<\/style>/g)].map((m) => m[0]).join("\n");
const scripts = [...html.matchAll(/<script type="module"[^>]*>[\s\S]*?<\/script>/g)].map((m) => m[0]).join("\n");
const out = `<title>Aymen Jedidi</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:wght@400;500&display=swap">
${styles}
<div id="root"></div>
${scripts}
`;
writeFileSync("dist-single/artifact.html", out);
console.log("artifact.html", (out.length / 1024).toFixed(0), "KB");
