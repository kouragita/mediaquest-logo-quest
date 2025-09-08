import { Search, Shield, Brain, Target, Crown, Star, Trophy, Medal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface AchievementBadge {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  rarity: "common" | "rare" | "epic" | "legendary"
  isUnlocked: boolean
  progress?: number
  maxProgress?: number
  dateEarned?: Date
}

interface AchievementBadgesProps {
  badges: AchievementBadge[]
  showProgress?: boolean
  size?: "sm" | "md" | "lg"
  layout?: "grid" | "horizontal"
}

const badgeDefinitions: Omit<AchievementBadge, 'isUnlocked' | 'progress' | 'maxProgress' | 'dateEarned'>[] = [
  {
    id: "fake-news-hunter",
    name: "Fake News Hunter",
    description: "Successfully identified 50 fake news articles",
    icon: Search,
    rarity: "rare"
  },
  {
    id: "bias-buster", 
    name: "Bias Buster",
    description: "Detected 30 instances of media bias",
    icon: Shield,
    rarity: "epic"
  },
  {
    id: "logic-master",
    name: "Logic Master", 
    description: "Identified 100 logical fallacies correctly",
    icon: Brain,
    rarity: "legendary"
  },
  {
    id: "fact-checker",
    name: "Fact Checker",
    description: "Verified 25 sources with perfect accuracy",
    icon: Target,
    rarity: "common"
  },
  {
    id: "truth-champion",
    name: "Truth Champion",
    description: "Achieved a 90%+ accuracy rate over 50 games",
    icon: Crown,
    rarity: "legendary"
  },
  {
    id: "rising-star",
    name: "Rising Star",
    description: "Completed your first 10 media literacy challenges",
    icon: Star,
    rarity: "common"
  },
  {
    id: "streak-master",
    name: "Streak Master",
    description: "Maintained a 15-day learning streak",
    icon: Trophy,
    rarity: "epic"
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Achieved 100% on any quiz",
    icon: Medal,
    rarity: "rare"
  }
]

export const AchievementBadges = ({ 
  badges, 
  showProgress = false, 
  size = "md",
  layout = "grid" 
}: AchievementBadgesProps) => {
  
  const getRarityStyle = (rarity: string, isUnlocked: boolean) => {
    const baseStyle = "relative overflow-hidden transition-all duration-300"
    
    if (!isUnlocked) {
      return `${baseStyle} grayscale opacity-50`
    }

    switch (rarity) {
      case "legendary":
        return `${baseStyle} bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 shadow-glow animate-glow-pulse`
      case "epic":
        return `${baseStyle} bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 shadow-lg`
      case "rare":
        return `${baseStyle} bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 shadow-md`
      default:
        return `${baseStyle} bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700`
    }
  }

  const getBadgeSize = (size: string) => {
    switch (size) {
      case "sm":
        return { container: "w-12 h-12", icon: "w-6 h-6" }
      case "lg":
        return { container: "w-20 h-20", icon: "w-10 h-10" }
      default:
        return { container: "w-16 h-16", icon: "w-8 h-8" }
    }
  }

  const sizeClasses = getBadgeSize(size)
  
  const containerClass = layout === "horizontal" 
    ? "flex gap-3 overflow-x-auto pb-2"
    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"

  return (
    <TooltipProvider>
      <div className={containerClass}>
        {badges.map((badge, index) => {
          const IconComponent = badge.icon
          const rarityStyle = getRarityStyle(badge.rarity, badge.isUnlocked)
          
          return (
            <Tooltip key={badge.id}>
              <TooltipTrigger asChild>
                <Card 
                  className={`
                    ${rarityStyle} 
                    hover:scale-110 cursor-pointer
                    ${layout === "horizontal" ? "flex-shrink-0" : ""}
                    animate-fade-in
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0 flex items-center justify-center h-full">
                    <div className={`${sizeClasses.container} rounded-lg flex items-center justify-center text-white relative`}>
                      <IconComponent className={sizeClasses.icon} />
                      
                      {/* Shine effect for unlocked badges */}
                      {badge.isUnlocked && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
                      )}
                      
                      {/* Progress indicator */}
                      {showProgress && badge.progress !== undefined && badge.maxProgress && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-8 h-1 bg-black/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-white transition-all duration-300"
                              style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Lock overlay for locked badges */}
                      {!badge.isUnlocked && (
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white rounded opacity-60" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              
              <TooltipContent side="top" className="max-w-xs">
                <div className="text-center space-y-1">
                  <div className="font-semibold">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                  
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        badge.rarity === "legendary" ? "border-purple-500 text-purple-500" :
                        badge.rarity === "epic" ? "border-blue-500 text-blue-500" :
                        badge.rarity === "rare" ? "border-cyan-500 text-cyan-500" :
                        "border-gray-500 text-gray-500"
                      }`}
                    >
                      {badge.rarity.toUpperCase()}
                    </Badge>
                    
                    {!badge.isUnlocked ? (
                      <span className="text-xs text-muted-foreground">Locked</span>
                    ) : badge.dateEarned && (
                      <span className="text-xs text-muted-foreground">
                        {badge.dateEarned.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  
                  {showProgress && badge.progress !== undefined && badge.maxProgress && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Progress: {badge.progress}/{badge.maxProgress}
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}

// Helper function to create badge instances
export const createBadge = (
  id: string, 
  isUnlocked: boolean, 
  progress?: number, 
  maxProgress?: number,
  dateEarned?: Date
): AchievementBadge => {
  const definition = badgeDefinitions.find(def => def.id === id)
  if (!definition) {
    throw new Error(`Badge definition not found for id: ${id}`)
  }
  
  return {
    ...definition,
    isUnlocked,
    progress,
    maxProgress,
    dateEarned
  }
}

export default AchievementBadges