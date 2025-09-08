import { useState } from "react"
import { Lock, Unlock, BookOpen, Eye, Shield, Brain, Scale, PlayCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MediaScroll {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  isUnlocked: boolean
  progress: number
  totalLessons: number
  completedLessons: number
}

const mediaScrolls: MediaScroll[] = [
  {
    id: "propaganda",
    title: "Propaganda Techniques",
    description: "Master the art of spotting persuasive manipulation",
    icon: Eye,
    isUnlocked: true,
    progress: 75,
    totalLessons: 8,
    completedLessons: 6
  },
  {
    id: "fake-news",
    title: "Fake News Detection",
    description: "Learn to separate truth from fiction in digital media",
    icon: Shield,
    isUnlocked: true,
    progress: 45,
    totalLessons: 10,
    completedLessons: 4
  },
  {
    id: "logical-fallacies",
    title: "Logical Fallacies",
    description: "Identify flawed reasoning and strengthen your arguments",
    icon: Brain,
    isUnlocked: false,
    progress: 0,
    totalLessons: 12,
    completedLessons: 0
  },
  {
    id: "fact-checking",
    title: "Fact-Checking Tools",
    description: "Master digital verification techniques and resources",
    icon: Scale,
    isUnlocked: false,
    progress: 0,
    totalLessons: 6,
    completedLessons: 0
  }
]

const Learn = () => {
  const [selectedScroll, setSelectedScroll] = useState<string | null>(null)
  const [hoveredScroll, setHoveredScroll] = useState<string | null>(null)

  const handleScrollClick = (scrollId: string, isUnlocked: boolean) => {
    if (isUnlocked) {
      setSelectedScroll(scrollId)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Holographic Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,hsl(var(--primary)/0.1)_25%,hsl(var(--primary)/0.1)_26%,transparent_27%,transparent_74%,hsl(var(--primary)/0.1)_75%,hsl(var(--primary)/0.1)_76%,transparent_77%)] bg-[length:40px_40px]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,hsl(var(--primary)/0.1)_25%,hsl(var(--primary)/0.1)_26%,transparent_27%,transparent_74%,hsl(var(--primary)/0.1)_75%,hsl(var(--primary)/0.1)_76%,transparent_77%)] bg-[length:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6 animate-fade-in">
            Knowledge Vault
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the secrets of media literacy. Each scroll contains powerful knowledge to sharpen your critical thinking.
          </p>
        </div>

        {/* Floating Scrolls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {mediaScrolls.map((scroll, index) => {
            const IconComponent = scroll.icon
            const isHovered = hoveredScroll === scroll.id
            const isSelected = selectedScroll === scroll.id

            return (
              <Card
                key={scroll.id}
                className={`
                  relative cursor-pointer transition-all duration-500 transform
                  ${scroll.isUnlocked ? 'hover:scale-105 hover:-translate-y-2' : 'opacity-60'}
                  ${isHovered && scroll.isUnlocked ? 'shadow-glow' : 'shadow-card-custom'}
                  ${isSelected ? 'ring-2 ring-primary shadow-glow' : ''}
                  bg-card/90 backdrop-blur-sm border border-primary/20
                  animate-fade-in
                `}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleScrollClick(scroll.id, scroll.isUnlocked)}
                onMouseEnter={() => setHoveredScroll(scroll.id)}
                onMouseLeave={() => setHoveredScroll(null)}
              >
                {/* Glow Effect */}
                {scroll.isUnlocked && (
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
                )}

                <CardHeader className="text-center relative">
                  {/* Lock/Unlock Status */}
                  <div className="absolute top-4 right-4">
                    {scroll.isUnlocked ? (
                      <Unlock className="w-5 h-5 text-primary animate-glow-pulse" />
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>

                  {/* Scroll Icon */}
                  <div className={`
                    w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300
                    ${scroll.isUnlocked 
                      ? 'bg-gradient-primary shadow-glow animate-float' 
                      : 'bg-muted/50'
                    }
                  `}>
                    <IconComponent 
                      className={`w-10 h-10 ${scroll.isUnlocked ? 'text-white' : 'text-muted-foreground'}`} 
                    />
                  </div>

                  <CardTitle className="text-xl font-bold mb-2">
                    {scroll.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {scroll.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {scroll.isUnlocked ? (
                    <>
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-primary font-semibold">{scroll.progress}%</span>
                        </div>
                        <Progress value={scroll.progress} className="h-2" />
                      </div>

                      {/* Lesson Count */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {scroll.completedLessons}/{scroll.totalLessons} Lessons
                        </span>
                        <Badge variant={scroll.progress === 100 ? "default" : "secondary"}>
                          {scroll.progress === 100 ? "Completed" : "In Progress"}
                        </Badge>
                      </div>

                      {/* Action Button */}
                      <Button 
                        className="w-full mt-4"
                        variant={scroll.progress > 0 ? "default" : "outline"}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        {scroll.progress > 0 ? "Continue" : "Start Learning"}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Complete previous scrolls to unlock
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Floating Knowledge Orbs */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-40 right-20 w-2 h-2 bg-energy/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  )
}

export default Learn