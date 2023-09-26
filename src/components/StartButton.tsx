import { Button } from '@mui/material'
import { useQuestionStore } from '../store/questions'

export const StartButton = () => {
  const fetchQuestion = useQuestionStore((state) => state.fetchQuestions)

  const handleClick = () => {
    void fetchQuestion(10)
  }

  return (
    <Button variant="contained" onClick={handleClick}>
      Start
    </Button>
  )
}
