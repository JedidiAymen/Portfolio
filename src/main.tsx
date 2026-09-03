import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"

import App from "./App"
import "./index.css"

const savedTheme = window.localStorage.getItem("aymen-theme")
const prefersNight = window.matchMedia("(prefers-color-scheme: dark)").matches
document.documentElement.classList.toggle("dark", savedTheme ? savedTheme === "night" : prefersNight)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
