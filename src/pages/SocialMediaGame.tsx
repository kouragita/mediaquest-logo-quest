import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Eye, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface Post {
  id: string
  user: {
    name: string
    username: string
    avatar: string
    verified: boolean
  }
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  credibilityType: "true" | "false" | "misleading"
  credibilityReason: string
  analyzed: boolean
}

const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      name: "Sarah Mitchell",
      username: "@sarahmitchell",
      avatar: "/placeholder.svg",
      verified: true
    },
    content: "Breaking: Local university researchers discover new method to convert plastic waste into clean energy. Pilot program starts next month! 🔬⚡",
    timestamp: "2h",
    likes: 342,
    comments: 28,
    shares: 89,
    credibilityType: "true",
    credibilityReason: "Verifiable source, specific details, reasonable claims",
    analyzed: false
  },
  {
    id: "2",
    user: {
      name: "Tech News Daily",
      username: "@technewsdaily",
      avatar: "/placeholder.svg",
      verified: false
    },
    content: "SHOCKING: Scientists prove that drinking coffee backwards prevents aging! Try this ONE weird trick doctors don't want you to know! Click link in bio!",
    timestamp: "4h",
    likes: 1250,
    comments: 203,
    shares: 567,
    credibilityType: "false",
    credibilityReason: "Sensational language, impossible claims, click-bait tactics",
    analyzed: false
  },
  {
    id: "3",
    user: {
      name: "Climate Action",
      username: "@climateaction",
      avatar: "/placeholder.svg",
      verified: true
    },
    content: "Study shows 90% of climate scientists agree on urgent action needed. However, some data points from 2019 may be outdated in current context.",
    timestamp: "6h",
    likes: 892,
    comments: 156,
    shares: 234,
    credibilityType: "misleading",
    credibilityReason: "Mostly accurate but uses outdated data without clear context",
    analyzed: false
  }
]

const SocialMediaGame = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [score, setScore] = useState(0)
  const [analyzedCount, setAnalyzedCount] = useState(0)

  const analyzePost = (postId: string, selectedCredibility: "true" | "false" | "misleading") => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isCorrect = post.credibilityType === selectedCredibility
        if (isCorrect) {
          setScore(prev => prev + 10)
        }
        setAnalyzedCount(prev => prev + 1)
        return { ...post, analyzed: true }
      }
      return post
    }))
  }

  const getCredibilityIcon = (type: "true" | "false" | "misleading") => {
    switch (type) {
      case "true":
        return <CheckCircle className="w-4 h-4" />
      case "false":
        return <XCircle className="w-4 h-4" />
      case "misleading":
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getCredibilityColor = (type: "true" | "false" | "misleading") => {
    switch (type) {
      case "true":
        return "bg-green-500"
      case "false":
        return "bg-red-500"
      case "misleading":
        return "bg-orange-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-energy/5 p-6">
      {/* Game Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Social Media Detective
            </h1>
            <p className="text-muted-foreground">
              Analyze posts for credibility and misinformation
            </p>
          </div>
          
          <div className="flex gap-4">
            <Card className="px-4 py-2 bg-card/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{score}</div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
            </Card>
            
            <Card className="px-4 py-2 bg-card/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-energy">{analyzedCount}/3</div>
                <div className="text-xs text-muted-foreground">Analyzed</div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Instructions */}
        <Card className="bg-gradient-primary/10 border-primary/20 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">How to Play</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Read each social media post carefully and click "Analyze" to determine if it's true, false, or misleading. Look for verification badges, source credibility, and suspicious language patterns.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Social Media Feed */}
      <div className="max-w-2xl mx-auto space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className={`relative overflow-hidden transition-all duration-300 ${
            post.analyzed 
              ? `border-2 ${post.credibilityType === 'true' ? 'border-green-500/50 bg-green-50/50' : 
                  post.credibilityType === 'false' ? 'border-red-500/50 bg-red-50/50' : 
                  'border-orange-500/50 bg-orange-50/50'}`
              : 'border-primary/20 hover:shadow-card-custom bg-card/90 backdrop-blur-sm'
          }`}>
            
            {/* Post Header */}
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{post.user.name}</span>
                    {post.user.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-500" fill="currentColor" />
                    )}
                    <span className="text-muted-foreground text-sm">{post.user.username}</span>
                    <span className="text-muted-foreground text-sm">·</span>
                    <span className="text-muted-foreground text-sm">{post.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-foreground leading-relaxed">{post.content}</p>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between text-muted-foreground mb-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-pointer">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 hover:text-energy transition-colors cursor-pointer">
                    <Share className="w-4 h-4" />
                    <span className="text-sm">{post.shares}</span>
                  </div>
                </div>
              </div>

              {/* Analysis Section */}
              {!post.analyzed ? (
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    What do you think about this post's credibility?
                  </p>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => analyzePost(post.id, "true")}
                      className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      True
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => analyzePost(post.id, "false")}
                      className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300"
                    >
                      <XCircle className="w-4 h-4 text-red-600" />
                      False
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => analyzePost(post.id, "misleading")}
                      className="flex items-center gap-2 hover:bg-orange-50 hover:border-orange-300"
                    >
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      Misleading
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${getCredibilityColor(post.credibilityType)} text-white`}>
                      {getCredibilityIcon(post.credibilityType)}
                      <span className="ml-1 capitalize">{post.credibilityType}</span>
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    <strong>Analysis:</strong> {post.credibilityReason}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {/* Game Complete */}
        {analyzedCount === posts.length && (
          <Card className="bg-gradient-hero text-white border-0 text-center">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Game Complete! 🎉</h3>
              <p className="text-lg opacity-90 mb-4">
                Final Score: {score} points
              </p>
              <p className="opacity-80 mb-6">
                Great job analyzing social media posts for credibility!
              </p>
              <Button variant="energy" size="lg">
                Play Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default SocialMediaGame