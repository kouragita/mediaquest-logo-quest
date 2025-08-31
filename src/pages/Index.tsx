import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Search, Shield, Trophy, Users, Zap, MessageCircle } from "lucide-react";
import logoImage from "@/assets/mediaquest-logo.png";
import owlMascot from "@/assets/owl-mascot.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-display">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logoImage} alt="MediaQuest Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MediaQuest
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <Button variant="gaming" size="sm">Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        
        {/* Floating Owl Mascot */}
        <div className="absolute top-20 right-8 md:right-20 z-20 hidden lg:block">
          <div className="animate-float">
            <img 
              src={owlMascot} 
              alt="MediaQuest Owl Guide" 
              className="w-24 h-24 drop-shadow-lg hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-energy/10 rounded-full blur-lg animate-glow-pulse"></div>
          </div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img 
                src={logoImage} 
                alt="MediaQuest Logo" 
                className="h-32 w-auto drop-shadow-logo transform hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-energy/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            MediaQuest
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Master media literacy through engaging gaming experiences. 
            <span className="text-primary font-semibold"> Learn fact-checking, critical thinking, and digital citizenship</span> 
            with interactive challenges.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              <Play className="w-5 h-5" />
              Start Your Quest
            </Button>
            <Button variant="energy" size="lg" className="text-lg px-8 py-4">
              <Search className="w-5 h-5" />
              Explore Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Meet Your Guide Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-energy/5">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="lg:w-1/3 flex justify-center">
              <div className="relative animate-fade-in">
                <img 
                  src={owlMascot} 
                  alt="Sage - Your MediaQuest Guide" 
                  className="w-80 h-80 drop-shadow-xl animate-float"
                />
                <div className="absolute inset-0 bg-energy/20 rounded-full blur-2xl animate-glow-pulse"></div>
              </div>
            </div>
            
            <div className="lg:w-2/3 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Meet Sage
                <br />
                <span className="text-2xl md:text-3xl text-muted-foreground font-normal">Your Digital Wisdom Guide</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Sage is your friendly companion throughout your MediaQuest journey. With advanced digital glasses that can spot 
                misinformation from miles away, Sage combines ancient wisdom with cutting-edge technology to help you navigate 
                the complex world of digital media.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-3 h-3 bg-energy rounded-full animate-pulse"></div>
                  <span className="font-medium">Real-time fact checking assistance</span>
                </div>
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-3 h-3 bg-energy rounded-full animate-pulse"></div>
                  <span className="font-medium">Personalized learning guidance</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Button variant="gaming" size="lg" className="text-lg px-8 py-4">
                  <MessageCircle className="w-5 h-5" />
                  Chat with Sage
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Level Up Your Media Literacy
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combine the excitement of gaming with essential 21st-century skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-card-custom transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Fact-Checking Quests</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Navigate through misinformation challenges and learn to identify reliable sources with interactive detective missions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-card-custom transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-energy rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-primary-deep" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Digital Citizenship</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Master online ethics, privacy, and responsible digital behavior through immersive gaming scenarios.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-card-custom transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Achievement System</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Earn badges, unlock new levels, and compete with friends while building critical thinking skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-primary-deep text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Empowering Digital Citizens</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of learners building essential media literacy skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="w-20 h-20 bg-energy rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-primary-deep" />
              </div>
              <div className="text-4xl font-bold mb-2 text-energy">10K+</div>
              <div className="text-lg opacity-90">Active Learners</div>
            </div>

            <div className="group">
              <div className="w-20 h-20 bg-energy rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-primary-deep" />
              </div>
              <div className="text-4xl font-bold mb-2 text-energy">50+</div>
              <div className="text-lg opacity-90">Interactive Challenges</div>
            </div>

            <div className="group">
              <div className="w-20 h-20 bg-energy rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-10 h-10 text-primary-deep" />
              </div>
              <div className="text-4xl font-bold mb-2 text-energy">95%</div>
              <div className="text-lg opacity-90">Skill Improvement</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Ready to Start Your MediaQuest?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join the gaming revolution in media literacy education. Build critical thinking skills while having fun!
            </p>
            <Button variant="hero" size="lg" className="text-lg px-12 py-4">
              <Play className="w-6 h-6" />
              Begin Your Adventure
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={logoImage} alt="MediaQuest Logo" className="h-8 w-auto" />
              <span className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
                MediaQuest
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 MediaQuest. Empowering digital citizens through gaming.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;