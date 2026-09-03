import { Outlet } from "react-router"

import { SiteHeader } from "@/components/navigation/SiteHeader"
import { SiteFooter } from "@/components/navigation/SiteFooter"

export function AppLayout() {
  return (
    <>
      <SiteHeader />

      <main>
        <Outlet />
      </main>

      <SiteFooter />
    </>
  )
}
