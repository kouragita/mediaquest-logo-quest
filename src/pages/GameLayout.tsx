import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { GameSidebar } from "@/components/game-sidebar"

const GameLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <GameSidebar />
        
        {/* Header with sidebar trigger */}
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <SidebarTrigger className="ml-4 hover:bg-primary/10 transition-colors" />
            <div className="ml-4">
              <h2 className="font-semibold text-foreground">MediaQuest Gaming Platform</h2>
            </div>
          </header>
          
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default GameLayout