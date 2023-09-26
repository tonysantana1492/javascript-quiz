import { Button } from '@mui/material'
import { useQuestionData } from '../hooks/useQuestionData'
import { useQuestionStore } from '../store/questions'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionData()
  const reset = useQuestionStore((state) => state.reset)

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} corrects  -  ❌ ${incorrect} incorrects  -  ❔ ${unanswered} unanswered`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={reset}>Reset Game</Button>
      </div>
    </footer>
  )
}
