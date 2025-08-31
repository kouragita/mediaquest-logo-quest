import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Zap, Star, Clock, Award, TrendingUp } from "lucide-react"
import dashboardBg from "@/assets/dashboard-bg.png"
import owlMascot from "@/assets/owl-mascot.png"

const Dashboard = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-deep/20 via-transparent to-energy/10" />
      
      {/* Main Content */}
      <div className="relative z-10 p-6 h-screen flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                Game Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Ready to enhance your media literacy skills?
              </p>
            </div>
            
            {/* Floating Sage */}
            <div className="hidden lg:block">
              <div className="animate-float">
                <img 
                  src={owlMascot} 
                  alt="Sage Guide" 
                  className="w-20 h-20 drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-energy/20 rounded-full blur-lg animate-glow-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Game Area - Center */}
          <div className="lg:col-span-2 flex flex-col justify-center items-center space-y-8">
            {/* Start Game Button */}
            <div className="text-center space-y-6">
              <div className="relative">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="text-2xl px-16 py-8 h-auto rounded-3xl shadow-logo hover:shadow-glow transform hover:scale-105 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-energy opacity-20 blur-xl"></div>
                  <Play className="w-8 h-8 mr-4" />
                  <span className="relative z-10">Start Game</span>
                </Button>
                
                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-3xl border-2 border-energy/30 animate-pulse"></div>
              </div>
              
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                Begin your media literacy adventure and test your skills against misinformation challenges!
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
              <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-card-custom transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-energy" />
                  <div className="text-2xl font-bold text-primary">45</div>
                  <div className="text-xs text-muted-foreground">Quests</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-card-custom transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <Star className="w-6 h-6 mx-auto mb-2 text-energy" />
                  <div className="text-2xl font-bold text-primary">1,250</div>
                  <div className="text-xs text-muted-foreground">Points</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-card-custom transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <Award className="w-6 h-6 mx-auto mb-2 text-energy" />
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-xs text-muted-foreground">Badges</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Side Panel - Activity Feed */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <TrendingUp className="w-5 h-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Media Literacy Level</span>
                    <span className="text-primary font-semibold">Level 3</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full w-3/4 transition-all duration-500"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Weekly Goal</span>
                    <span className="text-energy font-semibold">7/10</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-energy h-2 rounded-full w-2/3 transition-all duration-500"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Award className="w-5 h-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-primary/10 rounded-xl">
                  <div className="w-8 h-8 bg-energy rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary-deep" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Fact Checker</p>
                    <p className="text-xs text-muted-foreground">Completed 10 verification challenges</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gradient-energy/10 rounded-xl">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Speed Reader</p>
                    <p className="text-xs text-muted-foreground">Quick analysis streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Challenge */}
            <Card className="bg-gradient-hero text-white border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Daily Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90 mb-4">
                  Spot the misleading headline in today's news quiz
                </p>
                <Button variant="energy" size="sm" className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Start Challenge
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard