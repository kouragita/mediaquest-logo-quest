import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Zap, Star, Target } from "lucide-react"

interface FallacyArgument {
  id: string
  speaker: "Alex" | "Jordan" | "Sam" | "Riley"
  message: string
  fallacyType: string
  explanation: string
}

interface GameRound {
  id: number
  topic: string
  arguments: FallacyArgument[]
  targetFallacy: string
}

const gameRounds: GameRound[] = [
  {
    id: 1,
    topic: "Should homework be banned in schools?",
    arguments: [
      {
        id: "1a",
        speaker: "Alex",
        message: "Homework should be banned because my cousin Jake says it's stupid and he's really smart!",
        fallacyType: "Appeal to Authority",
        explanation: "Using someone's opinion as evidence without proper credentials"
      },
      {
        id: "1b", 
        speaker: "Jordan",
        message: "You only want to ban homework because you're lazy and can't handle real work!",
        fallacyType: "Ad Hominem",
        explanation: "Attacking the person instead of addressing their argument"
      },
      {
        id: "1c",
        speaker: "Sam",
        message: "If we ban homework, then teachers will stop teaching, schools will close, and education will collapse!",
        fallacyType: "Slippery Slope",
        explanation: "Assuming one event will lead to extreme consequences without evidence"
      }
    ],
    targetFallacy: "Ad Hominem"
  },
  {
    id: 2,
    topic: "Is social media harmful to teenagers?",
    arguments: [
      {
        id: "2a",
        speaker: "Riley",
        message: "Social media isn't harmful because everyone uses it and we can't all be wrong!",
        fallacyType: "Bandwagon",
        explanation: "Assuming something is correct because many people believe it"
      },
      {
        id: "2b",
        speaker: "Alex", 
        message: "You think social media is fine? So you must also think cyberbullying is okay too!",
        fallacyType: "Strawman",
        explanation: "Misrepresenting someone's argument to make it easier to attack"
      },
      {
        id: "2c",
        speaker: "Jordan",
        message: "My friend's sister got depressed after using Instagram, so clearly all social media causes depression!",
        fallacyType: "Hasty Generalization",
        explanation: "Drawing broad conclusions from limited examples"
      }
    ],
    targetFallacy: "Strawman"
  }
]

const fallacyOptions = [
  "Ad Hominem", "Strawman", "Appeal to Authority", "Bandwagon", 
  "Slippery Slope", "Hasty Generalization", "False Dilemma", "Red Herring"
]

const speakerColors = {
  Alex: "bg-blue-500",
  Jordan: "bg-green-500", 
  Sam: "bg-purple-500",
  Riley: "bg-orange-500"
}

const FallacyGame = () => {
  const [currentRound, setCurrentRound] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [selectedArgument, setSelectedArgument] = useState<string | null>(null)
  const [selectedFallacy, setSelectedFallacy] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [isActive, setIsActive] = useState(true)

  // Timer logic
  useEffect(() => {
    if (!isActive || timeLeft === 0 || showResult) return

    const timer = setInterval(() => {
      setTimeLeft(time => {
        if (time <= 1) {
          setIsActive(false)
          return 0
        }
        return time - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, timeLeft, showResult])

  const handleArgumentSelect = (argumentId: string) => {
    if (showResult) return
    setSelectedArgument(argumentId)
  }

  const handleFallacySelect = (fallacy: string) => {
    if (showResult || !selectedArgument) return
    setSelectedFallacy(fallacy)
  }

  const submitAnswer = () => {
    if (!selectedArgument || !selectedFallacy) return

    const currentGameRound = gameRounds[currentRound]
    const selectedArg = currentGameRound.arguments.find(arg => arg.id === selectedArgument)
    
    if (selectedArg && selectedArg.fallacyType === selectedFallacy) {
      const timeBonus = Math.max(0, timeLeft * 2)
      setScore(prev => prev + 100 + timeBonus)
    }
    
    setShowResult(true)
    setIsActive(false)
  }

  const nextRound = () => {
    if (currentRound + 1 >= gameRounds.length) {
      setGameComplete(true)
    } else {
      setCurrentRound(prev => prev + 1)
      setTimeLeft(30)
      setSelectedArgument(null)
      setSelectedFallacy(null)
      setShowResult(false)
      setIsActive(true)
    }
  }

  const resetGame = () => {
    setCurrentRound(0)
    setTimeLeft(30)
    setScore(0)
    setSelectedArgument(null)
    setSelectedFallacy(null)
    setShowResult(false)
    setGameComplete(false)
    setIsActive(true)
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-energy/5 flex items-center justify-center p-6">
        <Card className="max-w-md w-full bg-gradient-hero text-white border-0 text-center">
          <CardContent className="p-8">
            <Star className="w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold mb-4">Game Complete! 🎉</h2>
            <p className="text-xl opacity-90 mb-2">Final Score</p>
            <p className="text-4xl font-bold mb-6">{score} points</p>
            <p className="opacity-80 mb-6">
              Great job identifying logical fallacies! You're becoming a critical thinking master.
            </p>
            <Button variant="energy" size="lg" onClick={resetGame} className="w-full">
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const round = gameRounds[currentRound]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-energy/5 p-6">
      {/* Game Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Fallacy Detective
            </h1>
            <p className="text-muted-foreground">
              Identify logical fallacies in online debates
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
                <div className="text-2xl font-bold text-energy">{currentRound + 1}/{gameRounds.length}</div>
                <div className="text-xs text-muted-foreground">Round</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Timer */}
        <Card className="bg-card/90 backdrop-blur-sm border-primary/20 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-semibold">Time Remaining</span>
              </div>
              <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                {timeLeft}s
              </span>
            </div>
            <Progress 
              value={(timeLeft / 30) * 100} 
              className={`h-2 ${timeLeft <= 10 ? 'progress-danger' : ''}`}
            />
          </CardContent>
        </Card>
      </div>

      {/* Game Content */}
      <div className="max-w-4xl mx-auto">
        {/* Debate Topic */}
        <Card className="bg-gradient-primary/10 border-primary/20 mb-8">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h2 className="text-xl font-bold text-primary mb-2">Debate Topic</h2>
            <p className="text-lg">{round.topic}</p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chat Bubbles */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-energy" />
              Online Debate
            </h3>
            
            {round.arguments.map((argument, index) => (
              <div
                key={argument.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedArgument === argument.id 
                    ? 'transform scale-105' 
                    : 'hover:transform hover:scale-102'
                }`}
                onClick={() => handleArgumentSelect(argument.id)}
              >
                <Card className={`relative ${
                  selectedArgument === argument.id 
                    ? 'ring-2 ring-primary shadow-glow bg-primary/5' 
                    : 'hover:shadow-card-custom bg-card/90 backdrop-blur-sm'
                } ${showResult && selectedArgument === argument.id ? 'ring-energy ring-2' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${speakerColors[argument.speaker]} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {argument.speaker.charAt(0)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{argument.speaker}</span>
                          <span className="text-xs text-muted-foreground">• {2 + index}m ago</span>
                        </div>
                        <p className="text-sm leading-relaxed">{argument.message}</p>
                        
                        {showResult && selectedArgument === argument.id && (
                          <div className="mt-3 p-3 bg-energy/10 rounded-lg border border-energy/20">
                            <Badge className="bg-energy text-primary-deep mb-2">
                              {argument.fallacyType}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {argument.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Fallacy Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">
              Select the Logical Fallacy
            </h3>
            
            {!selectedArgument && (
              <Card className="bg-gradient-energy/10 border-energy/20">
                <CardContent className="p-4 text-center">
                  <p className="text-muted-foreground">
                    First, click on a chat bubble to analyze it
                  </p>
                </CardContent>
              </Card>
            )}
            
            {selectedArgument && (
              <div className="grid grid-cols-2 gap-3">
                {fallacyOptions.map((fallacy) => (
                  <Button
                    key={fallacy}
                    variant={selectedFallacy === fallacy ? "default" : "outline"}
                    className={`h-auto p-3 text-left justify-start ${
                      selectedFallacy === fallacy 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-primary/10'
                    }`}
                    onClick={() => handleFallacySelect(fallacy)}
                    disabled={showResult}
                  >
                    <span className="text-sm font-medium">{fallacy}</span>
                  </Button>
                ))}
              </div>
            )}
            
            {selectedArgument && selectedFallacy && !showResult && (
              <Button 
                onClick={submitAnswer}
                size="lg" 
                className="w-full mt-6"
                variant="hero"
              >
                Submit Answer
              </Button>
            )}
            
            {showResult && (
              <div className="space-y-4">
                <Card className={`${
                  gameRounds[currentRound].arguments.find(arg => arg.id === selectedArgument)?.fallacyType === selectedFallacy
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}>
                  <CardContent className="p-4 text-center">
                    <p className="font-semibold mb-2">
                      {gameRounds[currentRound].arguments.find(arg => arg.id === selectedArgument)?.fallacyType === selectedFallacy
                        ? '🎉 Correct!'
                        : '❌ Incorrect'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      The correct answer was: {gameRounds[currentRound].arguments.find(arg => arg.id === selectedArgument)?.fallacyType}
                    </p>
                  </CardContent>
                </Card>
                
                <Button 
                  onClick={nextRound}
                  size="lg" 
                  className="w-full"
                  variant="energy"
                >
                  {currentRound + 1 >= gameRounds.length ? 'See Results' : 'Next Round'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FallacyGame