import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"
import { Toaster } from "sonner"

import { AppLayout } from "@/layouts/AppLayout"

const HomePage = lazy(() => import("@/pages/HomePage").then((module) => ({ default: module.HomePage })))
const AboutPage = lazy(() => import("@/pages/AboutPage").then((module) => ({ default: module.AboutPage })))
const LabPage = lazy(() => import("@/pages/LabPage").then((module) => ({ default: module.LabPage })))
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })))
const ProjectPage = lazy(() => import("@/pages/ProjectPage").then((module) => ({ default: module.ProjectPage })))
const ReadingPage = lazy(() => import("@/pages/ReadingPage").then((module) => ({ default: module.ReadingPage })))
const ResumePage = lazy(() => import("@/pages/ResumePage").then((module) => ({ default: module.ResumePage })))
const WorkPage = lazy(() => import("@/pages/WorkPage").then((module) => ({ default: module.WorkPage })))

function App() {
  return (
    <>
      <Suspense fallback={<div className="min-h-svh bg-canvas" />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/reading" element={<ReadingPage />} />
            <Route path="/lab" element={<LabPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-right" theme="system" />
    </>
  )
}

export default App
