import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Shield, Scale, Brain, Search, Timer, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface QuizQuestion {
  id: number
  question: string
  options: {
    id: string
    text: string
    icon: React.ComponentType<{ className?: string }>
    isCorrect: boolean
  }[]
  explanation: string
  category: "detection" | "bias" | "logic" | "fact-check"
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the most reliable way to verify a suspicious news article?",
    options: [
      { id: "a", text: "Check if it confirms your beliefs", icon: Brain, isCorrect: false },
      { id: "b", text: "Cross-reference with multiple credible sources", icon: Search, isCorrect: true },
      { id: "c", text: "See how many likes it has", icon: Shield, isCorrect: false },
      { id: "d", text: "Check the website design", icon: Scale, isCorrect: false }
    ],
    explanation: "Cross-referencing with multiple credible sources is the gold standard for fact-checking!",
    category: "fact-check"
  },
  {
    id: 2,
    question: "Which of these is an example of confirmation bias?",
    options: [
      { id: "a", text: "Reading diverse viewpoints", icon: Scale, isCorrect: false },
      { id: "b", text: "Only seeking info that supports your views", icon: Brain, isCorrect: true },
      { id: "c", text: "Fact-checking before sharing", icon: Search, isCorrect: false },
      { id: "d", text: "Asking for evidence", icon: Shield, isCorrect: false }
    ],
    explanation: "Confirmation bias leads us to seek information that confirms what we already believe!",
    category: "bias"
  }
]

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isTimerActive, setIsTimerActive] = useState(true)
  const [quizComplete, setQuizComplete] = useState(false)
  const [answerHistory, setAnswerHistory] = useState<boolean[]>([])

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp()
    }
  }, [timeLeft, isTimerActive, showResult])

  const handleTimeUp = () => {
    setShowResult(true)
    setIsTimerActive(false)
    setAnswerHistory(prev => [...prev, false])
  }

  const handleAnswerSelect = (answerId: string) => {
    if (showResult) return
    
    setSelectedAnswer(answerId)
    setShowResult(true)
    setIsTimerActive(false)

    const question = quizQuestions[currentQuestion]
    const selectedOption = question.options.find(opt => opt.id === answerId)
    const isCorrect = selectedOption?.isCorrect || false
    
    if (isCorrect) {
      setScore(score + 1)
    }
    
    setAnswerHistory(prev => [...prev, isCorrect])
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
      setIsTimerActive(true)
    } else {
      setQuizComplete(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setTimeLeft(30)
    setIsTimerActive(true)
    setQuizComplete(false)
    setAnswerHistory([])
  }

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / quizQuestions.length) * 100
  const question = quizQuestions[currentQuestion]

  if (quizComplete) {
    const percentage = (score / quizQuestions.length) * 100
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-6">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-card/90 backdrop-blur-sm border border-primary/20 shadow-glow">
            <CardContent className="text-center p-12">
              <Trophy className="w-20 h-20 mx-auto mb-6 text-primary animate-glow-pulse" />
              <h2 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Quiz Complete!
              </h2>
              <div className="text-6xl font-bold text-primary mb-4">{score}/{quizQuestions.length}</div>
              <div className="text-xl text-muted-foreground mb-8">
                {percentage >= 80 ? "Excellent work! You're a media literacy champion!" :
                 percentage >= 60 ? "Good job! Keep practicing to improve!" :
                 "Keep learning! You're on the right track!"}
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-center gap-2">
                  {answerHistory.map((correct, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      {correct ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </div>
                  ))}
                </div>
                
                <Badge variant={percentage >= 80 ? "default" : "secondary"} className="text-lg px-4 py-2">
                  {percentage >= 80 ? "Media Literacy Expert!" : 
                   percentage >= 60 ? "Critical Thinker" : "Learning Student"}
                </Badge>
              </div>

              <Button onClick={resetQuiz} className="bg-gradient-primary text-white px-8 py-3 text-lg">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Media Literacy Quiz</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary" />
                <span className={`font-bold text-lg ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-foreground'}`}>
                  {timeLeft}s
                </span>
              </div>
              <Badge variant="outline">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </Badge>
            </div>
          </div>
          
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="mb-8 bg-card/90 backdrop-blur-sm border border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-8 text-center leading-relaxed">
              {question.question}
            </h2>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option) => {
                const IconComponent = option.icon
                const isSelected = selectedAnswer === option.id
                const showCorrectAnswer = showResult
                const isCorrectAnswer = option.isCorrect
                
                let cardStyle = "bg-card border border-primary/20 hover:border-primary/40 cursor-pointer transition-all duration-300"
                
                if (showCorrectAnswer) {
                  if (isCorrectAnswer) {
                    cardStyle = "bg-green-50 border-green-500 shadow-glow"
                  } else if (isSelected && !isCorrectAnswer) {
                    cardStyle = "bg-red-50 border-red-500"
                  } else {
                    cardStyle = "bg-card/50 border-muted cursor-not-allowed"
                  }
                } else if (isSelected) {
                  cardStyle = "bg-primary/10 border-primary shadow-glow"
                }

                return (
                  <Card
                    key={option.id}
                    className={`${cardStyle} ${!showResult ? 'hover:scale-105 hover:-translate-y-1' : ''}`}
                    onClick={() => handleAnswerSelect(option.id)}
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center shrink-0
                        ${showCorrectAnswer && isCorrectAnswer ? 'bg-green-500 text-white' :
                          showCorrectAnswer && isSelected && !isCorrectAnswer ? 'bg-red-500 text-white' :
                          'bg-primary/20 text-primary'}
                      `}>
                        {showCorrectAnswer && isCorrectAnswer ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : showCorrectAnswer && isSelected && !isCorrectAnswer ? (
                          <XCircle className="w-6 h-6" />
                        ) : (
                          <IconComponent className="w-6 h-6" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{option.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20 animate-fade-in">
                <div className="text-center">
                  {selectedAnswer && question.options.find(opt => opt.id === selectedAnswer)?.isCorrect ? (
                    <div className="text-green-600 mb-4">
                      <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                      <h3 className="text-2xl font-bold">Great Spot!</h3>
                    </div>
                  ) : (
                    <div className="text-red-500 mb-4">
                      <XCircle className="w-12 h-12 mx-auto mb-2" />
                      <h3 className="text-2xl font-bold">Try Again!</h3>
                    </div>
                  )}
                  
                  <p className="text-muted-foreground mb-6">{question.explanation}</p>
                  
                  <Button onClick={handleNextQuestion} className="bg-gradient-primary text-white px-8 py-3">
                    {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Quiz