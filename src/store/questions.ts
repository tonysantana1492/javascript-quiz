import { create } from 'zustand'
import confetti from 'canvas-confetti'
import { persist, devtools } from 'zustand/middleware'

import { Question } from '../types'
import { getAllQuestions } from '../services/questions'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

export const useQuestionStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit) => {
          const data = await getAllQuestions()

          const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)

          set({ questions }, false, 'FETCH_QUESTIONS')
        },
        selectAnswer: (questionId, answerIndex) => {
          const { questions } = get()
          const newQuestions = structuredClone(questions) as Question[]

          const foundQuestion = newQuestions.find((question) => question.id === questionId)

          if (!foundQuestion) return

          const isCorrectUserAnswer = foundQuestion?.correctAnswer === answerIndex

          foundQuestion.userSelectedAnswer = answerIndex
          foundQuestion.isCorrectUserAnswer = isCorrectUserAnswer

          if (isCorrectUserAnswer) void confetti()

          set({ questions: newQuestions }, false, 'SELECT_ANSWER')
        },
        goNextQuestion: () => {
          const { currentQuestion, questions } = get()

          const nextQuestion = currentQuestion + 1

          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION')
          }
        },
        goPreviousQuestion: () => {
          const { currentQuestion } = get()

          const previousQuestion = currentQuestion - 1

          if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion }, false, 'GO_PREVIOUS_QUESTION')
          }
        },
        reset: () => {
          set({ currentQuestion: 0, questions: [] }, false, 'RESET')
        },
      }),
      {
        name: 'questions', // este es el nombre de la cache en el localStorage
        // getStorage: () => localStorage, // por defecto es el loccalStorage pero lo puedo cambiar a cookies o sessionStorage
      },
    ),
  ),
)
