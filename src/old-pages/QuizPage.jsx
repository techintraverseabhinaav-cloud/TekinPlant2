"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Clock, CheckCircle, AlertCircle, BookOpen, User, Award, RotateCcw, Send, Eye, Target } from "lucide-react"

const QuizPage = () => {
  const { id } = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(3600) // 60 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Mock quiz data
  const quiz = {
    id: id,
    title: "React Fundamentals Assessment",
    course: "Full Stack Web Development",
    instructor: "Prof. John Smith",
    description: "Test your understanding of React concepts including components, state, props, and hooks.",
    duration: 60, // minutes
    totalQuestions: 15,
    passingScore: 70,
    maxAttempts: 3,
    currentAttempt: 1,
    timeLimit: true,
    shuffleQuestions: true,
    showCorrectAnswers: true,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the correct way to create a functional component in React?",
        options: [
          "function MyComponent() { return <div>Hello</div>; }",
          "const MyComponent = () => { return <div>Hello</div>; }",
          "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
          "Both A and B are correct",
        ],
        correctAnswer: 3,
        points: 2,
        explanation:
          "Both function declarations and arrow functions are valid ways to create functional components in React.",
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Which hook is used to manage state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
        points: 2,
        explanation: "useState is the primary hook for managing local state in functional components.",
      },
      {
        id: 3,
        type: "true-false",
        question: "Props in React are mutable and can be changed by the child component.",
        options: ["True", "False"],
        correctAnswer: 1,
        points: 1,
        explanation: "Props are immutable and cannot be changed by the child component. They are read-only.",
      },
      {
        id: 4,
        type: "multiple-select",
        question: "Which of the following are valid React hooks? (Select all that apply)",
        options: ["useState", "useEffect", "useComponent", "useContext", "useCallback"],
        correctAnswers: [0, 1, 3, 4],
        points: 3,
        explanation:
          "useState, useEffect, useContext, and useCallback are all valid React hooks. useComponent is not a real hook.",
      },
      {
        id: 5,
        type: "short-answer",
        question: "What is the purpose of the useEffect hook in React?",
        correctAnswer: "To perform side effects in functional components",
        points: 3,
        explanation:
          "useEffect is used to perform side effects like data fetching, subscriptions, or manually changing the DOM.",
      },
    ],
  }

  // Mock results data
  const results = {
    score: 85,
    totalPoints: 100,
    correctAnswers: 12,
    totalQuestions: 15,
    timeSpent: "45 minutes",
    passed: true,
    grade: "B+",
    submittedAt: "2024-02-20 14:30",
  }

  // Timer effect
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setQuizCompleted(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [quizStarted, quizCompleted, timeRemaining])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    })
  }

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  const handleSubmitQuiz = () => {
    setQuizCompleted(true)
    setShowResults(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getQuestionStatus = (index) => {
    const question = quiz.questions[index]
    if (answers[question.id] !== undefined) {
      return "answered"
    }
    return "unanswered"
  }

  const renderQuestion = (question) => {
    const answer = answers[question.id]

    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-gray-500 transition-colors cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index}
                  checked={answer === index}
                  onChange={() => handleAnswerChange(question.id, index)}
                  className="text-dark-primary focus:ring-dark-primary"
                />
                <span className="flex-1">{option}</span>
              </label>
            ))}
          </div>
        )

      case "true-false":
        return (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-gray-500 transition-colors cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index}
                  checked={answer === index}
                  onChange={() => handleAnswerChange(question.id, index)}
                  className="text-dark-primary focus:ring-dark-primary"
                />
                <span className="flex-1">{option}</span>
              </label>
            ))}
          </div>
        )

      case "multiple-select":
        return (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 p-4 bg-dark-bg border border-gray-600 rounded-lg hover:border-gray-500 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={index}
                  checked={answer && answer.includes(index)}
                  onChange={(e) => {
                    const currentAnswers = answer || []
                    if (e.target.checked) {
                      handleAnswerChange(question.id, [...currentAnswers, index])
                    } else {
                      handleAnswerChange(
                        question.id,
                        currentAnswers.filter((a) => a !== index),
                      )
                    }
                  }}
                  className="text-dark-primary focus:ring-dark-primary"
                />
                <span className="flex-1">{option}</span>
              </label>
            ))}
          </div>
        )

      case "short-answer":
        return (
          <div>
            <textarea
              value={answer || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dark-primary transition-colors"
              placeholder="Type your answer here..."
            />
          </div>
        )

      default:
        return null
    }
  }

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-dark-bg py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8">
            <div className="text-center mb-8">
              <BookOpen className="mx-auto mb-4 text-dark-primary" size={48} />
              <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
              <p className="text-gray-400">{quiz.course}</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-dark-bg border border-gray-600 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Quiz Instructions</h2>
                <div className="space-y-3 text-gray-300">
                  <p>{quiz.description}</p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>This quiz contains {quiz.totalQuestions} questions</li>
                    <li>You have {quiz.duration} minutes to complete the quiz</li>
                    <li>Passing score is {quiz.passingScore}%</li>
                    <li>
                      You have {quiz.maxAttempts} attempts (Current: {quiz.currentAttempt})
                    </li>
                    <li>You can navigate between questions using the navigation panel</li>
                    <li>Make sure to submit your quiz before time runs out</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-dark-bg border border-gray-600 rounded-xl p-4 text-center">
                  <Clock className="mx-auto mb-2 text-dark-primary" size={24} />
                  <div className="text-2xl font-bold">{quiz.duration}</div>
                  <div className="text-sm text-gray-400">Minutes</div>
                </div>
                <div className="bg-dark-bg border border-gray-600 rounded-xl p-4 text-center">
                  <Target className="mx-auto mb-2 text-dark-accent" size={24} />
                  <div className="text-2xl font-bold">{quiz.totalQuestions}</div>
                  <div className="text-sm text-gray-400">Questions</div>
                </div>
                <div className="bg-dark-bg border border-gray-600 rounded-xl p-4 text-center">
                  <Award className="mx-auto mb-2 text-green-400" size={24} />
                  <div className="text-2xl font-bold">{quiz.passingScore}%</div>
                  <div className="text-sm text-gray-400">Passing Score</div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleStartQuiz}
                  className="bg-dark-primary hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 text-lg"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Quiz Results Screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-dark-bg py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className={`mx-auto mb-4 ${results.passed ? "text-green-400" : "text-red-400"}`}>
                {results.passed ? <CheckCircle size={64} /> : <AlertCircle size={64} />}
              </div>
              <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
              <p className="text-gray-400">Here are your results</p>
            </div>

            <div className="max-w-2xl mx-auto">
              {/* Score Display */}
              <div className="bg-dark-bg border border-gray-600 rounded-xl p-8 mb-8 text-center">
                <div className="mb-4">
                  <div className={`text-6xl font-bold ${results.passed ? "text-green-400" : "text-red-400"}`}>
                    {results.score}%
                  </div>
                  <div className="text-gray-400">
                    {results.correctAnswers}/{results.totalQuestions} correct answers
                  </div>
                </div>
                <div className={`text-xl font-semibold ${results.passed ? "text-green-400" : "text-red-400"}`}>
                  {results.passed ? "PASSED" : "FAILED"}
                </div>
                <div className="text-gray-400">Grade: {results.grade}</div>
              </div>

              {/* Detailed Results */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-dark-bg border border-gray-600 rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Performance Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Score:</span>
                      <span className="font-medium">
                        {results.score}/{results.totalPoints}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Correct Answers:</span>
                      <span className="font-medium">
                        {results.correctAnswers}/{results.totalQuestions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time Spent:</span>
                      <span className="font-medium">{results.timeSpent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Submitted:</span>
                      <span className="font-medium">{results.submittedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-bg border border-gray-600 rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Next Steps</h3>
                  <div className="space-y-3">
                    {results.passed ? (
                      <>
                        <div className="flex items-center space-x-2 text-green-400">
                          <CheckCircle size={16} />
                          <span className="text-sm">Quiz requirement met</span>
                        </div>
                        <div className="flex items-center space-x-2 text-blue-400">
                          <Award size={16} />
                          <span className="text-sm">Certificate eligible</span>
                        </div>
                        <div className="flex items-center space-x-2 text-purple-400">
                          <BookOpen size={16} />
                          <span className="text-sm">Continue to next module</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2 text-red-400">
                          <AlertCircle size={16} />
                          <span className="text-sm">Retake required</span>
                        </div>
                        <div className="flex items-center space-x-2 text-yellow-400">
                          <BookOpen size={16} />
                          <span className="text-sm">Review course materials</span>
                        </div>
                        <div className="flex items-center space-x-2 text-blue-400">
                          <User size={16} />
                          <span className="text-sm">Contact instructor for help</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center justify-center space-x-2 bg-dark-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <Eye size={20} />
                  <span>Review Answers</span>
                </button>
                {!results.passed && quiz.currentAttempt < quiz.maxAttempts && (
                  <button className="flex items-center justify-center space-x-2 bg-dark-primary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    <RotateCcw size={20} />
                    <span>Retake Quiz</span>
                  </button>
                )}
                <button className="flex items-center justify-center space-x-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <BookOpen size={20} />
                  <span>Back to Course</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main Quiz Interface
  const currentQ = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <BookOpen size={16} className="mr-2" />
                  {quiz.course}
                </span>
                <span className="flex items-center">
                  <User size={16} className="mr-2" />
                  {quiz.instructor}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-dark-primary">{formatTime(timeRemaining)}</div>
                <div className="text-sm text-gray-400">Time Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dark-accent">
                  {currentQuestion + 1}/{quiz.questions.length}
                </div>
                <div className="text-sm text-gray-400">Question</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Progress</span>
              <span className="text-gray-300">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-dark-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-6 sticky top-8">
              <h3 className="font-semibold mb-4">Question Navigation</h3>
              <div className="grid grid-cols-5 gap-2">
                {quiz.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      index === currentQuestion
                        ? "bg-dark-primary text-white"
                        : getQuestionStatus(index) === "answered"
                          ? "bg-green-600 text-white"
                          : "bg-dark-bg border border-gray-600 text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-dark-primary rounded"></div>
                  <span className="text-gray-400">Current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span className="text-gray-400">Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-dark-bg border border-gray-600 rounded"></div>
                  <span className="text-gray-400">Unanswered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <div className="bg-dark-surface border border-gray-700 rounded-2xl p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </span>
                  <span className="text-sm text-gray-400">{currentQ.points} points</span>
                </div>
                <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>
              </div>

              {renderQuestion(currentQ)}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 border border-gray-600 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-500"
                >
                  Previous
                </button>

                <div className="flex space-x-4">
                  {currentQuestion === quiz.questions.length - 1 ? (
                    <button
                      onClick={handleSubmitQuiz}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Send size={20} />
                      <span>Submit Quiz</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="bg-dark-primary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
