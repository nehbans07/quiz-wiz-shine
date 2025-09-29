import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Crown, Lightbulb, ArrowLeft, ArrowRight } from "lucide-react";
import lampImage from "@/assets/lamp-image.png";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: number;
  character: string;
  emoji: string;
  description: string;
  options: {
    A: string;
    B: string;
  };
  correctAnswer: "A" | "B";
  explanation: string;
  theme: "sports" | "memory" | "tech" | "entertainment" | "journalism";
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    character: "Team Leader Didi",
    emoji: "🏆",
    description: "She leads a sports team, keeps them motivated, and helps them reach the finals.",
    options: { A: "Lamp", B: "Legend" },
    correctAnswer: "B",
    explanation: "Yayyy! She's a true legend, consistently driving her team forward and shaping their success.",
    theme: "sports"
  },
  {
    id: 2,
    character: "Old Girlfriend",
    emoji: "💔",
    description: "She appears only in flashbacks of her boyfriend, smiling in a park or laughing in a memory. Hero gets very emotional when he thinks of her.",
    options: { A: "Lamp", B: "Legend" },
    correctAnswer: "A",
    explanation: "She's not a Legend because she doesn't make any choices or take actions that change the story or help her partner grow; she only creates emotion.",
    theme: "memory"
  },
  {
    id: 3,
    character: "Technology Genius",
    emoji: "💻",
    description: "She restores the hacked system and saves the company's precious data from being stolen",
    options: { A: "Lamp", B: "Legend" },
    correctAnswer: "B",
    explanation: "She is legend who uses her skills to save her company from a cyber crime. Is not it cool?",
    theme: "tech"
  },
  {
    id: 4,
    character: "Item Song Girl",
    emoji: "💃",
    description: "She dances in sparkly clothes. The video focuses on her looks, not her role.",
    options: { A: "Lamp", B: "Legend" },
    correctAnswer: "A",
    explanation: "She is a lamp as she dances and looks nice, but her role doesn't change the story.",
    theme: "entertainment"
  },
  {
    id: 5,
    character: "Brave Journalist",
    emoji: "📰",
    description: "She exposes a corruption scam and help people choose better politicians in future",
    options: { A: "Lamp", B: "Legend" },
    correctAnswer: "B",
    explanation: "She's a Legend because her bravery in exposing a corruption scam directly saves public money and changes the entire story",
    theme: "journalism"
  }
];

type SlideType = "intro" | "instructions" | "question" | "answer" | "conclusion1" | "conclusion2" | "conclusion3";

export const QuizGame = () => {
  const [currentSlide, setCurrentSlide] = useState<SlideType>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<"A" | "B" | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const totalQuestions = quizData.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answer: "A" | "B") => {
    setSelectedAnswer(answer);
  };

  const handleNextFromQuestion = () => {
    if (selectedAnswer) {
      if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
      setShowResult(true);
      setCurrentSlide("answer");
    }
  };

  const handleNextFromAnswer = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentSlide("question");
    } else {
      setCurrentSlide("conclusion1");
    }
  };

  const handleNext = () => {
    switch (currentSlide) {
      case "intro":
        setCurrentSlide("instructions");
        break;
      case "instructions":
        setCurrentSlide("question");
        break;
      case "question":
        handleNextFromQuestion();
        break;
      case "answer":
        handleNextFromAnswer();
        break;
      case "conclusion1":
        setCurrentSlide("conclusion2");
        break;
      case "conclusion2":
        setCurrentSlide("conclusion3");
        break;
    }
  };

  const handlePrevious = () => {
    switch (currentSlide) {
      case "instructions":
        setCurrentSlide("intro");
        break;
      case "question":
        if (currentQuestion > 0) {
          setCurrentQuestion(currentQuestion - 1);
        } else {
          setCurrentSlide("instructions");
        }
        break;
      case "conclusion1":
        setCurrentQuestion(totalQuestions - 1);
        setCurrentSlide("question");
        break;
      case "conclusion2":
        setCurrentSlide("conclusion1");
        break;
      case "conclusion3":
        setCurrentSlide("conclusion2");
        break;
    }
  };

  const renderIntroSlide = () => (
    <div className="text-center space-y-6 md:space-y-8 animate-fade-in px-4">
      <div className="text-6xl md:text-8xl animate-bounce-gentle">🪔</div>
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-quiz-legend to-quiz-lamp bg-clip-text text-transparent">
        Lamp ya Legend
      </h1>
      <div className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto">
        Get ready to discover the difference between characters who shine and characters who just... exist!
      </div>
    </div>
  );

  const renderInstructionsSlide = () => (
    <div className="text-center space-y-6 md:space-y-8 animate-fade-in max-w-4xl mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 md:mb-8">How to Play</h2>
      <div className="text-lg md:text-xl text-foreground mb-6 md:mb-8">
        You're about to meet some women characters. Your job is to decide if they are a lamp or a legend in their stories:
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <Card className="p-6 md:p-8 bg-gradient-to-br from-quiz-lamp/20 to-quiz-lamp/10 border-quiz-lamp">
          <div className="text-5xl md:text-6xl mb-4">🪔</div>
          <h3 className="text-xl md:text-2xl font-bold text-quiz-lamp mb-4">Lamp</h3>
          <p className="text-base md:text-lg">She is a 'lamp' if she looks good but doesn't speak, act, or change the story.</p>
        </Card>
        
        <Card className="p-6 md:p-8 bg-gradient-to-br from-quiz-legend/20 to-quiz-legend/10 border-quiz-legend">
          <div className="text-5xl md:text-6xl mb-4">👑</div>
          <h3 className="text-xl md:text-2xl font-bold text-quiz-legend mb-4">Legend</h3>
          <p className="text-base md:text-lg">She is a 'legend' if makes goals, makes choices, and changes the story.</p>
        </Card>
      </div>
    </div>
  );

  const getThemeClasses = (theme: string) => {
    const themeMap = {
      sports: "from-sports-primary/20 to-sports-secondary/10 border-sports-primary",
      memory: "from-memory-primary/20 to-memory-secondary/10 border-memory-primary",
      tech: "from-tech-primary/20 to-tech-secondary/10 border-tech-primary", 
      entertainment: "from-entertainment-primary/20 to-entertainment-secondary/10 border-entertainment-primary",
      journalism: "from-journalism-primary/20 to-journalism-secondary/10 border-journalism-primary"
    };
    return themeMap[theme as keyof typeof themeMap] || themeMap.sports;
  };

  const renderQuestionSlide = () => {
    const question = quizData[currentQuestion];
    
    return (
      <div className="space-y-6 md:space-y-8 animate-slide-in-right max-w-4xl mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <Progress value={progress} className="w-full mb-4" />
          <p className="text-base md:text-lg text-muted-foreground">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
        </div>

        <Card className={cn("p-6 md:p-8 bg-gradient-to-br", getThemeClasses(question.theme))}>
          <div className="text-center space-y-4 md:space-y-6">
            <div className="text-6xl md:text-8xl">{question.emoji}</div>
            <h3 className="text-xl md:text-3xl font-bold">Character {currentQuestion + 1}: {question.character}</h3>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">"{question.description}"</p>
            
            <div className="pt-4 md:pt-6">
              <h4 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">What is she?</h4>
              
              <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                <Button
                  variant={selectedAnswer === "A" ? "default" : "outline"}
                  size="lg"
                  className={cn(
                    "p-4 md:p-6 h-auto text-lg md:text-xl w-full",
                    selectedAnswer === "A" 
                      ? "bg-quiz-lamp text-quiz-lamp-foreground hover:bg-quiz-lamp/90" 
                      : "hover:bg-quiz-lamp/10 hover:border-quiz-lamp"
                  )}
                  onClick={() => handleAnswerSelect("A")}
                >
                  <Lightbulb className="w-5 h-5 md:w-6 md:h-6 mr-3" />
                  Option A - Lamp
                </Button>
                
                <Button
                  variant={selectedAnswer === "B" ? "default" : "outline"}
                  size="lg"
                  className={cn(
                    "p-4 md:p-6 h-auto text-lg md:text-xl w-full",
                    selectedAnswer === "B" 
                      ? "bg-quiz-legend text-quiz-legend-foreground hover:bg-quiz-legend/90"
                      : "hover:bg-quiz-legend/10 hover:border-quiz-legend"
                  )}
                  onClick={() => handleAnswerSelect("B")}
                >
                  <Crown className="w-5 h-5 md:w-6 md:h-6 mr-3" />
                  Option B - Legend
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderAnswerSlide = () => {
    const question = quizData[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    const correctAnswerText = question.correctAnswer === "A" ? "Lamp" : "Legend";
    
    return (
      <div className="space-y-6 md:space-y-8 animate-slide-in-left max-w-4xl mx-auto px-4">
        <Card className={cn(
          "p-6 md:p-8 bg-gradient-to-br",
          isCorrect 
            ? "from-quiz-correct/20 to-quiz-correct/10 border-quiz-correct"
            : "from-quiz-incorrect/20 to-quiz-incorrect/10 border-quiz-incorrect"
        )}>
          <div className="text-center space-y-4 md:space-y-6">
            <div className="text-6xl md:text-8xl">{question.emoji}</div>
            
            <div className={cn("text-5xl md:text-6xl", isCorrect ? "text-quiz-correct" : "text-quiz-incorrect-foreground")}>
              {isCorrect ? <CheckCircle className="w-12 h-12 md:w-16 md:h-16 mx-auto" /> : <XCircle className="w-12 h-12 md:w-16 md:h-16 mx-auto" />}
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold">
              {isCorrect ? "Correct!" : "Oops!"}
            </h3>
            
            <div className="space-y-3 md:space-y-4">
              <p className="text-lg md:text-xl font-semibold">
                The correct answer is: <span className={cn("font-bold", correctAnswerText === "Legend" ? "text-quiz-legend" : "text-quiz-lamp")}>
                  {correctAnswerText}
                </span>
              </p>
              
              <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                {question.explanation}
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderConclusionSlides = () => {
    switch (currentSlide) {
      case "conclusion1":
        return (
          <div className="text-center space-y-6 md:space-y-8 animate-fade-in max-w-4xl mx-auto px-4">
            <div className="text-6xl md:text-8xl mb-6 md:mb-8">🎯</div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 md:mb-8">Quiz Complete!</h2>
            <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/20 to-primary/10 border-primary">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Your Score</h3>
              <div className="text-4xl md:text-6xl font-bold text-primary mb-3 md:mb-4">{score}/{totalQuestions}</div>
              <p className="text-lg md:text-xl">
                {score === totalQuestions ? "Perfect! You're a legend at spotting legends!" :
                 score >= 3 ? "Great job! You can tell the difference between lamps and legends!" :
                 "Good try! Keep practicing to spot the legends!"}
              </p>
            </Card>
            <h3 className="text-xl md:text-3xl font-semibold">What did we learn from Lamp or Legend game quiz?</h3>
          </div>
        );
      
      case "conclusion2":
        return (
          <div className="text-center space-y-6 md:space-y-8 animate-fade-in max-w-4xl mx-auto px-4">
            <Card className="p-6 md:p-8 bg-gradient-to-br from-quiz-legend/20 to-quiz-legend/10 border-quiz-legend">
              <div className="text-6xl md:text-8xl mb-4 md:mb-6">👑</div>
              <h3 className="text-3xl md:text-4xl font-bold text-quiz-legend mb-4 md:mb-6">Legends</h3>
              <p className="text-lg md:text-xl leading-relaxed">
                Legends are the drivers of their story, they make their own decisions, take action, and directly shape the plot.
              </p>
            </Card>
          </div>
        );
      
      case "conclusion3":
        return (
          <div className="text-center space-y-6 md:space-y-8 animate-fade-in max-w-4xl mx-auto px-4">
            <Card className="p-6 md:p-8 bg-gradient-to-br from-quiz-lamp/20 to-quiz-lamp/10 border-quiz-lamp">
              <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 md:mb-6 rounded-lg overflow-hidden">
                <img 
                  src={lampImage} 
                  alt="Decorative lamp representing characters without agency" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-quiz-lamp mb-4 md:mb-6">Lamps</h3>
              <p className="text-lg md:text-xl leading-relaxed">
                In contrast, lamps are like decoration pieces lacking the power to make decisions. They often follow others or simply act as side characters in someone's journey.
              </p>
            </Card>
            <div className="mt-8 md:mt-12">
              <Button 
                size="lg" 
                onClick={() => {
                  setCurrentSlide("intro");
                  setCurrentQuestion(0);
                  setScore(0);
                  setSelectedAnswer(null);
                  setShowResult(false);
                }}
                className="text-lg md:text-xl px-6 md:px-8 py-4 md:py-6"
              >
                Play Again
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background p-2 md:p-4">
      <div className="max-w-6xl mx-auto pt-4 md:pt-8">
        <div className="min-h-[500px] md:min-h-[600px] flex flex-col justify-center">
          {currentSlide === "intro" && renderIntroSlide()}
          {currentSlide === "instructions" && renderInstructionsSlide()}
          {currentSlide === "question" && renderQuestionSlide()}
          {currentSlide === "answer" && renderAnswerSlide()}
          {(currentSlide === "conclusion1" || currentSlide === "conclusion2" || currentSlide === "conclusion3") && renderConclusionSlides()}
        </div>
        
        {currentSlide !== "conclusion3" && (
          <div className="flex justify-between items-center mt-6 md:mt-8 px-2 md:px-4">
            {currentSlide !== "intro" ? (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex items-center gap-2 text-sm md:text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            ) : (
              <div />
            )}
            
            <Button
              onClick={handleNext}
              disabled={currentSlide === "question" && !selectedAnswer}
              className="flex items-center gap-2 text-sm md:text-base"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};