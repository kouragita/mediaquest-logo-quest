import { useState } from "react"
import { BookOpen, Trophy, HelpCircle, Play, Home, User } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import logoImage from "@/assets/mediaquest-logo.png"

const gameItems = [
  { title: "Dashboard", url: "/game/dashboard", icon: Home },
  { title: "Quizzes", url: "/game/quizzes", icon: HelpCircle },
  { title: "Leaderboard", url: "/game/leaderboard", icon: Trophy },
  { title: "Learn", url: "/game/learn", icon: BookOpen },
]

export function GameSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground shadow-glow" : "hover:bg-primary/10 hover:text-primary"

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} bg-card/95 backdrop-blur-sm border-r border-primary/20`}
    >
      <SidebarContent className="p-4">
        {/* Logo Section */}
        <div className="mb-8 flex items-center gap-3 px-2">
          <img src={logoImage} alt="MediaQuest" className="h-8 w-auto" />
          {!collapsed && (
            <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              MediaQuest
            </span>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? "sr-only" : ""} text-muted-foreground font-semibold`}>
            Game Menu
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {gameItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-xl transition-all duration-300">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `
                        flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                        ${getNavCls({ isActive })}
                      `}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Profile Section */}
        {!collapsed && (
          <div className="mt-auto">
            <SidebarGroup>
              <SidebarGroupContent>
                <div className="p-4 bg-gradient-primary rounded-xl text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Quest Explorer</p>
                      <p className="text-xs opacity-80">Level 1</p>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}