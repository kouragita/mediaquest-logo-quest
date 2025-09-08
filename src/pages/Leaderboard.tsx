import { useState } from "react"
import { Trophy, Medal, Crown, Star, Target, Brain, Shield, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Player {
  id: string
  username: string
  avatar: string
  points: number
  rank: number
  badges: string[]
  gamesPlayed: number
  accuracy: number
  streak: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedBy: number // percentage of players who have this
}

const achievements: Achievement[] = [
  {
    id: "fake-news-hunter",
    name: "Fake News Hunter",
    description: "Detected 50 fake news articles",
    icon: Search,
    rarity: "rare",
    unlockedBy: 25
  },
  {
    id: "bias-buster",
    name: "Bias Buster",
    description: "Identified 30 biased statements",
    icon: Shield,
    rarity: "epic",
    unlockedBy: 15
  },
  {
    id: "logic-master",
    name: "Logic Master",
    description: "Spotted 100 logical fallacies",
    icon: Brain,
    rarity: "legendary",
    unlockedBy: 5
  },
  {
    id: "fact-checker",
    name: "Fact Checker",
    description: "Verified 25 sources correctly",
    icon: Target,
    rarity: "common",
    unlockedBy: 60
  }
]

const leaderboardData: Player[] = [
  {
    id: "1",
    username: "TruthSeeker42",
    avatar: "",
    points: 15420,
    rank: 1,
    badges: ["logic-master", "fake-news-hunter", "bias-buster"],
    gamesPlayed: 127,
    accuracy: 94,
    streak: 15
  },
  {
    id: "2", 
    username: "FactGuardian",
    avatar: "",
    points: 14180,
    rank: 2,
    badges: ["bias-buster", "fact-checker", "fake-news-hunter"],
    gamesPlayed: 98,
    accuracy: 91,
    streak: 8
  },
  {
    id: "3",
    username: "CriticalMind",
    avatar: "",
    points: 13750,
    rank: 3,
    badges: ["fake-news-hunter", "fact-checker"],
    gamesPlayed: 85,
    accuracy: 89,
    streak: 12
  },
  {
    id: "4",
    username: "MediaDetective",
    avatar: "",
    points: 12890,
    rank: 4,
    badges: ["fact-checker", "bias-buster"],
    gamesPlayed: 76,
    accuracy: 87,
    streak: 5
  },
  {
    id: "5",
    username: "NewsNinja",
    avatar: "",
    points: 11650,
    rank: 5,
    badges: ["fake-news-hunter"],
    gamesPlayed: 62,
    accuracy: 85,
    streak: 3
  }
]

const Leaderboard = () => {
  const [selectedTab, setSelectedTab] = useState("rankings")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50 shadow-glow"
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50 shadow-md"
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-orange-500/20 border-amber-600/50 shadow-md"
      default:
        return "bg-card/50 border-border hover:bg-card/80"
    }
  }

  const getAchievementRarity = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "epic":
        return "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
      case "rare":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Digital Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,hsl(var(--primary)/0.1)_25%,hsl(var(--primary)/0.1)_26%,transparent_27%,transparent_74%,hsl(var(--primary)/0.1)_75%,hsl(var(--primary)/0.1)_76%,transparent_77%)] bg-[length:40px_40px]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,hsl(var(--primary)/0.1)_25%,hsl(var(--primary)/0.1)_26%,transparent_27%,transparent_74%,hsl(var(--primary)/0.1)_75%,hsl(var(--primary)/0.1)_76%,transparent_77%)] bg-[length:40px_40px]" />
      </div>

      {/* Floating Trophies */}
      <div className="absolute top-20 left-10">
        <Trophy className="w-8 h-8 text-primary/20 animate-float" />
      </div>
      <div className="absolute top-40 right-20">
        <Star className="w-6 h-6 text-energy/30 animate-float" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-32 left-1/4">
        <Medal className="w-7 h-7 text-accent/25 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            MediaQuest Champions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The brightest minds in media literacy. Compete, learn, and climb the ranks!
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="rankings" className="text-lg py-3">
              <Trophy className="w-5 h-5 mr-2" />
              Rankings
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-lg py-3">
              <Medal className="w-5 h-5 mr-2" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Rankings Tab */}
          <TabsContent value="rankings" className="space-y-4">
            {leaderboardData.map((player, index) => (
              <Card 
                key={player.id}
                className={`${getRankStyle(player.rank)} transition-all duration-300 hover:scale-[1.02] animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    {/* Left: Rank, Avatar, Info */}
                    <div className="flex items-center gap-6">
                      {/* Rank Icon */}
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(player.rank)}
                      </div>

                      {/* Avatar */}
                      <Avatar className="w-16 h-16 border-2 border-primary/30">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-white font-bold text-lg">
                          {player.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      {/* Player Info */}
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{player.username}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {player.gamesPlayed} games
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {player.accuracy}% accuracy
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {player.streak} streak
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Right: Points and Badges */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {player.points.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">points</div>
                      
                      {/* Achievement Badges */}
                      <div className="flex gap-2 justify-end">
                        {player.badges.slice(0, 3).map((badgeId) => {
                          const achievement = achievements.find(a => a.id === badgeId)
                          if (!achievement) return null
                          
                          const IconComponent = achievement.icon
                          
                          return (
                            <div
                              key={badgeId}
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${getAchievementRarity(achievement.rarity)} shadow-md`}
                              title={achievement.name}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>
                          )
                        })}
                        {player.badges.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                            +{player.badges.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon
                
                return (
                  <Card 
                    key={achievement.id}
                    className="bg-card/90 backdrop-blur-sm border border-primary/20 hover:shadow-glow transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardHeader className="text-center">
                      <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${getAchievementRarity(achievement.rarity)} shadow-glow`}>
                        <IconComponent className="w-10 h-10" />
                      </div>
                      <CardTitle className="text-xl">{achievement.name}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="text-center space-y-4">
                      <p className="text-muted-foreground">{achievement.description}</p>
                      
                      <div className="flex items-center justify-center gap-2">
                        <Badge className={getAchievementRarity(achievement.rarity)}>
                          {achievement.rarity.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {achievement.unlockedBy}% earned this
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Leaderboard