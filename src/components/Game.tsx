import { IconButton, Stack } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { useQuestionStore } from '../store/questions'
import { Questions } from './Questions'
import { Footer } from './Footer'

export const Game = () => {
  const [questions, currentQuestion, goNextQuestion, goPreviousQuestion] = useQuestionStore((state) => [
    state.questions,
    state.currentQuestion,
    state.goNextQuestion,
    state.goPreviousQuestion,
  ])

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Questions info={questionInfo} />
      <Footer />
    </>
  )
}
