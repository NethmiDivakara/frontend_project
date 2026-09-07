import { NavLink, Outlet, useLocation } from "react-router-dom"
import { LayoutGrid, Store, Boxes } from "lucide-react"
import { cn } from "@/lib/Utils.Lib"
import { Navbar } from "@/components/NavBar.Component"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./ui/sidebar"

const navItems = [
  { label: "Dashboard", icon: LayoutGrid, path: "/" },
  { label: "Products", icon: Store, path: "/products" },

] as const

export function Aside() {
  const location = useLocation()

  return (
    <Sidebar collapsible="none" className="hidden min-h-screen w-64 shrink-0 bg-[#5b4a9a] md:flex shadow-2xl">
      <SidebarHeader className="px-5 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-neutral-900">
            <Boxes size={20} />
          </div>
          <span className="font-display text-base font-semibold text-white">PROJECT</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-3">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ label, icon: Icon, path }) => {
                const isActive = path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(path)

                return (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={<NavLink to={path} end={path === "/"} />}
                      className={cn(
                        "relative h-10 gap-3 px-3 text-white/70 hover:bg-white/10 hover:text-white",
                        "data-active:bg-white/15 data-active:text-white data-active:before:absolute data-active:before:left-0 data-active:before:h-5 data-active:before:w-1 data-active:before:rounded-r-full data-active:before:bg-cyan-300"
                      )}
                    >
                      <Icon size={17} strokeWidth={isActive 
                        ? 2.25 
                        : 1.75
                        } />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[var(--bg)]">
        <Aside />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar />
          <main className="flex flex-1 flex-col">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
